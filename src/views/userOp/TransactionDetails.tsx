import { UserOp, erc20Transfer, metadata } from '@/components/common/apiCalls/jiffyApis';
import { NETWORK_SCANNER_MAP, POWERED_BY_LOGO_MAP } from '@/components/common/constants';
import CopyButton from '@/components/common/copy_button/CopyButton';
import DisplayFee from '@/components/common/displayfee/DisplayFee';
import IconText from '@/components/common/IconText';
import LinkAndCopy from '@/components/common/LinkAndCopy';
import Status from '@/components/common/status/Status';
import Caption from '@/components/common/table/Caption';
import { shortenString } from '@/components/common/utils';
import { Link, Tooltip, Box, CircularProgress } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import { populateERC20TransfersWithTokenInfo } from '@/components/common/apiCalls/jiffyApis';

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
import ExecutionTrace from './ExecutionTrace';
import ERC721Transfers from './ERC721Transfers';
export default function TransactionDetails({
    tableLoading,
    skeletonCards,
    item,
    responseData,
    addressMapping,
    metaData,
    setMetadata,
    selectedNetwork,
}: any) {
    const router = useRouter();
    const [showMetadata, setShowMetadata] = useState(false);
    const [reload, setReload] = useState(0);
    const [targets, setTargets] = useState([] as Array<string>);
    const [invokes, setInvokes] = useState([] as Array<string>);
    const [values, setValues] = useState([] as Array<number>);
    const [beneficiary, setBeneficiary] = useState('');
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
                invokesList.push(executionCall.traceData.method ? executionCall.traceData.method : executionCall.traceData.input.slice(0,10))
                valueList.push(parseInt(executionCall.traceData.value, 16));
            }
            setTargets(targetList);
            setValues(valueList);
            setInvokes(invokesList);
        }
    };

    const [traceCallToDisplay, setTraceCallToDisplay] = React.useState<Array<ExecutionTraceType>>([] as Array<ExecutionTraceType>);

    const getNumberOfERC20Transfers = (erc20Transfers: Array<{to:string, from: string}>) => {
        let num = 0;
        for (let i in erc20Transfers) {
            if (item?.sender.toLowerCase() == erc20Transfers[i].from.toLowerCase() || item?.sender.toLowerCase() == erc20Transfers[i].to.toLowerCase()) {
                num++
            }
        }
        console.log()
        console.log('num', num)
        return num;
    }

    const showERC20Transfers = (showMetadata: boolean, metadata: metadata, reload: number): boolean => {
        let showERC20Transfers = false;
        if (showMetadata && metadata && metadata?.erc20Transfers && metadata?.erc20Transfers.length > 0) {
            showERC20Transfers = true;
        }
        console.log(showMetadata, metadata, metadata?.erc20Transfers, showERC20Transfers);
        console.log('showERC20Transfers', showERC20Transfers);
        return showERC20Transfers;
    };

    const updateMetadata = async (metadata: metadata) => {
        const updatedMetaData = await populateERC20TransfersWithTokenInfo(metadata);
        console.log('updatedMetaData', updatedMetaData);
        setMetadata(() => {
            return updatedMetaData;
        });
        console.log('updatedMetaData.erc20Transfers');
        setReload(1);
        setShowMetadata(true);
    };

    useEffect(() => {
        if (metaData && Object.keys(metaData).length != 0 && 'executionTrace' in metaData) {
            setShowMetadata(true);
            setTraceToDisplace(metaData.executionTrace);
            // if (metaData.erc20Transfers && metaData.erc20Transfers.length > 0 && !metaData.erc20Transfers[0].name) {
            //     updateMetadata(metaData);
            // }
        }
    }, [metaData]);

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
                                                            <CopyButton text={item?.sender} />
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
                                                    {item?.accountSender?.factory === '' ? null : (
                                                        <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                                            <p className="text-[10px] text-[#455A64]">
                                                                {addressMapping?.[item?.accountSender?.factory?.toLowerCase()] &&
                                                                    POWERED_BY_LOGO_MAP?.[
                                                                        addressMapping?.[
                                                                            item?.accountSender?.factory?.toLowerCase()
                                                                        ]?.company.toLowerCase()
                                                                    ] && (
                                                                        <span className="text-bluegrey-300 text-[10px] leading-5 flex items-center gap-2 font-normal">
                                                                            Powered By{' '}
                                                                            <img
                                                                                src={
                                                                                    POWERED_BY_LOGO_MAP?.[
                                                                                        addressMapping?.[
                                                                                            item?.accountSender?.factory?.toLowerCase()
                                                                                        ]?.company.toLowerCase()
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
                                        </div>
                                        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/sader.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Target
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Target</p>
                                                </div>
                                                <div className="block justify-between">
                                                    {targets && targets.length > 0 ? (
                                                        targets.map((target: any, index: number) => {
                                                            return (
                                                                <div key={index} className="flex gap-[10px] item-center display-ruby">
                                                                    <LinkAndCopy
                                                                        text={target}
                                                                        link={`/account/${target}?network=${
                                                                            item?.network ? item?.network : ''
                                                                        }`}
                                                                        copyText={target}
                                                                        secondaryTargetLink={NETWORK_SCANNER_MAP[selectedNetwork] + '/address/' + target}
                                                                    />
                                                                    {" "} Invoked: {invokes[index]}
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <div className="flex items-center gap-[10px]">
                                                            <LinkAndCopy
                                                                text={item?.target}
                                                                link={`/account/${item?.target}?network=${
                                                                    item?.network ? item?.network : ''
                                                                }`}
                                                                copyText={item?.target}
                                                            />
                                                            <Link
                                                                underline="hover"
                                                                // color="text.primary"
                                                                href={`/account/${item?.target}?network=${
                                                                    item?.network ? item.network : ''
                                                                }`}
                                                                aria-current="page"
                                                                className="text-blue-200 "
                                                                target={'_blank'}
                                                            ></Link>
                                                        </div>
                                                    )}
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
                                        {type && <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText toolTip="actualGasCost by user op" icon={'/images/Fee.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        Transaction Type
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
                                                            {type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
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
                                                <div className="md:flex justify-between" style={{display: 'ruby'}}>
                                                    <div className="flex flex-col gap-[10px] w-full">
                                                    {values && values.length > 0 ? (
                                                        values.map((value: any, index: number) => {
                                                            return (
                                                                <span key={index} className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5 flex items-center">
                                                                    {type == "Multi Send" && (index+1)+":  "} &nbsp; <DisplayFee
                                                                        item={value! ? value! : '0'}
                                                                        network={item?.network}
                                                                    />
                                                                </span>
                                                            );
                                                        })
                                                    ) : (
                                                        <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                                                            <DisplayFee item={item?.value! ? item?.value! : '0'} network={item?.network} />
                                                        </span>
                                                    )}
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
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">Gas Fee</p>
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
                                                    {item?.paymaster === '' ? null : (
                                                        <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                                            <p className="text-[10px] text-[#455A64]">
                                                                {addressMapping?.[item?.paymaster?.toLowerCase()] &&
                                                                    POWERED_BY_LOGO_MAP?.[
                                                                        addressMapping?.[
                                                                            item?.paymaster?.toLowerCase()
                                                                        ]?.company.toLowerCase()
                                                                    ] && (
                                                                        <span className="text-bluegrey-300 text-[10px] leading-5 flex items-center gap-2 font-normal">
                                                                            Powered By{' '}
                                                                            <img
                                                                                src={
                                                                                    POWERED_BY_LOGO_MAP?.[
                                                                                        addressMapping?.[
                                                                                            item?.paymaster?.toLowerCase()
                                                                                        ]?.company.toLowerCase()
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
                                                            <CopyButton text={item?.beneficiary} />
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
                                                    {item?.beneficiary === '' ? null : (
                                                        <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                                            <p className="text-[10px] text-[#455A64]">
                                                                {addressMapping?.[item?.beneficiary?.toLowerCase()] &&
                                                                    POWERED_BY_LOGO_MAP?.[
                                                                        addressMapping?.[
                                                                            item?.beneficiary?.toLowerCase()
                                                                        ]?.company.toLowerCase()
                                                                    ] && (
                                                                        <span className="text-bluegrey-300 text-[10px] leading-5 flex items-center gap-2 font-normal">
                                                                            Powered By{' '}
                                                                            <img
                                                                                src={
                                                                                    POWERED_BY_LOGO_MAP?.[
                                                                                        addressMapping?.[
                                                                                            item?.beneficiary.toLowerCase()
                                                                                        ]?.company.toLowerCase()
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
                                                            href={`/bundle/${item?.transactionHash}?network=${item?.network}`}
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
                                                            href={`/bundle/${item?.transactionHash}?network=${item?.network}`}
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
                                                                {item?.blockNumber}
                                                            </span>
                                                        </Link>
                                                        <div className="w-[40px] flex">
                                                            <CopyButton text={item?.blockNumber} />
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
                                        {item.erc20Transfers?.length > 0 && (
                                            <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                                    <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                        <IconText icon={'/images/cube.svg'}>
                                                            <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                                ERC-20 Tokens Transferred
                                                            </span>
                                                        </IconText>
                                                    </div>
                                                    <div className=" break-words gap-2 flex-1">
                                                        <div>
                                                            <p className="text-[14px] text-[#455A64] md:hidden block">
                                                                ERC-20 Tokens Transferred
                                                            </p>
                                                        </div>
                                                        <div className="md:flex block justify-between">
                                                            <div className="flex flex-col gap-[10px] w-full">
                                                                {item.erc20Transfers.slice(0).reverse().map(
                                                                    (
                                                                        {
                                                                            to,
                                                                            from,
                                                                            value,
                                                                            name,
                                                                            decimals,
                                                                            contractAddress,
                                                                            symbol
                                                                        }: UserOp['erc20Transfers'],
                                                                        index: number,
                                                                    ) => (
                                                                        <ERC20Transfers
                                                                            sender={item.sender as string}
                                                                            to={to}
                                                                            from={from}
                                                                            value={value}
                                                                            name={name}
                                                                            symbol={symbol}
                                                                            decimals={parseInt(decimals)}
                                                                            address={contractAddress}
                                                                            key={index}
                                                                            selectedNetwork={item.network}
                                                                        />
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        {item.erc721Transfers?.length > 0 && (
                                            <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <IconText icon={'/images/cube.svg'}>
                                                    <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                        ERC-721 Tokens Transferred
                                                    </span>
                                                </IconText>
                                            </div>
                                            <div className=" break-words gap-2 flex-1">
                                                <div>
                                                    <p className="text-[14px] text-[#455A64] md:hidden block">
                                                        ERC-721 Tokens Transferred
                                                    </p>
                                                </div>
                                                <div className="md:flex block justify-between">
                                                    <div className="flex flex-col gap-[10px] w-full">
                                                        {item.erc721Transfers.slice(0).reverse().map(
                                                            (
                                                                {
                                                                    to,
                                                                    from,
                                                                    tokenId,
                                                                    name,
                                                                    decimals,
                                                                    contractAddress,
                                                                    symbol
                                                                }: UserOp['erc721Transfers'],
                                                                index: number,
                                                            ) => (
                                                                <ERC721Transfers
                                                                    sender={item.sender as string}
                                                                    to={to}
                                                                    from={from}
                                                                    tokenId={tokenId}
                                                                    name={name}
                                                                    symbol={symbol}
                                                                    decimals={parseInt(decimals)}
                                                                    address={contractAddress}
                                                                    key={index}
                                                                    selectedNetwork={item.network}
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
