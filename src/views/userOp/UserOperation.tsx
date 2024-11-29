import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import React, { useEffect, useState } from 'react';

import {
    getPoweredBy,
    getUserOp,
    getUserOpMetadata,
    metadata,
    PoweredBy,
    Trace,
    UserOp,
    showToast,
} from '@/components/common/apiCalls/jiffyApis';
import UserOpLogs from './UserOpLogs';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import { NETWORKS_WHITELISTED_FOR_NO_LOGIN, NETWORK_ICON_MAP } from '@/components/common/constants';

import HeaderSection from './HeaderSection';
import TransactionDetails from './TransactionDetails';
import DeveloperDetails from './DeveloperDetails';
import { useConfig } from '@/context/config';
import Table, { tableDataT } from '@/components/common/table/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from '@/components/global/LoginModal';
import { useUserSession } from '@/context/userSession';
import Tracer from './Tracer';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const passedTime = (time: number) => {
    let currentTime = new Date().getTime();
    let passedTime = currentTime - time;
    return passedTime;
};

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
];

const createDuplicateUserOpsRows = (userOps: UserOp[], handleRowClicked: (id: number) => void): tableDataT['rows'] => {
    let newRows = [] as tableDataT['rows'];
    if (!userOps) return newRows;
    userOps.forEach((userOp, i) => {
        newRows.push({
            token: {
                text: userOp.userOpHash,
                icon: NETWORK_ICON_MAP[userOp.network],
                type: 'userOp',
                onTokenClicked: handleRowClicked,
                value: i,
            },
            ago: getTimePassed(userOp.blockTime!),
            sender: userOp.sender,
            target: userOp.target ? userOp.target : ['Unavailable!'],
            fee: getFee(userOp.actualGasCost, userOp.network as string),
            status: userOp.success ? userOp.success : true,
        });
    });
    return newRows;
};

const getBlockCondition = (expTime: number | null | undefined): boolean => {
    return expTime ? expTime < Date.now() / 1000 : true;
};

function RecentUserOps(props: any) {
    const router = useRouter();
    const [tableLoading, setTableLoading] = useState(true);
    const { selectedNetwork, setSelectedNetwork, addressMapping } = useConfig();

    const { section } = router.query;

    const hash = props.slug && props.slug[0];
    const network = router.query && router.query.network;
    const [selectedColor, setSelectedColor] = useState(BUTTON_LIST[0].key);
    const [userOpsData, setuserOpsData] = useState<UserOp[]>([] as UserOp[]);
    const [showUserOpId, setShowUserOpId] = useState<number>(0);
    const [responseData, setresponseData] = useState<PoweredBy>();
    const [metaData, setMetaData] = useState<metadata>();
    const [duplicateUserOpsRows, setDuplicateUserOpsRows] = useState<tableDataT['rows']>([] as tableDataT['rows']);
    const { isLoggedIn } = useUserSession();
    const [activeTab, setActiveTab] = useState(section || 'overview');

useEffect(() => {
    // If `section` is not provided, set the default to "overview" and update the URL
    if (!section) {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, section: 'overview' },
            },
            undefined,
            { shallow: true } // Avoid full page reload
        );
    } else {
        setActiveTab(section);
    }
}, [section, router]);

const handleTabChange = (tabName: string) => {
    // Update the URL and set the active tab
    router.push(
        {
            pathname: router.pathname,
            query: { ...router.query, section: tabName },
        },
        undefined,
        { shallow: true } // Avoid full page reload
    );
    setActiveTab(tabName);
};


    const renderContent = () => {
        return (
            <div>
                <div className={`${activeTab === 'overview' ? 'block' : 'hidden'}`}>
                    <TransactionDetails
                        tableLoading={tableLoading}
                        skeletonCards={skeletonCards}
                        item={userOpsData?.[showUserOpId]}
                        responseData={responseData}
                        addressMapping={addressMapping}
                        metaData={metaData}
                        setMetadata={setMetaData}
                        selectedNetwork={selectedNetwork}
                    />
                </div>

                <div className={`${activeTab === 'dev_details' ? 'block' : 'hidden'}`}>
                    <DeveloperDetails
                        tableLoading={tableLoading}
                        skeletonCards1={skeletonCards1}
                        item={userOpsData?.[showUserOpId]}
                        selectedColor={selectedColor}
                        BUTTON_LIST={BUTTON_LIST}
                        setSelectedColor={setSelectedColor}
                        selectedNetwork={selectedNetwork}
                        metaData={metaData}
                    />
                </div>

                <div className={`${activeTab === 'logs' ? 'block' : 'hidden'}`}>
                    <UserOpLogs item={userOpsData?.[showUserOpId]} />
                </div>
                {(network === 'base' || network === 'odyssey') && activeTab === 'tracer' && (
                    <>
                        {/* Show the Tracer component only on medium (md) screens and larger */}
                        <div className={`${activeTab === 'tracer' ? 'block' : 'hidden'} hidden md:block`}>
                            <Tracer
                                item={{
                                    ...userOpsData?.[showUserOpId],
                                    transactionHash: userOpsData?.[showUserOpId]?.transactionHash ?? undefined, // Convert null to undefined
                                }}
                                network={''}
                            />
                        </div>

                        {/* Show the title on screens smaller than md, but only for the 'tracer' tab */}

                        <div className="block md:hidden text-center p-8 text-xl text-gray-500 font-medium">
                            Best Viewed on Larger Screens
                        </div>
                    </>
                )}
            </div>
        );
    };
    // const [block, setBlock] = useState(!isLoggedIn());

    // useEffect(() => {
    //     setBlock(!isLoggedIn());
    // }, [isLoggedIn]);

    async function returnUserOpData(hash: string, toast: any) {
        let currentTime = new Date().getTime();
        let userOp = await getUserOp(hash, toast, '');
        while (userOp.length === 0) {
            await sleep(1000);
            userOp = await getUserOp(hash, toast);
            if (passedTime(currentTime) > 10000) {
                showToast(toast, 'Error fetching data');
                break;
            }
        }
        return userOp;
    }

    const refreshUserOpsTable = async (name: string) => {
        setTableLoading(true);

        const pollUserOpData = async () => {
            let userOps = await returnUserOpData(name, toast);
            setuserOpsData(userOps); // Update the UI with the latest data

            // Create and set the rows for the table
            let rows = createDuplicateUserOpsRows(userOps, handleDuplicateRowClick);
            setDuplicateUserOpsRows(rows);

            if (userOps.length > 1) {
                setShowUserOpId(-1);
            }

            if (userOps[0] && userOps[0].network) {
                setSelectedNetwork(userOps[0].network);
                setTableLoading(false);
            }

            // Continue polling if timeSeenInAltMempool exists
            if (userOps[0]?.timeSeenInAltMempool || userOps[0]?.timeSeenInMainMempool) {
                setTimeout(pollUserOpData, 20000); // Poll every 20 seconds
            }
        };

        await pollUserOpData(); // Start the polling process
    };

    const handleDuplicateRowClick = (id: number) => {
        setShowUserOpId(id);
    };

    let prevHash = hash;
    useEffect(() => {
        // Check if hash or network have changed
        if (prevHash !== undefined) {
            prevHash = hash;
            const refreshTable = () => {
                refreshUserOpsTable(hash as string);
            };

            refreshTable();
        }
    }, [hash]);

    const fetchUserOpMetadata = async (hash: string, network: string) => {
        const metaData = await getUserOpMetadata(hash as string, network, toast);
        setMetaData(metaData);
    };

    const fetchPoweredBy = async () => {
        const beneficiary =
            userOpsData
                ?.map((item) => item.beneficiary ?? '')
                .filter((item) => item !== null)
                .join(',') || '';
        const paymaster = userOpsData?.map((item) => item.paymaster)?.[0] || '';
        const sender = userOpsData?.map((item) => item.sender)?.[0] || '';
        const getReached = await getPoweredBy(beneficiary, paymaster, toast);
        setresponseData(getReached);
    };
    useEffect(() => {
        fetchPoweredBy();
    }, []);

    useEffect(() => {
        if (showUserOpId >= 0 && userOpsData.length > showUserOpId) {
            fetchUserOpMetadata(userOpsData[showUserOpId].userOpHash, userOpsData[showUserOpId].network);
        }
    }, [userOpsData, showUserOpId]);

    let skeletonCards = Array(13).fill(0);
    let skeletonCards1 = Array(2).fill(0);
    return (
        <div className="">
            <Navbar searchbar />
            <section className="px-3 py-10">
                <div className="container">
                    <div className="flex flex-row">
                        <Link href="/" className="text-gray-500">
                            <ArrowBackIcon
                                style={{
                                    height: '15px',
                                    width: '15px',
                                    marginRight: '20px',
                                    marginLeft: '10px',
                                    marginBottom: '3px',
                                }}
                            />
                        </Link>

                        <Breadcrumbs aria-label="breadcrumb" className="font-['Roboto']">
                            <Link underline="hover" color="inherit" href={'/' + (selectedNetwork ? '?network=' + selectedNetwork : '')}>
                                Home
                            </Link>
                            <Link underline="hover" color="inherit" href="/recentUserOps">
                                Recent User Ops
                            </Link>
                            <Link
                                underline="hover"
                                color="text.primary"
                                // href={`/userOpHash/${hash}?network=${network ? network : ''}`}
                                onClick={() => setShowUserOpId(-1)}
                                aria-current="page"
                            >
                                {shortenString(hash as string)}
                            </Link>
                        </Breadcrumbs>
                    </div>
                </div>
            </section>
            <div>
                {/* {!(isLoggedIn() || (selectedNetwork && NETWORKS_WHITELISTED_FOR_NO_LOGIN.includes(selectedNetwork))) && (
                    <LoginModal showClose={false} block={block} setBlock={setBlock}></LoginModal>
                )} */}
                <div
                // className={`${
                //     !(isLoggedIn() || (selectedNetwork && NETWORKS_WHITELISTED_FOR_NO_LOGIN.includes(selectedNetwork))) && 'blur'
                // }`}
                >
                    {showUserOpId >= 0 ? (
                        <>
                            <HeaderSection item={userOpsData?.[showUserOpId]} network={network} loading={tableLoading} />
                            <div className="mt-[28px] px-3 ">
                                <div className="container px-0 ">
                                    <div className="flex flex-row gap-[1rem] overflow-x-auto">
                                        <button
                                            onClick={() => handleTabChange('overview')}
                                            className={`py-2 px-4 rounded-[6px] ${
                                                activeTab === 'overview' ? 'bg-gray-800 text-white' : 'bg-gray-200'
                                            }`}
                                        >
                                            Transaction Details
                                        </button>
                                        <button
                                            onClick={() => handleTabChange('dev_details')}
                                            className={`py-2 px-4 rounded-[6px] ${
                                                activeTab === 'dev_details' ? 'bg-gray-800  text-white' : 'bg-gray-200'
                                            }`}
                                        >
                                            Developer Details
                                        </button>
                                        <button
                                            onClick={() => handleTabChange('logs')}
                                            className={`py-2 px-4 rounded-[6px] ${
                                                activeTab === 'logs' ? 'bg-gray-800  text-white' : 'bg-gray-200'
                                            }`}
                                        >
                                            UserOp Logs
                                        </button>
                                        {(network === 'base' || network === 'odyssey') && (
                                            <button
                                                onClick={() => handleTabChange('tracer')}
                                                className={`py-2 px-4 rounded-[6px] ${
                                                    activeTab === 'tracer' ? 'bg-gray-800  text-white' : 'bg-gray-200'
                                                }`}
                                            >
                                                Tracer
                                            </button>
                                        )}
                                    </div>
                                    <div className="mb-[2rem]">{renderContent()}</div>
                                </div>
                            </div>
                        </>
                    ) : (
                        showUserOpId === -1 && (
                            <div className="container mb-16">
                                <Table
                                    columns={columns}
                                    rows={duplicateUserOpsRows}
                                    loading={tableLoading}
                                    caption={{
                                        children: 'Duplicate User Operations',
                                        icon: '/images/cube.svg',
                                        text: 'Approx Number of Operations Processed in the selected chain',
                                    }}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default RecentUserOps;
