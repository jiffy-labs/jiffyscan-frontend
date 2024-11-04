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
import { FaArrowRight } from 'react-icons/fa';
import { RiArrowRightSLine } from 'react-icons/ri';

const FORMAT_MAP: { [key: string]: string } = {
    '0x940d3c60': 'executeCall(address target, uint256 value, bytes targetCallData)',
    '0x9e5d4c49': 'executeCall(address target,uint256 value, bytes data)',
    '0x912ccaa3': 'executeBatchCall(address[] target, uint256[] value, bytes[] targetCallData)',
    '0x18dfb3c7': 'execute(address target[], bytes callData[])',
    '0xb61d27f6': 'executeCall(address target,uint256 value, bytes data)',
    '0x51945447': 'executeCall(address target,uint256 value, bytes data)',
    '0xf34308ef': 'executeCall(address target,uint256 value, bytes data)',
    '0xabc5345e': 'executeBySender((address target,uint256 value,bytes data)[])', //executeBySender((address,uint256,bytes)[])
    '0xa2ea6766': 'executeMultiple(((address target,uint256 value,bytes data)[],bytes)[])', //executeMultiple(((address,uint256,bytes)[],bytes)[])
    '0x541d63c8': 'executeUserOpWithErrorString(address to, uint256 value, bytes data, uint8 operation )', //executeUserOpWithErrorString(address,uint256,bytes,uint8)
};

const getFormat = (callData: string) => {
    if (callData.length < 10) return '';
    const format = FORMAT_MAP[callData.slice(0, 10)];
    if (format) return format;
    return '';
};

function DeveloperDetails({ tableLoading, skeletonCards1, item, selectedColor, setSelectedColor, metaData, selectedNetwork }: any) {
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
    const [activeTab, setActiveTab] = useState<number>(3);

    const handleTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };
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

    const formatAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-6)}`;
    };
    return (
        <div className="flex flex-col bg-white  border-[#DADCE0] dark:border-[#3B3C40] w-full rounded-xl dark:bg-[#1F202B] px-0 md:px-10">
            <div className="w-full px-4 py-5 flex flex-col sm:flex-row rounded-t-xl border justify-between items-center h-auto sm:h-[72px] dark:border-[#3B3C40] dark:bg-[#1F202B]">
                <div className="flex flex-row gap-2 sm:gap-4 h-[32px] items-center">
                    <img src="/images/format.svg" alt="format" className="w-[24px] dark:fill-[#DADEF1]" />
                    <p className="text-black font-semibold font-gsans text-center text-lg sm:text-xl dark:text-[#DADEF1]">Format</p>
                </div>
                <div className="h-[32px] mt-3 sm:mt-0">
                    <ul className="grid grid-flow-col text-center font-gsans dark:bg-[#191A23] dark:border-[#3B3C40] text-gray-500 gap-1 bg-gray-100 rounded-lg border-2 p-1 items-center h-[40px]">
                        <li className="px-0">
                            <button
                                onClick={() => handleTabClick(3)}
                                className={`flex items-center  justify-center h-full text-sm sm:text-base w-[88px] px-2 ${
                                    activeTab === 3
                                        ? 'bg-white rounded-[4px] text-[#195BDF] dark:bg-[#1F202B] dark:text-[#598AEB] dark:border-[#3B3C40] border'
                                        : ''
                                }`}
                            >
                                Detailed
                            </button>
                        </li>
                        <li className="px-0">
                            <button
                                onClick={() => handleTabClick(2)}
                                className={`flex items-center justify-center h-full text-sm sm:text-base w-[88px]  ${
                                    activeTab === 2
                                        ? 'bg-white rounded-[4px] dark:bg-[#1F202B] text-[#195BDF] px-2  dark:text-[#598AEB] dark:border-[#3B3C40] border'
                                        : ''
                                }`}
                            >
                                JSON
                            </button>
                        </li>
                        <li className="px-0">
                            <button
                                onClick={() => handleTabClick(1)}
                                className={`flex items-center justify-center h-full text-sm sm:text-base w-[88px]  ${
                                    activeTab === 1
                                        ? 'bg-white rounded-[4px] text-[#195BDF] dark:bg-[#1F202B] px-2 dark:text-[#598AEB] dark:border-[#3B3C40] border'
                                        : ''
                                }`}
                            >
                                Original
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Conditional content based on activeTab */}

            {activeTab === 3 ? (
                <>
                    <div className="border-b border-r border-l bg-white p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#1F202B]">
                        {/* Wrapper to allow horizontal scroll on mobile */}
                        <div className="flex w-full overflow-x-auto  space-x-[-32px]">
                            <div className="flex space-x-4 w-48 text-center flex-shrink-0">
                                <span className="bg-[#F0F1F5] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] font-gsans text-[#646D8F] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                    address
                                </span>
                            </div>
                            {/* Arrow to indicate subtrace expansion */}
                            <div className="flex flex-row space-x-16 flex-1 flex-shrink-0">
                                <div className="w-[132px]">
                                    <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">sender</span>
                                </div>
                                <div>
                                    <span className="font-gsans font-medium text-md text-[#646D8F] dark:text-[#ADB0BC] block">
                                        {item?.sender}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-r border-l bg-white p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#1F202B]">
                        {/* Wrapper to allow horizontal scroll on mobile */}
                        <div className="flex w-full overflow-x-auto space-x-[-32px]">
                            <div className="flex space-x-4 w-48 text-center flex-shrink-0">
                                <span className="bg-[#F0F1F5] font-gsans text-[#646D8F] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                    uint256
                                </span>
                            </div>
                            {/* Arrow to indicate subtrace expansion */}
                            <div className="flex flex-row space-x-16 flex-1 flex-shrink-0">
                                <div className="w-[132px]">
                                    <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">nonce</span>
                                </div>
                                <div>
                                    {/* Formatted nonce for mobile view */}
                                    <span className="font-gsans font-medium text-md text-[#646D8F] dark:text-[#ADB0BC] block sm:hidden">
                                        {userOpParamsExists && metaData?.userOpParams[1]
                                            ? parseInt(metaData?.userOpParams[1].hex)
                                            : item?.nonce}
                                    </span>

                                    {/* Full nonce for larger screens */}
                                    <span className="font-gsans font-medium text-md text-[#646D8F] dark:text-[#ADB0BC] hidden sm:block">
                                        {userOpParamsExists && metaData?.userOpParams[1]
                                            ? parseInt(metaData?.userOpParams[1].hex)
                                            : item?.nonce}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-r border-l bg-white p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#1F202B]">
                        {/* Wrapper to allow horizontal scroll on mobile */}
                        <div className="flex w-full space-x-[-32px]">
                            <div className="flex space-x-4 w-48 text-center flex-shrink-0">
                                <span className="bg-[#F0F1F5] font-gsans text-[#646D8F] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                    bytes
                                </span>
                            </div>
                            {/* Arrow to indicate subtrace expansion */}
                            <div className="flex flex-row space-x-[118px] flex-1 flex-shrink-0">
                                <div className="w-[132px]">
                                    <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">initCode</span>
                                </div>
                                <div className="overflow-hidden text-ellipsis break-all whitespace-pre-wrap">
                                    <div className="w-[500px] md:w-full font-gsans text-[#646D8F] text-md max-h-32 overflow-y-auto border border-[#D7DAE0] px-4 py-2 rounded bg-white dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40]">
                                        {userOpParamsExists && metaData?.userOpParams[2]
                                            ? metaData?.userOpParams[2]
                                            : item?.initCode
                                            ? item?.initCode
                                            : 'Unable to decode user op input'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-r border-l bg-white p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#1F202B]">
                        {/* Wrapper to allow horizontal scroll on mobile */}
                        <div className="flex w-full overflow-x-auto space-x-[-32px]">
                            <div className="flex align-middle space-x-8 w-48 text-center flex-shrink-0">
                                <span className="bg-[#F0F1F5] font-gsans text-[#646D8F] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                    bytes
                                </span>
                                {/* Arrow icon */}
                                <RiArrowRightSLine
                                    className={`w-6 h-6 ${open ? 'rotate-90' : ''} text-blue-500`}
                                    onClick={() => setOpen(!open)}
                                />
                            </div>
                            {/* Arrow to indicate subtrace expansion */}
                            <div className="flex flex-row space-x-36 flex-1 flex-shrink-0">
                                <div className="w-[132px]">
                                    <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">callData</span>
                                </div>
                                <div className="overflow-hidden text-ellipsis break-all whitespace-pre-wrap">
                                    {/* Formatted callData */}
                                    <div className="w-full font-gsans text-[#646D8F] text-md max-h-32 overflow-y-auto border border-[#D7DAE0] px-4 py-2 rounded bg-white dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40]">
                                        {typeof item?.callData === 'string'
                                            ? item?.callData
                                            : item?.preDecodedCallData
                                            ? item?.preDecodedCallData
                                            : 'Unable to decode user op input'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {open && (
                        <>
                            {item?.preDecodedCallData && getFormat(item?.preDecodedCallData) != '' ? (
                                <div className="border-b border-r border-l space-x-4 bg-[#F0F1F5] p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#191A23] ">
                                    {/* Wrapper to allow horizontal scroll on mobile */}
                                    <div className="flex w-full overflow-x-auto space-x-[-32px]">
                                        <div className="flex space-x-4 w-48 text-center flex-shrink-0">
                                            <span className="bg-[#F0F1F5] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] font-gsans text-[#646D8F] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                                bytes
                                            </span>
                                        </div>
                                        <div className="flex flex-row space-x-16 flex-1 flex-shrink-0 pl-8">
                                            <div className="w-[132px]">
                                                <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">
                                                    format
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-gsans font-medium text-md text-[#646D8F] dark:text-[#ADB0BC] block text-nowrap">
                                                    {getFormat(item?.preDecodedCallData)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}
                            {item?.target &&
                                item?.target.map((target: string, index: number) => {
                                    return (
                                        <>
                                            <div className="border-b border-r border-l space-x-4 bg-[#F0F1F5] p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#191A23]">
                                                {/* Wrapper to allow horizontal scroll on mobile */}
                                                <div className="flex w-full overflow-x-auto space-x-[-32px]">
                                                    <div className="flex space-x-4 w-48 text-center flex-shrink-0">
                                                        <span className="bg-[#F0F1F5] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] font-gsans text-[#646D8F] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                                            address
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-row space-x-16 flex-1 flex-shrink-0 pl-8">
                                                        <div className="w-[132px]">
                                                            <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">
                                                                {index + 1}: target
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="font-gsans font-medium text-md text-[#646D8F] dark:text-[#ADB0BC] block">
                                                                {target}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {item?.value && item?.value.length == item?.target.length && (
                                                <div className="border-b border-r border-l space-x-4 bg-[#F0F1F5] p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#191A23]">
                                                    {/* Wrapper to allow horizontal scroll on mobile */}
                                                    <div className="flex w-full overflow-x-auto space-x-[-32px]">
                                                        <div className="flex space-x-4 w-48 text-center flex-shrink-0">
                                                            <span className="bg-[#F0F1F5] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] font-gsans text-[#646D8F] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                                                uint256
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-row space-x-16 flex-1 flex-shrink-0 pl-8">
                                                            <div className="w-[132px]">
                                                                <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">
                                                                    {index + 1}: value
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="font-gsans font-medium text-md text-[#646D8F] dark:text-[#ADB0BC] block text-nowrap">
                                                                    {typeof item.value[index] === 'string'
                                                                        ? item.value[index]
                                                                        : parseInt(item.value[index].hex)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {item?.callData && item?.callData.length == item.target.length && (
                                                <div className="border-b border-r border-l space-x-4 bg-[#F0F1F5] p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#191A23]">
                                                {/* Wrapper to allow horizontal scroll on mobile */}
                                                <div className="flex w-full overflow-x-auto space-x-[-32px]">
                                                    <div className="flex space-x-4 w-48 text-center flex-shrink-0">
                                                        <span className="bg-[#F0F1F5] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] font-gsans text-[#646D8F] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                                            bytes
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-row space-x-32 flex-1 flex-shrink-0 pl-8">
                                                        <div className="w-full sm:w-[134px]">
                                                            <span className="font-gsans text-nowrap font-medium text-md text-[#20294C] dark:text-[#DADEF1]">
                                                                {index + 1}: callData
                                                            </span>
                                                        </div>
                                                        <div className="overflow-hidden text-ellipsis break-all whitespace-pre-wrap">
                                                            {/* Formatted callData */}
                                                            <div className="w-full font-gsans text-[#646D8F] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] text-md max-h-32 overflow-y-auto border border-[#D7DAE0] px-4 py-2 rounded bg-white">
                                                                {item?.callData[index]}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            )}
                                        </>
                                    );
                                })}
                        </>
                    )}
                    {ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint && (
                        <div className="border-b border-r border-l space-x-4 bg-white p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#1F202B]">
                        {/* Wrapper to allow horizontal scroll on mobile */}
                        <div className="flex w-full overflow-x-auto space-x-[-32px]">
                            <div className="flex space-x-4 w-48 text-center ">
                                <span className="bg-[#F0F1F5] font-gsans text-[#646D8F] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                    uint256
                                </span>
                            </div>
                            <div className="flex flex-row space-x-16 flex-1 flex-shrink-0">
                                <div className="w-[132px]">
                                    <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">
                                        callGasLimit
                                    </span>
                                </div>
                                <div className="">
                                    {/* Formatted callGasLimit for both mobile and larger views */}
                                    <span className="font-gsans font-medium text-md text-[#646D8F] dark:text-[#ADB0BC] block text-nowrap">
                                        {userOpParamsExists && metaData?.userOpParams[4]
                                            ? parseInt(metaData?.userOpParams[4].hex)
                                            : item?.callGasLimit
                                            ? item?.callGasLimit
                                            : 'Unable to decode user op input'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    )}
                    {ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint && (
                        <div className="border-b border-r border-l space-x-4 bg-white p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#1F202B]">
                        {/* Wrapper to allow horizontal scroll on mobile */}
                        <div className="flex w-full overflow-x-auto space-x-[-32px]">
                            <div className="flex space-x-4 w-48 text-center flex-shrink-0">
                                <span className="bg-[#F0F1F5] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] font-gsans text-[#646D8F] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                    uint256
                                </span>
                            </div>
                            <div className="flex flex-row space-x-16 flex-1 flex-shrink-0">
                                <div className="w-[132px]">
                                    <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">
                                        verificationGasLimit
                                    </span>
                                </div>
                                <div className="">
                                    {/* Formatted verificationGasLimit for both mobile and larger views */}
                                    <span className="font-gsans font-medium text-md text-[#646D8F] dark:text-[#ADB0BC] block text-nowrap">
                                        {userOpParamsExists && metaData?.userOpParams[5]
                                            ? parseInt(metaData?.userOpParams[5].hex)
                                            : item?.verificationGasLimit
                                            ? item?.verificationGasLimit
                                            : 'Unable to decode user op input'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    )}
                    {ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint && (
                        <div className="border-b border-r border-l space-x-4 bg-white p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#1F202B]">
                        {/* Wrapper to allow horizontal scroll on mobile */}
                        <div className="flex w-full overflow-x-auto space-x-[-32px]">
                            <div className="flex space-x-4 w-48 text-center flex-shrink-0">
                                <span className="bg-[#F0F1F5] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] font-gsans text-[#646D8F] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                    bytes32
                                </span>
                            </div>
                            <div className="flex flex-row space-x-16 flex-1 flex-shrink-0">
                                <div className="w-[132px]">
                                    <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">
                                        accountGasFees
                                    </span>
                                </div>
                                <div>
                                    {/* Formatted accountGasLimits for both mobile and larger views */}
                                    <span className="font-gsans font-medium text-md text-[#646D8F] dark:text-[#ADB0BC] block text-nowrap">
                                        {item?.accountGasLimits ? item.accountGasLimits : 'Unable to decode user op input'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    )}
                    <div className="border-b border-r border-l bg-white p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#1F202B]">
                        <div className="flex w-full overflow-x-auto space-x-[-32px]">
                            <div className="flex align-middle space-x-8 w-48 text-center flex-shrink-0">
                                <span className="bg-[#F0F1F5] font-gsans text-[#646D8F] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                    uint256
                                </span>
                            </div>
                            <div className="flex flex-row space-x-16 flex-1 flex-shrink-0 ">
                                <div className="w-[132px]">
                                    <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">
                                        preVerificationGas
                                    </span>
                                </div>
                                <div>
                                    <span className="font-gsans font-medium text-md text-[#646D8F] dark:text-[#ADB0BC] block">
                                        {userOpParamsExists &&
                                        metaData?.userOpParams[ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() === item?.entryPoint ? 6 : 5]
                                            ? parseInt(metaData?.userOpParams[6].hex)
                                            : item?.preVerificationGas
                                            ? item.preVerificationGas
                                            : 'Unable to decode user op input'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-r border-l bg-white p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#1F202B]">
                        <div className="flex w-full overflow-x-auto space-x-[-32px]">
                            <div className="flex align-middle space-x-8 w-48 text-center flex-shrink-0">
                                <span className="bg-[#F0F1F5] font-gsans text-[#646D8F] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                    uint256
                                </span>
                            </div>
                            <div className="flex flex-row space-x-[72px] flex-1 flex-shrink-0">
                                <div className="w-[132px]">
                                    <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">
                                        paymasterAndData
                                    </span>
                                </div>
                                <div className="overflow-hidden text-ellipsis break-all whitespace-pre-wrap">
                                    <div className="w-[500px] md:w-full font-gsans text-[#646D8F] text-md max-h-32 overflow-y-auto border border-[#D7DAE0] px-4 py-2 rounded bg-white dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40]">
                                        {userOpParamsExists &&
                                        metaData?.userOpParams[ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint ? 9 : 7]
                                            ? ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() == item?.entryPoint
                                                ? metaData?.userOpParams[9]
                                                : metaData?.userOpParams[7]
                                            : item?.paymasterAndData
                                            ? item.paymasterAndData
                                            : 'Unable to decode user op input'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-r border-l bg-white p-3 px-4 sm:px-8 text-sm sm:text-md flex justify-between dark:border-[#3B3C40] dark:bg-[#1F202B] rounded-b-xl">
                        <div className="flex w-full overflow-x-auto space-x-[-32px]">
                            <div className="flex align-middle space-x-4 w-48 text-center flex-shrink-0">
                                <span className="bg-[#F0F1F5] font-gsans text-[#646D8F] dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40] w-[72px] h-[24px] text-center text-sm px-2.5 py-0.5 rounded border border-gray-200">
                                    uint256
                                </span>
                            </div>
                            <div className="flex flex-row space-x-[118px] flex-1 flex-shrink-0">
                                <div className="w-[132px]">
                                    <span className="font-gsans font-medium text-md text-[#20294C] dark:text-[#DADEF1]">signature</span>
                                </div>
                                <div className="overflow-hidden text-ellipsis break-all whitespace-pre-wrap">
                                    <div className="w-[500px] md:w-full font-gsans text-[#646D8F] text-md max-h-32 overflow-y-auto border border-[#D7DAE0] px-4 py-2 rounded bg-white dark:text-[#ADB0BC] dark:bg-[#1F202B] dark:border-[#3B3C40]">
                                        {userOpParamsExists &&
                                        metaData?.userOpParams[ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() === item?.entryPoint ? 10 : 8]
                                            ? ENTRY_POINT_ADDRESS_MAP.V6.toLowerCase() === item?.entryPoint
                                                ? metaData?.userOpParams[10]
                                                : metaData?.userOpParams[8]
                                            : item?.signature
                                            ? item?.signature
                                            : 'Unable to decode user op input'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : activeTab === 2 ? (
                <div className="border-b border-r border-l space-x-4 bg-white dark:border-[#3B3C40] dark:bg-[#1F202B] p-3 px-4 sm:px-8 text-sm sm:text-md flex flex-col sm:flex-row justify-between">
                    <div className="flex w-full">
                        {/* JSON content */}
                        <pre className="bg-gray-100 font-gsans dark:bg-[#1F202B] dark:text-blue-500 dark:border-[#3B3C40] border p-4 rounded-md w-full text-sm sm:text-md overflow-auto">
                            {JSON.stringify(
                                {
                                    ops: [
                                        {
                                            sender: item?.sender || 'N/A',
                                            nonce: parseInt(item?.nonce, 16) || 'N/A',
                                            initCode: item?.initCode || '0x',
                                            callData: item?.callData || '0x',
                                            callGasLimit: parseInt(item?.callGasLimit, 16) || 'N/A',
                                            verificationGasLimit: parseInt(item?.verificationGasLimit, 16) || 'N/A',
                                            preVerificationGas: parseInt(item?.preVerificationGas, 16) || 'N/A',
                                            maxFeePerGas: parseInt(item?.maxFeePerGas, 16) || 'N/A',
                                            maxPriorityFeePerGas: parseInt(item?.maxPriorityFeePerGas, 16) || 'N/A',
                                            paymasterAndData: item?.paymasterAndData || '0x',
                                            signature: item?.signature || '0x',
                                        },
                                    ],
                                    beneficiary: item?.beneficiary || 'N/A',
                                },
                                null,
                                2,
                            )}
                        </pre>
                    </div>
                </div>
            ) : (
                <div className="border-b border-r border-l space-x-4 bg-white dark:border-[#3B3C40] dark:bg-[#1F202B] p-3 px-4 sm:px-8 text-sm sm:text-md flex flex-col sm:flex-row justify-between">
                    <div className="flex w-full">
                        {/* Original content */}
                        <p className="text-[#646D8F]">This is the original content of the tab.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
export default React.memo(DeveloperDetails);
