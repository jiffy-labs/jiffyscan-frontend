import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getAccountDetails, getPayMasterDetails, PoweredBy, UserOp } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getTimePassed, shortenString } from '@/components/common/utils';
import { NETWORK_ICON_MAP } from '@/components/common/constants';

import HeaderSection from './HeaderSection';
import TransactionDetails from './TransactionDetails';
import Table, { getFee, tableDataT } from '@/components/common/table/Table';
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
const columns = [
    { name: 'Hash', sort: true },
    { name: 'Age', sort: true },
    { name: 'Sender', sort: true },
    { name: 'Target', sort: true },
    { name: 'Fee', sort: true },
];
const DEFAULT_PAGE_SIZE = 10;
function RecentPaymentMaster(props: any) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);
    const [captionText, setCaptionText] = useState('');
    const hash = props.slug && props.slug[0];
    const network = router.query && router.query.network;
    const [useOpsData, setuserOpsData] = useState<UserOp>();
    const [responseData, setresponseData] = useState<PoweredBy>();
    const [latestUserOpsTable, setLatestUserOpsTable] = useState<tableDataT>({
        rows: [],
        caption: undefined,
        columns: [],
        loading: false,
    });
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalRows, setTotalRows] = useState(0);

    const setPageSize = (size: number) => {
        _setPageSize(size);
        setPageNo(0);
    };
    const refreshUserOpsTable = async (name: string, network: string) => {
        setTableLoading(true);
        const userops = await getPayMasterDetails(name, network ? network : '');
        let newRows = [] as tableDataT['rows'];
        userops.userOps.forEach((userOp: UserOp) => {
            newRows.push({
                token: {
                    text: userOp.userOpHash,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'userOp',
                },
                ago: getTimePassed(userOp.blockTime!),
                sender: userOp.sender,
                target: userOp.target!,
                fee: getFee(userOp.actualGasCost, network as string),
                status: userOp.success!,
            });
        });
        setLatestUserOpsTable({
            rows: newRows.slice(0, 10),
            columns: columns,
            loading: false,
        });
        setCaptionText(' ' + (userops?.userOps?.length || '0') + ' user operations found');
        setTotalRows(userops?.userOps?.length);
        setuserOpsData(userops);
        setTimeout(() => {
            setTableLoading(false);
        }, 2000);
    };

    let prevHash = hash;
    let prevNetwork = network;
    useEffect(() => {
        // Check if hash or network have changed
        if (prevHash !== undefined || prevNetwork !== undefined) {
            prevHash = hash;
            prevNetwork = network;
            const refreshTable = () => {
                refreshUserOpsTable(hash as string, network as string);
            };

            refreshTable();
        }
    }, [hash]);
    // const fetchPoweredBy = async () => {
    //     const beneficiary =
    //         useOpsData
    //             ?.map((item) => item.beneficiary ?? '')
    //             .filter((item) => item !== null)
    //             .join(',') || '';
    //     const paymaster = useOpsData?.map((item) => item.paymaster)?.[0] || '';
    //     const sender = useOpsData?.map((item) => item.sender)?.[0] || '';
    //     const getReached = await getPoweredBy(beneficiary, paymaster);
    //     setresponseData(getReached);
    // };
    // useEffect(() => {
    //     fetchPoweredBy();
    // }, [useOpsData]);
    let skeletonCards = Array(3).fill(0);
    let skeletonCards1 = Array(5).fill(0);
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
                </div>
            </section>
            <HeaderSection item={useOpsData} network={network} />
            <TransactionDetails
                tableLoading={tableLoading}
                skeletonCards={skeletonCards}
                item={useOpsData}
                responseData={responseData}
                network={network}
            />
            <section className="mb-10">
                <div className="container">
                    <div>
                        <Table
                            {...latestUserOpsTable}
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
                                totalRows,
                            }}
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default RecentPaymentMaster;
