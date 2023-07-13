import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getPayMasterDetails, PayMasterActivity, UserOp } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link } from '@mui/material';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConfig } from '@/context/config';
import usePrevious from '@/hooks/usePrevious';

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
    { name: 'UserOp Hash', sort: true },
    { name: 'Age', sort: true },
    { name: 'Sender', sort: false },
    { name: 'Target', sort: false },
    { name: 'Fee', sort: true },
];

const getEffectivePageSize = (pageSizeFromParam: string | null | undefined): number => {
    let effectivePageSize;
    effectivePageSize = pageSizeFromParam ? parseInt(pageSizeFromParam) : DEFAULT_PAGE_SIZE;
    if (!PAGE_SIZE_LIST.includes(effectivePageSize)) {
        effectivePageSize = DEFAULT_PAGE_SIZE;
    }
    return effectivePageSize;
}

const getEffectivePageNo = (pageNoFromParam: string | null | undefined, totalRows: number, pageSize: number): number => {
    let effectivePageNo;
    effectivePageNo = pageNoFromParam ? parseInt(pageNoFromParam) : 1;
    
    if (effectivePageNo > Math.ceil(totalRows/pageSize)) {
        effectivePageNo = Math.ceil(totalRows/pageSize);
    }
    if (effectivePageNo <= 0) {
        effectivePageNo = 1;
    }
    return effectivePageNo;
}

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
    const {addressMapping} = useConfig();
    const hash = props.slug && props.slug[0];
    const network = router.query && (router.query.network as string);
    const prevNetwork = usePrevious(network);
    const [rows, setRows] = useState([] as tableDataT['rows']);
    const [addressInfo, setAddressInfo] = useState<AccountInfo>();
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [captionText, setCaptionText] = useState('N/A User Ops found');

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
        urlParams.set('pageNo', (pageNo).toString());
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
    return (
        <div className="">
            <Navbar searchbar />
            <section className="px-3 py-10">
                <div className="container">
                    <div className="flex flex-row">
                        <Link href="/" className="text-gray-500">
                            <ArrowBackIcon
                                style={{ height: '15px', width: '15px', marginRight: '20px', marginLeft: '10px', marginBottom: '3px' }}
                            />
                        </Link>
                        <Breadcrumbs aria-label="breadcrumb" className="font-['Roboto']">
                            <Link underline="hover" color="inherit" href={'/' + (network ? '?network=' + network : '')}>
                                Home
                            </Link>
                            <Link underline="hover" color="inherit" href="/recentUserOps">
                                Recent User Ops
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
                    <h1 className="text-3xl font-bold">Paymaster</h1>
                </div>
            </section>
            <HeaderSection item={addressInfo} network={network} addressMapping={addressMapping}/>
            <TransactionDetails item={addressInfo} network={network} />
            <div className="container">
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
                        totalRows: addressInfo?.userOpsLength != null ? addressInfo.userOpsLength : 0,
                    }}
                />
            </div>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default RecentPaymentMaster;
