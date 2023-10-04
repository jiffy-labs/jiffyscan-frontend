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
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import { NETWORK_ICON_MAP } from '@/components/common/constants';

import HeaderSection from './HeaderSection';
import TransactionDetails from './TransactionDetails';
import DeveloperDetails from './DeveloperDetails';
import { useConfig } from '@/context/config';
import Table, { tableDataT } from '@/components/common/table/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paywall from '@/components/global/Paywall';
import { useUserSession } from '@/context/userSession';

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
} 

function RecentUserOps(props: any) {
    const router = useRouter();
    const [tableLoading, setTableLoading] = useState(true);
    const { selectedNetwork, setSelectedNetwork, addressMapping } = useConfig();
    const [block, setBlock] = useState(false);

    const hash = props.slug && props.slug[0];
    const network = router.query && router.query.network;
    const [selectedColor, setSelectedColor] = useState(BUTTON_LIST[0].key);
    const [userOpsData, setuserOpsData] = useState<UserOp[]>([] as UserOp[]);
    const [showUserOpId, setShowUserOpId] = useState<number>(0);
    const [responseData, setresponseData] = useState<PoweredBy>();
    const [metaData, setMetaData] = useState<metadata>();
    const [duplicateUserOpsRows, setDuplicateUserOpsRows] = useState<tableDataT['rows']>([] as tableDataT['rows']);
    const { isLoggedIn } = useUserSession();

    useEffect(() => {
        console.log(!isLoggedIn());
        setBlock(!isLoggedIn());
    }, [isLoggedIn]);

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
        if (userOpsData === undefined) {
            setTableLoading(true);
        }
        // setShowUserOpId(-1)
        // const userOps = await getUserOp(name, toast);
        const userOps = await returnUserOpData(name, toast);

        setuserOpsData(userOps);
        let rows: tableDataT['rows'] = createDuplicateUserOpsRows(userOps, handleDuplicateRowClick);
        setDuplicateUserOpsRows(rows);
        if (userOps.length > 1) setShowUserOpId(-1);
        else {
            if (userOps[0].block) setBlock(true);
        }

        if (userOps[0] && userOps[0].network) {
            setSelectedNetwork(userOps[0].network);
        }

        setTimeout(() => {
            setTableLoading(false);
        }, 1000);
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
                {block && <Paywall showClose={false} block={block} setBlock={setBlock}></Paywall>}
                <div className={`${block && 'blur'}`}>
                    {showUserOpId >= 0 ? (
                        <>
                            <HeaderSection item={userOpsData?.[showUserOpId]} network={network} loading={tableLoading} />
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
