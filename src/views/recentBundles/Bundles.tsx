import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import RecentMetrics from '@/components/global/recent_metrics/RecentMetrics';
import React, { useEffect, useState } from 'react';
import Table, { tableDataT } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
import table_data from './table_data.json';
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import { getTimePassed } from '@/components/common/utils';
import { getLatestBundles, getDailyMetrics } from '@/components/common/apiCalls/jiffyApis';
import { useConfig } from '@/context/config';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePrevious from '@/hooks/usePrevious';
import NetworkSelector from '@/components/common/NetworkSelector';
import Header from '@/components/common/Header';
import { SlHome } from 'react-icons/sl';

const METRIC_DATA_POINT_SIZE = 14;
const DEFAULT_PAGE_SIZE = 10;

function UserOperations(props: any) {
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    const prevNetwork = usePrevious(selectedNetwork);
    const [initialSetupDone, setInitialSetupDone] = useState(false);
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
        if (initialSetupDone) {
            refreshUserOpsTable(selectedNetwork, pageSize, pageNo);
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('pageNo', pageNo.toString());
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
        const effectivePageNo = pageNoFromParam ? parseInt(pageNoFromParam) - 1 : 0;
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
        setTotalRows(parseInt(presentDayMetrics?.bundlesTotal || '0'));
        setCaptionText(' ' + parseInt(presentDayMetrics?.bundlesTotal || '0') + ' bundles found');
    };

    const refreshUserOpsTable = async (network: string, pageSize: number, pageNo: number) => {
        setTableLoading(true);
        const bundles = await getLatestBundles(network, pageSize, pageNo-1, toast);
        let newRows: tableDataT['rows'] = [];
        bundles.forEach((bundle) => {
            console.log('🚀 ~ file: Bundles.tsx:56 ~ refreshUserOpsTable ~ newRows:', bundle.success);
            newRows.push({
                token: {
                    text: bundle.transactionHash,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'bundle',
                },
                ago: getTimePassed(bundle.blockTime),
                userOps: `${bundle.userOpsLength} ops`,
                status: true,
            });
        });
        setLatestBundlesTable({ ...latestBundlesTable, rows: newRows.slice(0, pageSize) });
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
                    
                </div>
    
                <div className="container px-10 ">
                    <div className="flex flex-wrap items-center justify-between gap-3 md:gap-10">
                    <div className="flex flex-row px-10">
                        <Breadcrumbs aria-label="breadcrumb" className="font-gsans text-[#646D8F] text-md sm:text-base">
                            <Link underline="hover" color="inherit" href={`/?network=${selectedNetwork ? selectedNetwork : ''}`}>
                                <SlHome className='dark:fill-white'/>
                            </Link>
                            <Link underline="hover" color="text.primary" href="/recentBundles" aria-current="page" className='dark:text-white'>
                                Bundles
                            </Link>
                        </Breadcrumbs>
                    </div>
                        <NetworkSelector selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork} disabled={tableLoading}/>
                    </div>
                </div>
                <div className="-mx-3 border-t border-gray-300 dark:border-gray-600 my-4"></div>

                <section className="px-10 my-6">
                    <div className="container">
                        <div>
                            <Table
                                {...latestBundlesTable}
                                loading={tableLoading}
                                hideHeader={true}
                                caption={{
                                    children: captionText,
                                    icon: '/images/cube.svg',
                                    text: 'Approx Number of Bundles Processed in the selected chain',
                                }}
                            />
                            {/* Full-width Line Separator */}
                            <div className="-mx-[68px] border-t border-gray-300 dark:border-gray-600 my-6"></div>
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
            </section>
            <ToastContainer />
            <Footer />
        </div>
    );
    
}

export default UserOperations;
