import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { getUserOp, UserOp } from '@/components/common/apiCalls/jiffyApis';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Caption from '@/components/common/table/Caption';
import IconText from '@/components/common/IconText';
import Chip from '@/components/common/chip/Chip';
import sx from './usertable.module.sass';
import { useRouter } from 'next/router';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import { NETWORK_ICON_MAP, NETWORK_LIST } from '@/components/common/constants';

import Tooltip from '@mui/material/Tooltip';
import Skeleton from 'react-loading-skeleton-2';
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
    const hash = props.slug && props.slug[0];
    const network = router.query && router.query.network;

    const [selectedColor, setSelectedColor] = useState('#1976D2');
    const [useOpsData, setuserOpsData] = useState<UserOp[]>();

    const refreshUserOpsTable = async (name: string, network: string) => {
        setTableLoading(true);
        const userops = await getUserOp(name || '0x43fe1ef830cbc6447ca8a740963099fe7fb6b137ac7768aa9c8f5913aaf8f91b', network || 'manniet');
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
                                href={`/userOpHash/${hash}${network ? network : ''}`}
                                aria-current="page"
                            >
                                {shortenString((hash as string) || '0x43fe1ef830cbc6447ca8a740963099fe7fb6b137ac7768aa9c8f5913aaf8f91b')}
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
                                skeletonCards.map((index: number) => <Skeleton height={60} key={index} />)
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
                                                        console.log(item);
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
                                <section className=" px-3">
                                    <div className="container  bg-white rounded shadow-200 px-[16px] py-[12px]">
                                        <h3 className="text-[15px]  leading-[28px] font-bold text-dark-600">User Operation Hash</h3>
                                        <div className="md:flex items-center gap-4 pt-[14px] pb-[2px]">
                                            <div className="flex items-center gap-2">
                                                <img src={NETWORK_ICON_MAP[network as string]} alt="" className="h-[20px]" />
                                                <span className="text-sm font-normal leading-5 text-dark-600">
                                                    {NETWORK_LIST.find((el) => el.key === item.network)?.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center break-words gap-2 flex-1">
                                                <span className="text-blue-200 text-sm break-all leading-5">{item.userOpHash}</span>
                                                <CopyButton text={item.userOpHash} />
                                                <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                    <img src="/images/graph.svg" alt="" />
                                                </button>
                                            </div>
                                            <span className="text-bluegrey-300 text-[10px] leading-5 flex items-center gap-2 font-normal">
                                                Power by <img src="/images/pimlico.svg" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </section>
                                <section className="mt-[48px] px-3">
                                    <div className="container px-0">
                                        <div>
                                            <Caption icon={'/images/cube.svg'} text={''}>
                                                Transaction Details
                                            </Caption>
                                        </div>
                                        <div className="bg-white overflow-auto rounded shadow-300 ">
                                            {tableLoading ? (
                                                skeletonCards.map((index: number) => <Skeleton height={55} key={index} />)
                                            ) : (
                                                <table className="min-w-full divide-y divide-gray-600">
                                                    <tbody className="min-w-full divide-y divide-gray-300">
                                                        <tr>
                                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                                <IconText icon={'/images/sader.svg'}>Sender</IconText>
                                                            </td>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <div className="flex items-center gap-2 flex-1">
                                                                    <span className="text-dark-600 text-sm leading-5">{item.sender}</span>
                                                                    <CopyButton text={item.sender} />
                                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                                        <img src="/images/share.svg" alt="" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="py-[14px] px-4 text-right">
                                                                <span className="text-bluegrey-300 text-[10px] leading-5 flex justify-end items-center gap-2 font-normal">
                                                                    Power by <img src="/images/pimlico.svg" alt="" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                                <IconText icon={'/images/Receiver.svg'}>Receiver</IconText>
                                                            </td>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <div className="flex items-center gap-2 flex-1">
                                                                    <span className="text-dark-600 text-sm leading-5">{item.target}</span>
                                                                    <CopyButton text={item.target!} />
                                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                                        <img src="/images/share.svg" alt="" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="py-[14px] px-4 text-right">
                                                                <span className="text-bluegrey-300 text-[10px] leading-5 flex justify-end items-center gap-2 font-normal">
                                                                    Power by <img src="/images/pimlico.svg" alt="" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                                <IconText icon={'/images/sader.svg'}>Block Time</IconText>
                                                            </td>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <span className="text-dark-600 text-sm leading-5">
                                                                    {/* {moment(item.blockTime).format('YYYY-MM-DD')} */}
                                                                    Sat Mar 04 2023 18:20:00 GMT+0200 (Eastern European Standard Time)
                                                                </span>
                                                            </td>
                                                            <td className="py-[14px] px-4 text-right"></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                                <IconText icon={'/images/delete.svg'}>Status</IconText>
                                                            </td>

                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <div className="flex">
                                                                    <Tooltip
                                                                        arrow={true}
                                                                        placement="top"
                                                                        title={`A Status code indicating if the top level call is succeeded or failed(applicable for Post BYZANTIUM blocks only)`}
                                                                    >
                                                                        {item.success === true ? (
                                                                            <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#4CAF50]">
                                                                                <img src="/images/Success.svg" alt="" />
                                                                                <span className="font-normal text-[12px] leading-5 text-dark-600">
                                                                                    Success
                                                                                </span>
                                                                            </span>
                                                                        ) : (
                                                                            <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#d81a14]">
                                                                                <img src="/images/failed.svg" alt="" />
                                                                                <span className="font-normal text-[12px] leading-5 text-dark-600">
                                                                                    Failed
                                                                                </span>
                                                                                <span>{item.revertReason}</span>
                                                                            </span>
                                                                        )}
                                                                    </Tooltip>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {/* <tr>
                                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                                <IconText icon={'/images/delete.svg'}>Operation</IconText>
                                                            </td>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <div className="flex items-center gap-2 flex-1">
                                                                    <span className="text-dark-600 text-sm leading-5">
                                                                        Custom text (Eg: Context on the operation. Transfer of ETH or ERC20
                                                                        transfer or Swap on Dex?)
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr> */}
                                                        <tr>
                                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                                <IconText icon={'/images/star.svg'}>Value</IconText>
                                                            </td>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <span className="text-dark-600 text-sm leading-5 flex items-center">
                                                                    {getFee(item.value!, item.network)}
                                                                </span>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                                <IconText icon={'/images/Fee.svg'}>Fee</IconText>
                                                            </td>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <span className="text-dark-600 text-sm leading-5 flex items-center">
                                                                    {getFee(item.actualGasCost, item.network)}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                                <IconText icon={'/images/building.svg'}>Paymentmaster</IconText>
                                                            </td>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <div className="flex items-center gap-2 flex-1">
                                                                    <span className="text-dark-600 text-sm leading-5">
                                                                        {item.paymaster}
                                                                    </span>
                                                                    <CopyButton text={item.paymaster} />
                                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                                        <img src="/images/share.svg" alt="" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                                <IconText icon={'/images/Beneficiary.svg'}>Beneficiary</IconText>
                                                            </td>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <div className="flex items-center gap-2 flex-1">
                                                                    <span
                                                                        className="text-blue-200 text-sm leading-5"
                                                                        onClick={() => {
                                                                            router.push(`/paymaster/${item.beneficiary!}/${item.network}`);
                                                                        }}
                                                                    >
                                                                        {item.beneficiary}
                                                                    </span>
                                                                    <CopyButton text={item.beneficiary!} />
                                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                                        <img src="/images/share.svg" alt="" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="py-[14px] px-4 text-right">
                                                                <span className="text-bluegrey-300 text-[10px] leading-5 flex justify-end items-center gap-2 font-normal">
                                                                    Power by <img src="/images/candide.svg" alt="" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                                <IconText icon={'/images/Hash.svg'}>Transaction Hash</IconText>
                                                            </td>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <div className="flex items-center gap-2 flex-1">
                                                                    <span className="text-dark-600 text-sm leading-5">
                                                                        {item.transactionHash}
                                                                    </span>
                                                                    <CopyButton text={item.transactionHash!} />
                                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                                        <img src="/images/share.svg" alt="" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                                <IconText icon={'/images/cube.svg'}>Block</IconText>
                                                            </td>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <div className="flex items-center gap-2 flex-1">
                                                                    <span className="text-blue-200 text-sm leading-5">
                                                                        {item.blockNumber}
                                                                    </span>
                                                                    <CopyButton text={item.blockNumber!.toString()} />
                                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                                        <img src="/images/share.svg" alt="" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="py-[14px] px-4 text-right"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    </div>
                                </section>
                                <section className="mt-[48px] px-3 mb-10">
                                    <div className="container px-0">
                                        <div>
                                            <Caption icon={'/images/cube.svg'} text={''}>
                                                Developer Details
                                            </Caption>
                                        </div>
                                        <div className="bg-white overflow-auto rounded shadow-300 ">
                                            {tableLoading ? (
                                                skeletonCards1.map((index: number) => <Skeleton height={55} key={index} />)
                                            ) : (
                                                <table className="min-w-full divide-y divide-gray-600">
                                                    <tbody className="min-w-full divide-y divide-gray-300">
                                                        <tr>
                                                            <td className="py-[14px] px-4 xl:min-w-[205px]">
                                                                <IconText icon={'/images/code-array.svg'}>Value</IconText>
                                                            </td>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <div className="flex items-center gap-2 flex-1">
                                                                    <span className="text-blue-200 text-sm leading-5">
                                                                        {getFee(item.value!, item.network)}
                                                                    </span>
                                                                    <CopyButton text={getFee(item.value!, item.network)} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-[14px] px-4 whitespace-pre">
                                                                <div className="flex my-[16px] mb-2">
                                                                    {BUTTON_LIST.map(({ name, key }, index) => (
                                                                        <Chip
                                                                            className={`
                                                                        text-white table-tab py-[6px] px-3 ${sx.tab}`}
                                                                            onClick={() => setSelectedColor(key)}
                                                                            key={index}
                                                                            color={`${selectedColor === key ? 'dark-700' : 'white'}`}
                                                                        >
                                                                            {name}
                                                                        </Chip>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-[14px] px-4 xl:min-w-[205px]">
                                                                <IconText icon={'/images/code-array.svg'}>CallData</IconText>
                                                            </td>
                                                            {selectedColor === 'Original' ? (
                                                                <>
                                                                    <td className="whitespace-normal break-all text-black[87%] py-[14px] text-sm leading-5">
                                                                        {item.input}
                                                                        <CopyButton text={item.input!} />
                                                                    </td>
                                                                </>
                                                            ) : (
                                                                <td className="py-[14px] px-4 whitespace-pre">
                                                                    <div className="flex gap-2">
                                                                        <div className="overflow-auto flex-1 max-h-[290px] custom-scroll   bg-white border-dark-200 rounded border">
                                                                            <table className="min-w-full divide-y divide-dark-100">
                                                                                <thead className="bg-white">
                                                                                    <tr>
                                                                                        <th
                                                                                            scope="col"
                                                                                            className="sticky z-10 top-0 bg-white text-end text-[12px] font-bold leading-5 text-dark-600 py-[14px] px-4"
                                                                                        >
                                                                                            #
                                                                                        </th>
                                                                                        <th
                                                                                            scope="col"
                                                                                            className="sticky z-10 top-0 bg-white py-2 text-left text-[12px] font-bold leading-5 text-dark-600"
                                                                                        >
                                                                                            Name
                                                                                        </th>
                                                                                        <th
                                                                                            scope="col"
                                                                                            className="sticky z-10 top-0 bg-white py-2 text-left text-[12px] font-bold leading-5 text-dark-600"
                                                                                        >
                                                                                            Type
                                                                                        </th>
                                                                                        <th
                                                                                            scope="col"
                                                                                            className="sticky z-10 top-0 bg-white py-2 text-left text-[12px] font-bold leading-5 text-dark-600"
                                                                                        >
                                                                                            Date
                                                                                        </th>

                                                                                        <th
                                                                                            scope="col"
                                                                                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                                                                        >
                                                                                            <span className="sr-only">Edit</span>
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="divide-y divide-dark-100">
                                                                                    <tr>
                                                                                        <td className="text-black[87%] text-sm leading-5  py-[14px] px-4">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            sender
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            address
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            <span className="text-dark-700 text-sm leading-5">
                                                                                                {item.sender}
                                                                                            </span>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr className="bg-gray-50">
                                                                                        <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5 ">
                                                                                            nonce
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5 ">
                                                                                            uint256
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5 ">
                                                                                            {item.nonce}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            initCode
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            bytes
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            0x
                                                                                        </td>
                                                                                    </tr>
                                                                                    {selectedColor === 'Original' ? (
                                                                                        <tr>
                                                                                            <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4">
                                                                                                0
                                                                                            </td>
                                                                                            <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                                Input
                                                                                            </td>
                                                                                            <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                                Bytes
                                                                                            </td>
                                                                                            <td className="whitespace-normal break-all text-black[87%] py-[14px] text-sm leading-5">
                                                                                                {item.input}
                                                                                            </td>
                                                                                        </tr>
                                                                                    ) : (
                                                                                        ''
                                                                                    )}
                                                                                    <tr>
                                                                                        <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            <div className="flex gap-2 items-center">
                                                                                                calldata
                                                                                                <button
                                                                                                    onClick={() => setOpen(!open)}
                                                                                                    className={`${
                                                                                                        open ? 'rotate-180' : ''
                                                                                                    }`}
                                                                                                >
                                                                                                    <IconText icon="/images/arrow-drop.svg" />
                                                                                                </button>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5"></td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            <span className="text-blue-200 text-sm leading-5"></span>
                                                                                        </td>
                                                                                    </tr>
                                                                                    {open && (
                                                                                        <>
                                                                                            <tr>
                                                                                                <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4"></td>
                                                                                                <td className="text-black[87%] text-left text-sm leading-5 py-[14px] px-4">
                                                                                                    target
                                                                                                </td>
                                                                                                <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                                    bytes
                                                                                                </td>
                                                                                                <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                                    {item.target}
                                                                                                </td>
                                                                                                <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                                    <span className="text-blue-200 text-sm leading-5"></span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4"></td>
                                                                                                <td className="text-black[87%]  text-sm leading-5 py-[14px] px-4">
                                                                                                    value
                                                                                                </td>
                                                                                                <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                                    unit256
                                                                                                </td>
                                                                                                <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                                    {getFee(item.value!, item.network)}
                                                                                                </td>
                                                                                                <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                                    <span className="text-blue-200 text-sm leading-5"></span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4"></td>
                                                                                                <td className="text-black[87%] text-left text-sm leading-5 py-[14px] px-4">
                                                                                                    calldata
                                                                                                </td>
                                                                                                <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                                    bytes
                                                                                                </td>
                                                                                                <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                                    {item.callData}
                                                                                                </td>
                                                                                                <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                                    <span className="text-blue-200 text-sm leading-5"></span>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </>
                                                                                    )}
                                                                                    <tr>
                                                                                        <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            verificationGasLimit
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            uint256
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            {item.verificationGasLimit}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            preVerificationGas
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            uint256
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            {item.preVerificationGas}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            maxFeePerGas
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            uint256
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            {getFee(item.maxFeePerGas!, item.network)}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            maxPriorityFeePerGas
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            uint256
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            {getFee(
                                                                                                item.maxPriorityFeePerGas!,
                                                                                                item.network,
                                                                                            )}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            paymasterAndData
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            uint256
                                                                                        </td>
                                                                                        <td className="whitespace-normal break-all text-black[87%] py-[14px] text-sm leading-5">
                                                                                            {item.paymasterAndData}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-4">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            signature
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            uint256
                                                                                        </td>
                                                                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                                                                            {item.signature}
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        <div className="w-[20px]">
                                                                            <CopyButton text="" />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            )}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    </div>
                                </section>
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
