import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getPayMasterDetails, PayMasterActivity, UserOp, fetchNetworkData, NetworkResponse } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, IconButton, Link, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import Token from '@/components/common/Token';
import { NETWORK_ICON_MAP, PAGE_SIZE_LIST } from '@/components/common/constants';
import Skeleton from 'react-loading-skeleton-2';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Table, { tableDataT } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
import TransactionDetails from './TransactionDetails';
import HeaderSection from './HeaderSection';
import HeaderSectionGlobal from '@/components/global/HeaderSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConfig } from '@/context/config';
import usePrevious from '@/hooks/usePrevious';
import { NETWORK_LIST } from '@/components/common/constants';
import { SlHome } from 'react-icons/sl';
import { FaCopy } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import Image from 'next/image';
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

const DEFAULT_PAGE_SIZE = 10;

const columns = [
    { name: 'USER OP HASH', sort: true },
    { name: 'AGE', sort: true },
    { name: 'SENDER', sort: false },
    { name: 'TARGET', sort: false },
    { name: 'FEE', sort: true },
];

const getEffectivePageSize = (pageSizeFromParam: string | null | undefined): number => {
    let effectivePageSize;
    effectivePageSize = pageSizeFromParam ? parseInt(pageSizeFromParam) : DEFAULT_PAGE_SIZE;
    if (!PAGE_SIZE_LIST.includes(effectivePageSize)) {
        effectivePageSize = DEFAULT_PAGE_SIZE;
    }
    return effectivePageSize;
};

const getEffectivePageNo = (pageNoFromParam: string | null | undefined, totalRows: number, pageSize: number): number => {
    let effectivePageNo;
    effectivePageNo = pageNoFromParam ? parseInt(pageNoFromParam) : 1;

    if (effectivePageNo > Math.ceil(totalRows / pageSize)) {
        effectivePageNo = Math.ceil(totalRows / pageSize);
    }
    if (effectivePageNo <= 0) {
        effectivePageNo = 1;
    }
    return effectivePageNo;
};

const createUserOpsTableRows = (userOps: UserOp[]): tableDataT['rows'] => {
    let newRows = [] as tableDataT['rows'];
    userOps?.forEach((userOp) => {
        newRows.push({
            token: {
                text: userOp.userOpHash,
                icon: NETWORK_ICON_MAP[userOp.network],
                type: 'userOp',
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

interface AccountInfo {
    address: string;
    totalDeposits: number;
    userOpsLength: number;
}
interface NetworkItem {
    name: string;
    key: string;
    iconPath: string;
    iconPathInverted: string;
}
const createPaymasterInfoObject = (accountDetails: PayMasterActivity): AccountInfo => {
    return {
        address: accountDetails.address,
        totalDeposits: parseInt(accountDetails.totalDeposits),
        userOpsLength: accountDetails?.userOpsLength,
    };
};

function RecentPaymentMaster(props: any) {
    const router = useRouter();
    const [tableLoading, setTableLoading] = useState(true);
    const { addressMapping } = useConfig();
    const hash = props.slug && props.slug[0];
    const network = router.query && (router.query.network as string);
    const prevNetwork = usePrevious(network);
    const [rows, setRows] = useState([] as tableDataT['rows']);
    const [addressInfo, setAddressInfo] = useState<AccountInfo>();
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [captionText, setCaptionText] = useState('N/A User Ops found');

    const [displayNetworkList, setDisplayNetworkList] = useState<NetworkItem[]>([]);
    const [networkListReady, setNetworkListReady] = useState(false);

    const [isTransactionDetails, setIsTransactionDetails] = useState(true);

    const [copyTooltip, setCopyTooltip] = useState('Copy'); // Tooltip state for copy action
    const [isVisible, setIsVisible] = useState(false);

// Set a 7-second timer when the component mounts
useEffect(() => {
    setIsVisible(true); // Show the floating element
    const timeout = setTimeout(() => setIsVisible(false), 5000); // Hide after 7 seconds

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
}, []);
// Handler for keyboard events
const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'a' || event.key === 'A') {
        // Switch to Transaction Details if not already active
        setIsTransactionDetails(true);
    } else if (event.key === 'd' || event.key === 'D') {
        // Switch to User Operations if not already active
        setIsTransactionDetails(false);
    }
};

useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, []);
    const handleCopy = () => {
        navigator.clipboard.writeText(hash); // Copy the hash to clipboard
        setCopyTooltip('Copied!'); // Change tooltip to indicate success
        setTimeout(() => setCopyTooltip('Copy'), 1500); // Reset tooltip after 1.5s
    };
    // handling table page change. Everytime the pageNo change, or pageSize change this function will fetch new data and update it.
    const updateRowsData = async (network: string, pageNo: number, pageSize: number) => {
        setTableLoading(true);
        if (addressInfo == undefined) {
            return;
        }
        const addressDetail = await getPayMasterDetails(addressInfo.address, network ? network : '', pageNo, pageSize, toast);
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
    const loadAccountDetails = async (name: string, network: string) => {
        setTableLoading(true);
        const paymasterDetail = await getPayMasterDetails(name, network ? network : '', DEFAULT_PAGE_SIZE, pageNo, toast);
        const accountInfo = createPaymasterInfoObject(paymasterDetail);
        setAddressInfo(accountInfo);
    };

    useEffect(() => {
        updateRowsData(network ? network : '', pageSize, pageNo);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('pageNo', pageNo.toString());
        urlParams.set('pageSize', pageSize.toString());
        window.history.pushState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
    }, [pageNo, addressInfo]);

    useEffect(() => {
        const captionText = `${addressInfo?.userOpsLength} User Ops found`;
        setCaptionText(captionText);
    }, [addressInfo]);

    let prevHash = hash;
    useEffect(() => {
        // Check if hash or network have changed
        if (prevHash !== undefined || prevNetwork !== undefined) {
            prevHash = hash;
            loadAccountDetails(hash as string, network as string);
        }
    }, [hash, network]);
    let skeletonCards = Array(5).fill(0);
    const checkTermInNetworks = React.useCallback(async (term: string) => {
        const networksWithTerm: string[] = [];
        const networkKeys = Object.keys(NETWORK_LIST);

        try {
            const data: NetworkResponse[] = await fetchNetworkData(term);

            data.forEach((networkData: NetworkResponse, index: number) => {
                if (!networkData.message) {
                    const networkValue = networkKeys[index];
                    networksWithTerm.push(networkValue);
                }
            });

            const validNetworksWithTerm = networksWithTerm.filter(
                (index) => typeof index === 'string' && !isNaN(Number(index)) && Number(index) < NETWORK_LIST.length,
            );

            setDisplayNetworkList(validNetworksWithTerm.map((index) => NETWORK_LIST[Number(index)] as NetworkItem));
            setNetworkListReady(true);
        } catch (error) {
            console.error('Error fetching data for networks:', error);
        }
    }, []);

    React.useEffect(() => {
        if (!networkListReady && hash) {
            checkTermInNetworks(hash);
        }
    }, [hash, networkListReady, checkTermInNetworks]);

    return (
        <div className='dark:bg-[#191A23]'>
            <Navbar searchbar />
            { isVisible &&  (
                <div className="hidden lg:block fixed bottom-32 left-2 z-50 p-2  text-[#20294C] dark:text-[#DADEF1] rounded-md text-sm">
                    <div className='flex flex-col text-md font-gsans gap-2'>
                        <strong>PRESS</strong> 
                        <div className='flex flex-row'>
                            <Image width={48} height={48} src="/images/LightA.svg" alt="" className='dark:hidden block' />  
                            <Image width={48} height={48} src="/images/LightD.svg" alt=""className='dark:hidden block' />
                            <Image width={48} height={48} src="/images/DarkA.svg" alt="" className='dark:block hidden '/>  
                            <Image width={48} height={48} src="/images/DarkD.svg" alt="" className='dark:block hidden '/>  
                        </div> 
                        to switch between tabs
                    </div>
                </div>
            )}
            <section className="container mx-auto my-6 py-6 bg-white dark:bg-[#1F202B] shadow-lg rounded-xl border border-[#D7DAE0] dark:border-[#3B3C40]">
                <div className="flex flex-col px-10">
                    <Breadcrumbs aria-label="breadcrumb" className="text-[#646D8F] font-gsans">
                        {/* <Link href="/" className="text-gray-500">
                            <ArrowBackIcon style={{ height: '15px', width: '15px', marginRight: '20px', marginBottom: '3px' }} />
                        </Link> */}
                        <Link underline="hover" color="inherit" href={'/' + (network ? '?network=' + network : '')}>
                            <SlHome />
                        </Link>
                        <Link underline="hover" color="inherit" href="/recentUserOps">
                            Recent Paymaster
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
                                <MdContentCopy className='w-4 h-4 dark:fill-[#ADB0BC]'/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </Breadcrumbs>
                </div>

                {/* <HeaderSectionGlobal item={addressInfo} network={network} displayNetworkList={displayNetworkList} headerTitle="Paymaster" /> */}

                {/* Toggle Tab for Transaction Details and Table */}
                <div className="relative mt-4 px-10 py-4 font-gsans">
                    <ul className=" flex items-center px-1.5 py-1.5 list-none rounded-md bg-[#F0F1F5] dark:bg-[#191A23] border dark:border-[#3B3C40] border-[#D7DAE0]">
                        <li className="flex-auto text-center ">
                            <button
                                onClick={() => setIsTransactionDetails(true)} // Show Transaction Details
                                className={`w-full px-0 py-2 text-base text-[#20294C]  border-[#D7DAE0] dark:border-[#3B3C40] rounded-lg  ${
                                    isTransactionDetails ? 'bg-white border-2 dark:bg-[#1F202B] dark:text-[#DADEF1]' : 'bg-inherit text-[#646D8F] dark:text-[#ADB0BC]'
                                }`}
                            >
                                Overview
                            </button>
                        </li>
                        <li className="flex-auto text-center">
                            <button
                                onClick={() => setIsTransactionDetails(false)} // Show Table
                                className={`w-full px-0 py-2 text-base text-[#20294C]  border-[#D7DAE0] dark:border-[#3B3C40] rounded-lg  ${
                                    !isTransactionDetails ? 'bg-white border-2 dark:bg-[#1F202B] dark:text-[#DADEF1]' : 'bg-inherit text-[#646D8F] dark:text-[#ADB0BC]'
                                }`}
                            >
                                User Operations
                            </button>
                        </li>
                    </ul>
                </div>
            <div className="-mx-4 border-b border-[#D7DAE0] dark:border-[#3B3C40] my-4"></div>
                                        
                {/* Toggle between Transaction Details and Table */}
                <div className="mt-6 px-10">
                    {isTransactionDetails ? (
                        <TransactionDetails item={addressInfo} network={network} />
                    ) : (
                        <>
                            <Table rows={rows} columns={columns} loading={tableLoading} />
                                <div className='border-b mt-5 z-50 border-[#D7DAE0] dark:border-[#3B3C40]'></div>
                            <Pagination
                                pageDetails={{
                                    pageNo,
                                    setPageNo,
                                    pageSize,
                                    setPageSize,
                                    totalRows: addressInfo?.userOpsLength || 0,
                                }}
                            />
                        </>
                    )}
                </div>
            </section>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default RecentPaymentMaster;
