import { NETWORK_ICON_MAP, NETWORK_LIST, NETWORK_SCANNER_MAP, POWERED_BY_LOGO_MAP } from '@/components/common/constants';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Link from 'next/link';
import React from 'react';

export default function HeaderSection({ item, network, addressMapping }: any) {
    return (
        <div>
            <section className=" px-3">
                <div className="container  bg-white rounded shadow-200 px-[16px] py-[12px]">
                    <h3 className="text-[15px]  leading-[28px] font-bold text-dark-600">Paymaster</h3>
                    <div className="md:flex items-center gap-4 pt-[14px] pb-[2px]">
                        <div className="flex items-center gap-2">
                            <img src={NETWORK_ICON_MAP[network as string]} alt="" className="h-[20px]" />
                            <span className="text-sm font-normal leading-5 text-dark-600">
                                {NETWORK_LIST.find((el) => el.key === network)?.name}
                            </span>
                        </div>
                        <div className="flex items-center break-words gap-2 flex-1">
                            <span className="text-dark-600 text-sm break-all leading-5">{item?.address}</span>
                            <CopyButton text={item?.id} />
                            <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                <Link
                                    // underline="hover"
                                    // color="text.primary"
                                    href={`${NETWORK_SCANNER_MAP[network]}/tx/${item?.transactionHash}`}
                                    aria-current="page"
                                    className="text-blue-200"
                                    target="_blank"
                                >
                                    <img src="/images/graph.svg" alt="" />
                                </Link>
                            </button>
                        </div>
                        {item?.address === '' ? null : (
                            <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                <p className="text-[10px] text-[#455A64]">
                                    {(addressMapping?.[item?.address?.toLowerCase()] && POWERED_BY_LOGO_MAP?.[addressMapping?.[item?.address?.toLowerCase()]?.company.toLowerCase()]) && (
                                        <span className="text-bluegrey-300 text-[10px] leading-5 flex items-center gap-2 font-normal">
                                            Power by{' '}
                                            <img
                                                src={
                                                    POWERED_BY_LOGO_MAP?.[
                                                        addressMapping?.[item?.address?.toLowerCase()]?.company.toLowerCase()
                                                    ]?.small
                                                }
                                                style={{ height: 20, width: 20 }}
                                                alt=""
                                            />
                                        </span>
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
