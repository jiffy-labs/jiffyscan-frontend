import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getPoweredBy, getUserOp, PoweredBy, UserOp } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Caption from '@/components/common/table/Caption';
import IconText from '@/components/common/IconText';
import Chip from '@/components/common/chip/Chip';
import sx from './usertable.module.sass';
import { useRouter } from 'next/router';
import { getTimePassed, shortenString } from '@/components/common/utils';
import { fallBack, NETWORK_ICON_MAP, NETWORK_LIST, NETWORK_SCANNER_MAP } from '@/components/common/constants';

import Tooltip from '@mui/material/Tooltip';
import Skeleton from 'react-loading-skeleton-2';
import moment from 'moment';
import HeaderSection from './HeaderSection';
import TransactionDetails from './TransactionDetails';
import DeveloperDetails from './DeveloperDetails';
import { useConfig } from '@/context/config';
import Table, { tableDataT, getFee } from '@/components/common/table/Table';
import User from '@/components/globals/navbar/User';
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
                value: i
            },
            ago: getTimePassed(userOp.blockTime!),
            sender: userOp.sender,
            target: userOp.target!,
            fee: getFee(userOp.actualGasCost, userOp.network as string),
            status: userOp.success!,
        });
    });
    return newRows;
}

function RecentUserOps(props: any) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);
    const { selectedNetwork, setSelectedNetwork } = useConfig();

    const hash = props.slug && props.slug[0];
    const network = router.query && router.query.network;

    const [selectedColor, setSelectedColor] = useState(BUTTON_LIST[0].key);
    const [useOpsData, setuserOpsData] = useState<UserOp[]>();
    const [showUserOpId, setShowUserOpId] = useState<number>(-1);
    const [responseData, setresponseData] = useState<PoweredBy>();
    const [duplicateUserOpsRows, setDuplicateUserOpsRows] = useState<tableDataT['rows']>([] as tableDataT['rows']);

    const refreshUserOpsTable = async (name: string, network: string) => {
        setTableLoading(true);
        const userOps = await getUserOp(name);

        setuserOpsData(userOps);
        let rows: tableDataT['rows'] = createDuplicateUserOpsRows(userOps, handleDuplicateRowClick);
        setDuplicateUserOpsRows(rows);
        if (userOps.length == 1) setShowUserOpId(0);

        if (userOps[0] && userOps[0].network) {
            setSelectedNetwork(userOps[0].network);
        }

        setTimeout(() => {
            setTableLoading(false);
        }, 2000);
    };

    const handleDuplicateRowClick = (id: number) => {
        setShowUserOpId(id);
    }

    let prevHash = hash;
    useEffect(() => {
        // Check if hash or network have changed
        if (prevHash !== undefined) {
            prevHash = hash;
            const refreshTable = () => {
                refreshUserOpsTable(hash as string, selectedNetwork as string);
            };

            refreshTable();
        }
    }, [hash, selectedNetwork]);

    const fetchPoweredBy = async () => {
        const beneficiary =
            useOpsData
                ?.map((item) => item.beneficiary ?? '')
                .filter((item) => item !== null)
                .join(',') || '';
        const paymaster = useOpsData?.map((item) => item.paymaster)?.[0] || '';
        const sender = useOpsData?.map((item) => item.sender)?.[0] || '';
        const getReached = await getPoweredBy(beneficiary, paymaster);
        setresponseData(getReached);
    };
    useEffect(() => {
        fetchPoweredBy();
    }, []);
    let skeletonCards = Array(13).fill(0);
    let skeletonCards1 = Array(5).fill(0);
    return (
        <div className="">
            <Navbar searchbar />
            <section className="py-10 px-3">
                <div className="container">
                    <div className="flex flex-row">
                        <Link href="/" className="text-gray-500">
                            <ArrowBackIcon
                                style={{ height: '15px', width: '15px', marginRight: '20px', marginLeft: '10px', marginBottom: '3px' }}
                            />
                        </Link>
                        <Breadcrumbs aria-label="breadcrumb" className="font-['Roboto']">
                            <Link underline="hover" color="inherit" href={"/"+(selectedNetwork ? '?network='+selectedNetwork : '')}>
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
            {showUserOpId == -1 ? (
                <div className="container">
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
            ) : (
                <>
                    {useOpsData?.map((item) => {
                        return (
                            <>
                                <HeaderSection item={item} network={network} />
                                <TransactionDetails
                                    tableLoading={tableLoading}
                                    skeletonCards={skeletonCards}
                                    item={item}
                                    responseData={responseData}
                                />
                                <DeveloperDetails
                                    tableLoading={tableLoading}
                                    skeletonCards1={skeletonCards1}
                                    item={item}
                                    selectedColor={selectedColor}
                                    BUTTON_LIST={BUTTON_LIST}
                                    setSelectedColor={setSelectedColor}
                                    open={open}
                                    setOpen={setOpen}
                                />
                            </>
                        );
                    })}
                </>
            )}

            <Footer />
        </div>
    );
}

export default RecentUserOps;
