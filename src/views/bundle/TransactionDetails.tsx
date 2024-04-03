import Chip, { ChipProps } from '@/components/common/chip/Chip';
import CopyButton from '@/components/common/copy_button/CopyButton';
import DisplayFee from '@/components/common/displayfee/DisplayFee';
import IconText from '@/components/common/IconText';
import Status from '@/components/common/status/Status';
import Caption from '@/components/common/Caption';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import { Link, Tooltip } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import { formatUnits } from 'ethers/lib/utils';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton-2';

type TokenPrices = {
    ETH: number;
    MATIC: number;
    FUSE: number;
    BNB: number;
    AVAX: number;
    FTM: number;
    OP?: number;
};
 
export default function TransactionDetails({ item, network, tableLoading, block }: any) {
    const [tokenPrices, setTokenPrices] = useState<TokenPrices>({
        ETH: 0,
        MATIC: 0,
        FUSE: 0,
        BNB: 0,
        AVAX: 0,
        FTM: 0,

    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTokenPrices = localStorage.getItem('tokenPrices');
            if (storedTokenPrices) {
                setTokenPrices(JSON.parse(storedTokenPrices));
            }
        }
    }, []);
    
    let skeletonCards = Array(3).fill(0);
    const router = useRouter();
    return (
        <div >
            <section className={`${block && 'blur'} mt-[48px] px-3`}>
                <div className="container px-0">
                    <div>
                        <Caption icon={'/images/cube.svg'} text={''}>
                            Bundle Details
                        </Caption>
                    </div>
                    <div className="bg-white overflow-auto rounded shadow-300 mb-[20px]">
                        {tableLoading ? (
                            skeletonCards.map((index: number) => <Skeleton height={55} key={index} />)
                        ) : (
                            <div>
                                <section className="">
                                    <div className="container px-0 rounded">
                                        <div className="flex items-center md:pt-[0px] pt-[16px]  md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/sader.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Block Number
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className="flex-1 gap-2 break-words ">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Block Number</p>
                                                </div>
                                                <div className="justify-between block md:flex">
                                                    <div className="flex items-center gap-[10px]">
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={`/block/${item?.blockNumber!}?network=${
                                                                item?.network ? item.network : ''
                                                            }`}
                                                            aria-current="page"
                                                            className="text-blue-200"
                                                        >
                                                            <span className="text-[#1976D2] md:text-[14px] text-[16px] break-all leading-5">
                                                                {item?.blockNumber}
                                                            </span>
                                                        </Link>
                                                        <div className="w-[30px] flex">
                                                            <CopyButton text={item?.blockNumber} />
                                                        </div>
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={`/block/${item?.blockNumber!}?network=${
                                                                item?.network ? item.network : ''
                                                            }`}
                                                            aria-current="page"
                                                            className="text-blue-200 "
                                                            target={'_blank'}
                                                        >
                                                            <button className="hidden outline-none md:block focus:outline-none ring-0 focus:ring-0">
                                                                <img src="/images/share.svg" alt="" />
                                                                {/* </Link> */}
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    {/* {
                                                        responseData?.sender === '' ? null : (
                                                            <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                                                <p className="text-[10px] text-[#455A64]">
                                                                    {' '}
                                                                    Powered By{responseData?.sender}
                                                                </p>
                                                            </div>
                                                        )
                                                        // ? responseData?.sender : <img src="/images/pimlico.svg" alt="" />
                                                    } */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/sader.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Mined
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className="flex-1 gap-2 break-words ">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Mined</p>
                                                </div>
                                                <div className="justify-between block md:flex">
                                                    <div className="flex items-center gap-[10px]">
                                                        <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                            {getTimePassed(item?.blockTime)}
                                                        </span>
                                                    </div>
                                                    {/* {
                                                        responseData?.sender === '' ? null : (
                                                            <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                                                <p className="text-[10px] text-[#455A64]">
                                                                    {' '}
                                                                    Powered By{responseData?.sender}
                                                                </p>
                                                            </div>
                                                        )
                                                        // ? responseData?.sender : <img src="/images/pimlico.svg" alt="" />
                                                    } */}
                                                    {/* <div className='md:px-[16px] px-0 md:py-[8px] py-0'>
                                                        <p className='text-[10px] text-[#455A64]'>Powered By</p>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/clock.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Bundler
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className="flex-1 gap-2 break-words ">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Bundler</p>
                                                </div>
                                                <div className="justify-between block md:flex">
                                                    <div className="flex items-center gap-[10px]">
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={`/bundler/${item?.from!}?network=${item?.network ? item.network : ''}`}
                                                            aria-current="page"
                                                            className="text-blue-200"
                                                        >
                                                            <span className="text-blue-200 md:text-[14px] text-[16px] break-all leading-5">
                                                                {item?.from}
                                                            </span>
                                                        </Link>
                                                        <CopyButton text={item?.from!} />
                                                        <Link
                                                            underline="hover"
                                                            // color="text.primary"
                                                            href={`/bundler/${item?.from!}?network=${item?.network ? item.network : ''}`}
                                                            aria-current="page"
                                                            className="text-blue-200 "
                                                            target={'_blank'}
                                                        >
                                                            <button className="hidden outline-none md:block focus:outline-none ring-0 focus:ring-0">
                                                                <img src="/images/share.svg" alt="" />
                                                                {/* </Link> */}
                                                            </button>
                                                        </Link>
                                                    </div>

                                                    {/* <div className='md:px-[16px] px-0 md:py-[8px] py-0'>
                                                        <p className='text-[10px] text-[#455A64]'>Powered By</p>
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
                                            <div className="flex-1 gap-2 break-words ">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Status</p>
                                                </div>
                                                <div className="justify-between block md:flex">
                                                    <div className="flex items-center gap-[10px]">
                                                        <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                            <div className="flex">
                                                                <Tooltip
                                                                    arrow={true}
                                                                    placement="top"
                                                                    title={`A Status code indicating if the top level call is succeeded or failed(applicable for Post BYZANTIUM blocks only)`}
                                                                >
                                                                    {item?.status === '1' ? (
                                                                        <Status type={true} />
                                                                    ) : (
                                                                        <Status type={false} />
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
                                                        Transaction Fee
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className="flex-1 gap-2 break-words ">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Transaction Fee</p>
                                                </div>
                                                <div className="justify-between block md:flex">
                                                    <div className="flex items-center gap-[10px]">
                                                        <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                            <DisplayFee item={item?.transactionFee} network={item?.network} />
                                                            
                                                        </span>
                                                        <div className="px-2 mt-2 bg-gray-200 rounded-lg">
                                                        <span className="text-sm">
                                                            {(
                                                                tokenPrices[item?.network === 'mainnet' ? 'ETH' :
                                                                    item?.network === 'mumbai' ? 'MATIC' :
                                                                        item?.network === 'optimism-goerli' ? 'ETH' :
                                                                            item?.network === 'matic' ? 'MATIC' :
                                                                                item?.network === 'fuse' ? 'FUSE' :
                                                                                    item?.network === 'bsc' ? 'BNB' :
                                                                                        item?.network === 'bnb-testnet' ? 'BNB' :
                                                                                            item?.network === 'avalanche' ? 'AVAX' :
                                                                                                item?.network === 'avalanche-fuji' ? 'AVAX' :
                                                                                                    item?.network === 'fantom' ? 'FTM' :
                                                                                                        item?.network === 'fantom-testnet' ? 'FTM' : 'ETH'] *
                                                                parseFloat(formatUnits(item?.actualGasCost || '0', 'ether'))
                                                            ).toFixed(3)} USD
                                                        </span>


                                                    </div>
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
