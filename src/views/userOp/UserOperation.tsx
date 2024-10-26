/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import Status from '@/components/common/status/Status';
import { formatDistanceToNow, format } from 'date-fns';
import { Tooltip } from '@mui/material';
import {
    getPoweredBy,
    getUserOp,
    getUserOpMetadata,
    metadata,
    PoweredBy,
    Trace,
    UserOp,
    showToast,
    LogEntry,
    fetchData,
} from '@/components/common/apiCalls/jiffyApis';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import UserOpLogs from './UserOpLogs';
import CopyButton from '@/components/common/copy_button/CopyButton';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getExplorerLogo, getFee, getTimePassed, shortenString } from '@/components/common/utils';
import { NETWORKS_WHITELISTED_FOR_NO_LOGIN, NETWORK_ICON_MAP } from '@/components/common/constants';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton-2';
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
import { BsClockHistory } from 'react-icons/bs';
import Tracer from './Tracer';
import { FaArrowUpFromBracket } from 'react-icons/fa6';
import { SlHome } from 'react-icons/sl';
import { MdArrowDropDown, MdContentCopy } from 'react-icons/md';
import { HiHashtag } from 'react-icons/hi';
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
            className="xl:pl-[0px] xl:pr-[0px]"
        >
            {value === index && (
                <Box className="py-3 md:p-8">
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
    const [isLoading, setIsLoading] = useState(true);
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
    const [showAllTargets, setShowAllTargets] = useState(false);
    const [value, setValue] = React.useState(0);
    useEffect(() => {
        if (section) setActiveTab(section);
    }, [section]);

    const [copyTooltip, setCopyTooltip] = useState('Copy'); // Tooltip state for copy action

    const handleCopy = () => {
        navigator.clipboard.writeText(hash); // Copy the hash to clipboard
        setCopyTooltip('Copied!'); // Change tooltip to indicate success
        setTimeout(() => setCopyTooltip('Copy'), 1500); // Reset tooltip after 1.5s
    };
    const handleTabChange = (tabName: string) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, section: tabName },
        });
    };

    // const renderContent = () => {
    //     return (
    //         <div>
    //             <div className={`${activeTab === 'overview' ? 'block' : 'hidden'}`}>
    //                 <TransactionDetails
    //                     tableLoading={tableLoading}
    //                     skeletonCards={skeletonCards}
    //                     item={userOpsData?.[showUserOpId]}
    //                     responseData={responseData}
    //                     addressMapping={addressMapping}
    //                     metaData={metaData}
    //                     setMetadata={setMetaData}
    //                     selectedNetwork={selectedNetwork}
    //                 />
    //             </div>

    //             <div className={`${activeTab === 'dev_details' ? 'block' : 'hidden'}`}>
    //                 <DeveloperDetails
    //                     tableLoading={tableLoading}
    //                     skeletonCards1={skeletonCards1}
    //                     item={userOpsData?.[showUserOpId]}
    //                     selectedColor={selectedColor}
    //                     BUTTON_LIST={BUTTON_LIST}
    //                     setSelectedColor={setSelectedColor}
    //                     selectedNetwork={selectedNetwork}
    //                     metaData={metaData}
    //                 />
    //             </div>

    //             <div className={`${activeTab === 'logs' ? 'block' : 'hidden'}`}>{/* <UserOpLogs logs={logs} /> */}</div>

    //             {network === 'base' && activeTab === 'tracer' && (
    //                 <>
    //                     {/* Show the Tracer component only on medium (md) screens and larger */}
    //                     <div className={`${activeTab === 'tracer' ? 'block' : 'hidden'} hidden md:block`}>
    //                         <Tracer item={userOpsData?.[showUserOpId]} network={''} />
    //                     </div>

    //                     {/* Show the title on screens smaller than md, but only for the 'tracer' tab */}

    //                     <div className="block md:hidden text-center p-8 text-xl text-gray-500 font-medium">
    //                         Best Viewed on Larger Screens
    //                     </div>
    //                 </>
    //             )}
    //         </div>
    //     );
    // };
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
                console.log('logs fetch', data.logs);
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
                setIsLoading(false);
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

    const handleToggle = (index: React.SetStateAction<number>) => {
        setValue(index); // Update the active tab index
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const formatAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-6)}`;
    };
    console.log('targets', userOpsData);
    const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);  // Now rendering only happens on the client
  }, []);

  if (!isMounted) return null; // Skip rendering on server
    return (
        <div className="dark:bg-[#191A23]">
            <Navbar searchbar />
            <section className="px-3 container mx-auto my-6 py-6 bg-white dark:bg-[#1F202B] shadow-lg rounded-xl border border-[#D7DAE0] dark:border-[#3B3C40]">
                <div className="container">
                    <div className="flex flex-row sm:px-8 items-center">
                        {/* <Link href="/" className="text-gray-500">
                            <ArrowBackIcon
                                style={{
                                    height: '15px',
                                    width: '15px',
                                    marginRight: '20px',
                                    marginLeft: '10px',
                                    marginBottom: '3px',
                                }}
                            />
                        </Link> */}

                        <Breadcrumbs aria-label="breadcrumb" className="font-gsans text-[#646D8F] text-md sm:text-base">
                            <Link underline="hover" color="inherit" href={'/' + (selectedNetwork ? '?network=' + selectedNetwork : '')}>
                                <SlHome />
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
                                className="text-[#195BDF]"
                            >
                                {shortenString(hash as string)}
                                <Tooltip title={copyTooltip}>
                                    <IconButton onClick={handleCopy} size="small" style={{ marginLeft: '8px' }}>
                                        <MdContentCopy className="w-4 h-4 dark:fill-[#ADB0BC]" />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Breadcrumbs>
                        {/* @ts-ignore */}
                        <Status type={userOpsData?.[showUserOpId]?.success} status={userOpsData?.[showUserOpId]?.status} />
                    </div>
                </div>

                <div>
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
                                        <button
                                            onClick={() => handleTabChange('tracer')}
                                            className={`py-2 px-4 rounded-[6px] ${
                                                activeTab === 'tracer' ? 'bg-gray-800  text-white' : 'bg-gray-200'
                                            }`}
                                        >
                                            Tracer
                                        </button>
                                    </div>
                                    <div className="mb-[2rem]">{renderContent()}</div>
                                </div>
                            </div> */}

                                <Box sx={{ width: '100%', paddingBottom: '80px' }}>
                                    <div className="relative mt-4 md:px-10 py-4 border-b border-[#D7DAE0] dark:border-[#3B3C40] font-gsans">
                                        <ul className="flex items-center px-1.5 py-1.5 list-none rounded-md bg-[#F0F1F5] dark:bg-[#191A23] border dark:border-[#3B3C40] border-[#D7DAE0] overflow-x-auto md:overflow-visible scrollbar-hide">
                                            <li className="flex-none w-1/2 text-center md:flex-auto">
                                                <button
                                                    onClick={() => handleToggle(0)} // Show UserOp Overview
                                                    className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-md ${
                                                        value === 0 ? 'bg-white border-2 dark:bg-[#1F202B]' : 'bg-inherit'
                                                    }`}
                                                >
                                                    UserOp Overview
                                                </button>
                                            </li>
                                            <li className="flex-none w-1/2 text-center md:flex-auto">
                                                <button
                                                    onClick={() => handleToggle(1)} // Show Developer Details
                                                    className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-md ${
                                                        value === 1 ? 'bg-white border-2 dark:bg-[#1F202B]' : 'bg-inherit'
                                                    }`}
                                                >
                                                    Call Data
                                                </button>
                                            </li>
                                            <li className="flex-none w-1/2 text-center md:flex-auto">
                                                <button
                                                    onClick={() => handleToggle(2)} // Show UserOp Logs
                                                    className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-md ${
                                                        value === 2 ? 'bg-white border-2 dark:bg-[#1F202B]' : 'bg-inherit'
                                                    }`}
                                                >
                                                    UserOp Logs
                                                </button>
                                            </li>
                                            {(network === 'base' || network === 'odyssey' || network === 'open-campus-test') && (
                                                <li className="flex-none w-1/2 text-center md:flex-auto">
                                                    <button
                                                        onClick={() => handleToggle(3)} // Show Tracer
                                                        className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-md ${
                                                            value === 3 ? 'bg-white border-2 dark:bg-[#1F202B]' : 'bg-inherit'
                                                        }`}
                                                    >
                                                        Tracer
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="container xl:px-[5rem] min-[1450px]:px-[0rem]">
                                        <CustomTabPanel value={value} index={0}>
                                            <div className=" flex flex-col gap-[40px]">
                                                <div>
                                                    <div className="container px-0 font-gsans space-y-6 dark:bg-[#1F202B]">
                                                        {/* UserOp Hash */}
                                                        <div className="flex md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                                    USEROP HASH
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex items-start md:items-center gap-[10px]">
                                                                        {' '}
                                                                        {/* Change to items-start */}
                                                                        {network && (
                                                                            <img
                                                                                src={NETWORK_ICON_MAP[network as string]}
                                                                                alt={`${network} icon`}
                                                                                className="w-5 h-5"
                                                                            />
                                                                        )}
                                                                        {!isLoading ? (
                                                                            <>
                                                                                <span className="text-base text-[#195BDF] dark:text-[#598AEB] break-all leading-5">
                                                                                    {formatAddress(userOpsData?.[showUserOpId]?.userOpHash)}
                                                                                </span>
                                                                                <CopyButton
                                                                                    text={userOpsData?.[showUserOpId]?.userOpHash || ''}
                                                                                />
                                                                                <Link
                                                                                    href={`${NETWORK_SCANNER_MAP[selectedNetwork]}/tx/${userOpsData?.[showUserOpId]?.transactionHash}`}
                                                                                    target="_blank"
                                                                                >
                                                                                    <img
                                                                                        src={getExplorerLogo(selectedNetwork)}
                                                                                        alt="Explorer"
                                                                                        className="w-4 h-4"
                                                                                    />
                                                                                </Link>
                                                                            </>
                                                                        ) : (
                                                                            <SkeletonTheme
                                                                                color="#1D1E1F" // Dark mode background color
                                                                                highlightColor="#444" // Dark mode highlight color
                                                                            >
                                                                                <Skeleton width={200} height={24} />
                                                                            </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Transaction Hash */}
                                                        <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                                    TRANSACTION HASH
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex items-center gap-[10px]">
                                                                        {network && (
                                                                            <img
                                                                                src={NETWORK_ICON_MAP[network as string]}
                                                                                alt={`${network} icon`}
                                                                                className="w-5 h-5"
                                                                            />
                                                                        )}
                                                                        {!isLoading ? (
                                                                            <>
                                                                                <span className="text-base text-[#195BDF] dark:text-[#598AEB] break-all leading-5">
                                                                                    {formatAddress(
                                                                                        userOpsData?.[showUserOpId]?.transactionHash || '',
                                                                                    )}
                                                                                </span>
                                                                                <CopyButton
                                                                                    text={
                                                                                        userOpsData?.[showUserOpId]?.transactionHash || ''
                                                                                    }
                                                                                />
                                                                                <Link
                                                                                    href={`${NETWORK_SCANNER_MAP[selectedNetwork]}/tx/${userOpsData?.[showUserOpId]?.transactionHash}`}
                                                                                    target="_blank"
                                                                                >
                                                                                    <img
                                                                                        src={getExplorerLogo(selectedNetwork)}
                                                                                        alt="Explorer"
                                                                                        className="w-4 h-4"
                                                                                    />
                                                                                </Link>
                                                                            </>
                                                                        ) : (
                                                                            <SkeletonTheme
                                                                                color="#1D1E1F" // Dark mode background color
                                                                                highlightColor="#444" // Dark mode highlight color
                                                                            >
                                                                                <Skeleton width={200} height={24} />
                                                                            </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Timestamp */}
                                                        <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                                    TIMESTAMP
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex items-center gap-[10px]">
                                                                        <BsClockHistory className="w-5 h-5 dark:fill-white" />
                                                                        {!isLoading ? (
                                                                            <p className="text-[#1F1F1F] dark:text-[#ADB0BC] font-medium leading-[24px] text-[16px]">
                                                                                {userOpsData?.[showUserOpId]?.blockTime
                                                                                    ? `${formatDistanceToNow(
                                                                                          new Date(
                                                                                              (userOpsData[showUserOpId].blockTime ?? 0) *
                                                                                                  1000,
                                                                                          ),
                                                                                          { addSuffix: true },
                                                                                      )} 
                                (${format(new Date((userOpsData[showUserOpId].blockTime ?? 0) * 1000), 'dd MMM yyyy, HH:mm:ss')})`
                                                                                    : ' '}
                                                                            </p>
                                                                        ) : (
                                                                            <SkeletonTheme
                                                                                color="#1D1E1F" // Dark mode background color
                                                                                highlightColor="#444" // Dark mode highlight color
                                                                            >
                                                                                <Skeleton width={200} height={24} />
                                                                            </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Sender */}
                                                        <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                                    FROM
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex items-center gap-[10px]">
                                                                        <img src="/images/from.svg" alt="target" className="w-6 h-6" />
                                                                        {!isLoading ? (
                                                                            <>
                                                                                <span className="text-[#195BDF]">
                                                                                    {formatAddress(userOpsData?.[showUserOpId]?.sender)}
                                                                                </span>
                                                                                <CopyButton
                                                                                    text={userOpsData?.[showUserOpId]?.sender || ''}
                                                                                />
                                                                                <Link
                                                                                    href={`https://etherscan.io/address/${userOpsData?.[showUserOpId]?.sender}`}
                                                                                    target="_blank"
                                                                                >
                                                                                    <img
                                                                                        src="/images/link.svg"
                                                                                        alt="link"
                                                                                        className="w-6 h-6"
                                                                                    />
                                                                                </Link>
                                                                            </>
                                                                        ) : (
                                                                            <SkeletonTheme
                                                                                color="#1D1E1F" // Dark mode background color
                                                                                highlightColor="#444" // Dark mode highlight color
                                                                            >
                                                                                <Skeleton width={200} height={24} />
                                                                            </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                                    TO
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex flex-col gap-[10px]">
                                                                        {!isLoading ? (
                                                                            // @ts-ignore
                                                                            userOpsData?.[showUserOpId]?.target && userOpsData[showUserOpId]?.target?.length > 0 ? (
                                                                                <>
                                                                                    <div className="flex items-center gap-[8px] font-medium">
                                                                                        <img
                                                                                            src="/images/to.svg"
                                                                                            alt="target"
                                                                                            className="w-6 h-6"
                                                                                        />
                                                                                        <span className="text-[#195BDF]">
                                                                                            {/* @ts-ignore */}
                                                                                            {formatAddress(userOpsData[showUserOpId]?.target[0],
                                                                                            )}
                                                                                        </span>
                                                                                        {/* @ts-ignore */}
                                                                                        <CopyButton text={userOpsData[showUserOpId]?.target[0] || ''
                                                                                            }
                                                                                        />
                                                                                        {/* @ts-ignore */}
                                                                                        <Link href={`https://etherscan.io/address/${userOpsData[showUserOpId]?.target[0]}`}
                                                                                            target="_blank"
                                                                                        >
                                                                                            <img
                                                                                                src="/images/link.svg"
                                                                                                alt="link"
                                                                                                className="w-6 h-6"
                                                                                            />
                                                                                        </Link>
                                                                                        {/* @ts-ignore */}
                                                                                        {userOpsData[showUserOpId]?.target?.length > 1 && (
                                                                                            <button
                                                                                                className="text-[#969CB2] text-md flex items-center ml-2 border rounded-full px-3 dark:text-[#ADB0BC] border-[#ccc] dark:border-[#3B3C40]"
                                                                                                onClick={() =>
                                                                                                    setShowAllTargets(!showAllTargets)
                                                                                                }
                                                                                            >
                                                                                                <MdArrowDropDown
                                                                                                    className={`transition-transform duration-300 w-4 h-4 ${
                                                                                                        showAllTargets ? 'rotate-180' : ''
                                                                                                    }`}
                                                                                                />
                                                                                                {/* @ts-ignore */}
                                                                                                {userOpsData[showUserOpId]?.target?.length -
                                                                                                    1}{' '}
                                                                                                more
                                                                                            </button>
                                                                                        )}
                                                                                    </div>

                                                                                    {showAllTargets && (
                                                                                        <div className="flex flex-col gap-[8px] mt-2">
                                                                                            {/* @ts-ignore */}
                                                                                            {userOpsData[showUserOpId]?.target
                                                                                                .slice(1)
                                                                                                .map((target, index) => (
                                                                                                    <div
                                                                                                        key={index}
                                                                                                        className="flex items-center gap-[8px] font-medium"
                                                                                                    >
                                                                                                        <img
                                                                                                            src="/images/to.svg"
                                                                                                            alt="target"
                                                                                                            className="w-6 h-6"
                                                                                                        />
                                                                                                        <span className="text-[#195BDF]">
                                                                                                            {formatAddress(target)}
                                                                                                        </span>
                                                                                                        <CopyButton text={target || ''} />
                                                                                                        <Link
                                                                                                            href={`https://etherscan.io/address/${target}`}
                                                                                                            target="_blank"
                                                                                                        >
                                                                                                            <img
                                                                                                                src="/images/link.svg"
                                                                                                                alt="link"
                                                                                                                className="w-6 h-6"
                                                                                                            />
                                                                                                        </Link>
                                                                                                    </div>
                                                                                                ))}
                                                                                        </div>
                                                                                    )}
                                                                                </>
                                                                            ) : (
                                                                                <p className="text-[#195BDF]">None</p>
                                                                            )
                                                                        ) : (
                                                                            <SkeletonTheme
                                                                                color="#1D1E1F" // Dark mode background color
                                                                                highlightColor="#444" // Dark mode highlight color
                                                                            >
                                                                                <Skeleton width={200} height={24} />
                                                                            </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Transaction Fee */}
                                                        <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-normal leading-5">
                                                                    TRANSACTION FEE
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex items-center gap-[8px]">
                                                                        <img
                                                                            src="/images/dollar.svg"
                                                                            alt="transaction fee"
                                                                            className="w-6 h-6 dark:fill-white"
                                                                        />
                                                                        {!isLoading ? (
                                                                            <p className="text-[#1F1F1F] leading-5 text-base dark:text-[#ADB0BC]">
                                                                                {ethers.utils.formatEther(
                                                                                    userOpsData?.[
                                                                                        showUserOpId
                                                                                    ]?.actualGasCost?.toString() || '0',
                                                                                )}{' '}
                                                                                ETH
                                                                            </p>
                                                                        ) : (
                                                                            <SkeletonTheme
                                                                                color="#1D1E1F" // Dark mode background color
                                                                                highlightColor="#444" // Dark mode highlight color
                                                                            >
                                                                                <Skeleton width={200} height={24} />
                                                                            </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Block Number */}
                                                        <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                                    BLOCK NUMBER
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex items-center gap-[10px]">
                                                                        <HiHashtag className="w-6 h-6 dark:fill-slate-600" />
                                                                        {!isLoading ? (
                                                                            <span className="text-base text-[#195BDF] dark:text-[#598AEB] break-all leading-5">
                                                                                {userOpsData?.[showUserOpId]?.blockNumber}
                                                                            </span>
                                                                        ) : (
                                                                            <SkeletonTheme
                                                                                color="#1D1E1F" // Dark mode background color
                                                                                highlightColor="#444" // Dark mode highlight color
                                                                            >
                                                                                <Skeleton width={200} height={24} />
                                                                            </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="border-b w-full border-[#D7DAE0] dark:border-[#3B3C40]"></div>

                                                        <span className="text-[20px] flex items-center py-4 px-4 gap-2 text-[#20294C] dark:text-[#ADB0BC] font-medium leading-5">
                                                            <img src="/images/gas.svg" alt="gas used" className="w-[24px]" />
                                                            GAS DETAILS
                                                        </span>

                                                        {/* Gas Used */}
                                                        <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-normal leading-5">
                                                                    GAS USED
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex items-center gap-[10px]">
                                                                        {!isLoading ? (
                                                                            <p className="text-[#1F1F1F] dark:text-[#ADB0BC] leading-5 text-base">
                                                                                {userOpsData?.[showUserOpId]?.actualGasUsed || 'N/A'}
                                                                            </p>
                                                                        ) : (
                                                                           <SkeletonTheme
                                                                                color="#1D1E1F" // Dark mode background color
                                                                                highlightColor="#444" // Dark mode highlight color
                                                                            >
                                                                                <Skeleton width={200} height={24} />
                                                                            </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="border-b w-full border-[#D7DAE0] dark:border-[#3B3C40]"></div>
                                                        <span className="text-[20px] flex items-start md:items-center py-4 px-4 gap-2 text-[#20294C] dark:text-[#ADB0BC] font-medium leading-5">
                                                            <img src="/images/gas.svg" alt="gas used" className="w-[24px]" />
                                                            OTHER DETAILS
                                                        </span>
                                                        {/* EntryPoint */}
                                                        <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                                    ENTRYPOINT
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex items-center gap-[10px]">
                                                                        {network && (
                                                                            <img
                                                                                src={NETWORK_ICON_MAP[network as string]}
                                                                                alt={`${network} icon`}
                                                                                className="w-5 h-5"
                                                                            />
                                                                        )}
                                                                        {!isLoading ? (
                                                                            <>
                                                                                <span className="text-base text-[#195BDF] dark:text-[#598AEB] break-all leading-5">
                                                                                    {formatAddress(userOpsData?.[showUserOpId]?.entryPoint)}
                                                                                </span>
                                                                                <CopyButton
                                                                                    text={userOpsData?.[showUserOpId]?.entryPoint || ''}
                                                                                />
                                                                                <Link
                                                                                    href={`https://etherscan.io/address/${userOpsData?.[showUserOpId]?.entryPoint}`}
                                                                                    target="_blank"
                                                                                >
                                                                                    <img
                                                                                        src="/images/link.svg" // Make sure this path is correct
                                                                                        alt="Explorer"
                                                                                        className="w-6 h-6"
                                                                                    />
                                                                                </Link>
                                                                            </>
                                                                        ) : (
                                                                            <SkeletonTheme
                                                                            color="#1D1E1F" // Dark mode background color
                                                                            highlightColor="#444" // Dark mode highlight color
                                                                        >
                                                                            <Skeleton width={200} height={24} />
                                                                        </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Beneficiary */}
                                                        <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                                    BENEFICIARY
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex items-center gap-[10px]">
                                                                        {!isLoading ? (
                                                                            <>
                                                                                <span className="text-[#195BDF]">
                                                                                    {formatAddress(
                                                                                        userOpsData?.[showUserOpId]?.beneficiary || '',
                                                                                    )}
                                                                                </span>
                                                                                <CopyButton
                                                                                    text={userOpsData?.[showUserOpId]?.beneficiary || ''}
                                                                                />
                                                                                <Link
                                                                                    href={`https://etherscan.io/address/${userOpsData?.[showUserOpId]?.beneficiary}`}
                                                                                    target="_blank"
                                                                                >
                                                                                    <img
                                                                                        src="/images/link.svg"
                                                                                        alt="link"
                                                                                        className="w-6 h-6"
                                                                                    />
                                                                                </Link>
                                                                            </>
                                                                        ) : (
                                                                            <SkeletonTheme
                                                                                color="#1D1E1F" // Dark mode background color
                                                                                highlightColor="#444" // Dark mode highlight color
                                                                            >
                                                                                <Skeleton width={200} height={24} />
                                                                            </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Paymaster */}
                                                        <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                                    PAYMASTER
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex items-center gap-[10px]">
                                                                        {!isLoading ? (
                                                                            <>
                                                                                <span className="text-[#195BDF]">
                                                                                    {formatAddress(userOpsData?.[showUserOpId]?.paymaster)}
                                                                                </span>
                                                                                <CopyButton
                                                                                    text={userOpsData?.[showUserOpId]?.paymaster || ''}
                                                                                />
                                                                                <Link
                                                                                    href={`https://etherscan.io/address/${userOpsData?.[showUserOpId]?.paymaster}`}
                                                                                    target="_blank"
                                                                                >
                                                                                    <img
                                                                                        src="/images/link.svg"
                                                                                        alt="link"
                                                                                        className="w-6 h-6"
                                                                                    />
                                                                                </Link>
                                                                            </>
                                                                        ) : (
                                                                            <SkeletonTheme
                                                                                color="#1D1E1F" // Dark mode background color
                                                                                highlightColor="#444" // Dark mode highlight color
                                                                            >
                                                                                <Skeleton width={200} height={24} />
                                                                            </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Value */}
                                                        <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                            <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                                    VALUE
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 break-words">
                                                                <div className="justify-between block md:flex">
                                                                    <div className="flex items-center gap-[10px]">
                                                                        {!isLoading ? (
                                                                            <span className="text-base text-[#195BDF] dark:text-[#598AEB] break-all leading-5">
                                                                                {/* @ts-ignore */}
                                                                                {userOpsData?.[showUserOpId]?.value || '0 WEI'}
                                                                            </span>
                                                                        ) : (
                                                                            <SkeletonTheme
                                                                            color="#1D1E1F" // Dark mode background color
                                                                            highlightColor="#444" // Dark mode highlight color
                                                                        >
                                                                            <Skeleton width={200} height={24} />
                                                                        </SkeletonTheme>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={1}>
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
                                        <CustomTabPanel value={value} index={2}>
                                            {/* @ts-ignore  */}
                                            <UserOpLogs logs={logs} network={network} />
                                        </CustomTabPanel>
                                        {(network === 'base' || network === 'odyssey' || network === 'open-campus-test') && (
                                            <>
                                                {/* Show the Tracer component only on medium (md) screens and larger */}
                                                <div className={`${activeTab === 'tracer' ? 'block' : 'hidden'} hidden md:block`}>
                                                    <CustomTabPanel value={value} index={3}>
                                                        <Tracer
                                                            item={{
                                                                ...userOpsData?.[showUserOpId],
                                                                transactionHash: userOpsData?.[showUserOpId]?.transactionHash ?? undefined, // Convert null to undefined
                                                            }}
                                                            network={''}
                                                        />
                                                    </CustomTabPanel>
                                                </div>
                                                {/* Show the title on screens smaller than md */}
                                                <div className={`block md:hidden text-center p-8 text-xl text-gray-500 font-medium`}>
                                                    Best Viewed on Larger Screens
                                                </div>
                                            </>
                                        )}
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
            </section>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default RecentUserOps;
