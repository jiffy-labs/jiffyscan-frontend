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
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import { NETWORK_ICON_MAP, NETWORK_LIST, NETWORK_SCANNER_MAP } from '@/components/common/constants';

import Tooltip from '@mui/material/Tooltip';
import Skeleton from 'react-loading-skeleton-2';
import moment from 'moment';
import HeaderSection from './HeaderSection';
import TransactionDetails from './TransactionDetails';
import DeveloperDetails from './DeveloperDetails';
import { useConfig } from '@/context/config';
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
function RecentUserOps(props: any) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);
    const { selectedNetwork } = useConfig();

    const hash = props.slug && props.slug[0];
    const network = router.query && router.query.network;

    const [selectedColor, setSelectedColor] = useState(BUTTON_LIST[0].key);
    const [useOpsData, setuserOpsData] = useState<UserOp[]>();
    const [responseData, setresponseData] = useState<PoweredBy>();

    const refreshUserOpsTable = async (name: string, network: string) => {
        setTableLoading(true);
        const userops = await getUserOp(name, network ? network : null);

        setuserOpsData(userops);
        setTimeout(() => {
            setTableLoading(false);
        }, 2000);
    };

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
    }, [useOpsData]);
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
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Link underline="hover" color="inherit" href="/recentUserOps">
                                Recent User Ops
                            </Link>
                            <Link
                                underline="hover"
                                color="text.primary"
                                href={`/userOpHash/${hash}?network=${network ? network : ''}`}
                                aria-current="page"
                            >
                                {shortenString(hash as string)}
                            </Link>
                        </Breadcrumbs>
                    </div>
                </div>
            </section>
            {useOpsData && useOpsData.length > 1 ? (
                <>
                    <div className="overflow-auto flex-1 max-h-[290px] custom-scroll  container mb-5 bg-white border-dark-200 rounded border">
                        <table className="min-w-full divide-y divide-dark-100">
                            <thead className="bg-white">
                                <tr>
                                    {columns.map(({ name, sort }, key) => {
                                        return (
                                            <th
                                                key={key}
                                                className={`py-3.5 border-b border-dark-100 group ${
                                                    columns.length <= 3 ? 'md:first:wx-[55%]' : ''
                                                }`}
                                            >
                                                <div
                                                    role={sort ? 'button' : undefined}
                                                    className={`flex items-center gap-2.5 ${columns.length <= 3 ? '' : ''}`}
                                                >
                                                    <span>{name}</span>
                                                    {name === 'Age' ? sort && <img src="/images/span.svg" alt="" /> : null}
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            {tableLoading ? (
                                <tbody>
                                    {skeletonCards.map((index: number) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td colSpan={5}>
                                                        <Skeleton height={40} key={index} />
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    })}
                                </tbody>
                            ) : (
                                <tbody className="divide-y divide-dark-100">
                                    {useOpsData?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="text-black[87%] text-sm leading-5  py-[14px] px-4">
                                                    {shortenString(item.userOpHash)}
                                                </td>
                                                <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                    {getTimePassed(item.blockTime!)}
                                                </td>
                                                <td
                                                    className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5 text-blue-200"
                                                    onClick={() => {
                                                        setuserOpsData([item]);
                                                    }}
                                                >
                                                    {shortenString(item.sender)}
                                                </td>
                                                <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                    <span className="text-dark-700 text-sm leading-5">
                                                        {shortenString(item.target! ? item.target! : '')}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            )}
                        </table>
                    </div>
                </>
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
