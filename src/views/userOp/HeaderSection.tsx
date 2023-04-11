import { NETWORK_ICON_MAP, NETWORK_LIST, NETWORK_SCANNER_MAP } from '@/components/common/constants';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Link from 'next/link';
import React from 'react';

import Skeleton from 'react-loading-skeleton-2';

export default function HeaderSection({ item, network, loading }: any) {
    return (
        <div>
            <section className=" px-3">
                <div className="container  bg-white rounded shadow-200 px-[16px] py-[12px]">
                    <h3 className="text-[15px]  leading-[28px] font-bold text-dark-600">User Operation Hash</h3>
                    {loading ? (
                        <Skeleton height={55} />
                    ) : (
                        <div className="md:flex items-center gap-4 pt-[14px] pb-[2px]">
                            <div className="flex items-center gap-2">
                                <img src={NETWORK_ICON_MAP[item?.network as string]} alt="" className="h-[20px]" />
                                <span className="text-sm font-normal leading-5 text-dark-600">
                                    {NETWORK_LIST.find((el) => el.key === item?.network)?.name}
                                </span>
                            </div>
                            <div className="flex items-center break-words gap-2 flex-1">
                                <span className="text-dark-600 text-sm break-all leading-5">{item?.userOpHash}</span>
                                <CopyButton text={item?.userOpHash} />
                                <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                    <Link
                                        href={NETWORK_SCANNER_MAP[item?.network] + item?.transactionHash}
                                        aria-current="page"
                                        className="text-blue-200"
                                        target="_blank"
                                    >
                                        <img src="/images/graph.svg" alt="" />
                                    </Link>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
