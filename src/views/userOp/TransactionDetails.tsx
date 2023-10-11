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
export default function TransactionDetails({ tableLoading, skeletonCards, item, addressMapping, metaData, selectedNetwork }: any) {
    const [showMetadata, setShowMetadata] = useState(false);
    const [targets, setTargets] = useState([] as Array<string>);
    const [invokes, setInvokes] = useState([] as Array<string>);
    const [values, setValues] = useState([] as Array<number>);
    const [type, setType] = useState('');

    const setTraceToDisplace = (executionTrace: ExecutionTraceType) => {
        let executionList;
        if (
            executionTrace.next != null &&
            executionTrace.next.length > 0 &&
            executionTrace.next[0].traceData.method?.toLowerCase() == 'multisend'
        ) {
            setType('Multi Send');
            executionList = executionTrace.next[0].next;
        } else {
            setType('Normal');
            executionList = executionTrace.next;
        }
        if (executionList != null && executionList.length > 0) {
            setTraceCallToDisplay(executionList);
            let targetList = [];
            let valueList = [];
            let invokesList = [];
            for (let i in executionList) {
                let executionCall = executionList[i];
                targetList.push(executionCall.traceData.to);
                invokesList.push(
                    executionCall.traceData.method ? executionCall.traceData.method : executionCall.traceData.input.slice(0, 10),
                );
                valueList.push(parseInt(executionCall.traceData.value, 16));
            }
            setTargets(targetList);
            setValues(valueList);
            setInvokes(invokesList);
        }
    };

    const [traceCallToDisplay, setTraceCallToDisplay] = React.useState<Array<ExecutionTraceType>>([] as Array<ExecutionTraceType>);

    useEffect(() => {
        if (metaData && Object.keys(metaData).length != 0 && 'executionTrace' in metaData) {
            setShowMetadata(true);
            setTraceToDisplace(metaData.executionTrace);
            // if (metaData.erc20Transfers && metaData.erc20Transfers.length > 0 && !metaData.erc20Transfers[0].name) {
            //     updateMetadata(metaData);
            // }
        }
    }, [metaData]);

    const renderDisplayFee = () => {
        const fee = (value: any, index: number) => (
            <span key={index} className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5 flex items-center">
                {type == 'Multi Send' && index + 1 + ':  '} &nbsp;{' '}
                <DisplayFee
                    item={value! ? (typeof value == 'string' ? value : parseInt(value.hex))! : 'Unavailable'}
                    network={item?.network}
                />
            </span>
        );
        const listFee = values?.length > 0 ? values : item.value;
        return (
            <>
                {listFee.map((value: any, index: number) => {
                    return fee(value, index);
                })}
            </>
        );
    };
    const renderTarget = (targets: any, invoked: boolean): any => {
        return targets.map((target: any, index: number) => {
            return (
                <div key={index} className="flex gap-[10px] item-center display-ruby">
                    <LinkAndCopy
                        text={target}
                        link={`/account/${target}?network=${item?.network ? item?.network : ''}`}
                        copyText={target}
                        secondaryTargetLink={NETWORK_SCANNER_MAP[selectedNetwork] + '/address/' + target}
                    />
                    {invoked ? `Invoked: ${invokes[index]}` : ''}
                </div>
            );
        });
    };

    return (
        <div>
            <section className="mt-[48px] px-3">
                <div className="container px-0">
                    <div>
                        <Caption icon={'/images/cube.svg'} text={''}>
                            Transaction Details
                        </Caption>
                    </div>
                    <div className="overflow-auto bg-white rounded shadow-300 ">
                        {tableLoading ? (
                            skeletonCards.map((index: number) => <Skeleton height={55} key={index} />)
                        ) : (
                            <div>
                                <section className="">
                                    <div className="container px-0 rounded">
                                        <InfoSection
                                            icon="sender"
                                            title="Sender"
                                            content={
                                                <>
                                                    <RenderTextCopyLink text={item?.sender} network={item?.network} type="account" />
                                                    {item?.initCode?.length > 2 && (
                                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-md bg-gray-50 ring-1 ring-inset ring-gray-500/10">
                                                            newly created
                                                        </span>
                                                    )}
                                                    <PowerButton
                                                        item={item?.accountSender?.factory?.toLowerCase()}
                                                        addressMapping={addressMapping}
                                                    />
                                                </>
                                            }
                                        />
                                        {((targets && targets.length > 0) || item?.target) && (
                                            <InfoSection
                                                icon="target"
                                                title="Target"
                                                content={
                                                    targets.length > 0 ? renderTarget(targets, true) : renderTarget(item.target, false)
                                                }
                                                isFlex={true}
                                            />
                                        )}
                                        <InfoSection
                                            icon="blockTime"
                                            title="Block Time"
                                            content={
                                                <div className="flex items-center gap-[10px]">
                                                    <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                        {moment.unix(item?.blockTime!).utcOffset(120).format()}(Eastern European Standard
                                                        Time)
                                                    </span>
                                                </div>
                                            }
                                        />
                                        <InfoSection
                                            icon="status"
                                            title="Status"
                                            content={
                                                <div className="flex items-center gap-[10px]">
                                                    <Tooltip
                                                        arrow={true}
                                                        placement="top"
                                                        title={`A Status code indicating if the top level call is succeeded or failed(applicable for Post BYZANTIUM blocks only)`}
                                                    >
                                                        <Status type={item?.success} />
                                                    </Tooltip>
                                                </div>
                                            }
                                        />
                                        {type && (
                                            <InfoSection
                                                icon="transactionType"
                                                title="Value"
                                                content={
                                                    <div className="flex items-center gap-[10px]">
                                                        <div className="flex items-center gap-[10px]">{type}</div>
                                                    </div>
                                                }
                                            />
                                        )}
                                        {values?.length > 0 ||
                                            (item?.value && (
                                                <InfoSection
                                                    icon="value"
                                                    title="Value"
                                                    content={
                                                        <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                            {renderDisplayFee()}
                                                            {/*<RenderDisplayFee  items={ values?.length > 0 ? values : [item.value]} item={item} type={type} />*/}
                                                        </span>
                                                    }
                                                />
                                            ))}
                                        <InfoSection
                                            icon="gasFee"
                                            title="Gas Fee"
                                            content={
                                                <div className="flex items-center gap-[10px]">
                                                    <DisplayFee item={item?.actualGasCost!} network={item?.network} />
                                                </div>
                                            }
                                        />
                                        <InfoSection
                                            icon="gasUsed"
                                            title="Gas Used"
                                            content={<div className="flex items-center gap-[10px]">{item?.actualGasUsed}</div>}
                                        />
                                        <InfoSection
                                            icon="paymaster"
                                            title="Paymaster"
                                            content={
                                                <>
                                                    <div className="flex items-center gap-[10px]">
                                                        <RenderTextCopyLink
                                                            text={item?.paymaster}
                                                            network={item?.network}
                                                            type="paymaster"
                                                            active={item?.paymaster === '0x0000000000000000000000000000000000000000'}
                                                        />
                                                    </div>
                                                    <PowerButton item={item?.paymaster?.toLowerCase()} addressMapping={addressMapping} />
                                                </>
                                            }
                                        />
                                        <InfoSection
                                            icon="beneficiary"
                                            title="Beneficiary"
                                            content={
                                                <>
                                                    <RenderTextCopyLink text={item?.beneficiary} network={item?.network} type="bundler" />
                                                    <PowerButton item={item?.beneficiary?.toLowerCase()} addressMapping={addressMapping} />
                                                </>
                                            }
                                        />
                                        <InfoSection
                                            icon="transactionHash"
                                            title="Transaction Hash"
                                            content={
                                                <RenderTextCopyLink text={item?.transactionHash} network={item?.network} type="bundler" />
                                            }
                                        />
                                        <InfoSection
                                            icon="block"
                                            title="Block"
                                            content={<RenderTextCopyLink text={item?.blockNumber} network={item?.network} type="block" />}
                                        />
                                        {item?.erc20Transfers?.length > 0 && (
                                            <InfoSection
                                                icon="erc20"
                                                title="ERC-20 Tokens Transferred"
                                                content={
                                                    <div className="flex flex-col gap-[10px] w-full">
                                                        {item.erc20Transfers
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
                                                                    }: UserOp['erc20Transfers'],
                                                                    index: number,
                                                                ) => (
                                                                    <ERC20Transfers
                                                                        sender={item?.sender as string}
                                                                        to={to}
                                                                        from={from}
                                                                        value={value}
                                                                        name={name}
                                                                        symbol={symbol}
                                                                        decimals={parseInt(decimals)}
                                                                        address={contractAddress}
                                                                        key={index}
                                                                        selectedNetwork={item?.network}
                                                                    />
                                                                ),
                                                            )}
                                                    </div>
                                                }
                                            />
                                        )}
                                        {item?.erc721Transfers?.length > 0 && (
                                            <InfoSection
                                                icon="erc721"
                                                title="ERC-20 Tokens Transferred"
                                                content={
                                                    <div className="flex flex-col gap-[10px] w-full">
                                                        {item.erc721Transfers
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
                                                                    }: UserOp['erc721Transfers'],
                                                                    index: number,
                                                                ) => (
                                                                    <ERC721Transfers
                                                                        sender={item?.sender as string}
                                                                        to={to}
                                                                        from={from}
                                                                        tokenId={tokenId}
                                                                        name={name}
                                                                        symbol={symbol}
                                                                        decimals={parseInt(decimals)}
                                                                        address={contractAddress}
                                                                        key={index}
                                                                        selectedNetwork={item?.network}
                                                                    />
                                                                ),
                                                            )}
                                                    </div>
                                                }
                                            />
                                        )}
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
