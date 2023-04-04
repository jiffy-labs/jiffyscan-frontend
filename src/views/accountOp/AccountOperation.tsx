import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getAccountDetails, getPoweredBy, getUserOp, PoweredBy, UserOp } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Caption from '@/components/common/table/Caption';
import IconText from '@/components/common/IconText';
import Chip from '@/components/common/chip/Chip';
import sx from './usertable.module.sass';
import { useRouter } from 'next/router';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import { NETWORK_ICON_MAP, NETWORK_LIST, NETWORK_SCANNER_MAP } from '@/components/common/constants';

import Tooltip from '@mui/material/Tooltip';
import Skeleton from 'react-loading-skeleton-2';
import moment from 'moment';
import HeaderSection from './HeaderSection';
import TransactionDetails from './TransactionDetails';
import DeveloperDetails from './DeveloperDetails';
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

function RecentAccountOps(props: any) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);

    const hash = props.slug && props.slug[0];
    const network = router.query && router.query.network;

    const [selectedColor, setSelectedColor] = useState(BUTTON_LIST[0].key);
    const [useOpsData, setuserOpsData] = useState<UserOp>();
    const [responseData, setresponseData] = useState<PoweredBy>();

    const refreshUserOpsTable = async (name: string, network: string) => {
        setTableLoading(true);
        const userops = await getAccountDetails(name, network ? network : '');
        setuserOpsData(userops);
        setTimeout(() => {
            setTableLoading(false);
        }, 2000);
    };

    let prevHash = hash;
    let prevNetwork = network;
    useEffect(() => {
        // Check if hash or network have changed
        if (prevHash !== undefined || prevNetwork !== undefined) {
            prevHash = hash;
            prevNetwork = network;
            const refreshTable = () => {
                refreshUserOpsTable(hash as string, network as string);
            };

            refreshTable();
        }
    }, [hash]);
    // const fetchPoweredBy = async () => {
    //     const beneficiary =
    //         useOpsData
    //             ?.map((item) => item.beneficiary ?? '')
    //             .filter((item) => item !== null)
    //             .join(',') || '';
    //     const paymaster = useOpsData?.map((item) => item.paymaster)?.[0] || '';
    //     const sender = useOpsData?.map((item) => item.sender)?.[0] || '';
    //     const getReached = await getPoweredBy(beneficiary, paymaster);
    //     setresponseData(getReached);
    // };
    // useEffect(() => {
    //     fetchPoweredBy();
    // }, [useOpsData]);
    let skeletonCards = Array(6).fill(0);
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
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Link underline="hover" color="inherit" href="/recentUserOps">
                                Recent User Ops
                            </Link>
                            <Link
                                underline="hover"
                                color="text.primary"
                                href={`/address/${hash}?network=${network ? network : ''}`}
                                aria-current="page"
                            >
                                {shortenString(hash as string)}
                            </Link>
                        </Breadcrumbs>
                    </div>
                </div>
            </section>
            <HeaderSection item={useOpsData} network={network} />
            <TransactionDetails
                tableLoading={tableLoading}
                skeletonCards={skeletonCards}
                item={useOpsData}
                responseData={responseData}
                network={network}
            />
            <DeveloperDetails
                tableLoading={tableLoading}
                skeletonCards1={skeletonCards1}
                item={useOpsData}
                selectedColor={selectedColor}
                BUTTON_LIST={BUTTON_LIST}
                setSelectedColor={setSelectedColor}
                open={open}
                setOpen={setOpen}
                network={network}
                prevHash={prevHash}
            />

            <Footer />
        </div>
    );
}

export default RecentAccountOps;
