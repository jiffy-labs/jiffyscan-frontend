import Chip, { ChipProps } from '@/components/common/chip/Chip';
import DisplayFee from '@/components/common/displayfee/DisplayFee';
import IconText from '@/components/common/IconText';
import Skeleton from 'react-loading-skeleton-2';
import Caption from '@/components/common/Caption';
import { getFee, getTimePassed } from '@/components/common/utils'; // Ensure getTimePassed is defined
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getTopPaymasters } from '@/components/common/apiCalls/jiffyApis'; // Ensure API call is defined
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import { IconButton, Tooltip } from '@mui/material';
import { MdContentCopy } from 'react-icons/md';

export default function TransactionDetails({ item, network }: any) {
    const [tableLoading1, setTableLoading1] = useState(true);
    const [transactionDetails, setTransactionDetails] = useState<any>(null); // State for transaction details
    const [copyTooltip, setCopyTooltip] = useState('Copy'); // Tooltip state for copy action

    const handleCopy = () => {
        navigator.clipboard.writeText(item?.address); // Copy the hash to clipboard
        setCopyTooltip('Copied!'); // Change tooltip to indicate success
        setTimeout(() => setCopyTooltip('Copy'), 1500); // Reset tooltip after 1.5s
    };
    useEffect(() => {
        setTableLoading1(true);
        if (network && item?.address) {
            const fetchTransactionDetails = async () => {
                try {
                    // Fetch paymaster details
                    const details = await getTopPaymasters(network, 5, 0, null);
                    const specificPaymaster = details.find((paymaster: any) => paymaster.address === item.address);

                    if (specificPaymaster) {
                        setTransactionDetails(specificPaymaster);
                    } else {
                        console.warn('Paymaster not found');
                    }
                } catch (error) {
                    console.error('Error fetching paymaster details', error);
                } finally {
                    setTableLoading1(false);
                }
            };
            fetchTransactionDetails();
        }
    }, [network, item?.address]);

    const skeletonCards = Array(4).fill(0); // Adjusted to show 4 skeletons
    const router = useRouter();

    return (
        <div>
            <section className="mt-[48px]">
                <div className="container px-0">
                    <div className="bg-white  mb-[20px] ">
                        {tableLoading1 ? (
                            skeletonCards.map((_, index: number) => <div
                            key={index}
                            className="h-[55px] bg-gray-200 dark:bg-gray-900 rounded animate-pulse"
                         />
                        )
                        ) : (
                            <div>
                                <section>
                                    <div className="container px-0 font-gsans space-y-6 dark:bg-[#1F202B]">
                                        {/* Paymaster Address */}
                                        <div className="flex items-center border-[#ccc] dark:border-[#3B3C40] border-0 gap-[10px] pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-gsans font-normal leading-5 ">
                                                    PAYMASTER ADDRESS
                                                </span>
                                            </div>
                                            <div className="flex-1 break-words">
                                                <div className="justify-between block md:flex">
                                                    <div className="flex  items-center gap-[10px]">
                                                        {network && (
                                                            <img
                                                                src={NETWORK_ICON_MAP[network]}
                                                                alt={`${network} icon`}
                                                                className="w-5 h-5"
                                                            />
                                                        )}
                                                        <span className="text-base text-[#195BDF] dark:text-[#598AEB]  break-all leading-5">
                                                            {item?.address}
                                                        </span>
                                                        <Tooltip title={copyTooltip}>
                                                            <IconButton onClick={handleCopy} size="small" style={{ marginLeft: '8px' }}>
                                                                <MdContentCopy className="w-4 h-4 dark:fill-[#ADB0BC]" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date of Creation */}
                                        <div className="flex items-center font-gsans border-[#ccc] border-0 gap-[10px] pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-normal leading-5">DATE OF CREATION</span>
                                            </div>
                                            <div className="flex-1 break-words">
                                                <div className="justify-between block md:flex">
                                                    <div className="flex items-center gap-[10px]">
                                                        <span className="text-base text-dark-600 dark:text-[#DADEF1]  break-all leading-5">
                                                            {transactionDetails?.blockTime || 'Invalid Time'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Number of UserOps */}
                                        <div className="flex items-center font-gsans border-[#ccc] border-0 gap-[10px] pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-normal leading-5 ">NUMBER OF USEROPS</span>
                                            </div>
                                            <div className="flex-1 break-words">
                                                <div className="justify-between block md:flex">
                                                    <div className="flex items-center gap-[10px]">
                                                        <span className="text-base text-[#20294C] dark:text-[#DADEF1]  break-all leading-5">
                                                            {item?.userOpsLength || '0'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Gas Sponsored */}
                                        <div className="flex items-center font-gsans border-[#ccc] border-0 gap-[10px] pb-[2px]">
                                            <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
                                                <span className="text-base text-[#646D8F] dark:text-[#ADB0BC] font-normal leading-5">GAS SPONSORED</span>
                                            </div>
                                            <div className="flex-1 break-words">
                                                <div className="justify-between block md:flex">
                                                    <div className="flex items-center gap-[10px]">
                                                        <span className="text-base text-[#20294C] dark:text-[#DADEF1]  break-all leading-5">
                                                            <DisplayFee item={transactionDetails?.gasSponsored || '0'} network={network} />
                                                        </span>
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
