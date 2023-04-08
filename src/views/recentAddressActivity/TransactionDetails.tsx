import CopyButton from '@/components/common/copy_button/CopyButton';
import IconText from '@/components/common/IconText';
import Caption from '@/components/common/table/Caption';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import { Link } from '@mui/material';
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
                            Account Details
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
                                            <IconText icon={'/images/sader.svg'}>Deployment Date</IconText>
                                        </td>
                                        { item?.userOpHash ? (
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <div className="flex items-center gap-2 flex-1">
                                                <Link
                                                    underline="hover"
                                                    // color="text.primary"
                                                    href={'/userOpHash/'+(item?.userOpHash)+(network ? '/?network='+network : '')}
                                                    aria-current="page"
                                                    className="text-blue-200"
                                                >
                                                    <span className="text-blue-200 text-sm leading-5">
                                                        {getTimePassed(item?.blockTime)}
                                                    </span>
                                                </Link>
                                                <CopyButton text={item?.address} />
                                                <button
                                                    className="outline-none focus:outline-none ring-0 focus:ring-0"
                                                    onClick={() => {
                                                        const url = '/userOpHash/${item?.userOpHash}'+(network ? '/?network='+network : '')
                                                        window.open(url, '_blank');
                                                        router.push(url);
                                                    }}
                                                >
                                                    <img src="/images/share.svg" alt="" />
                                                </button>
                                            </div>
                                        </td>) : (
                                            <td className="py-[14px] px-4 whitespace-pre">
                                                <span className="text-dark-600 text-sm leading-5">
                                                    Does not seem like a Smart Contract Wallet, just a normal address.
                                                </span>
                                            </td>
                                        )}

                                    </tr> 

                                    <tr>
                                        <td className="py-[14px] px-4 min-w-[205px]">
                                            <IconText icon={'/images/sader.svg'}>Total Deposit</IconText>
                                        </td>
                                        <td className="py-[14px] px-4 whitespace-pre">
                                            <span className="text-dark-600 text-sm leading-5">{getFee(item?.totalDeposits, network)}</span>
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
