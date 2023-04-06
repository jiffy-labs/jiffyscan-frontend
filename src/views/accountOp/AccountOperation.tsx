import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getAccountDetails, getDailyMetrics, PoweredBy, UserOp } from '@/components/common/apiCalls/jiffyApis';
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
function RecentAccountOps(props: any) {
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

    const prevPageNoRef = useRef<number>();
    const refreshUserOpsTable = useCallback(
        async (name: string, network: string) => {
            if (prevPageNoRef.current === pageNo) {
                // Exit early if the page number hasn't changed
                return;
            }
            setTableLoading(true);
            const userops = await getAccountDetails(name, network ? network : '');
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
                ...latestUserOpsTable,
                rows: newRows.slice(pageNo * pageSize, (pageNo + 1) * pageSize),
                columns: columns,
                loading: false,
            });
            setCaptionText(' ' + (userops?.userOps?.length || '0') + ' user operations found');
            setTotalRows(userops?.userOpsCount!);
            setuserOpsData(userops);
            setTableLoading(false); // Set loading to false after updating the table
            prevPageNoRef.current = pageNo;
        },
        [hash, network, pageNo],
    );
    let prevHash = hash;
    let prevNetwork = network;
    useEffect(() => {
        if (prevHash !== undefined || prevNetwork !== undefined) {
            prevHash = hash;
            prevNetwork = network;
            const refreshTable = () => {
                refreshUserOpsTable(hash as string, network as string);
            };
            refreshTable();
        }
    }, [hash, network, pageNo, prevPageNoRef.current]);

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
                                href={`/account/${hash}?network=${network ? network : ''}`}
                                aria-current="page"
                            >
                                {shortenString(hash as string)}
                            </Link>
                        </Breadcrumbs>
                    </div>
                </div>
            </section>
            <HeaderSection item={useOpsData} network={network} />
            <TransactionDetails item={useOpsData} responseData={responseData} network={network} />
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

export default RecentAccountOps;
