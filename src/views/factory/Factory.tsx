import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getBundleDetails, UserOp, AccountDetail, Bundle, getFactoryDetails, FactoryDetails } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, IconButton, Link, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import Token from '@/components/common/Token';
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import Skeleton from 'react-loading-skeleton-2';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Table, { tableDataT } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
import TransactionDetails from './TransactionDetails';
import HeaderSection from './HeaderSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConfig } from '@/context/config';
import { SlHome } from 'react-icons/sl';
import { MdContentCopy } from 'react-icons/md';

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
    { name: 'Account', sort: true },
    { name: 'Age', sort: true },
    { name: '#User Ops', sort: false }
];
const createUserOpsTableRows = (accounts: AccountDetail[], network: string): tableDataT['rows'] => {
    console.log('🚀 ~ file: recentAddressActivity.tsx:39 ~ createUserOpsTableRows ~ userOps:', accounts);
    let newRows = [] as tableDataT['rows'];
    if (!accounts) return newRows;
    accounts.forEach((account) => {
        newRows.push({
            token: {
                text: account.address,
                icon: NETWORK_ICON_MAP[network],
                type: 'address',
            },
            ago: getTimePassed(parseInt(account.blockTime!)),
            userOps: `${account.userOpsCount} ops`,
        });
    });
    return newRows;
};

interface FactoryInfo {
    address: string
    accountsLength: number
}

const createFactoryInfoObject = (factoryDetail: FactoryDetails): FactoryInfo => {
    return {
        address: factoryDetail.address,
        accountsLength: parseInt(factoryDetail.accountsLength)
    };
};

function Factory(props: any) {
    const router = useRouter();
    const [tableLoading, setTableLoading] = useState(true);
    const {addressMapping} = useConfig();
    const hash = props.slug && props.slug[0];
    const network = router.query && (router.query.network as string);
    const [rows, setRows] = useState([] as tableDataT['rows']);
    const [factoryInfo, setFactoryInfo] = useState<FactoryInfo>();
    const [useOps, setuserOps] = useState<UserOp[]>();
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [captionText, setCaptionText] = useState('Loading User Ops');
    const [copyTooltip, setCopyTooltip] = useState('Copy'); // Tooltip state for copy action

    const handleCopy = () => {
        navigator.clipboard.writeText(hash); // Copy the hash to clipboard
        setCopyTooltip('Copied!'); // Change tooltip to indicate success
        setTimeout(() => setCopyTooltip('Copy'), 1500); // Reset tooltip after 1.5s
    };
    // handling table page change. Everytime the pageNo change, or pageSize change this function will fetch new data and update it.
    const updateRowsData = async (network: string, pageNo: number, pageSize: number) => {
        setTableLoading(true);
        if (factoryInfo == undefined) {
            return;
        }
        const factoryDetail = await getFactoryDetails(factoryInfo.address, network ? network : '', pageNo, pageSize, toast);
        const rows = createUserOpsTableRows(factoryDetail.accounts, network);
        setRows(rows);
        setTableLoading(false);
    };

    // update the page No after changing the pageSize
    const setPageSize = (size: number) => {
        _setPageSize(size);
        setPageNo(0);
    };

    // load the account details.
    const loadFactoryDetails = async (name: string, network: string) => {
        setTableLoading(true);
        console.log('checking for hash ', name, ' and network ', network, ' in useEffect');

        const factoryDetail = await getFactoryDetails(name, network ? network : '', DEFAULT_PAGE_SIZE, pageNo, toast);
        const factoryInfo = createFactoryInfoObject(factoryDetail);
        setFactoryInfo(factoryInfo);
    };

    useEffect(() => {
        updateRowsData(network ? network : '', pageSize, pageNo);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('pageNo', (pageNo).toString());
        urlParams.set('pageSize', pageSize.toString());
        window.history.pushState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
    }, [pageNo, factoryInfo]);

    useEffect(() => {
        if (factoryInfo?.accountsLength != undefined ){
            const captionText = `${factoryInfo.accountsLength} Accounts found`;
            setCaptionText(captionText);
        }
    }, [factoryInfo]);

    let prevHash = hash;
    let prevNetwork = network;
    useEffect(() => {
        // Check if hash or network have changed
        if (prevHash !== undefined || prevNetwork !== undefined) {
            prevHash = hash;
            prevNetwork = network;
            loadFactoryDetails(hash as string, network as string);
        }
    }, [hash, network]);
    let skeletonCards = Array(5).fill(0);
    return (
        <div className="dark:bg-[#191A23]">
            <Navbar searchbar />
            <section className="px-3 container mx-auto my-6 py-6 bg-white dark:bg-[#1F202B] shadow-lg rounded-xl border border-[#D7DAE0] dark:border-[#3B3C40]">
                <div className="container px-0">
                    <div className="flex flex-row">
                        <Link href="/" className="text-gray-500">
                            <ArrowBackIcon
                                style={{ height: '15px', width: '15px', marginRight: '20px', marginLeft: '10px', marginBottom: '3px' }}
                            />
                        </Link>
                        <Breadcrumbs aria-label="breadcrumb"  className="font-gsans text-[#646D8F] text-md sm:text-base">
                            <Link underline="hover" color="inherit" href={`/?network=${network ? network : ''}`}>
                            <SlHome />
                            </Link>
                            <Link
                                underline="hover"
                                color="text.primary"
                                href={`/factory/${hash}?network=${network ? network : ''}`}
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
                    </div>
                    <h1 className="text-3xl font-bold p-4 font-gsans dark:text-white">Factory</h1>
                </div>
            
            {/* <HeaderSection item={factoryInfo} network={network} addressMapping={addressMapping}/> */}
            {/* <TransactionDetails item={factoryInfo} network={network} /> */}
            <div className="container px-0">
                <Table
                    rows={rows}
                    columns={columns}
                    loading={tableLoading}
                    caption={{
                        children: captionText,
                        icon: '/images/cube.svg',
                        text: 'Approx Number of Accounts created in the selected chain',
                    }}
                />
                <Pagination
                    pageDetails={{
                        pageNo,
                        setPageNo,
                        pageSize,
                        setPageSize,
                        totalRows: factoryInfo?.accountsLength != null ? factoryInfo.accountsLength : 0,
                    }}
                />
            </div>
            </section>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default Factory;
