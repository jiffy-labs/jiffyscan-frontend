import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import RecentMetrics from '@/components/global/recent_metrics/RecentMetrics';
import React, { useEffect, useState } from 'react';
import Table, { tableDataT } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
import table_data from './table_data.json';
import { NETWORK_ICON_MAP, PAGE_SIZE_LIST } from '@/components/common/constants';
import { getFee, getTimePassed } from '@/components/common/utils';
import { getLatestBundles, getDailyMetrics, getTopPaymasters } from '@/components/common/apiCalls/jiffyApis';
import { useConfig } from '@/context/config';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePrevious from '@/hooks/usePrevious';
import Header from '@/components/common/Header';
import NetworkSelector from '@/components/common/NetworkSelector';
import { SlHome } from 'react-icons/sl';

const METRIC_DATA_POINT_SIZE = 14;
const DEFAULT_PAGE_SIZE = 10;

const getEffectivePageSize = (pageSizeFromParam: string | null | undefined): number => {
    let effectivePageSize;
    effectivePageSize = pageSizeFromParam ? parseInt(pageSizeFromParam) : DEFAULT_PAGE_SIZE;
    if (!PAGE_SIZE_LIST.includes(effectivePageSize)) {
        effectivePageSize = DEFAULT_PAGE_SIZE;
    }
    return effectivePageSize;
};

const getEffectivePageNo = (pageNoFromParam: string | null | undefined, totalRows: number, pageSize: number): number => {
    let effectivePageNo;
    effectivePageNo = pageNoFromParam ? parseInt(pageNoFromParam) : 1;

    if (effectivePageNo > Math.ceil(totalRows / pageSize)) {
        effectivePageNo = Math.ceil(totalRows / pageSize);
    }
    if (effectivePageNo <= 0) {
        effectivePageNo = 1;
    }
    return effectivePageNo;
};

function TopPaymasters(props: any) {
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    const prevNetwork = usePrevious(selectedNetwork);
    const [initialSetupDone, setInitialSetupDone] = useState(false);
    const [topPaymastersTable, setTopPaymastersTable] = useState<tableDataT>(table_data as tableDataT);
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
            refreshPaymatersTable(selectedNetwork, pageSize, pageNo);
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('pageNo', pageNo.toString());
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

        fetchTotalRows().then((totalRows: number) => {
            const effectivePageNo = getEffectivePageNo(pageNoFromParam, totalRows, effectivePageSize);
            setPageNo(effectivePageNo);
            urlParams.set('pageNo', pageNo.toString());
            urlParams.set('pageSize', pageSize.toString());
            window.history.pushState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
            refreshPaymatersTable(selectedNetwork, effectivePageSize, effectivePageNo);
        });

        setInitialSetupDone(true);
    }, [selectedNetwork]);

    const fetchTotalRows = async () => {
        const oneDayMetrics = await getDailyMetrics(selectedNetwork, 1, toast);
        let presentDayMetrics;
        if (oneDayMetrics.length > 0) {
            presentDayMetrics = oneDayMetrics[0];
        }
        setCaptionText(' ' + parseInt(presentDayMetrics?.paymasterTotal || '0') + ' Paymasters found');
        setTotalRows(parseInt(presentDayMetrics?.bundlesTotal || '0'));
        return parseInt(presentDayMetrics?.bundlesTotal || '0');
    };

    const refreshPaymatersTable = async (network: string, pageSize: number, pageNo: number) => {
        setTableLoading(true);
        const paymasters = await getTopPaymasters(network, pageSize, pageNo-1, toast);
        let newRows: tableDataT['rows'] = [];
        paymasters.forEach((paymaster) => {
            newRows.push({
                token: {
                    text: paymaster.address,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'paymaster',
                },
                userOps: `${paymaster.userOpsLength} ops`,
                fee: getFee(parseInt(paymaster.gasSponsored), network),
            });
        });
        setTopPaymastersTable({ ...topPaymastersTable, rows: newRows.slice(0, pageSize) });
        setTimeout(() => {
            setTableLoading(false);
        }, 2000);
        // setTableLoading(false);
    };

    return (
        <div className="dark:bg-[#191A23]">
            <Navbar searchbar />
            <section className="px-3 container mx-auto my-6 py-6 bg-white dark:bg-[#1F202B] shadow-lg rounded-xl border border-[#D7DAE0] dark:border-[#3B3C40]">
                <div className="container">
                    <div className="flex flex-row px-10">
                        
                        <Breadcrumbs aria-label="breadcrumb" >
                            <Link underline="hover" color="inherit" href={`/?network=${selectedNetwork ? selectedNetwork : ''}`}>
                            <SlHome className='dark:fill-white'/>
                            </Link>
                            <Link underline="hover" color="text.primary" href="/paymasters" aria-current="page" className='dark:text-white'>
                                Paymasters
                            </Link>
                        </Breadcrumbs>
                    </div>

                </div>
            
            <div className="container">
                <div className="flex  px-10 flex-wrap items-center justify-between gap-3 py-2 mb-4 md:gap-10">
                <h1 className="text-3xl font-bold dark:text-white">Paymasters</h1>

                    <NetworkSelector selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork} disabled={tableLoading}/>
                </div>
            </div>
            <div className="-mx-3 border-t border-gray-300 dark:border-gray-600 my-4"></div>

            <section className="px-10 my-6">
                <div className="container">
                    <div>
                        <Table
                            {...topPaymastersTable}
                            loading={tableLoading}
                            hideHeader={true}
                            caption={{
                                children: captionText,
                                icon: '/images/cube.svg',
                                text: 'Approx Number of Paymasters in the selected chain',
                            }}
                        />
                            <div className="-mx-[68px] border-t border-gray-300 dark:border-gray-600 my-6"></div>

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
            </section>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default TopPaymasters;
