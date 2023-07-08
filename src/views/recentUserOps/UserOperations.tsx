import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import RecentMetrics from '@/components/global/recent_metrics/RecentMetrics';
import React, { useCallback, useEffect, useState } from 'react';
import Table, { tableDataT } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
import table_data from './table_data.json';
import { NETWORK_LIST, NETWORK_ICON_MAP } from '@/components/common/constants';
import { getCurrencySymbol, getFee, getTimePassed } from '@/components/common/utils';
import { getDailyMetrics, getLatestUserOps } from '@/components/common/apiCalls/jiffyApis';
import { useConfig } from '@/context/config';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'lodash';
import usePrevious from '@/hooks/usePrevious';

const DEFAULT_PAGE_SIZE = 10;

function UserOperations() {
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    const prevNetwork = usePrevious(selectedNetwork);
    const [initialSetupDone, setInitialSetupDone] = useState(false);
    const [latestUserOpsTable, setLatestUserOpsTable] = useState<tableDataT>(table_data as tableDataT);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalRows, setTotalRows] = useState(0);
    const [tableLoading, setTableLoading] = useState(true);
    const [captionText, setCaptionText] = useState('');

    const setPageSize = (size: number) => {
        console.log('here', size, pageNo);
        _setPageSize(size);
        setPageNo(0);
    };

    

    useEffect(() => {
        console.log(initialSetupDone, pageNo);
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
        _setPageSize(effectivePageSize);
        
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
        setTotalRows(parseInt(presentDayMetrics?.userOpsTotal || '0'));
        setCaptionText(' ' + parseInt(presentDayMetrics?.userOpsTotal || '0') + ' user operations found');
    };

    const refreshUserOpsTable = async (network: string, pageSize: number, pageNo: number) => {
        setTableLoading(true);
        console.log('testing refresh', pageSize, pageNo);
        const userOps = await getLatestUserOps(network, pageSize, pageNo, toast);
        let newRows = [] as tableDataT['rows'];
        userOps.forEach((userOp) => {
            newRows.push({
                token: {
                    text: userOp.userOpHash,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'userOp',
                },
                ago: getTimePassed(userOp.blockTime!),
                sender: userOp.sender,
                target: userOp.target ? userOp.target : 'Unavailable!',
                fee: getFee(userOp.actualGasCost, userOp.network as string),
                status: userOp.success ? userOp.success : true,
            });
        });
        setLatestUserOpsTable({
            ...latestUserOpsTable,
            rows: newRows.slice(0, pageSize),
        });
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
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Link underline="hover" color="text.primary" href="/recentUserOps" aria-current="page">
                                User Operations
                            </Link>
                        </Breadcrumbs>
                    </div>
                    <h1 className="text-3xl font-bold">User Operations</h1>
                </div>
            </section>
            <RecentMetrics selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork} />
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
                            // table={latestUserOpsTable as tableDataT}
                            pageDetails={{
                                pageNo: pageNo,
                                setPageNo: setPageNo,
                                pageSize: pageSize,
                                setPageSize: setPageSize,
                                totalRows: totalRows,
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

export default UserOperations;
