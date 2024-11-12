/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getBundleDetails, UserOp, AccountDetail, Bundle, getBundleDetailsRpc } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, IconButton, Link, Tooltip } from '@mui/material';
import { formatDistanceToNow, format } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Status from '@/components/common/status/Status';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import Token from '@/components/common/Token';
import { NETWORKS_WHITELISTED_FOR_NO_LOGIN, NETWORK_ICON_MAP } from '@/components/common/constants';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton-2';
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
import { SlHome } from 'react-icons/sl';
import { MdContentCopy } from 'react-icons/md';
import { BsClockHistory } from 'react-icons/bs';
import { HiHashtag } from 'react-icons/hi';
import Tracer from './Tracer';
import { useTheme } from '@/context/ThemeContext';
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
            className="xl:pl-[0px] xl:pr-[0px]  min-[1600px]:pl-[0px]  min-[1600px]:pr-[0px]"
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
    userOps: UserOpData[];
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
    const [isLoading, setIsLoading] = useState(true);
    const [copyTooltip, setCopyTooltip] = useState('Copy'); // Tooltip state for copy action
    const { isDarkMode } = useTheme(); // Access theme context

    const handleCopy = () => {
        navigator.clipboard.writeText(hash); // Copy the hash to clipboard
        setCopyTooltip('Copied!'); // Change tooltip to indicate success
        setTimeout(() => setCopyTooltip('Copy'), 1500); // Reset tooltip after 1.5s
    };
    useEffect(() => {
        const fetchTransactionDetails = async () => {
            try {
                const data: ApiResponse = await getBundleDetailsRpc(hash, network);
                setTransactionDetails(data.transactionDetails);
                setUserOps(data.transactionDetails.userOps);
                setIsLoading(false);
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

    const handleToggle = (index: React.SetStateAction<number>) => {
        setValue(index); // Update the active tab index
    };
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Now rendering only happens on the client
    }, []);

    if (!isMounted) return null; // Skip rendering on server
    return (
        <div className="dark:bg-[#191A23]">
            <Navbar searchbar />
            <section className="px-3 container mx-auto my-6 py-6 bg-white dark:bg-[#1F202B] shadow-lg rounded-xl border border-[#D7DAE0] dark:border-[#3B3C40] ">
                <div className="container px-0">
                    <div className="flex flex-row sm:px-8 items-center dark:text-[#DADEF1]">
                        <Link href="/" className="font-gsans text-[#646D8F] text-md sm:text-base dark:text-[#DADEF1]">
                            <ArrowBackIcon
                                style={{ height: '15px', width: '15px', marginRight: '20px', marginLeft: '10px', marginBottom: '3px' }}
                            />
                        </Link>
                        <Breadcrumbs aria-label="breadcrumb" className="dark:text-[#DADEF1]">
                            <Link underline="hover" color="inherit" href={`/?network=${network ? network : ''}`}>
                                <SlHome />
                            </Link>
                            <Link underline="hover" color="inherit" href={`/block/${hash}?network=${network ? network : ''}`}>
                                Tx
                            </Link>
                            <Link
                                underline="hover"
                                color="text.primary"
                                href={`/address/${hash}?network=${network ? network : ''}`}
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
                        {!isLoading ? (
                            <Status type={true} />
                        ) : (
                             // @ts-ignore
                            <SkeletonTheme
                                lightColor="#F0F1F5" // Light mode background color
                                darkColor="#1D1E1F" // Dark mode background color
                                lightHighlightColor="#D7DAE0" // Light mode highlight color
                                darkHighlightColor="#444" // Dark mode highlight color
                            >
                                <Skeleton width={92} height={24} />
                            </SkeletonTheme>
                        )}
                    </div>
                    {/* <h1 className="text-3xl font-bold">Bundle</h1> */}
                </div>

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
                <div className="w-full flex flex-col">
                    <Box sx={{}}>
                        <div className="relative mt-4 md:px-10 py-4 font-gsans">
                            <ul className="flex items-center px-1.5 py-1.5 list-none rounded-xl bg-[#F0F1F5] dark:bg-[#191A23] border-2 dark:border-[#3B3C40] border-[#D7DAE0] overflow-x-auto md:overflow-visible scrollbar-hide">
                                <li className="flex-none w-1/2 text-center md:flex-auto">
                                    <button
                                        onClick={() => handleToggle(0)} // Show UserOp Overview
                                        className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-lg ${
                                            value === 0
                                                ? 'bg-white border-2 dark:bg-[#1F202B]'
                                                : 'bg-inherit text-[#646D8F] dark:text-[#646D8F]'
                                        }`}
                                    >
                                        Overview
                                    </button>
                                </li>
                                <li className="flex-none w-1/2 text-center md:flex-auto">
                                    <button
                                        onClick={() => handleToggle(1)} // Show Developer Details
                                        className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-lg ${
                                            value === 1
                                                ? 'bg-white border-2 dark:bg-[#1F202B]'
                                                : 'bg-inherit dark:text-[#646D8F] text-[#646D8F]'
                                        }`}
                                    >
                                        Call Data
                                    </button>
                                </li>
                                {transactionDetails?.logsDetails.numberOfUserOps !== 0  && 
                                <li className="flex-none w-1/2 text-center md:flex-auto">
                                    <button
                                        onClick={() => handleToggle(2)} // Show UserOp Logs
                                        className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-lg ${
                                            value === 2
                                                ? 'bg-white border-2 dark:bg-[#1F202B]'
                                                : 'bg-inherit dark:text-[#646D8F] text-[#646D8F]'
                                        }`}
                                    >
                                        UserOps
                                    </button>
                                </li>
                                }
                                {(network === 'base' || network === 'odyssey' || network === 'open-campus-test')&& transactionDetails?.logsDetails.numberOfUserOps !== 0  && (
                                    <li className="flex-none w-1/2 text-center md:flex-auto">
                                        <button
                                            onClick={() => handleToggle(3)} // Show Tracer
                                            className={`w-full px-0 py-2 text-base text-[#20294C] dark:text-[#DADEF1] border-[#D7DAE0] dark:border-[#3B3C40] rounded-lg ${
                                                value === 3
                                                    ? 'bg-white border-2 dark:bg-[#1F202B]'
                                                    : 'bg-inherit dark:text-[#646D8F] text-[#646D8F]'
                                            }`}
                                        >
                                            Tracer
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="-mx-3 border-b border-[#D7DAE0] dark:border-[#3B3C40] my-4"></div>

                        <div className="container xl:px-[5rem] min-[1450px]:px-[0rem]">
                            <CustomTabPanel value={value} index={0}>
                                <div className=" flex flex-col gap-[40px]">
                                    <div>
                                        <div className="container px-0 font-gsans space-y-4 dark:bg-[#1F202B]">
                                            {/* Trx Hash */}
                                            <div className="flex md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                    <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                        TRANSACTION HASH
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
                                                                        {formatAddress(hash)}
                                                                    </span>
                                                                    <CopyButton text={bundleInfo?.transactionHash || ''} />
                                                                    <Link
                                                                        href={`${NETWORK_SCANNER_MAP[network]}/tx/${bundleInfo?.transactionHash}`}
                                                                        target="_blank"
                                                                    >
                                                                        <img
                                                                            src={getExplorerLogo(network)}
                                                                            alt="Explorer"
                                                                            className="w-4 h-4"
                                                                        />
                                                                    </Link>
                                                                </>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} // Optional: set specific width if needed
                                                                />
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
                                                            <img src="/images/timeL.svg" alt="" className="dark:hidden" />
                                                            <img src="/images/timeD.svg" alt="" className="dark:flex hidden" />
                                                            {!isLoading ? (
                                                                <p className="text-[#1F1F1F] dark:text-[#ADB0BC] font-medium leading-[24px] text-[16px]">
                                                                    {`${formatDistanceToNow(new Date(transactionDetails?.timestamp || 0), {
                                                                        addSuffix: true,
                                                                    })} `}
                                                                    <span className="text-[#9E9E9E]">
                                                                        {`(`}
                                                                        {format(
                                                                            transactionDetails?.timestamp ?? 0,
                                                                            'dd MMM yyyy, HH:mm:ss',
                                                                        ) || '-'}{' '}
                                                                        {`)`}
                                                                    </span>
                                                                </p>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} // Optional: set specific width if needed
                                                                />
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
                                                            <img
                                                                src="/images/fromL.svg"
                                                                alt="target"
                                                                className="dark:hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                            />
                                                            <img
                                                                src="/images/fromD.svg"
                                                                alt="target"
                                                                className="dark:flex hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                            />
                                                            {!isLoading ? (
                                                                <>
                                                                    <Link
                                                                        href={`/account/${transactionDetails?.from}`}
                                                                        className="no-underline"
                                                                    >
                                                                        <span className="text-[#195BDF]">
                                                                            {formatAddress(transactionDetails?.from || '')}
                                                                        </span>
                                                                    </Link>
                                                                    <CopyButton text={transactionDetails?.from || ''} />
                                                                    <Link
                                                                        href={`/account/${transactionDetails?.from}?network=${network}`}
                                                                        target="_blank"
                                                                    >
                                                                        <img src="/images/linkL.svg" alt="link" className="dark:hidden" />
                                                                        <img
                                                                            src="/images/linkD.svg"
                                                                            alt="link"
                                                                            className="dark:flex hidden"
                                                                        />
                                                                    </Link>
                                                                </>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} // Optional: set specific width if needed
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                    <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                        TO
                                                    </span>
                                                </div>
                                                <div className="flex-1 break-words">
                                                    <div className="justify-between block md:flex">
                                                        <div className="flex items-center gap-[10px]">
                                                            <img
                                                                src="/images/toL.svg"
                                                                alt="target"
                                                                className="dark:hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                            />
                                                            <img
                                                                src="/images/toD.svg"
                                                                alt="target"
                                                                className="dark:flex hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                            />
                                                            {!isLoading ? (
                                                                <>
                                                                    <Link
                                                                        href={`/account/${transactionDetails?.to}`}
                                                                        className="no-underline"
                                                                    >
                                                                        <span className="text-[#195BDF]">
                                                                            {formatAddress(transactionDetails?.to || '')}
                                                                        </span>
                                                                    </Link>
                                                                    <CopyButton text={transactionDetails?.to || ''} />
                                                                    <Link
                                                                        href={`/account/${transactionDetails?.to}?network=${network}`}
                                                                        target="_blank"
                                                                    >
                                                                        <img src="/images/linkL.svg" alt="link" className="dark:hidden" />
                                                                        <img
                                                                            src="/images/linkD.svg"
                                                                            alt="link"
                                                                            className="dark:flex hidden"
                                                                        />
                                                                    </Link>
                                                                </>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} // Optional: set specific width if needed
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                    <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                        BLOCK NUMBER
                                                    </span>
                                                </div>
                                                <div className="flex-1 break-words">
                                                    <div className="justify-between block md:flex">
                                                        <div className="flex items-center gap-[10px]">
                                                            <HiHashtag className="w-6 h-6 fill-[#969CB2] dark:fill-[#666B80]" />
                                                            {!isLoading ? (
                                                                <span className="text-base text-[#195BDF] dark:text-[#598AEB] break-all leading-5">
                                                                    <Link href={`/block/${transactionDetails?.blockNumber}`} className='no-underline'>
                                                                    {transactionDetails?.blockNumber}
                                                                    </Link>
                                                                </span>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} // Optional: set specific width if needed
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                    <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5">
                                                        NUMBER OF USEROPS
                                                    </span>
                                                </div>
                                                <div className="flex-1 break-words">
                                                    <div className="justify-between block md:flex">
                                                        <div className="flex items-center gap-[10px]">
                                                            <HiHashtag className="w-6 h-6 fill-[#969CB2] dark:fill-[#666B80]" />
                                                            {!isLoading ? (
                                                                <span className="text-base text-[#195BDF] dark:text-[#598AEB] break-all leading-5">
                                                                    {transactionDetails?.logsDetails.numberOfUserOps}
                                                                </span>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} // Optional: set specific width if needed
                                                                />
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
                                                                src="/images/dollarL.svg"
                                                                alt="transaction fee"
                                                                className="dark:hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                            />
                                                            <img
                                                                src="/images/dollarD.svg"
                                                                alt="transaction fee"
                                                                className="dark:flex hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                            />
                                                            {!isLoading ? (
                                                                <p className="text-[#1F1F1F] leading-5 text-base dark:text-[#ADB0BC]">
                                                                    {transactionDetails?.trxFee} ETH
                                                                </p>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} // Optional: set specific width if needed
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                    <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-normal leading-5">
                                                        REVENUE EARNED
                                                    </span>
                                                </div>
                                                <div className="flex-1 break-words">
                                                    <div className="justify-between block md:flex">
                                                        <div className="flex items-center gap-[8px]">
                                                            <img
                                                                src="/images/dollarL.svg"
                                                                alt="transaction fee"
                                                                className="dark:hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                            />
                                                            <img
                                                                src="/images/dollarD.svg"
                                                                alt="transaction fee"
                                                                className="dark:flex hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                            />
                                                            {!isLoading ? (
                                                                <p className="text-[#1F1F1F] leading-5 text-base dark:text-[#ADB0BC]">
                                                                    {transactionDetails?.revenue} ETH
                                                                </p>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} 
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                    <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-normal leading-5">
                                                        PROFIT EARNED
                                                    </span>
                                                </div>
                                                <div className="flex-1 break-words">
                                                    <div className="justify-between block md:flex">
                                                        <div className="flex items-center gap-[8px]">
                                                            <img
                                                                src="/images/dollarL.svg"
                                                                alt="transaction fee"
                                                                className="dark:hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                            />
                                                            <img
                                                                src="/images/dollarD.svg"
                                                                alt="transaction fee"
                                                                className="dark:flex hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                            />
                                                            {!isLoading ? (
                                                                <p className="text-[#1F1F1F] leading-5 flex flex-row gap-2 text-base dark:text-[#ADB0BC]">
                                                                    {transactionDetails?.profit} ETH
                                                                    <p className="text-[#9E9E9E]">
    (
    {transactionDetails?.revenue && parseFloat(transactionDetails.revenue) !== 0
        ? `${Math.sign(parseFloat(transactionDetails.profit || '0')) >= 0 ? '+' : ''}${
              (
                  (parseFloat(transactionDetails.profit || '0') /
                      parseFloat(transactionDetails.revenue || '1')) *
                  100
              ).toFixed(2)
          }`
        : '0.00'}
    %)
</p>

                                                                </p>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} 
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className="border-b w-full border-[#D7DAE0] dark:border-[#3B3C40]"></div>

                                            <span className="text-[20px] flex items-center py-4 md:px-4 gap-2 text-[#20294C] dark:text-[#ADB0BC] font-medium leading-5">
                                                <img
                                                    src="/images/gas.svg"
                                                    alt="gas used"
                                                    className="w-[24px] dark:hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                />
                                                <img
                                                    src="/images/gasD.svg"
                                                    alt="gas used"
                                                    className="w-[24px] dark:flex hidden fill-[#969CB2] dark:fill-[#666B80]"
                                                />
                                                GAS DETAILS
                                            </span>

                                            {/* Gas Used */}
                                            <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                    <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-normal leading-5">
                                                        GAS USED
                                                    </span>
                                                </div>
                                                <div className="flex-1 break-words">
                                                    <div className="justify-between block md:flex">
                                                        <div className="flex items-center gap-[10px]">
                                                            {!isLoading ? (
                                                                <>
                                                                    <p className="text-[#1F1F1F] dark:text-[#ADB0BC] leading-5 text-base">
                                                                        {transactionDetails?.gasDetails.gasUsed}{' '}
                                                                    </p>
                                                                    <p className="text-[#9E9E9E] ">{`${calculateGasUsagePercentage(
                                                                        transactionDetails?.gasDetails.gasUsed || '',
                                                                        transactionDetails?.gasDetails.gasLimit || '',
                                                                    )}`}</p>
                                                                </>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} // Optional: set specific width if needed
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Gas Limit */}
                                            <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                    <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-normal leading-5">
                                                        GAS LIMIT
                                                    </span>
                                                </div>
                                                <div className="flex-1 break-words">
                                                    <div className="justify-between block md:flex">
                                                        <div className="flex items-center gap-[10px]">
                                                            {!isLoading ? (
                                                                <>
                                                                    <p className="text-[#1F1F1F] dark:text-[#ADB0BC] leading-5 text-base">
                                                                        {transactionDetails?.gasDetails.gasLimit}
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} // Optional: set specific width if needed
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Gas Price */}
                                            <div className="flex  md:flex-row flex-col items-start md:items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                                <div className="md:w-[280px] md:px-[16px] py-[8px] flex items-center gap-2">
                                                    <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-normal leading-5">
                                                        GAS PRICE
                                                    </span>
                                                </div>
                                                <div className="flex-1 break-words">
                                                    <div className="justify-between block md:flex">
                                                        <div className="flex items-center gap-[10px]">
                                                            {!isLoading ? (
                                                                <>
                                                                    <p className="text-[#1F1F1F] dark:text-[#ADB0BC] leading-5 text-base">
                                                                        {transactionDetails?.gasDetails.gasPrice} Gwei
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                // @ts-ignore
                                                                <div
                                                                    className={`w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                                                                    style={{ width: 200 }} // Optional: set specific width if needed
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Gas FEES */}
                                            <div className="flex md:flex-row flex-col items-start md:items-center  border-[#ccc] dark:border-[#3B3C40] md:gap-[70px] pb-2">
                                                <div className="md:w-[280px] md:px-4 py-2 flex items-center">
                                                    <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-normal">
                                                        GAS FEES
                                                    </span>
                                                </div>
                                                <div className="flex flex-col w-full gap-4">
                                                    {/* Base Fee */}
                                                    <div className="flex flex-row gap-1">
                                                        <div className="text-[#9E9E9E] dark:text-[#ADB0BC] flex items-center">
                                                            <p>Base Fee :</p>
                                                        </div>
                                                        {isLoading ? (
                                                            <div className="w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                                        ) : (
                                                            <p className="text-[#1F1F1F] dark:text-[#ADB0BC] font-medium">
                                                                {transactionDetails?.gasDetails.baseFee} Gwei
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Max Fee Per Gas */}
                                                    <div className="flex flex-row gap-1">
                                                        <div className="text-[#9E9E9E] dark:text-[#ADB0BC] flex items-center">
                                                            <p>Max Fee Per Gas :</p>
                                                        </div>
                                                        {isLoading ? (
                                                            <div className="w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                                        ) : (
                                                            <p className="text-[#1F1F1F] dark:text-[#ADB0BC] font-medium">
                                                                {transactionDetails?.gasDetails.maxFeePerGas} Gwei
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Max Priority Fee Per Gas */}
                                                    <div className="flex flex-row gap-1">
                                                        <div className="text-[#9E9E9E] dark:text-[#ADB0BC] flex items-center">
                                                            <p>Max Priority Fee Per Gas :</p>
                                                        </div>
                                                        {isLoading ? (
                                                            <div className="w-52 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                                        ) : (
                                                            <p className="text-[#1F1F1F] dark:text-[#ADB0BC] font-medium">
                                                                {transactionDetails?.gasDetails.maxPriorityFeePerGas} Gwei
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <div className="flex flex-col rounded-t-xl bg-white border dark:border-[#3B3C40] dark:bg-[#1F202B] border-[#DADCE0] border-sm w-full">
                                    <div className="w-full px-4 py-5 flex flex-col sm:flex-row rounded-t-xl border justify-between items-center h-auto sm:h-[72px] dark:border-[#3B3C40] dark:bg-[#1F202B]">
                                        <div className="flex flex-row gap-2 sm:gap-4 h-[32px] items-center">
                                            <img src="/images/format.svg" alt="format" className="w-[24px] dark:fill-[#DADEF1]" />
                                            <p className="text-black font-semibold font-gsans text-center text-lg sm:text-xl dark:text-[#DADEF1]">
                                                Format
                                            </p>
                                        </div>
                                        <div className="h-[32px] mt-3 sm:mt-0">
                                            <ul className="grid grid-flow-col text-center dark:bg-[#191A23] dark:border-[#3B3C40] text-gray-500 gap-1 bg-gray-100 rounded-md border p-1 items-center h-[32px]">
                                                <li className="px-0">
                                                    <button
                                                        onClick={() => handleTabClick(3)}
                                                        className={`flex items-center  justify-center h-full text-sm sm:text-base w-[80px] ${
                                                            activeTab === 3
                                                                ? 'bg-white rounded-md text-indigo-900 dark:bg-[#1F202B] dark:text-blue-500 dark:border-[#3B3C40] border'
                                                                : ''
                                                        }`}
                                                    >
                                                        Original
                                                    </button>
                                                </li>
                                                <li className="px-0">
                                                    <button
                                                        onClick={() => handleTabClick(2)}
                                                        className={`flex items-center justify-center h-full text-sm sm:text-base w-[80px] ${
                                                            activeTab === 2
                                                                ? 'bg-white rounded-md  dark:bg-[#1F202B] dark:text-blue-500 dark:border-[#3B3C40] border'
                                                                : ''
                                                        }`}
                                                    >
                                                        JSON
                                                    </button>
                                                </li>
                                                {/* <li className="px-0">
                                                    <button
                                                        onClick={() => handleTabClick(1)}
                                                        className={`flex items-center justify-center h-full text-sm sm:text-base w-[80px] ${
                                                            activeTab === 1
                                                                ? 'bg-white rounded-md dark:bg-[#1F202B] dark:text-blue-500 dark:border-[#3B3C40] border'
                                                                : ''
                                                        }`}
                                                    >
                                                        Detailed
                                                    </button>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-[#F5F5F5] py-[16px] px-[32px] break-words dark:bg-[#1F202B] dark:text-[#DADEF1] dark:border-[#3B3C40]">
                                        {activeTab === 3 && transactionDetails?.callData}
                                    </div>
                                    <div className="bg-[#F5F5F5] py-[16px] px-[32px] break-words dark:bg-[#1F202B] dark:text-[#DADEF1] dark:border-[#3B3C40]">
                                        {activeTab === 2 && <pre className="text-wrap">{JSON.stringify(transactionDetails, null, 2)}</pre>}
                                    </div>
                                </div>
                            </CustomTabPanel>
                            {/* <CustomTabPanel value={value} index={2}>
                   logs
                </CustomTabPanel> */}
                            <CustomTabPanel value={value} index={2}>
                                <UserOpsTable userOps={userOps} network={network} />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={3}>
                                {(network === 'base' || network === 'odyssey' || network === 'open-campus-test') && (
                                    <div className="container px-4 md:block hidden">
                                        <Tracer trxHash={hash} network={network} />
                                    </div>
                                )}
                                {(network === 'base' || network === 'odyssey' || network === 'open-campus-test') && (
                                    <div className="md:hidden shadow-300 p-4 dark:text-[#ADB0BC] text-center">
                                        Transaction Traces Best Viewed on Larger Screens
                                    </div>
                                )}
                            </CustomTabPanel>
                        </div>
                    </Box>
                </div>
            </section>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default BundlerNew;