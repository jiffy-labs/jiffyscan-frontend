import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import Status from '@/components/common/status/Status';
import { formatDistanceToNow ,format} from 'date-fns';
import {
    getPoweredBy,
    getUserOp,
    getUserOpMetadata,
    metadata,
    PoweredBy,
    Trace,
    UserOp,
    showToast,
    LogEntry, fetchData
} from '@/components/common/apiCalls/jiffyApis';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import UserOpLogs from './UserOpLogs';
import CopyButton from '@/components/common/copy_button/CopyButton';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getExplorerLogo, getFee, getTimePassed, shortenString } from '@/components/common/utils';
import { NETWORKS_WHITELISTED_FOR_NO_LOGIN, NETWORK_ICON_MAP } from '@/components/common/constants';
import Skeleton from 'react-loading-skeleton-2';
import HeaderSection from './HeaderSection';
import TransactionDetails from './TransactionDetails';
import DeveloperDetails from './DeveloperDetails';
import { useConfig } from '@/context/config';
import Table, { tableDataT } from '@/components/common/table/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from '@/components/global/LoginModal';
import { useUserSession } from '@/context/userSession';
import { ethers } from 'ethers';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const passedTime = (time: number) => {
    let currentTime = new Date().getTime();
    let passedTime = currentTime - time;
    return passedTime;
};

// import Skeleton from '@/components/Skeleton';
export const BUTTON_LIST = [
    {
        name: 'Default View',
        key: 'Default View',
    },
    {
        name: 'Original',
        key: 'Original',
    },
];
const columns = [
    { name: 'Hash', sort: true },
    { name: 'Age', sort: true },
    { name: 'Sender', sort: true },
    { name: 'Target', sort: true },
];

const createDuplicateUserOpsRows = (userOps: UserOp[], handleRowClicked: (id: number) => void): tableDataT['rows'] => {
    let newRows = [] as tableDataT['rows'];
    if (!userOps) return newRows;
    userOps.forEach((userOp, i) => {
        newRows.push({
            token: {
                text: userOp.userOpHash,
                icon: NETWORK_ICON_MAP[userOp.network],
                type: 'userOp',
                onTokenClicked: handleRowClicked,
                value: i,
            },
            ago: getTimePassed(userOp.blockTime!),
            sender: userOp.sender,
            target: userOp.target ? userOp.target : ['Unavailable!'],
            fee: getFee(userOp.actualGasCost, userOp.network as string),
            status: userOp.success ? userOp.success : true,
        });
    });
    return newRows;
};

const getBlockCondition = (expTime: number | null | undefined): boolean => {
    return expTime ? expTime < Date.now() / 1000 : true;
};


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
// import Skeleton from '@/components/Skeleton';

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            className='xl:pl-[0px] xl:pr-[0px]'
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function RecentUserOps(props: any) {
    const router = useRouter();
    const [tableLoading, setTableLoading] = useState(true);
    const { selectedNetwork, setSelectedNetwork, addressMapping } = useConfig();
    const [isLoading, setIsLoading] = useState(true)
    const { section } = router.query;
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const hash = props.slug && props.slug[0];
    const network = router.query && router.query.network;
    const [selectedColor, setSelectedColor] = useState(BUTTON_LIST[0].key);
    const [userOpsData, setuserOpsData] = useState<UserOp[]>([] as UserOp[]);
    const [showUserOpId, setShowUserOpId] = useState<number>(0);
    const [responseData, setresponseData] = useState<PoweredBy>();
    const [metaData, setMetaData] = useState<metadata>();
    const [duplicateUserOpsRows, setDuplicateUserOpsRows] = useState<tableDataT['rows']>([] as tableDataT['rows']);
    const { isLoggedIn } = useUserSession();
    const [activeTab, setActiveTab] = useState(section || 'overview');
    const [value, setValue] = React.useState(0);
    useEffect(() => {
        if (section) setActiveTab(section);
    }, [section]);

    const handleTabChange = (tabName: string) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, section: tabName },
        });
    };

    const renderContent = () => {
        return (
            <div>
                <div className={`${activeTab === 'overview' ? 'block' : 'hidden'}`}>
                    <TransactionDetails
                        tableLoading={tableLoading}
                        skeletonCards={skeletonCards}
                        item={userOpsData?.[showUserOpId]}
                        responseData={responseData}
                        addressMapping={addressMapping}
                        metaData={metaData}
                        setMetadata={setMetaData}
                        selectedNetwork={selectedNetwork}
                    />
                </div>

                <div className={`${activeTab === 'dev_details' ? 'block' : 'hidden'}`}>
                    <DeveloperDetails
                        tableLoading={tableLoading}
                        skeletonCards1={skeletonCards1}
                        item={userOpsData?.[showUserOpId]}
                        selectedColor={selectedColor}
                        BUTTON_LIST={BUTTON_LIST}
                        setSelectedColor={setSelectedColor}
                        selectedNetwork={selectedNetwork}
                        metaData={metaData}
                    />
                </div>

                <div className={`${activeTab === 'logs' ? 'block' : 'hidden'}`}>
                    {/* <UserOpLogs logs={logs} /> */}
                </div>
            </div>
        );
    };
    // const [block, setBlock] = useState(!isLoggedIn());

    // useEffect(() => {
    //     setBlock(!isLoggedIn());
    // }, [isLoggedIn]);

    async function returnUserOpData(hash: string, toast: any) {
        let currentTime = new Date().getTime();
        let userOp = await getUserOp(hash, toast, '');
        while (userOp.length === 0) {
            await sleep(1000);
            userOp = await getUserOp(hash, toast);
            if (passedTime(currentTime) > 10000) {
                showToast(toast, 'Error fetching data');
                break;
            }
        }
        return userOp;
    }

    const refreshUserOpsTable = async (name: string) => {
        setTableLoading(true);

        const pollUserOpData = async () => {
            let userOps = await returnUserOpData(name, toast);
            setuserOpsData(userOps); // Update the UI with the latest data
            if (logs.length === 0) {
                const data = await fetchData(userOps?.[showUserOpId]);
                setLogs(data.logs || []);
                console.log("logs fetch", data.logs)
            }
            // Create and set the rows for the table
            let rows = createDuplicateUserOpsRows(userOps, handleDuplicateRowClick);
            setDuplicateUserOpsRows(rows);


            if (userOps.length > 1) {
                setShowUserOpId(-1);
            }

            if (userOps[0] && userOps[0].network) {
                setSelectedNetwork(userOps[0].network);
                setTableLoading(false);
                setIsLoading(false)
            }

            // Continue polling if timeSeenInAltMempool exists
            if (userOps[0]?.timeSeenInAltMempool || userOps[0]?.timeSeenInMainMempool) {
                setTimeout(pollUserOpData, 20000); // Poll every 20 seconds
            }
        };

        await pollUserOpData(); // Start the polling process
    };

    const handleDuplicateRowClick = (id: number) => {
        setShowUserOpId(id);
    };

    let prevHash = hash;
    useEffect(() => {
        // Check if hash or network have changed
        if (prevHash !== undefined) {
            prevHash = hash;
            const refreshTable = () => {
                refreshUserOpsTable(hash as string);
            };

            refreshTable();
        }
    }, [hash]);

    const fetchUserOpMetadata = async (hash: string, network: string) => {
        const metaData = await getUserOpMetadata(hash as string, network, toast);
        setMetaData(metaData);
    };

    const fetchPoweredBy = async () => {
        const beneficiary =
            userOpsData
                ?.map((item) => item.beneficiary ?? '')
                .filter((item) => item !== null)
                .join(',') || '';
        const paymaster = userOpsData?.map((item) => item.paymaster)?.[0] || '';
        const sender = userOpsData?.map((item) => item.sender)?.[0] || '';
        const getReached = await getPoweredBy(beneficiary, paymaster, toast);
        setresponseData(getReached);
    };
    useEffect(() => {
        fetchPoweredBy();
    }, []);

    useEffect(() => {
        if (showUserOpId >= 0 && userOpsData.length > showUserOpId) {
            fetchUserOpMetadata(userOpsData[showUserOpId].userOpHash, userOpsData[showUserOpId].network);

        }
    }, [userOpsData, showUserOpId]);

    let skeletonCards = Array(13).fill(0);
    let skeletonCards1 = Array(2).fill(0);

    const [activeTab2, setActiveTab2] = useState<number>(1);

    const handleTabClick = (tabIndex: number) => {
        setActiveTab2(tabIndex);
    };


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const formatAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-6)}`;
    };
    console.log("targets", userOpsData)
    return (
        <div className="">
            <Navbar searchbar />
            <section className="px-3 py-10">
                <div className="container">
                    <div className="flex flex-row">
                        <Link href="/" className="text-gray-500">
                            <ArrowBackIcon
                                style={{
                                    height: '15px',
                                    width: '15px',
                                    marginRight: '20px',
                                    marginLeft: '10px',
                                    marginBottom: '3px',
                                }}
                            />
                        </Link>

                        <Breadcrumbs aria-label="breadcrumb" className="font-['Roboto']">
                            <Link underline="hover" color="inherit" href={'/' + (selectedNetwork ? '?network=' + selectedNetwork : '')}>
                                Home
                            </Link>
                            <Link underline="hover" color="inherit" href="/recentUserOps">
                                Recent User Ops
                            </Link>
                            <Link
                                underline="hover"
                                color="text.primary"
                                // href={`/userOpHash/${hash}?network=${network ? network : ''}`}
                                onClick={() => setShowUserOpId(-1)}
                                aria-current="page"
                            >
                                {shortenString(hash as string)}
                            </Link>
                        </Breadcrumbs>
                    </div>
                </div>
            </section>
            <div >
                {/* {!(isLoggedIn() || (selectedNetwork && NETWORKS_WHITELISTED_FOR_NO_LOGIN.includes(selectedNetwork))) && (
                    <LoginModal showClose={false} block={block} setBlock={setBlock}></LoginModal>
                )} */}
                <div
                // className={`${
                //     !(isLoggedIn() || (selectedNetwork && NETWORKS_WHITELISTED_FOR_NO_LOGIN.includes(selectedNetwork))) && 'blur'
                // }`}
                >
                    {showUserOpId >= 0 ? (
                        <>
                            {/* <HeaderSection item={userOpsData?.[showUserOpId]} network={network} loading={tableLoading} /> */}
                            {/* <div className="mt-[28px] px-3 ">
                                <div className="container px-0 ">
                                    <div className="flex flex-row gap-[1rem]">
                                        <button
                                            onClick={() => handleTabChange('overview')}
                                            className={`py-2 px-4 rounded-[6px] ${
                                                activeTab === 'overview' ? 'bg-gray-800 text-white' : 'bg-gray-200'
                                            }`}
                                        >
                                            Transaction Details
                                        </button>
                                        <button
                                            onClick={() => handleTabChange('dev_details')}
                                            className={`py-2 px-4 rounded-[6px] ${
                                                activeTab === 'dev_details' ? 'bg-gray-800  text-white' : 'bg-gray-200'
                                            }`}
                                        >
                                            Developer Details
                                        </button>
                                        <button
                                            onClick={() => handleTabChange('logs')}
                                            className={`py-2 px-4 rounded-[6px] ${
                                                activeTab === 'logs' ? 'bg-gray-800  text-white' : 'bg-gray-200'
                                            }`}
                                        >
                                            UserOp Logs
                                        </button>
                                    </div>
                                    <div className="mb-[2rem]">{renderContent()}</div>
                                </div>
                            </div> */}

                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className=' container xl:px-[5rem] min-[1450px]:px-[0rem]'>
                                        <Tab label="UserOp Overview" {...a11yProps(0)} />

                                        <Tab label="Developer Details" {...a11yProps(1)} />
                                        <Tab label="UserOp Logs" {...a11yProps(2)} />
                                        {/* <Tab label="CallData" {...a11yProps(4)} /> */}
                                    </Tabs>
                                </Box>
                                <div className='container xl:px-[5rem] min-[1450px]:px-[0rem]'>
                                    <CustomTabPanel value={value} index={0}>
                                        <div className='xl:w-[840px] flex flex-col gap-[40px]'>
                                            <div>
                                                <div className='flex flex-row gap-[16px] px-[20px] xl:px-[32px] py-[20px]'>
                                                    <img src="/images/summary.svg" className='w-[24px]' />
                                                    <p className='text-[22px] font-medium self-center'>
                                                        Summary
                                                    </p>
                                                </div>
                                                <div className='px-[24px] xl:px-[72px]'>
                                                    <div className='w-full flex flex-col gap-[24px]'>

                                                        <div className='w-full flex flex-col gap-[4px]'>
                                                            <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>UserOp Hash</p>
                                                            <div className="md:flex  items-center gap-[8px]  ">
                                                                <div className="flex items-center flex-1 gap-2 break-words font-medium">
                                                                    <img src={NETWORK_ICON_MAP[network as string]} alt="" className="h-[20px]" />
                                                                    {!isLoading ? (
                                                                        <>
                                                                            <span className="text-[16px] leading-[24px] break-all text-[#195BDF]  max-xl:hidden">{userOpsData?.[showUserOpId]?.userOpHash}</span>
                                                                            <span className="text-[16px] leading-[24px] break-all text-[#195BDF]  xl:hidden">{formatAddress(userOpsData?.[showUserOpId]?.userOpHash)}</span>
                                                                            <CopyButton text={userOpsData?.[showUserOpId]?.userOpHash || ""} />
                                                                            <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                                                <Link href={`${NETWORK_SCANNER_MAP[selectedNetwork]}/tx/${userOpsData?.[showUserOpId]?.transactionHash}`} aria-current="page" className="text-blue-200" target="_blank">
                                                                                    <img src={getExplorerLogo(selectedNetwork)} style={{ height: '16px', width: '16px' }} alt="" />
                                                                                </Link>
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        <Skeleton width={200} height={24} />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='w-full flex flex-col gap-[4px]'>
                                                            <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Transaction Hash</p>
                                                            <div className="md:flex  items-center gap-[8px]  ">
                                                                <div className="flex items-center flex-1 gap-2 break-words font-medium">
                                                                    <img src={NETWORK_ICON_MAP[network as string]} alt="" className="h-[20px]" />
                                                                    {!isLoading ? (
                                                                        <>
                                                                            <span className="text-[16px] leading-[24px] break-all text-[#195BDF]  max-xl:hidden">{userOpsData?.[showUserOpId]?.transactionHash}</span>
                                                                            <span className="text-[16px] leading-[24px] break-all text-[#195BDF]  xl:hidden">{formatAddress(userOpsData?.[showUserOpId]?.transactionHash || "")}</span>
                                                                            <CopyButton text={userOpsData?.[showUserOpId]?.transactionHash || ""} />
                                                                            <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                                                <Link href={`${NETWORK_SCANNER_MAP[selectedNetwork]}/tx/${userOpsData?.[showUserOpId]?.transactionHash}`} aria-current="page" className="text-blue-200" target="_blank">
                                                                                    <img src={getExplorerLogo(selectedNetwork)} style={{ height: '16px', width: '16px' }} alt="" />
                                                                                </Link>
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        <Skeleton width={200} height={24} />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='w-full flex xl:flex-row flex-col max-xl:gap-[24px] gap-[8px]'>
                                                            <div className='w-full xl:w-[50%] flex flex-col gap-[4px]'>
                                                                <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Status</p>
                                                                <div className='w-[92px]'>
                                                                    {!isLoading ? (
                                                                        // @ts-ignore
                                                                        <Status type={userOpsData?.[showUserOpId]?.success} />
                                                                    ) : (
                                                                        <Skeleton width={92} height={24} />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className='w-full xl:w-[50%] flex flex-col gap-[1px]'>
                                                                <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Timestamp</p>
                                                                <div className='flex flex-row gap-[8px] font-medium'>
                                                                    <img src="/images/clock2.svg" alt="timestamp" className='w-[24px]' />
                                                                    {!isLoading ? (
                                                                        <p className='text-[#1F1F1F] font-medium leading-[24px] text-[16px]'>
                                                                          {userOpsData?.[showUserOpId]?.blockTime
    ? `${formatDistanceToNow(new Date((userOpsData[showUserOpId].blockTime ?? 0) * 1000), { addSuffix: true })} (${format(new Date((userOpsData[showUserOpId].blockTime ?? 0) * 1000), 'dd MMM yyyy, HH:mm:ss')})`
    : " "}
                                                                        </p>
                                                                    ) : (
                                                                        <Skeleton width={150} height={24} />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='w-full flex gap-[8px] xl:flex-row flex-col max-xl:gap-[24px]'>
                                                            <div className='w-full xl:w-[50%] flex flex-col gap-[4px]'>
                                                                <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Sender</p>
                                                                <div className='flex flex-row gap-[8px] font-medium'>
                                                                    <img src="/images/from.svg" alt="timestamp" className='w-[24px]' />
                                                                    {!isLoading ? (
                                                                        <>
                                                                            <p className='text-[#195BDF]'>{formatAddress(userOpsData?.[showUserOpId]?.sender)}</p>
                                                                            <CopyButton text={userOpsData?.[showUserOpId]?.sender || ""} />
                                                                            <Link href={`https://etherscan.io/address/${userOpsData?.[showUserOpId]?.sender}`} target="_blank">
                                                                                <img src="/images/link.svg" alt="link" className='w-[24px]' />
                                                                            </Link>
                                                                        </>
                                                                    ) : (
                                                                        <Skeleton width={200} height={24} />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className='w-full xl:w-[50%] flex flex-col gap-[1px]'>
                                                                <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>{`Targets`}</p>
                                                                <div>
                                                                    {!isLoading ? (
                                                                        // @ts-ignore 
                                                                        userOpsData?.[showUserOpId]?.target && userOpsData[showUserOpId].target.length > 0 ? (
                                                                            // @ts-ignore 
                                                                            userOpsData[showUserOpId].target.map((target, index) => (
                                                                                <div key={index} className='flex flex-row gap-[8px] font-medium'>
                                                                                    <img src="/images/to.svg" alt="target" className='w-[24px]' />
                                                                                    <p className='text-[#195BDF]'>{formatAddress(target)}</p>
                                                                                    <CopyButton text={target || ""} />
                                                                                    <Link href={`https://etherscan.io/address/${target}`} target="_blank">
                                                                                        <img src="/images/link.svg" alt="link" className='w-[24px]' />
                                                                                    </Link>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                            <div className='flex flex-row gap-[8px] font-medium'>
                                                                                <p className='text-[#195BDF]'>None</p>
                                                                            </div>
                                                                        )
                                                                    ) : (
                                                                        <Skeleton width={200} height={24} />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='w-full flex gap-[8px] xl:flex-row flex-col max-xl:gap-[24px]'>
                                                            <div className='w-full xl:w-[50%] flex flex-col gap-[4px]'>
                                                                <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Beneficiary</p>
                                                                <div className='flex flex-row gap-[8px] font-medium'>
                                                                    <img src="/images/beneficiary.svg" alt="timestamp" className='w-[24px]' />
                                                                    {!isLoading ? (
                                                                        <>
                                                                            <p className='text-[#195BDF]'>{formatAddress(userOpsData?.[showUserOpId]?.beneficiary || "")}</p>
                                                                            <CopyButton text={userOpsData?.[showUserOpId]?.beneficiary || ""} />
                                                                            <Link href={`https://etherscan.io/address/${userOpsData?.[showUserOpId]?.beneficiary}`} target="_blank">
                                                                                <img src="/images/link.svg" alt="link" className='w-[24px]' />
                                                                            </Link>
                                                                        </>
                                                                    ) : (
                                                                        <Skeleton width={200} height={24} />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className='w-full xl:w-[50%] flex flex-col gap-[1px]'>
                                                                <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Paymaster</p>
                                                                <div className='flex flex-row gap-[8px] font-medium'>
                                                                    <img src="/images/paymaster.svg" alt="paymaster" className='w-[24px]' />
                                                                    {!isLoading ? (
                                                                        <>
                                                                            <p className='text-[#195BDF]'>{formatAddress(userOpsData?.[showUserOpId]?.paymaster)}</p>
                                                                            <CopyButton text={userOpsData?.[showUserOpId]?.paymaster || ""} />
                                                                            <Link href={`https://etherscan.io/address/${userOpsData?.[showUserOpId]?.paymaster}`} target="_blank">
                                                                                <img src="/images/link.svg" alt="link" className='w-[24px]' />
                                                                            </Link>
                                                                        </>
                                                                    ) : (
                                                                        <Skeleton width={200} height={24} />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='w-full flex flex-col gap-[4px]'>
                                                            <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Block Number</p>
                                                            <div className='flex flex-row gap-[8px] font-medium'>
                                                                <img src="/images/blocknum.svg" alt="timestamp" className='w-[24px]' />
                                                                {!isLoading ? (
                                                                    <>
                                                                        <p className='text-[#1F1F1F]'>{userOpsData?.[showUserOpId]?.blockNumber}</p>
                                                                        {/* @ts-ignore  */}
                                                                        <CopyButton text={userOpsData?.[showUserOpId]?.blockNumber.toString() || " "} />
                                                                    </>
                                                                ) : (
                                                                    <Skeleton width={100} height={24} />
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className='w-full flex flex-col gap-[4px]'>
                                                            <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Value</p>
                                                            <div className='flex flex-row gap-[8px] font-medium'>
                                                                <img src="/images/dollar.svg" alt="value" className='w-[24px]' />
                                                                {!isLoading ? (
                                                                    // @ts-ignore 
                                                                    <p className='text-[#1F1F1F]'>{userOpsData?.[showUserOpId]?.value || "0"}{` WEI`}</p>
                                                                ) : (
                                                                    <Skeleton width={100} height={24} />
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className='w-full flex flex-col gap-[4px]'>
                                                            <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Transaction Fee</p>
                                                            <div className='flex flex-row gap-[8px] font-medium'>
                                                                <img src="/images/dollar.svg" alt="dollar" className='w-[24px]' />
                                                                {!isLoading ? (
                                                                    <p className='text-[#1F1F1F]'>{ethers.utils.formatEther((userOpsData?.[showUserOpId]?.actualGasCost?.toString() || "0"))} ETH</p>
                                                                ) : (
                                                                    <Skeleton width={100} height={24} />
                                                                )}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={1} >
                                        <DeveloperDetails
                                            tableLoading={tableLoading}
                                            skeletonCards1={skeletonCards1}
                                            item={userOpsData?.[showUserOpId]}
                                            selectedColor={selectedColor}
                                            BUTTON_LIST={BUTTON_LIST}
                                            setSelectedColor={setSelectedColor}
                                            selectedNetwork={selectedNetwork}
                                            metaData={metaData}
                                        />
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={2} >
                                        {/* @ts-ignore  */}
                                        <UserOpLogs logs={logs} network={network} />
                                    </CustomTabPanel>
                                </div>
                            </Box>
                        </>
                    ) : (
                        showUserOpId === -1 && (
                            <div className="container mb-16">
                                <Table
                                    columns={columns}
                                    rows={duplicateUserOpsRows}
                                    loading={tableLoading}
                                    caption={{
                                        children: 'Duplicate User Operations',
                                        icon: '/images/cube.svg',
                                        text: 'Approx Number of Operations Processed in the selected chain',
                                    }}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default RecentUserOps;
