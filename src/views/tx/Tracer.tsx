import React, { useState, useEffect } from 'react';
import { getTrxTraces } from '@/components/common/apiCalls/jiffyApis'; // Assuming the API call is in this file
import CopyButton from '@/components/common/copy_button/CopyButton';
import { toast } from 'react-toastify';
import { FaArrowRight, FaCopy } from 'react-icons/fa'; // Import icons
import { MdArrowForwardIos } from 'react-icons/md';
import { FaArrowUpFromBracket } from 'react-icons/fa6';
import { RiArrowRightSLine } from 'react-icons/ri';
import { GiDigitalTrace } from "react-icons/gi";
interface Result {
    output: string;
    gasUsed: string;
}

interface Action {
    to: string;
    from: string;
    gas: string;
    input: string;
    value: string;
    callType: string;
}

interface Trace {
    type: string;
    action: Action;
    result: Result;
    blockHash: string;
    subtraces: Trace[];
    traceAddress: number[];
    stage: string;
}

interface TracerData {
    transactionHash: string;
    chainId: string;
    trace: Trace[];
}
interface TracerProps {
    tracerData: TracerData | null;
    loading: boolean;
}

const TraceDetails: React.FC<{ trace: Trace; depth?: number }> = ({ trace, depth = 0 }) => {
    const { type, result, action, subtraces, stage } = trace;
    const { output, gasUsed } = result || {};
    const { from, to, gas, input, value, callType } = action || {};
    const [fromCopied, setFromCopied] = useState(false);
    const [toCopied, setToCopied] = useState(false);

    const [showDetails, setShowDetails] = useState(false);
    const [showSubtraces, setShowSubtraces] = useState(false);

    const toggleDetails = () => setShowDetails(!showDetails);
    const toggleSubtraces = () => setShowSubtraces(!showSubtraces);

    const formatAddress = (address: string | any[]) => {
        if (!address) return 'N/A';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    const copyToClipboard = (text: string, type: string | undefined) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                if (type === 'from') {
                    setFromCopied(true);
                    setTimeout(() => setFromCopied(false), 2000); // Reset after 2 seconds
                } else if (type === 'to') {
                    setToCopied(true);
                    setTimeout(() => setToCopied(false), 2000); // Reset after 2 seconds
                }
            })
            .catch((err) => {
                console.error('Could not copy text: ', err);
            });
    };

    const indentation = depth * 20; // Increase space based on depth

    return (
        <div className="border-[#D7DAE0] dark:border-[#3B3C40] border-l border-r w-full max-w-full">
    <div className="flex space-x-4 bg-white border-t border-b p-3 px-8 text-md justify-between dark:bg-[#1F202B] dark:border-[#3B3C40] overflow-x-auto">
        <div className="flex space-x-4 w-48 text-center">
            <span className="bg-[#F0F1F5] dark:bg-[#191A23] dark:border-[#3B3C40] font-gsans text-[#646D8F] w-[72px] h-[24px] text-center text-sm me-2 px-2.5 py-0.5 rounded dark:text-gray-400 border border-gray-200">
                {callType === 'delegatecall' ? 'D-CALL' : callType === 'staticcall' ? 'S-CALL' : 'CALL'}
            </span>
            <span className="bg-[#F0F1F5] dark:bg-[#191A23] dark:border-[#3B3C40] font-gsans text-[#646D8F] tracking-[0.4] w-[74px] h-[24px] text-center text-sm text-nowrap px-2 py-0.5 rounded dark:text-gray-400 border border-gray-200">
                {gasUsed ? Number(gasUsed).toLocaleString() : 'N/A'}
            </span>
        </div>
        <div style={{ paddingLeft: `${indentation}px` }}></div>
        {/* Arrow to indicate subtrace expansion */}
        <div className="flex space-x-2 flex-1 ">
            <RiArrowRightSLine
                className={`w-6 h-6 transition-transform duration-200 text-[#195BDF] cursor-pointer ${showSubtraces ? 'rotate-90' : ''}`}
                onClick={toggleSubtraces}
                style={{ visibility: subtraces && subtraces.length > 0 ? 'visible' : 'hidden' }} // Hides arrow if no subtraces
            />
            <strong>&nbsp; &nbsp;</strong>
            <span className="font-gsans mt-[2px] font-medium text-md text-[#20294C] dark:text-[#ADB0BC] text-wrap">{formatAddress(from)}</span>
            <FaArrowRight className="mt-1 dark:fill-[#ADB0BC]" />
            <span className="font-gsans mt-[2px] font-medium text-md text-[#20294C] dark:text-[#ADB0BC]">{formatAddress(to)}</span>
            <span className="text-sm text-[#646D8F] font-gmono ml-2 text-center align-middle mt-[2px]">({input ? `${input.slice(0, 10)}...` : 'N/A'})</span>
        </div>
        <span onClick={toggleDetails} className="text-end font-gsans justify-between text-[#195BDF] cursor-pointer mt-[2px]">
            {showDetails ? 'Hide details' : 'More details'}
        </span>
    </div>

    {showDetails && (
        <div className="flex flex-col space-y-2 px-8 p-4 bg-[#F0F1F5] dark:bg-[#191A23] overflow-x-auto">
            <div className="flex">
                <div className="w-1/4">
                    <span className="text-[#646D8F] font-gsans dark:text-[#ADB0BC]">TYPE</span>
                </div>
                <div className="w-3/4 text-[#20294C] font-gsans text-md dark:text-[#ADB0BC]">{type || 'N/A'}</div>
            </div>
            <div className="flex">
                <div className="w-1/4">
                    <span className="text-[#646D8F] font-gsans dark:text-[#ADB0BC]">FROM</span>
                </div>
                <div className="w-3/4 font-gsans text-md flex gap-4 text-blue-500 items-center">
                    <FaArrowUpFromBracket className="w-4 h-4 mt-1" />
                    {from || 'N/A'}
                    <FaCopy
                        className="w-4 h-4 cursor-pointer hover:text-blue-600"
                        onClick={() => copyToClipboard(from || 'N/A', 'from')}
                        title="Copy address"
                    />
                    {fromCopied && <span className="text-sm ml-2">Copied!</span>}
                </div>
            </div>
            <div className="flex">
                <div className="w-1/4">
                    <span className="text-[#646D8F] font-gsans dark:text-[#ADB0BC]">TO</span>
                </div>
                <div className="w-3/4 font-gsans text-md flex gap-4 text-blue-500 items-center">
                    <FaArrowUpFromBracket className="w-4 h-4 mt-1 rotate-180" />
                    {to || 'N/A'}
                    <FaCopy
                        className="w-4 h-4 cursor-pointer hover:text-blue-600"
                        onClick={() => copyToClipboard(to || 'N/A', 'to')}
                        title="Copy address"
                    />
                    {toCopied && <span className="text-green-500 text-sm ml-2">Copied!</span>}
                </div>
            </div>
            <div className="flex">
                <div className="w-1/4">
                    <span className="text-[#646D8F] font-gsans dark:text-[#ADB0BC]">GAS USED</span>
                </div>
                <div className="w-3/4 font-gsans text-[#20294C] dark:text-[#ADB0BC] text-md">
                    {gasUsed ? Number(gasUsed).toLocaleString() : 'N/A'}
                    {/* Calculate and display the percentage if both gasUsed and gas are available */}
                    {gasUsed && gas ? (
                        <span className="text-sm text-gray-500 ml-2">({((Number(gasUsed) / Number(gas)) * 100).toFixed(2)}%)</span>
                    ) : null}
                </div>
            </div>
            <div className="flex">
                <div className="w-1/4">
                    <span className="text-[#646D8F] font-gsans dark:text-[#ADB0BC]">GAS LIMIT</span>
                </div>
                <div className="w-3/4 font-gsans text-[#20294C] text-md dark:text-[#ADB0BC]">{gas ? Number(gas).toLocaleString() : 'N/A'}</div>
            </div>
            <div className="flex">
                <div className="w-1/4">
                    <span className="text-[#646D8F] font-gsans dark:text-[#ADB0BC] ">INPUT</span>
                </div>
                <div className="w-3/4 font-gmono text-[#9E9E9E] dark:bg-[#1F202B] dark:border-[#3B3C40] text-md max-h-32 overflow-y-auto border border-[#D7DAE0] px-4 py-2 rounded bg-white">
                    {input || 'N/A'}
                </div>
            </div>
            <div className="flex">
                <div className="w-1/4">
                    <span className="text-[#646D8F] font-gsans dark:text-[#ADB0BC]">VALUE</span>
                </div>
                <div className="w-3/4 text-[#20294C] font-gsans text-md dark:text-[#ADB0BC]">{value || 'N/A'}</div>
            </div>
            <div className="flex">
                <div className="w-1/4">
                    <span className="text-[#646D8F] font-gsans dark:text-[#ADB0BC]">CALLTYPE</span>
                </div>
                <div className="w-3/4 text-[#20294C] font-gsans text-md dark:text-[#ADB0BC]">{callType || 'N/A'}</div>
            </div>
            <div className="flex">
                <div className="w-1/4">
                    <span className="text-[#646D8F] font-gsans dark:text-[#ADB0BC]">OUTPUT</span>
                </div>
                <div className="w-3/4 max-h-32 font-gmono text-md text-[#9E9E9E] dark:bg-[#1F202B] dark:border-[#3B3C40] overflow-y-auto border border-[#D7DAE px-4 py-2 rounded bg-white">
                    {output || 'N/A'}
                </div>
            </div>
        </div>
    )}

    {/* Render subtraces if they exist */}
    {showSubtraces && subtraces && subtraces.length > 0 && (
        <div className="">
            <div className="">
                        {subtraces.map((subtrace, index) => (
                            <TraceDetails key={index} trace={subtrace} depth={depth + 1} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const Tracer: React.FC<TracerProps> = ({ tracerData, loading }) => {
    

    if (loading) {
        return (
            <>
                <div className="h-[24px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse my-2" />
                <div className="h-[24px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse my-2" />
                <div className="h-[24px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse my-2" />
                <div className="h-[24px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse my-2" />
                <div className="h-[24px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse my-2" />
                <div className="h-[24px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse my-2" />

            </>
        );
    }

    return (
        <div className="w-full">
            <div className='shadow-300 '>
            {tracerData?.trace?.map((trace: Trace, index: React.Key | null | undefined) => (
                <TraceDetails key={index} trace={trace} />
            ))}
            </div>
        </div>
    );
};

export default Tracer;
