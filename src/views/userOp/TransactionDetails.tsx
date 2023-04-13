import Chip, { ChipProps } from '@/components/common/chip/Chip';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import CopyButton from '@/components/common/copy_button/CopyButton';
import DisplayFee from '@/components/common/displayfee/DisplayFee';
import IconText from '@/components/common/IconText';
import Status from '@/components/common/status/Status';
import Caption from '@/components/common/table/Caption';
import { getFee } from '@/components/common/utils';
import { Link, Tooltip } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';

import React from 'react';
import Skeleton from 'react-loading-skeleton-2';
export default function TransactionDetails({ tableLoading, skeletonCards, item, responseData }: any) {
    const router = useRouter();
    return (
        <div>
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
                            <div>
                                <section className="">
                                    <div className="container rounded  px-0">
                                        <div className="flex items-center md:pt-[0px] pt-[16px]  md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/sader.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Sender
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Sender</p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex items-center gap-[10px]">
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={`/account/${item?.sender}?network=${item?.network ? item?.network : ''}`}
                                                            aria-current="page"
                                                            className="text-blue-200"
                                                        >
                                                            <span className="text-[#1976D2] md:text-[14px] text-[16px] break-all leading-5">
                                                                {item?.sender}
                                                            </span>
                                                        </Link>
                                                        <div className="w-[30px] flex">
                                                            <CopyButton text={item?.userOpHash} />
                                                        </div>
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={`/account/${item?.sender}?network=${item?.network ? item.network : ''}`}
                                                            aria-current="page"
                                                            className="text-blue-200 "
                                                            target={'_blank'}
                                                        >
                                                            <button className="outline-none md:block hidden focus:outline-none ring-0 focus:ring-0">
                                                                <img src="/images/share.svg" alt="" />
                                                                {/* </Link> */}
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    {
                                                        responseData?.sender === '' ? null : (
                                                            <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                                                <p className="text-[10px] text-[#455A64]">
                                                                    {' '}
                                                                    Power by{responseData?.sender}
                                                                </p>
                                                            </div>
                                                        )
                                                        // ? responseData?.sender : <img src="/images/pimlico.svg" alt="" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/sader.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Receiver
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Receiver</p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex items-center gap-[10px]">
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={`/account/${item?.target}?network=${item?.network ? item?.network : ''}`}
                                                            aria-current="page"
                                                            className="text-blue-200"
                                                        >
                                                            <span className="text-[#1976D2] md:text-[14px] text-[16px] break-all leading-5">
                                                                {item?.target}
                                                            </span>
                                                        </Link>
                                                        <div className="w-[30px] flex">
                                                            <CopyButton text={item?.userOpHash} />
                                                        </div>
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={`/account/${item?.target}?network=${item?.network ? item.network : ''}`}
                                                            aria-current="page"
                                                            className="text-blue-200 "
                                                            target={'_blank'}
                                                        >
                                                            <button className="outline-none md:block hidden focus:outline-none ring-0 focus:ring-0">
                                                                <img src="/images/share.svg" alt="" />
                                                                {/* </Link> */}
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    {
                                                        responseData?.sender === '' ? null : (
                                                            <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                                                <p className="text-[10px] text-[#455A64]">
                                                                    {' '}
                                                                    Power by{responseData?.sender}
                                                                </p>
                                                            </div>
                                                        )
                                                        // ? responseData?.sender : <img src="/images/pimlico.svg" alt="" />
                                                    }
                                                    {/* <div className='md:px-[16px] px-0 md:py-[8px] py-0'>
                                                        <p className='text-[10px] text-[#455A64]'>Power by</p>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/clock.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Block Time
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Block Time</p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex items-center gap-[10px]">
                                                        <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                            {moment.unix(item?.blockTime!).utcOffset(120).format()}(Eastern European
                                                            Standard Time)
                                                        </span>
                                                    </div>
                                                    {
                                                        responseData?.sender === '' ? null : (
                                                            <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                                                <p className="text-[10px] text-[#455A64]">
                                                                    {' '}
                                                                    Power by{responseData?.sender}
                                                                </p>
                                                            </div>
                                                        )
                                                        // ? responseData?.sender : <img src="/images/pimlico.svg" alt="" />
                                                    }
                                                    {/* <div className='md:px-[16px] px-0 md:py-[8px] py-0'>
                                                        <p className='text-[10px] text-[#455A64]'>Power by</p>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/delete.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Status
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Status</p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex items-center gap-[10px]">
                                                        <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                            <div className="flex">
                                                                <Tooltip
                                                                    arrow={true}
                                                                    placement="top"
                                                                    title={`A Status code indicating if the top level call is succeeded or failed(applicable for Post BYZANTIUM blocks only)`}
                                                                >
                                                                    {item?.success === true ? <Status type={true} /> :<Status type={false}/>}
                                                                </Tooltip>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/star.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Value
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        <></>
                                    )}

                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/star.svg'}>Value</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <span className="text-dark-600 text-sm leading-5 flex items-center">
                                                <DisplayFee item={item?.value!} network={item?.network} />
                                            </span>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText toolTip="actualGasCost by user op" icon={'/images/Fee.svg'}>
                                                Gas Fee
                                            </IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <span className="text-dark-600 text-sm leading-5 flex items-center">
                                                <DisplayFee item={item?.actualGasCost!} network={item?.network} />
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText toolTip="actualGasUsed by user op" icon={'/images/local_gas_station.svg'}>
                                                Gas Used
                                            </IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <span className="text-dark-600 text-sm leading-5 flex items-center">{item?.actualGasUsed}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/building.svg'}>Paymaster</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <div className="flex items-center gap-2 flex-1">
                                                <Link
                                                    underline="hover"
                                                    href={`/paymaster/${item?.paymaster!}?network=${item?.network ? item?.network : ''}`}
                                                    aria-current="page"
                                                    className={`${
                                                        item?.paymaster === '0x0000000000000000000000000000000000000000'
                                                            ? 'text-dark-700'
                                                            : 'text-blue-200'
                                                    }`}
                                                >
                                                    <span
                                                        className={`${
                                                            item?.paymaster === '0x0000000000000000000000000000000000000000'
                                                                ? 'text-dark-700'
                                                                : 'text-blue-200'
                                                        } text-sm leading-5`}
                                                    >
                                                        {item?.paymaster}
                                                    </span>
                                                </Link>
                                                {/* <CopyButton text={item?.paymaster} />
                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                        <img src="/images/share.svg" alt="" />
                                                    </button> */}
                                                {item?.paymaster === '0x0000000000000000000000000000000000000000' ? null : (
                                                    <>
                                                        <CopyButton text={item?.paymaster} />
                                                        <Link
                                                            underline="hover"
                                                            href={`/paymaster/${item?.paymaster!}?network=${
                                                                item.network ? item.network : ''
                                                            }`}
                                                            aria-current="page"
                                                            className={`${
                                                                item?.paymaster === '0x0000000000000000000000000000000000000000'
                                                                    ? 'text-dark-700'
                                                                    : 'text-blue-200'
                                                            }`}
                                                            target="_blank"
                                                        >
                                                            <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                                <img src="/images/share.svg" alt="" />
                                                            </button>
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/Beneficiary.svg'}>Beneficiary</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <div className="flex items-center gap-2 flex-1">
                                                <Link
                                                    underline="hover"
                                                    // color="text.primary"
                                                    href={`/bundler/${item?.beneficiary!}?network=${item?.network ? item.network : ''}`}
                                                    aria-current="page"
                                                    className="text-blue-200"
                                                >
                                                    <span className="text-blue-200 text-sm leading-5">{item?.beneficiary}</span>
                                                </Link>
                                                <CopyButton text={item?.beneficiary!} />
                                                <Link
                                                    underline="hover"
                                                    // color="text.primary"
                                                    href={`/bundler/${item?.beneficiary!}?network=${item?.network ? item.network : ''}`}
                                                    aria-current="page"
                                                    className="text-blue-200"
                                                    target={'_blank'}
                                                >
                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                        <img src="/images/share.svg" alt="" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="py-[14px] px-4 text-right">
                                            {responseData?.beneficiary === '' ? null : (
                                                <span className="text-bluegrey-300 text-[10px] leading-5 flex justify-end items-center gap-2 font-normal">
                                                    Power by {responseData?.beneficiary}
                                                    {/* <img src="/images/candide.svg" alt="" /> */}
                                                </span>
                                            )}
                                            <span className="text-bluegrey-300 text-[10px] leading-5 flex justify-end items-center gap-2 font-normal">
                                                {/* <img src="/images/candide.svg" alt="" /> */}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/Hash.svg'}>Transaction Hash</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <Link
                                                underline="hover"
                                                // color="text.primary"
                                                href={`/bundle/${item?.transactionHash!}?network=${
                                                    item?.network ? item.network : 'mainnet'
                                                }`}
                                                aria-current="page"
                                                className="text-blue-200"
                                                target="_self"
                                            >
                                                <div className="flex items-center gap-2 flex-1">
                                                    <span className="text-blue-200 text-sm leading-5">{item?.transactionHash}</span>
                                                    <CopyButton text={item?.transactionHash!} />
                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                        <img src="/images/share.svg" alt="" />
                                                    </button>
                                                </div>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/cube.svg'}>Block</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <div className="flex items-center gap-2 flex-1">
                                                <Link
                                                    underline="hover"
                                                    // color="text.primary"
                                                    href={`/block/${item?.blockNumber}?network=${item?.network ? item.network : ''}`}
                                                    aria-current="page"
                                                    // className="text-blue-200"
                                                >
                                                    <span className="text-blue-200 text-sm leading-5">{item?.blockNumber}</span>
                                                </Link>
                                                <CopyButton text={item?.blockNumber!.toString()} />
                                                <Link
                                                    underline="hover"
                                                    // color="text.primary"
                                                    href={`/block/${item?.blockNumber}?network=${item?.network ? item.network : ''}`}
                                                    aria-current="page"
                                                    className="text-blue-200"
                                                    target={'_blank'}
                                                >
                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                        <img src="/images/share.svg" alt="" />
                                                    </button>
                                                </Link>
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
        </div>
    );
}
