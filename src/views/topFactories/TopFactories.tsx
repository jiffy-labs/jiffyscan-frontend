import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import RecentMetrics from '@/components/global/recent_metrics/RecentMetrics';
import React, { useEffect, useState } from 'react';
import Table, { tableDataT } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
import table_data from './table_data.json';
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import { getFee, getTimePassed } from '@/components/common/utils';
import { getLatestBundles, getDailyMetrics, getTopFactories } from '@/components/common/apiCalls/jiffyApis';
import { useConfig } from '@/context/config';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePrevious from '@/hooks/usePrevious';

const METRIC_DATA_POINT_SIZE = 14;
const DEFAULT_PAGE_SIZE = 10;

function TopFactories(props: any) {
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    const prevNetwork = usePrevious(selectedNetwork);
    const [initialSetupDone, setInitialSetupDone] = useState(false);
    const [topFactoriesTable, setTopFactoriesTable] = useState<tableDataT>(table_data as tableDataT);
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
        if (initialSetupDone) {
            refreshUserOpsTable(selectedNetwork, pageSize, pageNo);
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('pageNo', (pageNo+1).toString());
            urlParams.set('pageSize', pageSize.toString());
            window.history.pushState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
        }
    }, [pageNo, pageSize]);

    useEffect(() => {
        let pageNoFromParam;
        let pageSizeFromParam;
        if (prevNetwork == '' || prevNetwork == selectedNetwork) {
            const urlParams = new URLSearchParams(window.location.search);
            pageNoFromParam = urlParams.get('pageNo');
            pageSizeFromParam = urlParams.get('pageSize');
        }
        const effectivePageNo = pageNoFromParam ? parseInt(pageNoFromParam)-1 : 0;
        const effectivePageSize = pageSizeFromParam ? parseInt(pageSizeFromParam) : DEFAULT_PAGE_SIZE;

        setPageNo(effectivePageNo);
        fetchTotalRows();
        refreshUserOpsTable(selectedNetwork, effectivePageSize, effectivePageNo);

        setInitialSetupDone(true);
    }, [selectedNetwork]);

    const fetchTotalRows = async () => {
        const oneDayMetrics = await getDailyMetrics(selectedNetwork, 1, toast);
        let presentDayMetrics;
        if (oneDayMetrics.length > 0) {
            presentDayMetrics = oneDayMetrics[0];
        }
        setCaptionText(' ' + parseInt(presentDayMetrics?.factoryTotal || '0') + ' factories found');
        setTotalRows(parseInt(presentDayMetrics?.factoryTotal || '0'));
    };

    const refreshUserOpsTable = async (network: string, pageSize: number, pageNo: number) => {
        setTableLoading(true);
        const factories = await getTopFactories(network, pageSize, pageNo, toast);
        let newRows: tableDataT['rows'] = [];
        factories.forEach((factory) => {
            newRows.push({
                token: {
                    text: factory.address,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'factory',
                },
                userOps: `${factory.accountsLength} accounts`,
            });
        });
        setTopFactoriesTable({ ...topFactoriesTable, rows: newRows.slice(0, pageSize) });
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
                            <Link underline="hover" color="text.primary" href="/bundler" aria-current="page">
                                Factories
                            </Link>
                        </Breadcrumbs>
                    </div>

                    <h1 className="text-3xl font-bold">Factories</h1>
                </div>
            </section>
            <RecentMetrics selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork} />
            <section className="mb-10">
                <div className="container">
                    <div>
                        <Table
                            {...topFactoriesTable}
                            loading={tableLoading}
                            caption={{
                                children: captionText,
                                icon: '/images/cube.svg',
                                text: 'Approx Number of Bundles Processed in the selected chain',
                            }}
                        />
                        <Pagination
                            // table={latestBundlesTable as tableDataT}
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
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default TopFactories;
