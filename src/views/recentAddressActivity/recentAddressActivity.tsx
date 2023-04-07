import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getAddressActivity, UserOp, AddressActivity } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getTimePassed, shortenString } from '@/components/common/utils';
import Token from '@/components/common/Token';
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import Skeleton from 'react-loading-skeleton-2';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Table, { tableDataT, getFee } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
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
    { name: 'Hash', sort: true },
    { name: 'Age', sort: true },
    { name: 'Sender', sort: false },
    { name: 'Target', sort: false },
    { name: 'Fee', sort: true },
];

const createUserOpsTableRows = (userOps: UserOp[]): tableDataT['rows'] => {
    let newRows = [] as tableDataT['rows'];
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

interface AccountInfo {
    address: string;
    totalDeposit: number;
    userOpsCount: number;
    userOpHash: string;
    blockTime: number;
}

const createAccountInfoObject = (accountDetails: AddressActivity): AccountInfo => {
    return {
        address: accountDetails.address,
        totalDeposit: parseInt(accountDetails.totalDeposit),
        userOpsCount: parseInt(accountDetails.userOpsCount),
        userOpHash: accountDetails.userOpHash,
        blockTime: parseInt(accountDetails.blockTime),
    };
};

function RecentAddressActivity(props: any) {
    const router = useRouter();
    const [tableLoading, setTableLoading] = useState(true);
    const hash = props.slug && props.slug[0];
    const network = router.query && (router.query.network as string);
    const [rows, setRows] = useState([] as tableDataT['rows']);
    const [addressInfo, setAddressInfo] = useState<AccountInfo>();
    const [useOps, setuserOps] = useState<UserOp[]>();
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [captionText, setCaptionText] = useState('N/A User Ops found');

    const refreshRowsData = async (network: string, pageNo: number, pageSize: number) => {
        setTableLoading(true);
        if (addressInfo == undefined) {
            return;
        }
        const addressDetail = await getAddressActivity(addressInfo.address, network ? network : '', pageNo, pageSize);
        console.log('🚀 ~ file: recentAddressActivity.tsx:47 ~ refreshRowsData ~ userops:', addressDetail);
        const rows = createUserOpsTableRows(addressDetail.userOps);
        setRows(rows);
        setTableLoading(false);
    };

    const loadAccountDetails = async (name: string, network: string) => {
        setTableLoading(true);
        const addressDetail = await getAddressActivity(name, network ? network : '', DEFAULT_PAGE_SIZE, pageNo);
        console.log('🚀 ~ file: recentAddressActivity.tsx:47 ~ loadAccountDetails ~ userops:', addressDetail);
        const accountInfo = createAccountInfoObject(addressDetail);
        setAddressInfo(accountInfo);
    };

    useEffect(() => {
        refreshRowsData(network ? network : '', pageSize, pageNo);
    }, [pageNo, addressInfo]);

    useEffect(() => {
        const captionText = `${addressInfo?.userOpsCount} User Ops found`;
        setCaptionText(captionText);
    }, [addressInfo]);

    const setPageSize = (size: number) => {
        _setPageSize(size);
        setPageNo(0);
    };

    let prevHash = hash;
    let prevNetwork = network;
    useEffect(() => {
        // Check if hash or network have changed
        if (prevHash !== undefined || prevNetwork !== undefined) {
            prevHash = hash;
            prevNetwork = network;
            loadAccountDetails(hash as string, network as string);
        }
    }, [hash, network]);
    let skeletonCards = Array(5).fill(0);
    return (
        <div className="">
            <Navbar searchbar />
            <section className="py-10 px-3">
                <div className="container">
                    <div className="flex flex-row">
                        <Link href="/" className="text-gray-500">
                            <ArrowBackIcon
                                style={{ height: '15px', width: '15px', marginRight: '20px', marginLeft: '10px', marginBottom: '3px' }}
                            />
                        </Link>
                        <Breadcrumbs aria-label="breadcrumb" className="font-['Roboto']">
                            <Link underline="hover" color="inherit" href="/">
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
                    <h1 className="font-bold text-3xl">Account</h1>
                </div>
            </section>
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
                        totalRows: addressInfo?.userOpsCount != null ? addressInfo.userOpsCount : 0,
                    }}
                />
            </div>
            <Footer />
        </div>
    );
}

export default RecentAddressActivity;
