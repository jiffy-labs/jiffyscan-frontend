import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import CopyButton from '@/components/common/copy_button/CopyButton';
import IconText from '@/components/common/IconText';
import Caption from '@/components/common/table/Caption';
import { getFee, getTimePassed } from '@/components/common/utils';
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
                            Account Details
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
                                            <IconText icon={'/images/sader.svg'}>Address</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <div className="flex items-center gap-2 flex-1">
                                                <Link
                                                    underline="hover"
                                                    // color="text.primary"
                                                    href={`/address/${item?.address}?network=${network ? network : ''}`}
                                                    aria-current="page"
                                                    className="text-blue-200"
                                                >
                                                    <span className="text-blue-200 text-sm leading-5">{item?.address}</span>
                                                </Link>
                                                <CopyButton text={item?.address} />
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
                                            {/* {
                                                responseData?.sender === '' ? null : (
                                                    <span className="text-bluegrey-300 text-[10px] leading-5 flex justify-end items-center gap-2 font-normal">
                                                        Power by{responseData?.sender}
                                                    </span>
                                                )
                                                // ? responseData?.sender : <img src="/images/pimlico.svg" alt="" />
                                            } */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/sader.svg'}>Deposit Amount</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <span className="text-dark-600 text-sm leading-5">{getFee(item?.depositAmount, network)}</span>
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
