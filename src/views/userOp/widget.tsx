import React from 'react';
import IconText from '@/components/common/IconText';
import { Link } from '@mui/material';
import CopyButton from '@/components/common/copy_button/CopyButton';
import { POWERED_BY_LOGO_MAP } from '@/components/common/constants';
import DisplayFee from '@/components/common/displayfee/DisplayFee';
import Address from '@/components/global/Address';

const iconList = {
    sender: { icon: 'sader', label: 'Sender' },
    target: { icon: 'sader', label: 'Target' },
    blockTime: { icon: 'clock', label: 'Block Time' },
    status: { icon: 'delete', label: 'Status' },
    transactionType: { icon: 'Fee', label: 'Transaction Type' },
    value: { icon: 'star', label: 'Value' },
    gasFee: { icon: 'Fee', label: 'Fee' },
    gasUsed: { icon: 'local_gas_station', label: 'Gas Used' },
    paymaster: { icon: 'building', label: 'Paymaster' },
    beneficiary: { icon: 'Beneficiary', label: 'Beneficiary' },
    transactionHash: { icon: 'Hash', label: 'Transaction Hash' },
    block: { icon: 'cube', label: 'Block' },
    revert: { icon: 'cube', label: 'Block' },
    erc20: { icon: 'cube', label: 'ERC-20 Tokens Transferred' },
    erc721: { icon: 'cube', label: 'ERC-721 Tokens Transferred' },
};

const RenderIconWithText = ({ name }: { name: keyof typeof iconList }) => {
    const { icon, label } = iconList[name] || {};
    return (
        <div className="md:w-[280px] px-[16px] py-[8px] flex items-center gap-2">
            <IconText icon={`/images/${icon}.svg`}>
                <span className="text-[14px] font-normal md:block hidden leading-5 text-dark-600">{label}</span>
            </IconText>
        </div>
    );
};

export function InfoSection({ icon, title, content, isFlex }: any) {
    return (
        <div className="flex md:pt-[0px] pt-[16px] items-center md:border-b border-[#ccc] border-0 md:gap-[20px] gap-[10px] pb-[2px]">
            <RenderIconWithText name={icon} />
            <div className="flex-1 gap-2 break-words ">
                <div>
                    <p className="text-[14px] text-[#455A64] md:hidden block">{title}</p>
                </div>
                <div className={`justify-between ${isFlex ? 'flex md:block' : 'block md:flex'}`}>{content}</div>
            </div>
        </div>
    );
}

export const RenderTextCopyLink = ({ text, network, type, active = true }: any) => {
    return (
        <div className="flex items-center gap-[10px]">
            <Link
                underline="hover"
                href={`/${type}/${text}?network=${network || ''}`}
                aria-current="page"
                className={`text-blue-200 ${active ? 'active-link' : ''}`}
            >
                <span className="text-[#1976D2] md:text-[14px] text-[16px] break-all leading-5">
                    <Address text={text}></Address>
                </span>
            </Link>
            {active && (
                <>
                    <div className="w-[30px] flex">
                        <CopyButton text={text} />
                    </div>
                    <Link
                        underline="hover"
                        href={`/${type}/${text}?network=${network || ''}`}
                        aria-current="page"
                        className="text-blue-200 "
                        target="_blank"
                    >
                        <button className="hidden outline-none md:block focus:outline-none ring-0 focus:ring-0">
                            <img src="/images/share.svg" alt="" />
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
};

export const PowerButton = ({ item, addressMapping }: any) => {
    if (item === '') return null;
    return (
        <div className="md:px-[16px] px-0 md:py-[8px] py-0">
            <p className="text-[10px] text-[#455A64]">
                {addressMapping?.[item] && POWERED_BY_LOGO_MAP?.[addressMapping?.[item]?.company.toLowerCase()] && (
                    <span className="text-bluegrey-300 text-[10px] leading-5 flex items-center gap-2 font-normal">
                        Powered By
                        <img
                            src={POWERED_BY_LOGO_MAP?.[addressMapping?.[item]?.company.toLowerCase()]?.small}
                            style={{ height: 20, width: 20 }}
                            alt=""
                        />
                    </span>
                )}
            </p>
        </div>
    );
};

export const RenderDisplayFee = ({ items, type, item }: any) => {
    const renderFeeItem = (value: any, index: number) => (
        <span key={index} className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5 flex items-center">
            {type == 'Multi Send' && index + 1 + ':  '} &nbsp;{' '}
            <DisplayFee item={value! ? (typeof value == 'string' ? value : parseInt(value.hex))! : 'Unavailable'} network={item?.network} />
        </span>
    );
    return <>{items.map((value: any, index: number) => renderFeeItem(value, index))}</>;
};
