import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getAddressActivity } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getTimePassed, shortenString } from '@/components/common/utils';
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import Pagination from '@/components/common/table/Pagination';
import Table, { getFee, tableDataT } from '@/components/common/table/Table';

const columns = [
    { name: 'Hash', sort: true },
    { name: 'Age', sort: true },
    { name: 'Sender', sort: true },
    { name: 'Target', sort: true },
    { name: 'Fee', sort: true },
];
const DEFAULT_PAGE_SIZE = 10;

function RecentAddressActivity(props: any) {
    const router = useRouter();
    const [tableLoading, setTableLoading] = useState(true);
    const hash = props.slug && props.slug[0];
    const network = router.query && router.query.network;
    const [latestUserOpsTable, setLatestUserOpsTable] = useState<tableDataT>({
        rows: [],
        caption: undefined,
        columns: [],
        loading: false,
    });
    const [captionText, setCaptionText] = useState('');
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalRows, setTotalRows] = useState(0);

    const setPageSize = (size: number) => {
        _setPageSize(size);
        setPageNo(0);
    };

    const refreshUserOpsTable = async (name: string, network: string) => {
        setTableLoading(true);
        const userops = await getAddressActivity(name, network ? network : '');
        let newRows = [] as tableDataT['rows'];
        userops.forEach((userOp) => {
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
        setCaptionText(' ' + (userops?.length || '0') + ' user operations found');
        setTotalRows(userops.length);
        setTableLoading(false);
    };

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
    }, [hash, network]);

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
                    <h1 className="font-bold text-3xl">Address</h1>
                </div>
            </section>

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

export default RecentAddressActivity;
