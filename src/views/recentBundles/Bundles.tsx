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
import latestBundles from '@/pages/recentBundles';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const METRIC_DATA_POINT_SIZE = 14;
const DEFAULT_PAGE_SIZE = 10;

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
                ago: getTimePassed(bundle.blockTime),
                userOps: bundle.userOpsLength + ' ops',
            });
        });
        setLatestBundlesTable({ ...latestBundlesTable, rows: newRows.slice(0, 10) });
        setTimeout(() => {
            setTableLoading(false);
        }, 2000);
        // setTableLoading(false);
    };

    return (
        <div className="">
            <Navbar searchbar />
            <section className="py-10">
                <div className="container">
                    <div className="flex flex-row">
                        <Link href="/" className="text-gray-500">
                            <ArrowBackIcon
                                style={{ height: '15px', width: '15px', marginRight: '20px', marginLeft: '10px', marginBottom: '3px' }}
                            />
                        </Link>
                        <Breadcrumbs aria-label="breadcrumb" className="font-['Roboto']">
                            <Link underline="hover" color="inherit" href={`/?network=${selectedNetwork ? selectedNetwork : ''}`}>
                                Home
                            </Link>
                            <Link underline="hover" color="text.primary" href="/recentBundles" aria-current="page">
                                Bundles
                            </Link>
                        </Breadcrumbs>
                    </div>

                    <h1 className="font-bold text-3xl">Bundles</h1>
                </div>
            </section>
            <RecentMetrics selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork} />
            <section className="mb-10">
                <div className="container">
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
