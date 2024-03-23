import { NETWORK_ICON_MAP, NETWORK_LIST, NETWORK_SCANNER_MAP } from '@/components/common/constants';
import CopyButton from '@/components/common/copy_button/CopyButton';
import { getExplorerLogo } from '@/components/common/utils';
import Address from '@/components/global/Address';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useConfig } from '@/context/config';
import Chip from '@/components/common/chip/Chip';
import ChipDropdown from '@/components/common/chip/ChipDropdown';
import { useState } from 'react';
const SET_DEFAULT_CHIP_SIZE = 4;
interface NetworkItem {
    name: string;
    key: string;
    iconPath: string;
    iconPathInverted: string;
}
export default function HeaderSection({ item, network, displayNetworkList = [] }: any) {
    console.log('🚀 ~ file: HeaderSection.tsx:7 ~ HeaderSection ~ item:', item);
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    console.log(network)
    const router = useRouter();
    const [endIndex, setEndIndex] = useState(SET_DEFAULT_CHIP_SIZE);
    const [isMoreSelected, setIsMoreSelected] = useState(false);
    console.log(displayNetworkList)
    const displayedNetworkList = displayNetworkList.slice(0, endIndex);
    const dropdownNetworkList = displayNetworkList.slice(endIndex);

    const isNetworkInDropdown = (network: string, dropdownNetworkList: NetworkItem[]) => {
        return dropdownNetworkList.some(({ key }) => key === network);
    };

    React.useEffect(() => {
        setIsMoreSelected(
            isNetworkInDropdown(
                typeof router.query.network === 'string' ? router.query.network : '',
                dropdownNetworkList
            )
        );
    }, [router.query.network, dropdownNetworkList]);
    return (
        <div>
            <section className="mt-[48px] px-3">
                <div className="container  bg-white rounded shadow-200 px-[16px] py-[12px]">
                    <h3 className="text-[15px]  leading-[28px] font-bold text-dark-600">Account</h3>
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
                                {
                                    displayedNetworkList.map(
                                        ({ name, key, iconPath, iconPathInverted }: NetworkItem, index: number) => (
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
                                        )
                                    )
                                }
                                {displayNetworkList.length > SET_DEFAULT_CHIP_SIZE && (
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
                        {/* <span className="text-bluegrey-300 text-[10px] leading-5 flex items-center gap-2 font-normal">
                                                Powered By <img src="/images/pimlico.svg" alt="" />
                                            </span> */}
                    </div>
                </div>
            </section>
        </div>
    );
}
