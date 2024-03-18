import { NETWORK_ICON_MAP, NETWORK_LIST, NETWORK_SCANNER_MAP, POWERED_BY_LOGO_MAP } from '@/components/common/constants';
import CopyButton from '@/components/common/copy_button/CopyButton';
import { getExplorerLogo } from '@/components/common/utils';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useConfig } from '@/context/config';
import Chip from '@/components/common/chip/Chip';
import ChipDropdown from '@/components/common/chip/ChipDropdown';
import { useState } from 'react';
const SET_DEFAULT_CHIP_SIZE = 0;
export default function HeaderSection({ item, network, addressMapping, displayNetworkList }: any) {
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    console.log(network)
    const router = useRouter();
    const [endIndex, setEndIndex] = useState(SET_DEFAULT_CHIP_SIZE);
    const [isMoreSelected, setIsMoreSelected] = useState(false);

    const displayedNetworkList = displayNetworkList.slice(0, endIndex);
    const dropdownNetworkList = displayNetworkList.slice(endIndex);

    const isNetworkInDropdown = (network, dropdownNetworkList) => {
        return dropdownNetworkList.some(({ key }) => key === network);
    };

    React.useEffect(() => {
        setIsMoreSelected(isNetworkInDropdown(router.query.network, dropdownNetworkList) ? true : false);
    }, [router.query.network, dropdownNetworkList]);
    return (
        <div>
            <section className="px-3 ">
                <div className="container  bg-white rounded shadow-200 px-[16px] py-[12px]">
                    <h3 className="text-[15px]  leading-[28px] font-bold text-dark-600">Bundler</h3>
                    <div className="md:flex items-center gap-4 pt-[14px] pb-[2px]">
                        <div className="flex items-center gap-2">
                            <img src={NETWORK_ICON_MAP[network as string]} alt="" className="h-[20px]" />
                            <span className="text-sm font-normal leading-5 text-dark-600">
                                {NETWORK_LIST.find((el) => el.key === network)?.name}
                            </span>
                        </div>
                        <div className='w-full flex flex-col max-md:gap-[1rem] md:flex-row justify-between'>
                            <div className="flex items-center flex-1 gap-2 break-words">
                                <span className="text-sm leading-5 break-all text-dark-600">{item?.address}</span>
                                <CopyButton text={item?.address} />
                                <button className="outline-none focus:outline-none ring-0 focus:ring-0">
                                    <Link
                                        // underline="hover"
                                        // color="text.primary"
                                        href={`${NETWORK_SCANNER_MAP[network]}/address/${item?.address}`}
                                        aria-current="page"
                                        className="text-blue-200"
                                        target="_blank"
                                    >
                                        <img src={getExplorerLogo(network)} style={{ height: '16px', width: '16px' }} alt="" />
                                    </Link>
                                </button>
                            </div>
                            <div className="flex flex-wrap items-center gap-1">
                                {displayedNetworkList.map(({ name, key, iconPath, iconPathInverted }, index) => (
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
                                {displayNetworkList.length > SET_DEFAULT_CHIP_SIZE && (
                                    <ChipDropdown
                                        onClickFcn={(network) => {
                                            router.push({
                                                pathname: router.pathname,
                                                query: { ...router.query, network },
                                            });
                                            setIsMoreSelected(false);
                                        }}
                                        selectedNetwork={router.query.network  as string || ""}
                                        isMoreSelected={isMoreSelected}
                                        setIsMoreSelected={setIsMoreSelected}
                                        dropdownNetworkList={dropdownNetworkList}
                                    />
                                )}
                            </div>
                        </div>
                        {item?.address === '' ? null : (
                            <div className="md:px-[16px] px-0 md:py-[8px] py-0">
                                <p className="text-[10px] text-[#455A64]">
                                    {(addressMapping?.[item?.address?.toLowerCase()] && POWERED_BY_LOGO_MAP?.[addressMapping?.[item?.address?.toLowerCase()]?.company.toLowerCase()]) && (
                                        <span className="text-bluegrey-300 text-[10px] leading-5 flex items-center gap-2 font-normal">
                                            Powered By{' '}
                                            <img
                                                src={
                                                    POWERED_BY_LOGO_MAP?.[
                                                        addressMapping?.[item?.address?.toLowerCase()]?.company.toLowerCase()
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
            </section>
        </div>
    );
}
