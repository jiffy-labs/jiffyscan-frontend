import Chip, { ChipProps } from '@/components/common/chip/Chip';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import CopyButton from '@/components/common/copy_button/CopyButton';
import DisplayFee from '@/components/common/displayfee/DisplayFee';
import IconText from '@/components/common/IconText';
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
                                                                    {item?.success === true ? (
                                                                        <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#4CAF50]">
                                                                            <img src="/images/Success.svg" alt="" />
                                                                            <span className="font-normal text-[12px] leading-5 text-dark-600">
                                                                                Success
                                                                            </span>
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
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Value</p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex items-center gap-[10px]">
                                                        <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                            <DisplayFee item={item?.value!} network={item?.network} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText toolTip="actualGasCost by user op" icon={'/images/Fee.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Gas Fee
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Value</p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex items-center gap-[10px]">
                                                        <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                            <DisplayFee item={item?.actualGasCost!} network={item?.network} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText toolTip="actualGasUsed by user op" icon={'/images/local_gas_station.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Gas Used
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Gas Used</p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex items-center gap-[10px]">
                                                        <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                            {item?.actualGasUsed}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/building.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        PayMaster
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">PayMaster</p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex items-center gap-[10px]">
                                                        <Link
                                                            underline="hover"
                                                            href={`/paymaster/${item?.paymaster!}?network=${
                                                                item?.network ? item?.network : ''
                                                            }`}
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
                                                                } md:text-[14px] text-[16px] break-all leading-5`}
                                                            >
                                                                {item?.paymaster}
                                                            </span>
                                                        </Link>
                                                        {item?.paymaster === '0x0000000000000000000000000000000000000000' ? null : (
                                                            <>
                                                                <div className="w-[30px] flex">
                                                                    <CopyButton text={item?.paymaster} />
                                                                </div>
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
                                                                    <button className="outline-none md:block hidden focus:outline-none ring-0 focus:ring-0">
                                                                        <img src="/images/share.svg" alt="" />
                                                                    </button>
                                                                </Link>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/Beneficiary.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Beneficiary
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Beneficiary</p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex items-center gap-[10px]">
                                                        <Link
                                                            underline="hover"
                                                            href={`/bundler/${item?.beneficiary!}?network=${
                                                                item?.network ? item.network : ''
                                                            }`}
                                                            aria-current="page"
                                                            className="text-blue-200"
                                                        >
                                                            <span className="text-blue-200 md:text-[14px] text-[16px] break-all leading-5">
                                                                {item?.beneficiary!}
                                                            </span>
                                                        </Link>
                                                        <div className="w-[30px] flex">
                                                            <CopyButton text={item?.paymaster} />
                                                        </div>
                                                        <Link
                                                            underline="hover"
                                                            href={`/bundler/${item?.beneficiary!}?network=${
                                                                item?.network ? item.network : ''
                                                            }`}
                                                            aria-current="page"
                                                            className=""
                                                            target="_blank"
                                                        >
                                                            <button className="outline-none md:block hidden focus:outline-none ring-0 focus:ring-0">
                                                                <img src="/images/share.svg" alt="" />
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    {responseData?.beneficiary === '' ? null : (
                                                        <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                                            <p className="text-[10px] text-[#455A64]">
                                                                {' '}
                                                                Power by{responseData?.beneficiary}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/Hash.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Transaction Hash
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Transaction Hash</p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex items-center gap-[10px]">
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={NETWORK_SCANNER_MAP[item?.network] + item?.transactionHash}
                                                            aria-current="page"
                                                            className="text-blue-200"
                                                            target="_blank"
                                                        >
                                                            <span className="text-blue-200 md:text-[14px] text-[16px] break-all leading-5">
                                                                {item?.transactionHash}
                                                            </span>
                                                        </Link>

                                                        <div className="w-[40px] flex">
                                                            <CopyButton text={item?.transactionHash} />
                                                        </div>
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={NETWORK_SCANNER_MAP[item?.network] + item?.transactionHash}
                                                            aria-current="page"
                                                            className="text-blue-200"
                                                            target="_blank"
                                                        >
                                                            <button className="outline-none md:block hidden focus:outline-none ring-0 focus:ring-0">
                                                                <img src="/images/share.svg" alt="" />
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/cube.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Block
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Block</p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex items-center gap-[10px]">
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={`/block/${item?.blockNumber}?network=${
                                                                item?.network ? item.network : ''
                                                            }`}
                                                            aria-current="page"
                                                            // className="text-blue-200"
                                                        >
                                                            <span className="text-blue-200 md:text-[14px] text-[16px] break-all leading-5">
                                                                {item?.transactionHash}
                                                            </span>
                                                        </Link>
                                                        <div className="w-[40px] flex">
                                                            <CopyButton text={item?.transactionHash} />
                                                        </div>
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={`/block/${item?.blockNumber}?network=${
                                                                item?.network ? item.network : ''
                                                            }`}
                                                            aria-current="page"
                                                            className="text-blue-200"
                                                            target={'_blank'}
                                                        >
                                                            <button className="outline-none md:block hidden focus:outline-none ring-0 focus:ring-0">
                                                                <img src="/images/share.svg" alt="" />
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
