import Chip, { ChipProps } from '@/components/common/chip/Chip';
import CopyButton from '@/components/common/copy_button/CopyButton';
import DisplayFee from '@/components/common/displayfee/DisplayFee';
import IconText from '@/components/common/IconText';
import Caption from '@/components/common/table/Caption';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import { Link, Tooltip } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton-2';
export default function TransactionDetails({ item, network }: any) {
    const [tableLoading1, setTableLoading1] = useState(true);

    useEffect(() => {
        setTableLoading1(true);
        if (network) {
            setTimeout(() => {
                setTableLoading1(false);
            }, 1000);
        }
    }, [network]);
    let skeletonCards = Array(3).fill(0);
    const router = useRouter();
    return (
        <div>
            <section className="mt-[48px] px-3">
                <div className="container px-0">
                    <div>
                        <Caption icon={'/images/cube.svg'} text={''}>
                            Bundle Details
                        </Caption>
                    </div>
                    <div className="bg-white overflow-auto rounded shadow-300 mb-[20px]">
                        {tableLoading1 ? (
                            skeletonCards.map((index: number) => <Skeleton height={55} key={index} />)
                        ) : (
                            <table className="min-w-full divide-y divide-gray-600">
                                <tbody className="min-w-full divide-y divide-gray-300">
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/sader.svg'}>Block Number</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <div className="flex items-center gap-2 flex-1">
                                                <Link
                                                    underline="hover"
                                                    // color="text.primary"
                                                    href={`/block/${item?.blockNumber!}?network=${item?.network ? item.network : ''}`}
                                                    aria-current="page"
                                                    className="text-blue-200"
                                                >
                                                    <span className="text-blue-200 text-sm leading-5">{item?.blockNumber}</span>
                                                </Link>
                                                <CopyButton text={item?.blockNumber!} />
                                                <Link
                                                    // color="text.primary"
                                                    href={`/block/${item?.blockNumber!}?network=${item?.network ? item.network : ''}`}
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
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <div className="flex items-center gap-2 flex-1"></div>
                                        </td>
                                        <td className="py-[14px] px-4 text-right"></td>
                                    </tr>
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/sader.svg'}>Mined</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <span className="text-dark-600 text-sm leading-5">{getTimePassed(item?.blockTime)}</span>
                                        </td>
                                        <td className="py-[14px] px-4 text-right"></td>
                                    </tr>
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/sader.svg'}>Bundler</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <div className="flex items-center gap-2 flex-1">
                                                <Link
                                                    underline="hover"
                                                    // color="text.primary"
                                                    href={`/bundler/${item?.from!}?network=${item?.network ? item.network : ''}`}
                                                    aria-current="page"
                                                    className="text-blue-200"
                                                >
                                                    <span className="text-blue-200 text-sm leading-5">{item?.from}</span>
                                                </Link>
                                                <CopyButton text={item?.from!} />
                                                <Link
                                                    // color="text.primary"
                                                    href={`/bundler/${item?.from!}?network=${item?.network ? item.network : ''}`}
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
                                    </tr>
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/sader.svg'}>Status</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <div className="flex">
                                                <Tooltip
                                                    arrow={true}
                                                    placement="top"
                                                    title={`A Status code indicating if the top level call is succeeded or failed(applicable for Post BYZANTIUM blocks only)`}
                                                >
                                                    {item?.status === '1' ? (
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
                                        {/* <td className="py-[14px] px-4 whitespace-pre">
                                            <span className="text-dark-600 text-sm leading-5">{item?.status}</span>
                                        </td> */}
                                        <td className="py-[14px] px-4 text-right"></td>
                                    </tr>
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/sader.svg'}>Transaction Fee</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <td className="">
                                                <DisplayFee item={item?.transactionFee} network={item?.network} />
                                            </td>
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
