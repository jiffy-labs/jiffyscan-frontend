import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import CopyButton from '@/components/common/copy_button/CopyButton';
import IconText from '@/components/common/IconText';
import Caption from '@/components/common/table/Caption';
import { getFee } from '@/components/common/utils';
import { Link, Tooltip } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';

import React from 'react';
import Skeleton from 'react-loading-skeleton-2';
export default function TransactionDetails({ tableLoading, skeletonCards, item, responseData, network }: any) {
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
                    <div className="bg-white overflow-auto rounded shadow-300 mb-[20px]">
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
                                                <Link
                                                    underline="hover"
                                                    // color="text.primary"
                                                    href={`/address/${item?.id}?network=${network ? network : ''}`}
                                                    aria-current="page"
                                                    className="text-blue-200"
                                                >
                                                    <span className="text-blue-200 text-sm leading-5">{item?.id}</span>
                                                </Link>
                                                <CopyButton text={item?.id} />
                                                <button
                                                    className="outline-none focus:outline-none ring-0 focus:ring-0"
                                                    onClick={() => {
                                                        const url = `/address/${item?.address}?network=${network ? network : ''}`;
                                                        window.open(url, '_blank');
                                                        router.push(url);
                                                    }}
                                                >
                                                    <img src="/images/share.svg" alt="" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-[14px] px-4 text-right">
                                            {
                                                responseData?.sender === '' ? null : (
                                                    <span className="text-bluegrey-300 text-[10px] leading-5 flex justify-end items-center gap-2 font-normal">
                                                        Power by{responseData?.sender}
                                                    </span>
                                                )
                                                // ? responseData?.sender : <img src="/images/pimlico.svg" alt="" />
                                            }
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/sader.svg'}>Block Time</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <span className="text-dark-600 text-sm leading-5">
                                                {moment.unix(item?.blockTime!).utcOffset(120).format()}(Eastern European Standard Time)
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
                                                    {item?.success === true ? (
                                                        <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#4CAF50]">
                                                            <img src="/images/Success.svg" alt="" />
                                                            <span className="font-normal text-[12px] leading-5 text-dark-600">Success</span>
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#d81a14]">
                                                                <img src="/images/failed.svg" alt="" />
                                                                <span className="font-normal text-[12px] leading-5 text-dark-600">
                                                                    Failed
                                                                </span>
                                                            </span>
                                                        </>
                                                    )}
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                    {item?.success === false ? (
                                        <tr>
                                            <td className="py-[14px] px-4 min-w-[205px]">
                                                <IconText icon={'/images/delete.svg'}>RevertReason</IconText>
                                            </td>
                                            <td className="py-[14px] px-4 whitespace-pre">
                                                <div className="flex items-center gap-2 flex-1">
                                                    <span className="text-dark-600 text-sm leading-5">
                                                        {item.revertReason ? item.revertReason : 'Failed'}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        <></>
                                    )}
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
                                                {/* <CopyButton text={item.paymaster} />
                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                        <img src="/images/share.svg" alt="" />
                                                    </button> */}
                                                {item?.paymaster === '0x0000000000000000000000000000000000000000' ? null : (
                                                    <>
                                                        <CopyButton text={item?.paymaster} />
                                                        <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                            <img src="/images/share.svg" alt="" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
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
                                                href={NETWORK_SCANNER_MAP[item.network] + item.transactionHash}
                                                aria-current="page"
                                                className="text-blue-200"
                                                target="_blank"
                                            >
                                                <div className="flex items-center gap-2 flex-1">
                                                    <span className="text-blue-200 text-sm leading-5">{item.transactionHash}</span>
                                                    <CopyButton text={item.transactionHash!} />
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
                                            <Link
                                                underline="hover"
                                                // color="text.primary"
                                                href={`/block/${item.blockNumber}?network=${item.network ? item.network : ''}`}
                                                aria-current="page"
                                                // className="text-blue-200"
                                            >
                                                <div className="flex items-center gap-2 flex-1">
                                                    <span className="text-blue-200 text-sm leading-5">{item.blockNumber}</span>
                                                    <CopyButton text={item.blockNumber!} />
                                                    <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                                        <img src="/images/share.svg" alt="" />
                                                    </button>
                                                </div>
                                            </Link>
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
