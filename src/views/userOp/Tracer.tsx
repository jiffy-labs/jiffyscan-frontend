import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton-2';
import { getUsserOpTrace } from '@/components/common/apiCalls/jiffyApis';
import { toast } from 'react-toastify';
import { FaArrowRight, FaCopy } from 'react-icons/fa'; // Import icons
import { MdArrowForwardIos } from 'react-icons/md';
import { FaArrowUpFromBracket } from 'react-icons/fa6';
import { RiArrowRightSLine } from 'react-icons/ri';
// Interfaces for TypeScript
interface TracerProps {
    item: {
        userOpHash: string;
        network: string;
        sender?: string; // Added sender for Odyssey network
        transactionHash?: string; // Added trxHash for Odyssey network
    };
    network: string;
}

interface Action {
    to: string;
    gas: string;
    from: string;
    input: string;
    value: string;
    callType: string;
    method?: string; // Added method as it was missing
    decodedInput?: any; // Added decodedInput as it was missing
}

interface Result {
    output: string;
    gasUsed: string;
}

interface Trace {
    type: string;
    action: Action;
    result: Result;
    blockHash: string;
    blockNumber: number;
    subtraces: Trace[];
    traceAddress: number[];
    stage: string;
}

interface TracerData {
    userOpHash: string;
    chainId: string;
    transactionHash: string;
    relevantTraces: Trace[];
}

const TraceDetails: React.FC<{ trace: Trace; depth?: number }> = ({ trace, depth = 0 }) => {
    const { type, result, action, subtraces, stage } = trace;
    const { output, gasUsed } = result || {};
    const { from, to, gas, input, method, decodedInput, value, callType } = action || {};
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
        <div className="rounded-b-lg border-[#D7DAE0] border-t-2 dark:border-[#3B3C40] dark:bg-[#1F202B]">
            <div className="flex space-x-4 rounded-lg bg-white  p-3 px-8 text-md justify-between  dark:bg-[#1F202B]">
                <div className="flex space-x-4 w-48 text-center">
                    <span className="bg-[#F0F1F5] dark:border-[#3B3C40] dark:bg-[#191A23] font-gsans text-[#646D8F] w-[72px] h-[24px] text-center text-sm me-2 px-2.5 py-0.5 rounded dark:text-gray-400 border border-gray-200">
                        {callType === 'delegatecall' ? 'D-CALL' : callType === 'staticcall' ? 'S-CALL' : 'CALL'}
                    </span>
                    <span className="bg-[#F0F1F5] dark:border-[#3B3C40] dark:bg-[#191A23] font-gsans text-[#646D8F] tracking-[0.4] w-[74px] h-[24px] text-center text-sm text-nowrap px-2 py-0.5 rounded dark:text-gray-400 border border-gray-200">
                        {gasUsed ? Number(gasUsed).toLocaleString() : 'N/A'}
                    </span>
                </div>
                <div style={{ paddingLeft: `${indentation}px` }}></div>
                {/* Arrow to indicate subtrace expansion */}
                <div className="flex space-x-2 flex-1 ">
                    <RiArrowRightSLine
                        className={`w-6 h-6 transition-transform duration-200 text-[#195BDF] cursor-pointer ${
                            showSubtraces ? 'rotate-90' : ''
                        }`}
                        onClick={toggleSubtraces}
                        style={{ visibility: subtraces && subtraces.length > 0 ? 'visible' : 'hidden' }} // Hides arrow if no subtraces
                    />

                    <strong>&nbsp; &nbsp;</strong>
                    <span className="font-gsans mt-[2px] font-medium text-md text-[#20294C] dark:text-[#DADEF1]">
                        {' '}
                        {formatAddress(from)}
                    </span>
                    <FaArrowRight className="mt-1 dark:fill-[#DADEF1]" />
                    <span className="font-gsans mt-[2px] font-medium text-md text-[#20294C] dark:text-[#DADEF1]">{formatAddress(to)}</span>
                    <span className="text-sm text-[#646D8F] font-gmono ml-2 text-center align-middle mt-[2px]">
                        ({input ? `${input.slice(0, 10)}...` : 'N/A'})
                    </span>
                </div>
                <span onClick={toggleDetails} className="text-end font-gsans justify-between text-[#195BDF] cursor-pointer mt-[2px]">
                    {showDetails ? 'Hide details' : 'More details'}
                </span>
            </div>

            {showDetails && (
                <div className="flex flex-col space-y-2 px-8 p-4 bg-[#F0F1F5] ">
                    <div className="flex">
                        <div className="w-1/4">
                            <span className="text-[#646D8F] font-gsans">TYPE</span>
                        </div>
                        <div className="w-3/4 text-[#20294C] font-gsans text-md">{type || 'N/A'}</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">
                            <span className="text-[#646D8F] font-gsans">FROM</span>
                        </div>
                        <div className="w-3/4 font-gsans text-md flex gap-4 text-blue-500 items-center">
                            <FaArrowUpFromBracket className="w-4 h-4 mt-1" />
                            {from || 'N/A'}
                            <FaCopy
                                className="w-4 h-4 cursor-pointer hover:text-blue-600"
                                onClick={() => copyToClipboard(from || 'N/A', 'from')}
                                title="Copy address"
                            />
                            {fromCopied && <span className=" text-sm ml-2">Copied!</span>}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">
                            <span className="text-[#646D8F] font-gsans">TO</span>
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

                    {/* <div className="flex">
                        <div className="w-1/4">
                            <span className='text-[#646D8F] font-gsans'>STAGE</span>
                        </div>
                        <div className="w-3/4">{stage || 'N/A'}</div>
                    </div> */}
                    {/* <div className="flex">
                        <div className="w-1/4">
                            <span className='text-[#646D8F] font-gsans'>METHOD</span>
                        </div>
                        <div className="w-3/4">{method || 'N/A'}</div>
                    </div> */}
                    <div className="flex">
                        <div className="w-1/4">
                            <span className="text-[#646D8F] font-gsans">GAS USED</span>
                        </div>
                        <div className="w-3/4 font-gsans text-[#20294C] text-md">
                            {gasUsed ? Number(gasUsed).toLocaleString() : 'N/A'}
                            {/* Calculate and display the percentage if both gasUsed and gas are available */}
                            {gasUsed && gas ? (
                                <span className="text-sm text-gray-500 ml-2">({((Number(gasUsed) / Number(gas)) * 100).toFixed(2)}%)</span>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">
                            <span className="text-[#646D8F] font-gsans">GAS LIMIT</span>
                        </div>
                        <div className="w-3/4 font-gsans text-[#20294C] text-md">{gas ? Number(gas).toLocaleString() : 'N/A'}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/4">
                            <span className="text-[#646D8F] font-gsans">INPUT</span>
                        </div>
                        <div className="w-3/4 font-gmono text-[#9E9E9E] text-md max-h-32 overflow-y-auto border border-[#D7DAE0] px-4 py-2 rounded bg-white">
                            {input || 'N/A'}
                        </div>
                    </div>
                    {/* <div className="flex">
                        <div className="w-1/4">
                            <span className='text-[#646D8F] font-gsans'>DECODED INPUT</span>
                        </div>
                        <div className="w-3/4 max-h-32 overflow-y-auto border p-2 rounded">
                            {decodedInput ? JSON.stringify(decodedInput, null, 2) : 'N/A'}
                        </div>
                    </div> */}
                    <div className="flex">
                        <div className="w-1/4">
                            <span className="text-[#646D8F] font-gsans">VALUE</span>
                        </div>
                        <div className="w-3/4 text-[#20294C] font-gsans text-md">{value || 'N/A'}</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">
                            <span className="text-[#646D8F] font-gsans">CALLTYPE</span>
                        </div>
                        <div className="w-3/4 text-[#20294C] font-gsans text-md">{callType || 'N/A'}</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">
                            <span className="text-[#646D8F] font-gsans">OUTPUT</span>
                        </div>
                        <div className="w-3/4 max-h-32 font-gmono text-md text-[#9E9E9E] overflow-y-auto border border-[#D7DAE px-4 py-2 rounded bg-white">
                            {output || 'N/A'}
                        </div>
                    </div>
                </div>
            )}

            {/* Render subtraces if they exist */}
            {showSubtraces && subtraces && subtraces.length > 0 && (
                <div className="">
                    {/* <strong>Subtraces:</strong> */}
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

// Main Tracer component
const Tracer: React.FC<TracerProps> = ({ item, network }) => {
    const [tracer, setTracer] = useState<TracerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState<number[]>([]); // Initialize as an array

    useEffect(() => {
        const fetchTracerData = async () => {
            try {
                const { userOpHash, network, sender, transactionHash: trxHash } = item;
                console.log('ITEMMM', trxHash);

                // Check if the network is 'odyssey' and only pass 'sender' and 'trxHash' if they exist
                const response = await getUsserOpTrace(
                    userOpHash,
                    network,
                    toast,
                    (network === 'odyssey' || network === 'open-campus-test') && sender ? sender : undefined,
                    (network === 'odyssey' || network === 'open-campus-test') && trxHash ? trxHash : undefined,
                );

                setTracer(response as unknown as TracerData);
            } catch (error) {
                console.error('Error fetching tracer data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTracerData();
    }, [item, network]);

    const toggleAccordion = (index: number) => {
        if (activeAccordion.includes(index)) {
            // Remove the index if it's already open
            setActiveAccordion(activeAccordion.filter((i) => i !== index));
        } else {
            // Add the index if it's not open
            setActiveAccordion([...activeAccordion, index]);
        }
    };

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

    if (!tracer || !tracer.relevantTraces?.length) {
        return <div className="block text-center p-8 text-xl text-gray-500 font-medium">No Data Available</div>;
    }

    return (
        <section className="mt-4 px-3 mb-10 break-all">
            <div className="container px-0">
                <div className="my-4">
                    <div id="accordion-collapse" data-accordion="collapse">
                        {tracer.relevantTraces?.map((trace, index) => (
                            <div className="mb-6 border-[#D7DAE0] border-2 rounded-xl dark:border-[#3B3C40] dark:bg-[#1F202B]" key={index}>
                                <h2>
                                    <button
                                        type="button"
                                        className={`dark:border-[#3B3C40] dark:bg-[#1F202B] flex ${
                                            activeAccordion.includes(index) ? 'rounded-t-xl' : 'rounded-xl'
                                        } items-center justify-between bg-white w-full lg:w-1240 p-4 lg:px-8 font-medium rtl:text-right text-gray-500 dark:text-gray-400 gap-3 min-h-20`}
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={activeAccordion.includes(index)}
                                        aria-controls={`accordion-collapse-body-${index}`}
                                    >
                                        <div className="flex justify-between gap-4">
                                            <svg
                                                width="18"
                                                height="14"
                                                className="mt-2"
                                                viewBox="0 0 18 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M18 1.99984L6 13.9998L0.5 8.49984L1.91 7.08984L6 11.1698L16.59 0.589844L18 1.99984Z"
                                                    fill="#137333"
                                                />
                                            </svg>

                                            <span className="lg:text-[20px] dark:text-[#DADEF1] font-gsans font-medium text-[#1F1F1F]">
                                                {trace.stage || `Trace ${index + 1}`}
                                            </span>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 rotate-${activeAccordion.includes(index) ? '0' : '180'} shrink-0`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="#195BDF"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5 5 1 1 5"
                                            />
                                        </svg>
                                    </button>
                                </h2>
                                <div
                                    id={`accordion-collapse-body-${index}`}
                                    className={`border rounded-b-xl border-gray-200 no-wrap dark:border-[#3B3C40] dark:bg-[#1F202B] ${
                                        activeAccordion.includes(index) ? 'block' : 'hidden'
                                    }`}
                                    aria-labelledby={`accordion-collapse-heading-${index}`}
                                >
                                    <TraceDetails trace={trace} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tracer;
