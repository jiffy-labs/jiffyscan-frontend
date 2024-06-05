import Chip, { ChipProps } from '@/components/common/chip/Chip';
import CopyButton from '@/components/common/copy_button/CopyButton';
import DisplayFee from '@/components/common/displayfee/DisplayFee';
import IconText from '@/components/common/IconText';
import InfoButton from '@/components/common/InfoButton';
import Caption from '@/components/common/Caption';
import { getFee } from '@/components/common/utils';
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton-2';
import { BUTTON_LIST } from './UserOperation';
import sx from './usertable.module.sass';
import LinkAndCopy from '@/components/common/LinkAndCopy';
import { ENTRY_POINT_ADDRESS_MAP, NETWORK_SCANNER_MAP } from '@/components/common/constants';

const FORMAT_MAP: { [key: string]: string } = {
    '0x940d3c60': 'executeCall(address target, uint256 value, bytes targetCallData)',
    '0x9e5d4c49': 'executeCall(address target,uint256 value, bytes data)',
    '0x912ccaa3': 'executeBatchCall(address[] target, uint256[] value, bytes[] targetCallData)',
    '0x18dfb3c7': 'execute(address target[], bytes callData[])',
    '0xb61d27f6': 'executeCall(address target,uint256 value, bytes data)',
    '0x51945447': 'executeCall(address target,uint256 value, bytes data)',
    '0xf34308ef': 'executeCall(address target,uint256 value, bytes data)',
    '0xabc5345e': 'executeBySender((address target,uint256 value,bytes data)[])',//executeBySender((address,uint256,bytes)[])
    '0xa2ea6766': 'executeMultiple(((address target,uint256 value,bytes data)[],bytes)[])', //executeMultiple(((address,uint256,bytes)[],bytes)[])
    '0x541d63c8': 'executeUserOpWithErrorString(address to, uint256 value, bytes data, uint8 operation )',//executeUserOpWithErrorString(address,uint256,bytes,uint8)
};

const getFormat = (callData: string) => {
    if (callData.length < 10) return '';
    const format = FORMAT_MAP[callData.slice(0, 10)];
    if (format) return format;
    return '';
};

 function DeveloperDetails({
    tableLoading,
    skeletonCards1,
    item,
    selectedColor,
    setSelectedColor,
    metaData,
    selectedNetwork,
}: any) {
    const initialize = (key: any, initialValue: any) => {
        try {
            const item = localStorage.getItem(key);
            if (item && item !== 'undefined') {
                return JSON.parse(item);
            }

            localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        } catch {
            return initialValue;
        }
    };

    const [dropOpen, SetdropOpen] = useState(() => initialize('dropOpen', true));
    const [open, setOpen] = useState(() => initialize('open', true));
    const [userOpParamsExists, setUserOpParamsExists] = useState(false);

    useEffect(() => {
        // save dropOpen state in localstorage
        if (typeof window === 'undefined') return;
        localStorage.setItem('dropOpen', JSON.stringify(dropOpen));
    }, [dropOpen]);

    useEffect(() => {
        // save open state in localstorage
        if (typeof window === 'undefined') return;
        localStorage.setItem('open', JSON.stringify(open));
    });

    useEffect(() => {
        if (metaData && Object.keys(metaData).length > 0 && 'userOpParams' in metaData && metaData.userOpParams.length > 0)
            setUserOpParamsExists(true);
    }, [metaData]);

    return (
        <div>
            <section className="mt-[15px] px-3 mb-10">
                <div className="container px-0">
                    <div>
                        <Caption icon={'/images/cube.svg'} text={''} >
                            Developer Details
                        </Caption>
                    </div>
                    <div className="bg-white rounded shadow-300 ">
                        {tableLoading ? (
                            skeletonCards1.map((index: number) => <Skeleton height={55} key={index} />)
                        ) : (
                            <div className="items-center md:pt-[0px] pt-[16px]  md:gap-[20px] gap-[10px]  pb-[2px]">
                                <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px]  pb-[2px]">
                                    <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                        <IconText icon={'/images/Hash.svg'}>
                                            <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">
                                                Entry Point
                                            </span>
                                        </IconText>
                                    </div>
                                    <div className="flex-1 gap-2 break-words ">
                                        <div>
                                            <p className="text-[14px] text-[#455A64] md:hidden block">Entry Point</p>
                                        </div>
                                        <div className="justify-between block md:flex">
                                            <div className="flex items-center gap-[10px]">
                                                <LinkAndCopy
                                                    text={item?.entryPoint}
                                                    link={NETWORK_SCANNER_MAP[selectedNetwork] + '/address/' + item?.entryPoint}
                                                    copyText={item?.entryPoint}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-[16px]" onClick={() => SetdropOpen(!dropOpen)}>
                                    <div className="flex gap-[12px] w-[400px]">
                                        <img src="/images/code-array.svg" alt="" />
                                        <p>CallData</p>
                                        <InfoButton />
                                    </div>
                                    <div className="flex gap-[132px]">
                                        <img src="/images/dropdownarrow.svg" />
                                    </div>
                                </div>
                                {dropOpen ? (
                                    <>
                                        {selectedColor === 'Original' ? (
                                            <>
                                                <div className="py-[14px] px-4 mt-[-28px]">
                                                    <div className="py-[14px] px-4 mt-[-28px]">
                                                        <div className="whitespace-normal  break-all text-black[87%] py-[14px] text-sm leading-5">
                                                            <div className="py-[14px] flex px-4 whitespace-pre">
                                                                <div className="flex items-center justify-between w-full my-[2px] mb-2">
                                                                    <div className="flex gap-1">
                                                                        {BUTTON_LIST.map(({ name, key }, index) => (
                                                                            <Chip
                                                                                className={`
                                    text-white table-tab py-[6px] px-3 ${sx.tab}`}
                                                                                onClick={() => {
                                                                                    setSelectedColor(key);
                                                                                }}
                                                                                key={index}
                                                                                color={`${selectedColor === key ? 'blue-700' : 'white'}`}
                                                                                // variant={"outlined"}
                                                                            >
                                                                                {name}
                                                                            </Chip>
                                                                        ))}
                                                                    </div>
                                                                    <div className="flex-end">
                                                                        <CopyButton text={item?.input!} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="overflow-auto flex-1 max-h-[290px] custom-scroll bg-white border-dark-200 rounded border ml-[16px]">
                                                                {item?.input}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="py-[14px] px-4 mt-[-28px]">
                                                    <div className="py-[14px] px-4 ">
                                                        <div className="flex my-[2px] justify-between mb-2">
                                                            <div className="flex gap-1">
                                                                {BUTTON_LIST.map(({ name, key }, index) => (
                                                                    <Chip
                                                                        className={`text-white table-tab py-[6px] px-3 ${sx.tab}`}
                                                                        onClick={() => setSelectedColor(key)}
                                                                        key={index}
                                                                        color={`${selectedColor === key ? 'blue-700' : 'white'}`}
                                                                    >
                                                                        {name}
                                                                    </Chip>
                                                                ))}
                                                            </div>
                                                            <div className="flex-end">
                                                                <CopyButton text={item?.input!} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="overflow-y-auto overflow-x-hidden flex-1 max-h-[290px] bg-white border-dark-200 rounded border">
                                                            <table className="divide-y wordbrack divide-dark-100">
                                                                <thead className="bg-white">
                                                                    <tr>
                                                                        <th
                                                                            scope="col"
                                                                            className="sticky whitespace-nowrap z-10 top-0 bg-white py-[14px] px-3 text-left text-[12px] font-bold leading-5 text-dark-600"
                                                                        >
                                                                            Name
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="sticky whitespace-nowrap z-10 top-0 bg-white py-[14px] px-3 text-left text-[12px] font-bold leading-5 text-dark-600"
                                                                        >
                                                                            Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="sticky whitespace-nowrap z-10 top-0 bg-white py-[14px] px-3 text-left text-[12px] font-bold leading-5 text-dark-600"
                                                                        >
                                                                            Data
                                                                        </th>

                                                                        <th
                                                                            scope="col"
                                                                            className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0"
                                                                        >
                                                                            <span className="sr-only">Edit</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-dark-100">
                                                                    <tr key="sender">
                                                                        <td className="whitespace-nowrap text-black  [87%] py-[14px] px-3 text-sm leading-5">
                                                                            sender
                                                                        </td>
                                                                        <td className="whitespace-nowrap text-black  [87%] py-[14px] px-3 text-sm leading-5">
                                                                            address
                                                                        </td>
                                                                        <td className="wordbrack  text-black wordbrack  [87%] py-[14px] px-3 text-sm leading-5">
                                                                            <span className="text-sm leading-5 break-all text-dark-700">
                                                                                {item?.sender}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="bg-gray-50" key="nonce">
                                                                        <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5 ">
                                                                            nonce
                                                                        </td>
                                                                        <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5 ">
                                                                            uint256
                                                                        </td>
                                                                        <td className="wordbrack  text-black wordbrack  [87%] py-[14px] px-3 text-sm leading-5 ">
                                                                            {userOpParamsExists && metaData?.userOpParams[1]
                                                                                ? parseInt(metaData?.userOpParams[1].hex)
                                                                                : item?.nonce}
                                                                        </td>
                                                                    </tr>
                                                                    <tr key="initCode">
                                                                        <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5">
                                                                            initCode
                                                                        </td>
                                                                        <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5">
                                                                            bytes
                                                                        </td>
                                                                        <td className="whitespace-nowrap text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                            {userOpParamsExists && metaData?.userOpParams[2]
                                                                                ? metaData?.userOpParams[2]
                                                                                : item?.initCode
                                                                                ? item?.initCode
                                                                                : 'Unable to decode user op input'}
                                                                        </td>
                                                                    </tr>
                                                                    {selectedColor === 'Original' ? (
                                                                        <tr>
                                                                            <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5">
                                                                                InitCode
                                                                            </td>
                                                                            <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5">
                                                                                Bytes
                                                                            </td>
                                                                            <td className="wordbrack  text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                {userOpParamsExists && metaData?.userOpParams[2]
                                                                                    ? metaData?.userOpParams[2]
                                                                                    : item?.initCode}
                                                                            </td>
                                                                        </tr>
                                                                    ) : (
                                                                        ''
                                                                    )}

                                                                    <tr>
                                                                        <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5">
                                                                            <div className="flex items-center gap-2">
                                                                                decoded calldata
                                                                                <button
                                                                                    onClick={() => setOpen(!open)}
                                                                                    className={`${open ? 'rotate-180' : ''}`}
                                                                                >
                                                                                    <IconText icon="/images/arrow-drop.svg" />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                        <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5"></td>
                                                                        <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                            {!(
                                                                                item?.preDecodedCallData &&
                                                                                getFormat(item?.preDecodedCallData) != ''
                                                                            ) && (
                                                                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 rounded-md bg-gray-50 ring-1 ring-inset ring-gray-500/10">
                                                                                    {item?.callData == '0x'
                                                                                        ? 'No call data'
                                                                                        : 'Unknown callData signature'}
                                                                                </span>
                                                                            )}
                                                                            <span className="text-sm leading-5 text-blue-200"></span>
                                                                        </td>
                                                                    </tr>
                                                                    {open && (
                                                                        <>
                                                                            {item?.preDecodedCallData &&
                                                                            getFormat(item?.preDecodedCallData) != '' ? (
                                                                                <tr>
                                                                                    <td className="text-black  [87%] text-end text-sm leading-5 py-[14px] px-3"></td>
                                                                                    <td className="text-black [87%] text-left text-sm leading-5 py-[14px] px-3">
                                                                                        format
                                                                                    </td>
                                                                                    <td className="wordbrack  text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                        {getFormat(item?.preDecodedCallData)}
                                                                                    </td>
                                                                                    <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                        <span className="text-sm leading-5 text-blue-200"></span>
                                                                                    </td>
                                                                                </tr>
                                                                            ) : (
                                                                                ''
                                                                            )}
                                                                            {item?.target &&
                                                                                item?.target.map((target: string, index: number) => {
                                                                                    return (
                                                                                        <>
                                                                                            <tr key={index}>
                                                                                                <td className="text-black  [87%] text-end text-sm leading-5 py-[14px] px-3"></td>
                                                                                                <td className="text-black [87%] text-left text-sm leading-5 py-[14px] px-3">
                                                                                                    {index + 1}: target
                                                                                                </td>
                                                                                                <td className="wordbrack  text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                                    {target}
                                                                                                </td>
                                                                                                <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                                    <span className="text-sm leading-5 text-blue-200"></span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            {item?.value &&
                                                                                                item?.value.length ==
                                                                                                    item?.target.length && (
                                                                                                    <tr key={index}>
                                                                                                        <td className="text-black  [87%] text-end text-sm leading-5 py-[14px] px-3"></td>
                                                                                                        <td className="text-black [87%] text-left text-sm leading-5 py-[14px] px-3">
                                                                                                            {index + 1}: value
                                                                                                        </td>
                                                                                                        <td className="wordbrack  text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                                            {typeof item.value[index] ==
                                                                                                            'string'
                                                                                                                ? item.value[index]
                                                                                                                : parseInt(
                                                                                                                      item.value[index].hex,
                                                                                                                  )}
                                                                                                        </td>
                                                                                                        <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                                            <span className="text-sm leading-5 text-blue-200"></span>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                )}
                                                                                            {item?.callData &&
                                                                                                item?.callData.length ==
                                                                                                    item.target.length && (
                                                                                                    <tr key={index}>
                                                                                                        <td className="text-black  [87%] text-end text-sm leading-5 py-[14px] px-3"></td>
                                                                                                        <td className="text-black [87%] text-left text-sm leading-5 py-[14px] px-3">
                                                                                                            {index + 1}: callData
                                                                                                        </td>
                                                                                                        <td className="wordbrack  text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                                            {item?.callData[index]}
                                                                                                        </td>
                                                                                                        <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                                            <span className="text-sm leading-5 text-blue-200"></span>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                )}
                                                                                        </>
                                                                                    );
                                                                                })}
                                                                        </>
                                                                    )}
                                                                    <tr className="bg-gray-50">
                                                                        <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5 ">
                                                                            callData
                                                                        </td>
                                                                        <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5 ">
                                                                            bytes
                                                                        </td>
                                                                        <td className="wordbrack  text-black wordbrack  [87%] py-[14px] px-3 text-sm leading-5 ">
                                                                            {typeof item?.callData == 'string'
                                                                                ? item?.callData
                                                                                : item?.preDecodedCallData
                                                                                ? item?.preDecodedCallData
                                                                                : 'Unable to decode user op input'}
                                                                        </td>
                                                                    </tr>
                                                                    {ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint && (
                                                                        <tr>
                                                                            <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5">
                                                                                callGasLimit
                                                                            </td>
                                                                            <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                uint256
                                                                            </td>
                                                                            <td className="wordbrack  text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                {userOpParamsExists && metaData?.userOpParams[4]
                                                                                    ? parseInt(metaData?.userOpParams[4].hex)
                                                                                    : item?.callGasLimit
                                                                                    ? item?.callGasLimit
                                                                                    : 'Unable to decode user op input'}
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                    {ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint && (
                                                                        <tr>
                                                                            <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                verificationGasLimit
                                                                            </td>
                                                                            <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                uint256
                                                                            </td>
                                                                            <td className="wordbrack  text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                {userOpParamsExists && metaData?.userOpParams[5]
                                                                                    ? parseInt(metaData?.userOpParams[5].hex)
                                                                                    : item?.verificationGasLimit
                                                                                    ? item?.verificationGasLimit
                                                                                    : 'Unable to decode user op input'}
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                    {ENTRY_POINT_ADDRESS_MAP.V7 == item?.entryPoint && (
                                                                        <tr>
                                                                            <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5">
                                                                                accountGasFees
                                                                            </td>
                                                                            <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                bytes32
                                                                            </td>

                                                                            <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
                                                                                {item?.accountGasLimits
                                                                                    ? item.accountGasLimits
                                                                                    : 'Unable to decode user op input'}
                                                                            </td>
                                                                        </tr>
                                                                    )}

                                                                    <tr>
                                                                        <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5">
                                                                            preVerificationGas
                                                                        </td>
                                                                        <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                            uint256
                                                                        </td>
                                                                        <td className="wordbrack  text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                            {userOpParamsExists &&
                                                                            metaData?.userOpParams[
                                                                                ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint
                                                                                    ? 6
                                                                                    : 5
                                                                            ]
                                                                                ? parseInt(metaData?.userOpParams[6].hex)
                                                                                : item?.preVerificationGas
                                                                                ? item.preVerificationGas
                                                                                : 'Unable to decode user op input'}
                                                                        </td>
                                                                    </tr>

                                                                    {ENTRY_POINT_ADDRESS_MAP.V7 == item?.entryPoint && (
                                                                        <tr>
                                                                            <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5">
                                                                                gasFees
                                                                            </td>
                                                                            <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                bytes32
                                                                            </td>

                                                                            <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
                                                                                {item?.gasFees
                                                                                    ? item.gasFees
                                                                                    : 'Unable to decode user op input'}
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                    {ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint && (
                                                                        <tr>
                                                                            <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5">
                                                                                maxFeePerGas
                                                                            </td>
                                                                            <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                uint256
                                                                            </td>

                                                                            <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
                                                                                <DisplayFee
                                                                                    item={
                                                                                        userOpParamsExists && metaData?.userOpParams[7]
                                                                                            ? parseInt(metaData?.userOpParams[7].hex)
                                                                                            : item?.maxFeePerGas!
                                                                                    }
                                                                                    network={item?.network}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                    {ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint && (
                                                                        <tr>
                                                                            <td className=" text-black whitespace-nowrap [87%] py-[14px] px-3 text-sm leading-5">
                                                                                maxPriorityFeePerGas
                                                                            </td>
                                                                            <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                uint256
                                                                            </td>
                                                                            <td className="wordbrack text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                                <DisplayFee
                                                                                    item={
                                                                                        userOpParamsExists && metaData?.userOpParams[8]
                                                                                            ? parseInt(metaData?.userOpParams[8].hex)
                                                                                            : item?.maxPriorityFeePerGas!
                                                                                    }
                                                                                    network={item?.network}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                    <tr>
                                                                        <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                            paymasterAndData
                                                                        </td>
                                                                        <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                            uint256
                                                                        </td>
                                                                        <td className="wordbrack  text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                            {userOpParamsExists &&
                                                                            metaData?.userOpParams[
                                                                                ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint
                                                                                    ? 9
                                                                                    : 7
                                                                            ]
                                                                                ? ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() ==
                                                                                  item?.entryPoint
                                                                                    ? metaData?.userOpParams[9]
                                                                                    : metaData?.userOpParams[7]
                                                                                : item?.paymasterAndData
                                                                                ? item.paymasterAndData
                                                                                : 'Unable to decode user op input'}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                            signature
                                                                        </td>
                                                                        <td className=" text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                            uint256
                                                                        </td>
                                                                        <td className="wordbrack  text-black [87%] py-[14px] px-3 text-sm leading-5">
                                                                            {userOpParamsExists &&
                                                                            metaData?.userOpParams[
                                                                                ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint
                                                                                    ? 10
                                                                                    : 8
                                                                            ]
                                                                                ? ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() ==
                                                                                  item?.entryPoint
                                                                                    ? metaData?.userOpParams[10]
                                                                                    : metaData?.userOpParams[8]
                                                                                : item?.signature
                                                                                ? item?.signature
                                                                                : 'Unable to decode user op input'}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
export default React.memo(DeveloperDetails);