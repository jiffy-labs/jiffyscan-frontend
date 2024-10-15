import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getBundleDetails, UserOp, AccountDetail, Bundle } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link, Tabs, Tab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import Token from '@/components/common/Token';
import { NETWORKS_WHITELISTED_FOR_NO_LOGIN, NETWORK_ICON_MAP } from '@/components/common/constants';
import Skeleton from 'react-loading-skeleton-2';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Table, { tableDataT } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
import TransactionDetails from './TransactionDetails';
import HeaderSection from './HeaderSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserSession } from '@/context/userSession';
import LoginModal from '@/components/global/LoginModal';
import Tracer from './Tracer';

const DEFAULT_PAGE_SIZE = 10;

const columns = [
    { name: 'UserOp Hash', sort: true },
    { name: 'Age', sort: true },
    { name: 'Sender', sort: false },
    { name: 'Target', sort: false },
    { name: 'Fee', sort: true },
];

const createUserOpsTableRows = (userOps: UserOp[]): tableDataT['rows'] => {
    let newRows = [] as tableDataT['rows'];
    if (!userOps) return newRows;
    userOps.forEach((userOp) => {
        newRows.push({
            token: {
                text: userOp.userOpHash,
                icon: NETWORK_ICON_MAP[userOp.network],
                type: 'userOp',
            },
            ago: getTimePassed(userOp.blockTime!),
            sender: userOp.sender,
            target: userOp.target!,
            fee: getFee(userOp.actualGasCost, userOp.network as string),
            status: userOp.success!,
        });
    });
    return newRows;
};

interface BundleInfo {
    userOpsLength: number;
    blockNumber: number;
    blockTime: number;
    transactionHash: string;
    from: string;
    network: string;
    status: number;
    transactionFee: number;
}

const createBundleInfoObject = (bundleDetails: Bundle): BundleInfo => {
    return {
        userOpsLength: bundleDetails.userOpsLength,
        blockNumber: bundleDetails.blockNumber,
        blockTime: bundleDetails.blockTime,
        transactionHash: bundleDetails.transactionHash,
        network: bundleDetails.network,
        status: bundleDetails.status,
        transactionFee: bundleDetails.transactionFee,
        from: bundleDetails.from,
    };
};

function Bundler(props: any) {
    const router = useRouter();
    const [tableLoading, setTableLoading] = useState(true);
    const hash = props.slug && props.slug[0];
    const network = router.query && (router.query.network as string);
    const [rows, setRows] = useState([] as tableDataT['rows']);
    const [bundleInfo, setBundleInfo] = useState<BundleInfo>();
    const [userOps, setUserOps] = useState<UserOp[]>();
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [captionText, setCaptionText] = useState('N/A User Ops found');
    const [activeTab, setActiveTab] = useState('details');

    const { isLoggedIn } = useUserSession();

    const updateRowsData = async (network: string, pageNo: number, pageSize: number) => {
        setTableLoading(true);
        if (bundleInfo == undefined) {
            return;
        }
        const addressDetail = await getBundleDetails(bundleInfo.transactionHash, network ? network : '', pageNo, pageSize, toast);
        const rows = createUserOpsTableRows(addressDetail.userOps);
        setRows(rows);
        setTableLoading(false);
    };

    const loadBundleDetails = async (name: string, network: string) => {
        setTableLoading(true);
        const bundleDetail = await getBundleDetails(name, network ? network : '', DEFAULT_PAGE_SIZE, pageNo, toast);
        const bundleInfo = createBundleInfoObject(bundleDetail);
        setBundleInfo(bundleInfo);
    };

    useEffect(() => {
        updateRowsData(network ? network : '', pageNo, pageSize);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('pageNo', pageNo.toString());
        urlParams.set('pageSize', pageSize.toString());
        window.history.pushState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
    }, [pageNo, bundleInfo]);

    useEffect(() => {
        const captionText = `${bundleInfo?.userOpsLength} User Ops found`;
        setCaptionText(captionText);
    }, [bundleInfo]);

    useEffect(() => {
        loadBundleDetails(hash as string, network as string);
    }, [hash, network]);

    return (
        <div className="">
            <Navbar searchbar />
            <section className="px-4 py-10">
                <div className="container px-4">
                    <div className="flex flex-row">
                        <Link href="/" className="text-gray-500">
                            <ArrowBackIcon style={{ height: '15px', width: '15px', marginRight: '20px', marginLeft: '10px', marginBottom: '3px' }} />
                        </Link>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href={`/?network=${network ? network : ''}`}>
                                Home
                            </Link>
                            <Link underline="hover" color="inherit" href={`/block/${hash}?network=${network ? network : ''}`}>
                                Block
                            </Link>
                            <Link underline="hover" color="text.primary" href={`/address/${hash}?network=${network ? network : ''}`} aria-current="page">
                                {shortenString(hash as string)}
                            </Link>
                        </Breadcrumbs>
                    </div>
                    <h1 className="text-3xl font-bold px-4 py-2">Bundle</h1>
                    <HeaderSection item={bundleInfo} network={network} />
                </div>
                
            </section>
            
            <div className="container px-4">
                {/* Tabs for toggling between details and tracer */}
                <Tabs className='px-4' value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)}>
                    <Tab label="Bundle Details" value="details" />
                    <Tab label="Transaction Tracer" value="tracer" />
                </Tabs>
                
                {activeTab === 'details' && (
                    <>  
                        <TransactionDetails item={bundleInfo} network={network} tableLoading={tableLoading} />
                        <div className="container px-4">
                            <div className='shadow-300 rounded-md'>
                                <Table
                                    rows={rows}
                                    columns={columns}
                                    loading={tableLoading}
                                    caption={{
                                        children: captionText,
                                        icon: '/images/cube.svg',
                                        text: 'Approx Number of Operations Processed in the selected chain',
                                    }}
                                />
                            </div>
                            <Pagination
                                pageDetails={{
                                    pageNo,
                                    setPageNo,
                                    pageSize,
                                    setPageSize,
                                    totalRows: bundleInfo?.userOpsLength != null ? bundleInfo.userOpsLength : 0,
                                }}
                            />
                        </div>
                    </>
                )}

                {activeTab === 'tracer' && (
                    <>
                        {hash && network === 'base' && (
                            <div className="container px-4 md:block hidden">
                                <Tracer trxHash={hash} network={network} />
                            </div>
                        )}
                        <div className='md:hidden shadow-300 p-4'>
                            Transaction Traces Best Viewed on Larger Screens
                        </div>
                    </>
                )}
            </div>

            <ToastContainer />
            <Footer />
        </div>
    );
}

export default Bundler;
