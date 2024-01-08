import { UserOp } from '@/components/common/apiCalls/jiffyApis';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import DisplayFee from '@/components/common/displayfee/DisplayFee';
import LinkAndCopy from '@/components/common/LinkAndCopy';
import Status from '@/components/common/status/Status';
import Caption from '@/components/common/Caption';
import { Tooltip } from '@mui/material';
import { InfoSection, RenderTextCopyLink, PowerButton, RenderDisplayFee } from '@/views/userOp/widget';
import moment from 'moment';

import { createPublicClient, http } from 'viem';
import { localhost } from 'viem/chains';

const client = createPublicClient({
    chain: localhost,
    transport: http('http://localhost:8545'),
});

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
import DisplayTime from './DisplayTime';
export default function TransactionDetails({ tableLoading, skeletonCards, mempoolData, addressMapping, metaData, selectedNetwork }: any) {
    const [showMetadata, setShowMetadata] = useState(false);
    const [targets, setTargets] = useState([] as Array<string>);
    const [invokes, setInvokes] = useState([] as Array<string>);
    const [values, setValues] = useState([] as Array<number>);
    const [status, setStatus] = useState('outstanding');
    const [type, setType] = useState('');
    const [blockDetails, setBlockDetails] = useState({} as any);

    // const setTraceToDisplace = (executionTrace: ExecutionTraceType) => {
    //     let executionList;
    //     if (
    //         executionTrace.next != null &&
    //         executionTrace.next.length > 0 &&
    //         executionTrace.next[0].traceData.method?.toLowerCase() == 'multisend'
    //     ) {
    //         setType('Multi Send');
    //         executionList = executionTrace.next[0].next;
    //     } else {
    //         setType('Normal');
    //         executionList = executionTrace.next;
    //     }
    //     if (executionList != null && executionList.length > 0) {
    //         setTraceCallToDisplay(executionList);
    //         let targetList = [];
    //         let valueList = [];
    //         let invokesList = [];
    //         for (let i in executionList) {
    //             let executionCall = executionList[i];
    //             targetList.push(executionCall.traceData.to);
    //             invokesList.push(
    //                 executionCall.traceData.method ? executionCall.traceData.method : executionCall.traceData.input.slice(0, 10),
    //             );
    //             valueList.push(parseInt(executionCall.traceData.value, 16));
    //         }
    //         setTargets(targetList);
    //         setValues(valueList);
    //         setInvokes(invokesList);
    //     }
    // };

    // const [traceCallToDisplay, setTraceCallToDisplay] = React.useState<Array<ExecutionTraceType>>([] as Array<ExecutionTraceType>);

    // useEffect(() => {
    //     if (metaData && Object.keys(metaData).length != 0 && 'executionTrace' in metaData) {
    //         setShowMetadata(true);
    //         setTraceToDisplace(metaData.executionTrace);
    //         // if (metaData.erc20Transfers && metaData.erc20Transfers.length > 0 && !metaData.erc20Transfers[0].name) {
    //         //     updateMetadata(metaData);
    //         // }
    //     }
    // }, [metaData]);

    // const renderDisplayFee = () => {
    //     const fee = (value: any, index: number) => (
    //         <span key={index} className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5 flex items-center">
    //             {type == 'Multi Send' && index + 1 + ':  '} &nbsp;{' '}
    //             <DisplayFee
    //                 item={value! ? (typeof value == 'string' ? value : parseInt(value.hex))! : 'Unavailable'}
    //                 network={item?.network}
    //             />
    //         </span>
    //     );
    //     const listFee = values?.length > 0 ? values : item.value;
    //     return (
    //         <>
    //             {listFee.map((value: any, index: number) => {
    //                 return fee(value, index);
    //             })}
    //         </>
    //     );
    // };
    // const renderTarget = (targets: any, invoked: boolean): any => {
    //     return targets.map((target: any, index: number) => {
    //         return (
    //             <div key={index} className="flex gap-[10px] item-center display-ruby">
    //                 <LinkAndCopy
    //                     text={target}
    //                     link={`/account/${target}?network=${item?.network ? item?.network : ''}`}
    //                     copyText={target}
    //                     secondaryTargetLink={NETWORK_SCANNER_MAP[selectedNetwork] + '/address/' + target}
    //                 />
    //                 {invoked ? `Invoked: ${invokes[index]}` : ''}
    //             </div>
    //         );
    //     });
    // };

    useEffect(() => {
        if (mempoolData) {
            getStatus(mempoolData);
        }
    }, [mempoolData]);

    useEffect(() => {
        if (mempoolData?.reciept.blockNumber > 0) {
            client.getBlock(mempoolData?.reciept.blockNumber).then((block) => {
                setBlockDetails(block);
                console.log('block', block);
            });
        }
    }, [mempoolData]);

    const getStatus = (mempoolData: any) => {
        if (mempoolData?.reciept.status == 'success') {
            setStatus('success');
        } else if ('reciept' in mempoolData && 'blockNumber' in mempoolData) {
            setStatus('failure');
        } else if (mempoolData?.submittedTime > 0) {
            setStatus('submitted');
        } else if (mempoolData?.processedTime > 0) {
            setStatus('processing');
        } else {
            setStatus('outstanding');
        }
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
                                                    <RenderTextCopyLink
                                                        text={mempoolData?.data.userOperation?.sender}
                                                        network={'mainnet'}
                                                        type="account"
                                                    />
                                                    {mempoolData?.data.userOperation.initCode?.length > 2 && (
                                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-md bg-gray-50 ring-1 ring-inset ring-gray-500/10">
                                                            newly created
                                                        </span>
                                                    )}
                                                </>
                                            }
                                        />
                                        <InfoSection
                                            icon="firstSubmissionTime"
                                            title="First Submitted"
                                            content={<DisplayTime timestamp={mempoolData?.firstSubmittedTime / 1000} />}
                                        />

                                        {/* {mempoolData?.processedTime && (
                                            <InfoSection
                                                icon="processedTime"
                                                title="Processing Time"
                                                content={<DisplayTime timestamp={mempoolData?.processedTime / 1000} />}
                                            />
                                        )} */}

                                        {mempoolData?.submittedTime && (
                                            <InfoSection
                                                icon="submissionTime"
                                                title="Block Time"
                                                content={
                                                    <>
                                                        <DisplayTime timestamp={mempoolData?.submittedTime / 1000} />
                                                    </>
                                                }
                                            />
                                        )}
                                        {blockDetails && blockDetails?.timestamp && (
                                            <InfoSection
                                                icon="blockTime"
                                                title="Block Time"
                                                content={
                                                    <>
                                                        <DisplayTime timestamp={parseInt(blockDetails?.timestamp.toString())} />
                                                    </>
                                                }
                                            />
                                        )}
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
                                                        <Status status={status} />
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
                                        {/* {mempoolData?.reciept && <InfoSection
                                            icon="gasFee"
                                            title="Gas Fee"
                                            content={
                                                <div className="flex items-center gap-[10px]">
                                                    <DisplayFee item={item?.actualGasCost!} network={item?.network} />
                                                </div>
                                            }
                                        />}
                                        {mempoolData?.reciept &&<InfoSection
                                            icon="gasUsed"
                                            title="Gas Used"
                                            content={<div className="flex items-center gap-[10px]">{item?.actualGasUsed}</div>}
                                        />}
                                        {mempoolData?.reciept && <InfoSection
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
                                        />} */}
                                        {mempoolData?.transactionData?.transactionRequest && (
                                            <InfoSection
                                                icon="beneficiary"
                                                title="Beneficiary"
                                                content={
                                                    <>
                                                        <RenderTextCopyLink
                                                            text={mempoolData?.transactionData?.transactionRequest.args[1]}
                                                            network={'mainnet'}
                                                            type="bundler"
                                                        />
                                                        <PowerButton
                                                            item={mempoolData?.transactionData?.transactionRequest.args[1]}
                                                            addressMapping={addressMapping}
                                                        />
                                                    </>
                                                }
                                            />
                                        )}
                                        <InfoSection
                                            icon="transactionHash"
                                            title="Transaction Hash"
                                            content={
                                                <RenderTextCopyLink
                                                    text={
                                                        mempoolData?.transactionData.transactionHash
                                                            ? mempoolData.transactionData.transactionHash
                                                            : 'Not mined'
                                                    }
                                                    network={'mainnet'}
                                                    type="bundle"
                                                />
                                            }
                                        />
                                        {mempoolData?.reciept && 'blockNumber' in mempoolData.reciept && (
                                            <InfoSection
                                                icon="block"
                                                title="Block"
                                                content={
                                                    <RenderTextCopyLink
                                                        text={mempoolData?.reciept?.blockNumber}
                                                        network={'mainnet'}
                                                        type="block"
                                                    />
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
