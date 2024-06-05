import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getBundleDetails, UserOp, AccountDetail, Bundle, getBundleDetailsRpc } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link } from '@mui/material';
import { formatDistanceToNow, format } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Status from '@/components/common/status/Status';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import Token from '@/components/common/Token';
import { NETWORKS_WHITELISTED_FOR_NO_LOGIN, NETWORK_ICON_MAP } from '@/components/common/constants';
import Skeleton from 'react-loading-skeleton-2';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Table, { tableDataT } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
import TransactionDetails from './TransactionDetails';
import UserOpsTable from './UserOpTable';
import HeaderSection from './HeaderSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserSession } from '@/context/userSession';
import LoginModal from '@/components/global/LoginModal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NETWORK_LIST, NETWORK_SCANNER_MAP } from '@/components/common/constants';

import { getExplorerLogo } from '@/components/common/utils';
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
            className='xl:pl-[0px] xl:pr-[0px]  min-[1600px]:pl-[0px]  min-[1600px]:pr-[0px]'
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

const DEFAULT_PAGE_SIZE = 10;

const columns = [
    { name: 'UserOp Hash', sort: true },
    { name: 'Age', sort: true },
    { name: 'Sender', sort: false },
    { name: 'Target', sort: false },
    { name: 'Fee', sort: true },
];
const createUserOpsTableRows = (userOps: UserOp[]): tableDataT['rows'] => {
    console.log('🚀 ~ file: recentAddressActivity.tsx:39 ~ createUserOpsTableRows ~ userOps:', userOps);
    let newRows = [] as tableDataT['rows'];
    if (!userOps) return newRows;
    userOps.forEach((userOp) => {
        newRows.push({
            token: {
                text: userOp.userOpHash,
                icon: NETWORK_ICON_MAP[userOp.network],
                type: 'userOp',
            },
            ago: getTimePassed(userOp.blockTime!),
            sender: userOp.sender,
            target: userOp.target!,
            fee: getFee(userOp.actualGasCost, userOp.network as string),
            status: userOp.success!,
        });
    });
    return newRows;
};

interface BundleInfo {
    userOpsLength: number;
    blockNumber: number;
    blockTime: number;
    transactionHash: string;
    from: string;
    network: string;
    status: number;
    transactionFee: number;
}

interface GasDetails {
    gasUsed: string;
    gasLimit: string;
    gasPrice: string;
    baseFee: string;
    maxPriorityFeePerGas: string;
    maxFeePerGas: string;
}

interface LogsDetails {
    numberOfUserOps: number;
    internalTransactions: string;
}
interface UserOpData {
    hash: string;
    age: string;
    sender: string;
    target: string;
    fee: string;
    success: boolean;
    actualGasUsed: number;
}
interface TransactionDetails {
    txHash: string;
    timestamp: string;
    from: string;
    to: string;
    blockNumber: number;
    trxFee: string;
    gasDetails: GasDetails;
    callData: string;
    revenue: string;
    profit: string;
    logsDetails: LogsDetails;
    userOps: UserOpData[]
}

interface ApiResponse {
    transactionDetails: TransactionDetails;
    responseTime: number;
}
interface Props {
    hash: string;
    network: string;
}

const createBundleInfoObject = (bundleDetails: Bundle): BundleInfo => {
    return {
        userOpsLength: bundleDetails.userOpsLength,
        blockNumber: bundleDetails.blockNumber,
        blockTime: bundleDetails.blockTime,
        transactionHash: bundleDetails.transactionHash,
        network: bundleDetails.network,
        status: bundleDetails.status,
        transactionFee: bundleDetails.transactionFee,
        from: bundleDetails.from,
    };
};

function BundlerNew(props: any) {
    const router = useRouter();
    const [tableLoading, setTableLoading] = useState(true);
    const hash = props.slug && props.slug[0];
    const network = router.query && (router.query.network as string);
    const [rows, setRows] = useState([] as tableDataT['rows']);
    const [bundleInfo, setBundleInfo] = useState<BundleInfo>();
    const [useOps, setuserOps] = useState<UserOp[]>();
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [captionText, setCaptionText] = useState('N/A User Ops found');
    const { isLoggedIn } = useUserSession();
    const [value, setValue] = React.useState(0);
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [userOps, setUserOps] = useState<UserOpData[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchTransactionDetails = async () => {
            try {
                const data: ApiResponse = await getBundleDetailsRpc(hash, network);
                setTransactionDetails(data.transactionDetails);
                setUserOps(data.transactionDetails.userOps);
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching transaction details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (hash && network) {
            fetchTransactionDetails();
        }
    }, [hash, network]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    // const [block, setBlock] = useState(!isLoggedIn());

    // useEffect(() => {
    //     setBlock(!isLoggedIn());
    // }, [isLoggedIn]);

    // handling table page change. Everytime the pageNo change, or pageSize change this function will fetch new data and update it.
    const updateRowsData = async (network: string, pageNo: number, pageSize: number) => {
        setTableLoading(true);
        if (bundleInfo == undefined) {
            return;
        }
        const addressDetail = await getBundleDetails(bundleInfo.transactionHash, network ? network : '', pageNo, pageSize, toast);
        const rows = createUserOpsTableRows(addressDetail.userOps);
        setRows(rows);
        setTableLoading(false);
    };

    // update the page No after changing the pageSize
    const setPageSize = (size: number) => {
        _setPageSize(size);
        setPageNo(0);
    };

    // load the account details.
    const loadBundleDetails = async (name: string, network: string) => {
        setTableLoading(true);

        const bundleDetail = await getBundleDetails(name, network ? network : '', DEFAULT_PAGE_SIZE, pageNo, toast);
        const bundleInfo = createBundleInfoObject(bundleDetail);
        setBundleInfo(bundleInfo);
    };

    useEffect(() => {
        updateRowsData(network ? network : '', pageSize, pageNo);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('pageNo', pageNo.toString());
        urlParams.set('pageSize', pageSize.toString());
        window.history.pushState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
    }, [pageNo, bundleInfo]);

    useEffect(() => {
        const captionText = `${bundleInfo?.userOpsLength} User Ops found`;
        setCaptionText(captionText);
    }, [bundleInfo]);

    let prevHash = hash;
    let prevNetwork = network;
    useEffect(() => {
        // Check if hash or network have changed
        if (prevHash !== undefined || prevNetwork !== undefined) {
            prevHash = hash;
            prevNetwork = network;
            loadBundleDetails(hash as string, network as string);
        }
    }, [hash, network]);

    let skeletonCards = Array(5).fill(0);
    const formatAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-6)}`;
    };

    const calculateGasUsagePercentage = (gasUsed: string, gasLimit: string): string => {
        if (!gasUsed || !gasLimit) return '';
        const gasUsedNum = parseFloat(gasUsed);
        const gasLimitNum = parseFloat(gasLimit);
        if (isNaN(gasUsedNum) || isNaN(gasLimitNum)) return '';
        const percentage = (gasUsedNum / gasLimitNum) * 100;
        return `(${percentage.toFixed(2)}%)`;
    };
    const [activeTab, setActiveTab] = useState<number>(3);

    const handleTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };
    return (
        <div className="">
            <Navbar searchbar />
            <section className="px-3 py-10 ">
                <div className="container px-0">
                    <div className="flex flex-row">
                        <Link href="/" className="text-gray-500">
                            <ArrowBackIcon
                                style={{ height: '15px', width: '15px', marginRight: '20px', marginLeft: '10px', marginBottom: '3px' }}
                            />
                        </Link>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href={`/?network=${network ? network : ''}`}>
                                Home
                            </Link>
                            <Link underline="hover" color="inherit" href={`/block/${hash}?network=${network ? network : ''}`}>
                                Block
                            </Link>
                            <Link
                                underline="hover"
                                color="text.primary"
                                href={`/address/${hash}?network=${network ? network : ''}`}
                                aria-current="page"
                            >
                                {shortenString(hash as string)}
                            </Link>
                        </Breadcrumbs>
                    </div>
                    {/* <h1 className="text-3xl font-bold">Bundle</h1> */}
                </div>
            </section>
            {/* {!(isLoggedIn() || (network && NETWORKS_WHITELISTED_FOR_NO_LOGIN.includes(network))) && <LoginModal showClose={false} block={block} setBlock={setBlock}></LoginModal>} */}
            {/* <HeaderSection block={!(isLoggedIn() || (network && NETWORKS_WHITELISTED_FOR_NO_LOGIN.includes(network)))} item={bundleInfo} network={network} /> */}
            {/* <TransactionDetails block={!(isLoggedIn() || (network && NETWORKS_WHITELISTED_FOR_NO_LOGIN.includes(network)))} item={bundleInfo} network={network} tableLoading={tableLoading}/>
            <div className={`${!(isLoggedIn() || (network && NETWORKS_WHITELISTED_FOR_NO_LOGIN.includes(network))) && 'blur'} container px-0`}> */}
            {/* <HeaderSection item={bundleInfo} network={network} /> */}
            {/* <TransactionDetails item={bundleInfo} network={network} tableLoading={tableLoading} /> */}
            {/* <div className="container px-0">
                <Table
                    rows={rows}
                    columns={columns}
                    loading={tableLoading}
                    caption={{
                        children: captionText,
                        icon: '/images/cube.svg',
                        text: 'Approx Number of Operations Processed in the selected chain',
                    }}
                />
                <Pagination
                    pageDetails={{
                        pageNo,
                        setPageNo,
                        pageSize,
                        setPageSize,
                        totalRows: bundleInfo?.userOpsLength != null ? bundleInfo.userOpsLength : 0,
                    }}
                />
            </div> */}
            <div className='w-full flex flex-col'>
                <Box sx={{}}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className=' container xl:px-[5rem] min-[1450px]:px-[0rem]' >
                            <Tab label="Bundle Overview" {...a11yProps(0)} />
                            <Tab label="CallData" {...a11yProps(1)} />
                            {/* <Tab label="logs" {...a11yProps(2)} /> */}
                            <Tab label="UserOps" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <div className='container xl:px-[5rem] min-[1450px]:px-[0rem]'>
                        <CustomTabPanel value={value} index={0}  >
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
                                                <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Transaction Hash</p>
                                                <div className="md:flex  items-center gap-[8px]  ">
                                                    {/* <div className="flex items-center gap-2">
                                                <img src={NETWORK_ICON_MAP[network as string]} alt="" className="h-[20px]" />

                                            </div> */}
                                                    {!isLoading ?
                                                        <div className="flex items-center flex-1 gap-2 break-words font-medium">
                                                            <img src={NETWORK_ICON_MAP[network as string]} alt="" className="h-[20px]" />
                                                            <span className="text-[16px] leading-[24px] break-all text-[#195BDF]  max-xl:hidden">{hash}</span>
                                                            <span className="text-[16px] leading-[24px] break-all text-[#195BDF]  xl:hidden">{formatAddress(hash)}</span>
                                                            <CopyButton text={bundleInfo?.transactionHash || ""} />
                                                            <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                                <Link
                                                                    // underline="hover"
                                                                    // color="text.primary"
                                                                    href={`${NETWORK_SCANNER_MAP[network]}/tx/${bundleInfo?.transactionHash}`}
                                                                    aria-current="page"
                                                                    className="text-blue-200"
                                                                    target="_blank"
                                                                >
                                                                    <img src={getExplorerLogo(network)} style={{ height: '16px', width: '16px' }} alt="" />
                                                                </Link>
                                                            </button>
                                                        </div>
                                                        :
                                                        <Skeleton />

                                                    }

                                                </div>
                                            </div>
                                            {/* <div className='w-full flex-row flex gap-[8px]'>
                                        <div className='w-full xl:w-[50%] flex flex-col gap-[4px]'>

                                        </div>
                                        <div className='w-full xl:w-[50%] flex flex-col gap-[4px]'>

                                        </div>

                                    </div> */}
                                            <div className='w-full flex xl:flex-row flex-col max-xl:gap-[24px] gap-[8px]'>
                                                <div className='w-full xl:w-[50%] flex flex-col gap-[4px]'>
                                                    <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Status</p>
                                                    <div className='w-[92px]'>
                                                        {!isLoading ? <Status type={true} /> : <Skeleton width={92} height={24} />}
                                                    </div>
                                                </div>
                                                <div className='w-full xl:w-[50%] flex flex-col gap-[1px]'>
                                                    <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Timestamp</p>
                                                    <div className='flex flex-row gap-[8px] font-medium'>
                                                        <img src="/images/clock2.svg" alt="timestamp" className='w-[24px]' />
                                                        {!isLoading ? (
                                                            <p className='text-[#1F1F1F] font-medium leading-[24px] text-[16px]'>
                                                                {`${formatDistanceToNow(new Date(transactionDetails?.timestamp || 0), { addSuffix: true })} (${format(transactionDetails?.timestamp ?? 0, 'dd MMM yyyy, HH:mm:ss') || "-"})`}
                                                            </p>
                                                        ) : (
                                                            <Skeleton width={150} height={24} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full flex gap-[8px] xl:flex-row flex-col max-xl:gap-[24px]'>
                                                <div className='w-full xl:w-[50%] flex flex-col gap-[4px]'>
                                                    <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>From</p>
                                                    <div className='flex flex-row gap-[8px] font-medium'>
                                                        <img src="/images/from.svg" alt="from" className='w-[24px]' />
                                                        {!isLoading ? (
                                                            <>
                                                                <p className='text-[#195BDF]'>{formatAddress(transactionDetails?.from || "")}</p>
                                                                <CopyButton text={transactionDetails?.from || ""} />
                                                                <Link href={`https://jiffyscan.xyz/account/${transactionDetails?.from}?network=${network}`} target="_blank">
                                                                    <img src="/images/link.svg" alt="link" className='w-[24px]' />
                                                                </Link>
                                                            </>
                                                        ) : (
                                                            <Skeleton width={200} height={24} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='w-full xl:w-[50%] flex flex-col gap-[1px]'>
                                                    <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>To</p>
                                                    <div className='flex flex-row gap-[8px] font-medium'>
                                                        <img src="/images/to.svg" alt="to" className='w-[24px]' />
                                                        {!isLoading ? (
                                                            <>
                                                                <p className='text-[#195BDF]'>{formatAddress(transactionDetails?.to || "")}</p>
                                                                <CopyButton text={transactionDetails?.to || ""} />
                                                                <Link href={`https://jiffyscan.xyz/account/${transactionDetails?.to}?network=${network}`} target="_blank">
                                                                    <img src="/images/link.svg" alt="link" className='w-[24px]' />
                                                                </Link>
                                                            </>
                                                        ) : (
                                                            <Skeleton width={200} height={24} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full xl:flex-row flex-col max-xl:gap-[24px] flex gap-[8px]'>
                                                <div className='w-full xl:w-[50%] flex flex-col gap-[4px]'>
                                                    <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Block Number</p>
                                                    <div className='flex flex-row gap-[8px] font-medium'>
                                                        <img src="/images/blocknum.svg" alt="block number" className='w-[24px]' />
                                                        {!isLoading ? (
                                                            <>
                                                                <p className='text-[#1F1F1F]'>{transactionDetails?.blockNumber}</p>
                                                                <CopyButton text={transactionDetails?.blockNumber.toString() || ""} />
                                                            </>
                                                        ) : (
                                                            <Skeleton width={100} height={24} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='w-full xl:w-[50%] flex flex-col gap-[1px]'>
                                                    <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Number of UserOps</p>
                                                    <div className='flex flex-row gap-[8px] font-medium'>
                                                        <img src="/images/count.svg" alt="number of userOps" className='w-[24px]' />
                                                        {!isLoading ? (
                                                            <p className='text-[#1F1F1F]'>{transactionDetails?.logsDetails.numberOfUserOps}</p>
                                                        ) : (
                                                            <Skeleton width={50} height={24} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full flex flex-col gap-[4px]'>
                                                <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Transaction Fee</p>
                                                <div className='flex flex-row gap-[8px] font-medium'>
                                                    <img src="/images/dollar.svg" alt="transaction fee" className='w-[24px]' />
                                                    {!isLoading ? (
                                                        <p className='text-[#1F1F1F]'>{transactionDetails?.trxFee} ETH</p>
                                                    ) : (
                                                        <Skeleton width={100} height={24} />
                                                    )}
                                                </div>
                                            </div>

                                            <div className='w-full xl:flex-row flex-col max-xl:gap-[24px] flex gap-[8px]'>
                                                <div className='w-full xl:w-[50%] flex flex-col gap-[4px]'>
                                                    <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Revenue Earned</p>
                                                    <div className='flex flex-row gap-[8px] font-medium'>
                                                        {!isLoading ? (
                                                            <p className='text-[#1F1F1F]'>{transactionDetails?.revenue} ETH</p>
                                                        ) : (
                                                            <Skeleton width={100} height={24} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='w-full xl:w-[50%] flex flex-col gap-[1px]'>
                                                    <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Profit Earned</p>
                                                    <div className='flex flex-row gap-[8px] font-medium'>
                                                        {!isLoading ? (
                                                            <div className='text-[#1F1F1F] flex flex-row gap-[2px]'>
                                                                {transactionDetails?.profit} ETH
                                                                <p className='text-[#9E9E9E]'>
                                                                ({transactionDetails?.revenue ?
                                                                    `${(parseFloat(transactionDetails.profit || '0') >= 0 ? '+ ' : '- ')}${Math.abs((parseFloat(transactionDetails.profit || '0') / parseFloat(transactionDetails.revenue || '0')) * 100).toFixed(2)}`
                                                                    : '0.00'}%)
                                                                    </p>
                                                            </div>
                                                        ) : (
                                                            <Skeleton width={150} height={24} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>

                                <div>
                                    <div className='flex flex-row gap-[16px] px-[20px] xl:px-[32px] py-[20px]'>
                                        <img src="/images/gas.svg" className='w-[24px]' />
                                        <p className='text-[22px] font-medium self-center'>Gas Details</p>
                                    </div>
                                    <div className='px-[24px] xl:px-[72px]'>
                                        <div className='w-full flex flex-col gap-[24px]'>
                                            <div className='w-full xl:flex-row flex-col max-xl:gap-[24px] flex gap-[8px]'>
                                                <div className='w-full xl:w-[50%] flex flex-col gap-[4px]'>
                                                    <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Gas Used</p>
                                                    <div className='flex flex-row gap-[8px]'>
                                                        <div className='flex flex-row gap-[4px]'>
                                                            {isLoading ? (
                                                                <Skeleton width={100} />
                                                            ) : (
                                                                <>
                                                                    <p className=' text-[#1F1F1F]  font-medium'>{transactionDetails?.gasDetails.gasUsed} </p>
                                                                    <p className='text-[#9E9E9E] '>{`${calculateGasUsagePercentage(
                                                                        transactionDetails?.gasDetails.gasUsed || "",
                                                                        transactionDetails?.gasDetails.gasLimit || ""
                                                                    )}`}</p>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-full xl:w-[50%] flex flex-col gap-[1px]'>
                                                    <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Gas Limit</p>
                                                    <div className='flex flex-row gap-[8px] font-medium'>
                                                        {isLoading ? (
                                                            <Skeleton width={100} />
                                                        ) : (
                                                            <p className='text-[#1F1F1F]'>{transactionDetails?.gasDetails.gasLimit}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full flex flex-col gap-[4px]'>
                                                <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Gas Price</p>
                                                <div className='flex flex-row gap-[8px] font-medium'>
                                                    {isLoading ? (
                                                        <Skeleton width={100} />
                                                    ) : (
                                                        <p className='text-[#1F1F1F]'>{transactionDetails?.gasDetails.gasPrice} Gwei</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className='w-full flex flex-col gap-[4px] text-[14px]'>
                                                <p className='text-[16px] text-[#1F1F1F] leading-[24px] tracking-[2%]'>Gas Fees</p>
                                                <div className='flex flex-row w-full gap-[4px]'>
                                                    <div className='flex flex-row text-[#9E9E9E] w-[84px] justify-between'>
                                                        <p>Base </p> :
                                                    </div>
                                                    {isLoading ? (
                                                        <Skeleton width={100} />
                                                    ) : (
                                                        <p className='text-[#1F1F1F] font-medium'>{transactionDetails?.gasDetails.baseFee} Gwei</p>
                                                    )}
                                                </div>

                                                <div className='flex flex-row w-full gap-[4px]'>
                                                    <div className='flex flex-row text-[#9E9E9E] w-[84px] justify-between'>
                                                        <p>Max </p> :
                                                    </div>
                                                    {isLoading ? (
                                                        <Skeleton width={100} />
                                                    ) : (
                                                        <p className='text-[#1F1F1F] font-medium'>{transactionDetails?.gasDetails.maxFeePerGas} Gwei</p>
                                                    )}
                                                </div>

                                                <div className='flex flex-row w-full gap-[4px]'>
                                                    <div className='flex flex-row text-[#9E9E9E] w-[84px] justify-between'>
                                                        <p>Max Priority </p> :
                                                    </div>
                                                    {isLoading ? (
                                                        <Skeleton width={100} />
                                                    ) : (
                                                        <p className='text-[#1F1F1F] font-medium'>{transactionDetails?.gasDetails.maxPriorityFeePerGas} Gwei</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <div className='flex flex-col rounded-8px bg-white border-[#DADCE0] border-sm w-full' >
                                <div className='w-full px-[32px] py-[30px] flex flex-row   justify-between items-center h-[72px]'>
                                    <div className='flex flex-row gap-[8px] h-[32px] items-center'>
                                        <img src="/images/format.svg" alt="format" className='w-[24px]' />
                                        <p className='text-black text-center text-[22px]'>Format</p>
                                    </div>
                                    <div className='h-[32px] max-xl:hidden'>
                                        <ul className="grid grid-flow-col text-center text-gray-500 gap-1 bg-gray-100 rounded-lg p-1 h-[32px]">
                                            <li className='px-0'>
                                                <button
                                                    onClick={() => handleTabClick(3)}
                                                    className={`flex items-center justify-center h-full text-[14px] w-[80px] ${activeTab === 3 ? 'bg-white rounded-lg shadow text-indigo-900' : ''}`}
                                                >
                                                    Original
                                                </button>
                                            </li>
                                            <li className='px-0'>
                                                <button
                                                    onClick={() => handleTabClick(2)}
                                                    className={`flex items-center justify-center h-full text-[14px] w-[80px] ${activeTab === 2 ? 'bg-white rounded-lg shadow text-indigo-900' : ''}`}
                                                >
                                                    JSON
                                                </button>
                                            </li>
                                            <li className='px-0'>
                                                <button
                                                    onClick={() => handleTabClick(1)}
                                                    className={`flex items-center justify-center h-full text-[14px] w-[80px] ${activeTab === 1 ? 'bg-white rounded-lg shadow text-indigo-900' : ''}`}
                                                >
                                                    Detailed
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='bg-[#F5F5F5] py-[16px] px-[32px] break-words'>

                                    {activeTab === 3 && transactionDetails?.callData}
                                </div>

                            </div>
                        </CustomTabPanel>
                        {/* <CustomTabPanel value={value} index={2}>
                   logs
                </CustomTabPanel> */}
                        <CustomTabPanel value={value} index={2}>
                            <UserOpsTable userOps={userOps} network={network} />
                        </CustomTabPanel>
                    </div>
                </Box>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default BundlerNew;
