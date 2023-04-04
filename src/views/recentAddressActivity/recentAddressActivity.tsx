import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getAddressActivity, UserOp } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import Token from '@/components/common/Token';
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import Skeleton from 'react-loading-skeleton-2';
import CopyButton from '@/components/common/copy_button/CopyButton';
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
    { name: 'Fee', sort: true },
];
const DEFAULT_PAGE_SIZE = 10;

function RecentAddressActivity(props: any) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);
    const hash = props.slug && props.slug[0];
    const network = router.query && router.query.network;
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalRows, setTotalRows] = useState(0);

    const [useOpsData, setuserOpsData] = useState<UserOp[]>();

    const refreshUserOpsTable = async (name: string, network: string) => {
        setTableLoading(true);
        const userops = await getAddressActivity(name, network ? network : '');
        console.log('🚀 ~ file: recentAddressActivity.tsx:47 ~ refreshUserOpsTable ~ userops:', userops);
        setuserOpsData(userops);
        setTableLoading(false);
    };

    const setPageSize = (size: number) => {
        _setPageSize(size);
        setPageNo(0);
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
    }, [hash, network]);
    let skeletonCards = Array(5).fill(0);
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
                    <h1 className="font-bold text-3xl">Account</h1>
                </div>
            </section>

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
                                        <td className="text-black[87%] text-sm leading-5  py-[14px] px-4 text-blue-200 flex">
                                            <img src={NETWORK_ICON_MAP[item.network as string]} alt="" className="h-[20px]" />
                                            <Token text={item.userOpHash} type="userOp" />
                                        </td>
                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                            {item.success === true ? (
                                                <span className="flex items-center px-3 py-px  gap-2 rounded-full">
                                                    <img src="/images/Success.svg" alt="" />
                                                    {getTimePassed(item.blockTime!)}
                                                </span>
                                            ) : (
                                                <>
                                                    <span className="flex items-center px-3 py-px  gap-2 rounded-full">
                                                        <img src="/images/failed.svg" alt="" />
                                                        {getTimePassed(item.blockTime!)}
                                                    </span>
                                                </>
                                            )}
                                        </td>
                                        <td
                                            className={`${
                                                prevHash === item.sender ? `text-dark-600` : `text-blue-200`
                                            } whitespace-pre text-black[87%] py-[14px] text-sm leading-5 `}
                                        >
                                            {/* <Token text={item.sender} type="address" /> */}
                                            <div className="flex items-center gap-2.5">
                                                <Link
                                                    href={`/account/${item.sender}?network=${item.network ? item.network : ''}`}
                                                    className="text-blue-200"
                                                >
                                                    {shortenString(item.sender)}
                                                </Link>
                                                <CopyButton text={item.sender} />
                                            </div>
                                        </td>
                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                            <div className="flex items-center gap-2.5">
                                                <Link
                                                    href={`/account/${item.target}?network=${item.network ? item.network : ''}`}
                                                    className="text-blue-200"
                                                >
                                                    {shortenString(item.target!)}
                                                </Link>
                                                <CopyButton text={item.target!} />
                                            </div>
                                            {/* <span className={`text-blue-200 text-sm leading-5`}>
                                                <Token text={item.target! ? item.target! : ''} type="address" />
                                            </span> */}
                                        </td>
                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                            {getFee(item.actualGasCost, item.network)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
            </div>
            {/* <Pagination
                            table={useOpsData as UserOp[]}
                            pageDetails={{
                                pageNo,
                                setPageNo,
                                pageSize,
                                setPageSize,
                                totalRows,
                            }}
                        /> */}
            <Footer />
        </div>
    );
}

export default RecentAddressActivity;
