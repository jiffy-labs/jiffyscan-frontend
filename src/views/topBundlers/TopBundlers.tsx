import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import RecentMetrics from '@/components/global/recent_metrics/RecentMetrics';
import React, { useEffect, useState } from 'react';
import Table, { tableDataT } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
import table_data from './table_data.json';
import { NETWORK_ICON_MAP, PAGE_SIZE_LIST } from '@/components/common/constants';
import { getFee, getTimePassed } from '@/components/common/utils';
import { getLatestBundles, getDailyMetrics, getTopBundlers } from '@/components/common/apiCalls/jiffyApis';
import { useConfig } from '@/context/config';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePrevious from '@/hooks/usePrevious';

const METRIC_DATA_POINT_SIZE = 14;
const DEFAULT_PAGE_SIZE = 10;

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

function TopBundlers(props: any) {
    const { selectedNetwork, setSelectedNetwork, addressMapping } = useConfig();
    const prevNetwork = usePrevious(selectedNetwork);
    const [initialSetupDone, setInitialSetupDone] = useState(false);
    const [topBundlersTable, setTopBundlersTable] = useState<tableDataT>(table_data as tableDataT);
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
            refreshBundlersTable(selectedNetwork, pageSize, pageNo);
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('pageNo', (pageNo).toString());
            urlParams.set('pageSize', pageSize.toString());
            window.history.pushState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
        }
    }, [pageNo, pageSize]);

    useEffect(() => {
        let pageNoFromParam: string | null | undefined;
        let pageSizeFromParam;
        const urlParams = new URLSearchParams(window.location.search);

        if (prevNetwork == '' || prevNetwork == selectedNetwork) {
            pageNoFromParam = urlParams.get('pageNo');
            pageSizeFromParam = urlParams.get('pageSize');
        }
        
        const effectivePageSize = getEffectivePageSize(pageSizeFromParam);
        _setPageSize(effectivePageSize);

        fetchTotalRows().then((totalRows) => {
            const effectivePageNo = getEffectivePageNo(pageNoFromParam, totalRows, effectivePageSize);
            setPageNo(effectivePageNo);
            urlParams.set('pageNo', (pageNo).toString());
            urlParams.set('pageSize', pageSize.toString());
            window.history.pushState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
            refreshBundlersTable(selectedNetwork, effectivePageSize, effectivePageNo);
        });

        setInitialSetupDone(true);
    }, [selectedNetwork]);

    useEffect(() => {
        let rows = topBundlersTable.rows;
        console.log('modifying the address mapping',addressMapping);
        if (rows)
            rows.forEach((row) => {
                if (row?.token?.text) 
                    row.poweredBy = addressMapping?.[row.token.text]?.company;
            });
        setTopBundlersTable({ ...topBundlersTable, rows });
    }, [addressMapping])

    const fetchTotalRows = async () => {
        const oneDayMetrics = await getDailyMetrics(selectedNetwork, 1, toast);
        let presentDayMetrics;
        if (oneDayMetrics.length > 0) {
            presentDayMetrics = oneDayMetrics[0];
        }
        setCaptionText(' ' + parseInt(presentDayMetrics?.bundlerTotal || '0') + ' bundlers found');
        setTotalRows(parseInt(presentDayMetrics?.bundlesTotal || '0'));
        return parseInt(presentDayMetrics?.bundlesTotal || '0');
    };

    const refreshBundlersTable = async (network: string, pageSize: number, pageNo: number) => {
        setTableLoading(true);
        const bundlers = await getTopBundlers(network, pageSize, pageNo, toast);
        let newRows: tableDataT['rows'] = [];
        bundlers.forEach((bundler) => {
            newRows.push({
                token: {
                    text: bundler.address,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'bundler',
                },
                userOps: `${bundler.bundleLength} bundles`,
                fee: getFee(parseInt(bundler.actualGasCostSum), network),
            });
        });
        console.log(newRows);
        setTopBundlersTable({ ...topBundlersTable, rows: newRows });
        setTableLoading(false);
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
                                Bundlers
                            </Link>
                        </Breadcrumbs>
                    </div>

                    <h1 className="text-3xl font-bold">Bundlers</h1>
                </div>
            </section>
            <RecentMetrics selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork} />
            <section className="mb-10">
                <div className="container">
                    <div>
                        <Table
                            {...topBundlersTable}
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

export default TopBundlers;
