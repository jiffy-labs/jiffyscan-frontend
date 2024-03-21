import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useConfig } from '@/context/config';
import { NETWORK_ICON_MAP, NETWORK_LIST, NETWORK_SCANNER_MAP, POWERED_BY_LOGO_MAP } from '@/components/common/constants';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Chip from '@/components/common/chip/Chip';
import ChipDropdown from '@/components/common/chip/ChipDropdown';
import { getExplorerLogo } from '@/components/common/utils';
import Link from 'next/link';

interface NetworkItem {
    name: string;
    key: string;
    iconPath: string;
    iconPathInverted: string;
}

interface HeaderSectionProps {
    item: any;
    network: string;
    addressMapping?: any;
    displayNetworkList: NetworkItem[];
    headerTitle: string; // Variable header title (e.g., "Paymaster", "Bundler", "Account")
    defaultChipSize?: number; // Optional prop to allow customization of the initial number of chips displayed
}

const HeaderSectionGlobal: React.FC<HeaderSectionProps> = ({
    item,
    network,
    addressMapping,
    displayNetworkList,
    headerTitle,
    defaultChipSize = 0 // Default value set to 0 if not provided
}) => {
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    const router = useRouter();
    const [endIndex, setEndIndex] = useState(defaultChipSize);
    const [isMoreSelected, setIsMoreSelected] = useState(false);
    const displayedNetworkList = displayNetworkList.slice(0, endIndex);
    const dropdownNetworkList = displayNetworkList.slice(endIndex);

    const isNetworkInDropdown = (network: string, dropdownNetworkList: NetworkItem[]) =>
        dropdownNetworkList.some(({ key }) => key === network);

    useEffect(() => {
        setIsMoreSelected(
            isNetworkInDropdown(
                typeof router.query.network === 'string' ? router.query.network : '',
                dropdownNetworkList
            )
        );
    }, [router.query.network, dropdownNetworkList]);

    return (
        <div>
            <section className="px-3">
                <div className="container bg-white rounded shadow-200 px-[16px] py-[12px]">
                    <h3 className="text-[15px] leading-[28px] font-bold text-dark-600">{headerTitle}</h3>
                    <div className="md:flex items-center gap-4 pt-[14px] pb-[2px]">
                        <div className="flex items-center gap-2">
                            <img src={NETWORK_ICON_MAP[network]} alt="" className="h-[20px]" />
                            <span className="text-sm font-normal leading-5 text-dark-600">
                                {NETWORK_LIST.find((el) => el.key === network)?.name}
                            </span>
                        </div>
                        <div className='w-full flex flex-col max-md:gap-[1rem] md:flex-row justify-between'>
                            <div className="flex items-center flex-1 gap-2 break-words">
                                <span className="text-sm leading-5 break-all text-dark-600">{item?.address}</span>
                                <CopyButton text={item?.address} />
                                <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                    <Link href={`${NETWORK_SCANNER_MAP[network]}/address/${item?.address}`} aria-current="page" target="_blank">
                                        <img src={getExplorerLogo(network)} style={{ height: '16px', width: '16px' }} alt="" />
                                    </Link>
                                </button>
                            </div>
                            <div className="flex flex-wrap items-center gap-1">
                                {displayedNetworkList.map(({ name, key, iconPath, iconPathInverted }: NetworkItem, index: number) => (
                                    <Chip
                                        key={index}
                                        onClick={() => {
                                            router.push({
                                                pathname: router.pathname,
                                                query: { ...router.query, network: key },
                                            });
                                            setIsMoreSelected(false);
                                        }}
                                        startIcon={router.query.network === key ? iconPathInverted : iconPath}
                                        color={`${router.query.network === key ? 'dark-700' : 'white'}`}
                                    >
                                        {name}
                                    </Chip>
                                ))}
                                {displayNetworkList.length > defaultChipSize && (
                                    <ChipDropdown
                                        onClickFcn={(network) => {
                                            router.push({
                                                pathname: router.pathname,
                                                query: { ...router.query, network },
                                            });
                                            setIsMoreSelected(false);
                                        }}
                                        selectedNetwork={router.query.network as string || ""}
                                        isMoreSelected={isMoreSelected}
                                        setIsMoreSelected={setIsMoreSelected}
                                        dropdownNetworkList={dropdownNetworkList}
                                    />
                                )}
                            </div>
                        </div>
                        {item?.address !== '' && addressMapping && addressMapping[item?.address.toLowerCase()] && POWERED_BY_LOGO_MAP[addressMapping[item?.address.toLowerCase()].company.toLowerCase()] && (
                            <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                <span className="text-bluegrey-300 text-[10px] leading-5 flex items-center gap-2 font-normal">
                                    Powered By{' '}
                                    <img
                                        src={POWERED_BY_LOGO_MAP[addressMapping[item?.address.toLowerCase()].company.toLowerCase()].small}
                                        style={{ height: 20, width: 20 }}
                                        alt=""
                                    />
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
    
};

export default HeaderSectionGlobal;
