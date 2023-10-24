import { UserOp } from '@/components/common/apiCalls/jiffyApis';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import DisplayFee from '@/components/common/displayfee/DisplayFee';
import LinkAndCopy from '@/components/common/LinkAndCopy';
import Status from '@/components/common/status/Status';
import Caption from '@/components/common/Caption';
import { Tooltip } from '@mui/material';
import { InfoSection, RenderTextCopyLink, PowerButton, RenderDisplayFee } from '@/views/userOp/widget';
import moment from 'moment';

export interface ExecutionTraceType {
    traceData: {
        from: string;
        to: string;
        value: string;
        input: string;
        output: string;
        gasUsed: string;
        gas: string;
        type: string;
        method?: string;
        decodedInput?: Array<{
            value: string;
            type: string;
            name: string;
        }>;
    };
    next: Array<ExecutionTraceType> | null;
}

import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton-2';
import ERC20Transfers from './ERC20Transfers';
import ERC721Transfers from './ERC721Transfers';
import { UserOpType } from './UserOperation';
export default function TransactionDetails({ tableLoading, skeletonCards, userOpDetails, selectedNetwork }: any) {

    return (
        <div>
            <section className="mt-[48px] px-3">
                <div className="container px-0">
                    <div>
                        <Caption icon={'/images/cube.svg'} text={''}>
                            Transaction Details
                        </Caption>
                    </div>
                    <div className="mb-8 overflow-auto bg-white rounded shadow-300">
                        {tableLoading ? (
                            skeletonCards.map((index: number) => <Skeleton height={55} key={index} />)
                        ) : (
                            <div>
                                <section className="">
                                    <div className="container px-0 rounded">
                                        <div className={`${userOpDetails?.type == "SWAP" ? "grid grid-flow-col grid-rows-2" : ""}`} style={{"display": userOpDetails?.type == "SWAP" ? "flex": "undefined"}}>
                                        {userOpDetails?.outboundERC20Transfers?.length > 0 && (
                                            <InfoSection
                                                icon="erc20"
                                                title="Tokens Debited"
                                                content={
                                                    <div className="flex flex-col gap-[10px] w-full border-r-4">
                                                        {userOpDetails.outboundERC20Transfers
                                                            .slice(0)
                                                            .reverse()
                                                            .map(
                                                                (
                                                                    {
                                                                        to,
                                                                        from,
                                                                        value,
                                                                        name,
                                                                        decimals,
                                                                        contractAddress,
                                                                        symbol,
                                                                    }: UserOp['erc20Transfers'][0],
                                                                    index: number,
                                                                ) => (
                                                                    <ERC20Transfers
                                                                        sender={userOpDetails?.sender as string}
                                                                        to={to}
                                                                        from={from}
                                                                        value={value}
                                                                        name={name}
                                                                        symbol={symbol}
                                                                        decimals={parseInt(decimals)}
                                                                        address={contractAddress}
                                                                        key={index}
                                                                        selectedNetwork={selectedNetwork}
                                                                        mini={true}
                                                                    />
                                                                ),
                                                            )}
                                                    </div>
                                                }
                                            />
                                        )}
                                        {userOpDetails?.inboundERC20Transfers?.length > 0 && (
                                            <InfoSection
                                                icon="erc20"
                                                title="Tokens Credited"
                                                content={
                                                    <div className="flex flex-col gap-[10px] w-full">
                                                        {userOpDetails.inboundERC20Transfers
                                                            .slice(0)
                                                            .reverse()
                                                            .map(
                                                                (
                                                                    {
                                                                        to,
                                                                        from,
                                                                        value,
                                                                        name,
                                                                        decimals,
                                                                        contractAddress,
                                                                        symbol,
                                                                    }: UserOp['erc20Transfers'][0],
                                                                    index: number,
                                                                ) => (
                                                                    <ERC20Transfers
                                                                        sender={userOpDetails?.sender as string}
                                                                        to={to}
                                                                        from={from}
                                                                        value={value}
                                                                        name={name}
                                                                        symbol={symbol}
                                                                        decimals={parseInt(decimals)}
                                                                        address={contractAddress}
                                                                        key={index}
                                                                        selectedNetwork={selectedNetwork}
                                                                        mini={true}
                                                                    />
                                                                ),
                                                            )}
                                                    </div>
                                                }
                                            />
                                        )}
                                        </div>
                                        <div className="grid grid-flow-col grid-rows-2 gap-2" style={{"display": "flex"}}>
                                        {userOpDetails?.outboundERC721Transfers?.length > 0 && (
                                            <InfoSection
                                                icon="erc721"
                                                title="NFT Debited"
                                                content={
                                                    <div className="flex flex-col gap-[10px] w-full border-r-4">
                                                        {userOpDetails.outboundERC721Transfers
                                                            .slice(0)
                                                            .reverse()
                                                            .map(
                                                                (
                                                                    {
                                                                        to,
                                                                        from,
                                                                        tokenId,
                                                                        name,
                                                                        decimals,
                                                                        contractAddress,
                                                                        symbol,
                                                                    }: UserOp['erc721Transfers'][0],
                                                                    index: number,
                                                                ) => (
                                                                    <ERC721Transfers
                                                                        sender={userOpDetails?.sender as string}
                                                                        to={to}
                                                                        from={from}
                                                                        tokenId={tokenId}
                                                                        name={name}
                                                                        symbol={symbol}
                                                                        decimals={parseInt(decimals)}
                                                                        address={contractAddress}
                                                                        key={index}
                                                                        selectedNetwork={selectedNetwork}
                                                                    />
                                                                ),
                                                            )}
                                                    </div>
                                                }
                                            />
                                        )}
                                        {userOpDetails?.inboundERC721Transfers?.length > 0 && (
                                            <InfoSection
                                                icon="erc721"
                                                title="NFTs Credited"
                                                content={
                                                    <div className="flex flex-col gap-[10px] w-full">
                                                        {userOpDetails.inboundERC721Transfers
                                                            .slice(0)
                                                            .reverse()
                                                            .map(
                                                                (
                                                                    {
                                                                        to,
                                                                        from,
                                                                        tokenId,
                                                                        name,
                                                                        decimals,
                                                                        contractAddress,
                                                                        symbol,
                                                                    }: UserOp['erc721Transfers'][0],
                                                                    index: number,
                                                                ) => (
                                                                    <ERC721Transfers
                                                                        sender={userOpDetails?.sender as string}
                                                                        to={to}
                                                                        from={from}
                                                                        tokenId={tokenId}
                                                                        name={name}
                                                                        symbol={symbol}
                                                                        decimals={parseInt(decimals)}
                                                                        address={contractAddress}
                                                                        key={index}
                                                                        selectedNetwork={selectedNetwork}
                                                                    />
                                                                ),
                                                            )}
                                                    </div>
                                                }
                                            />
                                        )}
                                        </div>
                                        <InfoSection
                                            icon="blockTime"
                                            title="Block Time"
                                            content={
                                                <div className="flex items-center gap-[10px]">
                                                    <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                        {moment.unix(userOpDetails?.timestamp!).utcOffset(120).format()+ " "}(Eastern European Standard
                                                        Time)
                                                    </span>
                                                </div>
                                            }
                                        />
                                        <InfoSection
                                            icon="value"
                                            title="Type"
                                            content={
                                                <div className="flex items-center gap-[10px]">
                                                    <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                        {UserOpType[userOpDetails?.type]}
                                                    </span>
                                                </div>
                                            }
                                        />
                                        <InfoSection
                                            icon="wallet"
                                            title="Wallet"
                                            content={
                                                <div className="flex items-center gap-[10px]">
                                                    <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                        <LinkAndCopy text={userOpDetails?.sender} copyText={userOpDetails?.sender} link={'/account/'+userOpDetails?.sender} />
                                                    </span>
                                                </div>
                                            }
                                        />
                                        <InfoSection
                                            icon="gasFees"
                                            title="Fee"
                                            content={
                                                <div className="flex items-center gap-[10px]">
                                                    <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                        {
                                                            userOpDetails.fees.amount > 0 ?
                                                             userOpDetails.fees.amount + " " + userOpDetails.fees.token :
                                                             "Sponsored by " + userOpDetails?.paymaster 
                                                        }
                                                    </span>
                                                </div>
                                            }
                                        />
                                        
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
