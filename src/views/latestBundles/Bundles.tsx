import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import RecentMetrics from '@/components/globals/recent_metrics/RecentMetrics';
import React, { useEffect, useState } from 'react';
import Table, { tableDataT } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
import table_data from './table_data.json';
import { NETWORK_LIST, NETWORK_ICON_MAP } from '@/components/common/constants';
import { getCurrencySymbol, getTimePassed } from '@/components/common/utils';
import { getLatestBundles, getDailyMetrics, DailyMetric } from '@/components/common/apiCalls/jiffyApis';
import { useConfig } from '@/context/config';
import latestBundles from '@/pages/latestBundles';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const METRIC_DATA_POINT_SIZE = 14;
const DEFAULT_PAGE_SIZE = 10;
const pages = [
    // { name: 'Home', href: '/', current: false },
    { name: 'LatestBundles', href: '#', current: true },
];
function UserOperations() {
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    const [latestBundlesTable, setLatestBundlesTable] = useState<tableDataT>(table_data as tableDataT);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalRows, setTotalRows] = useState(0);
    const [tableLoading, setTableLoading] = useState(true);
    const [captionText, setCaptionText] = useState('');

    const setPageSize = (size: number) => {
        _setPageSize(size);
        setPageNo(0);
    };

    useEffect(() => {
        refreshUserOpsTable(selectedNetwork, pageSize, pageNo);
    }, [pageNo, pageSize]);

    useEffect(() => {
        setPageNo(0);
        fetchTotalRows();
        refreshUserOpsTable(selectedNetwork, pageSize, pageNo);
    }, [selectedNetwork]);

    const fetchTotalRows = async () => {
        const oneDayMetrics = await getDailyMetrics(selectedNetwork, 1);
        let presentDayMetrics;
        if (oneDayMetrics.length > 0) {
            presentDayMetrics = oneDayMetrics[0];
        }
        setTotalRows(parseInt(presentDayMetrics?.bundlesTotal || '0'));
        setCaptionText(' ' + parseInt(presentDayMetrics?.bundlesTotal || '0') + ' bundles found');
    };

    const refreshUserOpsTable = async (network: string, pageSize: number, pageNo: number) => {
        setTableLoading(true);
        const bundles = await getLatestBundles(network, pageSize, pageNo);
        let newRows = [] as tableDataT['rows'];
        bundles.forEach((bundle) => {
            newRows.push({
                token: {
                    text: bundle.transactionHash,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'bundle',
                },
                ago: getTimePassed(bundle.timestamp),
                userOps: bundle.userOpsLength + ' ops',
            });
        });
        setLatestBundlesTable({ ...latestBundlesTable, rows: newRows.slice(0, 10) });
        setTableLoading(false);
    };

    return (
        <div className="">
            <Navbar searchbar />
            <section className="py-10">
                <div className="container">
                    <h1 className="font-bold text-3xl">User Operations</h1>
                </div>
            </section>
            <RecentMetrics selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork} />
            <section className="mb-10">
                <div className="container">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <div>
                                    <Link href="/" className="text-gray-400 hover:text-gray-500">
                                        <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                        <span className="sr-only">Home</span>
                                    </Link>
                                </div>
                            </li>
                            {pages.map((page) => (
                                <li key={page.name}>
                                    <div className="flex items-center">
                                        <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <a
                                            href={page.href}
                                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                            aria-current={page.current ? 'page' : undefined}
                                        >
                                            {page.name}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    <div>
                        <Table
                            {...latestBundlesTable}
                            loading={tableLoading}
                            caption={{
                                children: captionText,
                                icon: '/images/cube.svg',
                                text: 'Approx Number of Bundles Processed in the selected chain',
                            }}
                        />
                        <Pagination
                            table={latestBundlesTable as tableDataT}
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

export default UserOperations;
