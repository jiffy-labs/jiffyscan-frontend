// import React, { ReactNode, Fragment, useState, useEffect } from 'react';
// import sx from './chip.module.sass';
// import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import { NETWORK_ICON_MAP } from '../constants';

// export interface ChipProps {
//     variant?: 'contained' | 'outlined';
//     color?: 'dark-700' | 'white' | 'info' | 'success' | 'dark-400';
//     className?: string;
//     isMoreSelected: boolean;
//     setIsMoreSelected: (isMoreSelected: boolean) => void;
//     onClickFcn: (network: string) => void;
//     disabled?: boolean;
//     dropdownNetworkList: {
//         name: string;
//         key: string;
//         iconPath: string;
//         iconPathInverted: string;
//     }[];
//     selectedNetwork: string;
// }

// function ChipDropdown(props: ChipProps) {
//     const { variant = 'contained', isMoreSelected, className, setIsMoreSelected, onClickFcn, dropdownNetworkList, disabled, selectedNetwork } = props;

//     const color = isMoreSelected ? 'dark-700' : 'white';
//     const [icon, setIcon] = useState<string | null>(NETWORK_ICON_MAP[selectedNetwork]);

//     useEffect(() => {
//         setIcon(NETWORK_ICON_MAP[selectedNetwork]);
//     },[selectedNetwork]);

//     return (
//         <div className="text-sm">
//             <Menu as="div" className="relative inline-block text-left ">
//                 <span>
//                     <Menu.Button className={`${sx.wrapper} ${sx[variant]} ${sx[color]} ${className || ''} ${disabled ? sx.disabled : ''}`}>
//                         {(icon && isMoreSelected) && (
//                             <img
//                                 src={icon}
//                                 alt=""
//                                 style={{
//                                     height: '12px',
//                                     width: '12px',
//                                 }}
//                             />
//                         )}

//                         {isMoreSelected ? selectedNetwork : 'More'}
//                         <ChevronDownIcon className="w-5 h-5 -mr-1 text-gray-400" aria-hidden="true" />
//                     </Menu.Button>
//                 </span>

//                 <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                 >
//                     <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
//                         <div className="flex flex-col py-1">
//                             {dropdownNetworkList.map(({ name, key, iconPath }, index) => (
//                                 <Menu.Item key={key}>
//                                     {({ active }) => (
//                                         <a
//                                             onClick={() => {
//                                                 setIsMoreSelected(true);
//                                                 onClickFcn(key);
//                                                 setIcon(iconPath);
//                                             }}
//                                             className={`
// 												${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} +
// 												'block flex items-center gap-3 px-4 py-2 text-sm'
// 												`}
//                                         >
//                                             <img
//                                                 src={iconPath}
//                                                 alt=""
//                                                 style={{
//                                                     height: '12px',
//                                                     width: '12px',
//                                                 }}
//                                             />
//                                             {name}
//                                         </a>
//                                     )}
//                                 </Menu.Item>
//                             ))}
//                         </div>
//                     </Menu.Items>
//                 </Transition>
//             </Menu>
//         </div>
//     );
// }

// export default ChipDropdown;

import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { NETWORK_ICON_MAP } from '../constants';
import Modal from './Modal'; // Import Modal component

export interface ChipProps {
    variant?: 'contained' | 'outlined';
    color?: 'dark-700' | 'white' | 'info' | 'success' | 'dark-400';
    className?: string;
    isMoreSelected: boolean;
    setIsMoreSelected: (isMoreSelected: boolean) => void;
    onClickFcn: (network: string) => void;
    disabled?: boolean;
    dropdownNetworkList: {
        name: string;
        key: string;
        iconPath: string;
        iconPathInverted: string;
    }[];
    selectedNetwork: string;
}

function ChipDropdown(props: ChipProps) {
    const {
        variant = 'contained',
        isMoreSelected,
        className,
        setIsMoreSelected,
        onClickFcn,
        dropdownNetworkList,
        disabled,
        selectedNetwork,
    } = props;
    const [icon, setIcon] = useState<string | null>(NETWORK_ICON_MAP[selectedNetwork]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Add state for modal visibility
    const [isTestnet, setIsTestnet] = useState(false); // Toggle between Mainnet and Testnet

    useEffect(() => {
        setIcon(NETWORK_ICON_MAP[selectedNetwork]);
    }, [selectedNetwork]);

    // Toggle between Mainnet and Testnet
    const handleToggle = () => {
        setIsTestnet(!isTestnet);
    };

    // Open Modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Filter networks based on Mainnet or Testnet
    const filteredNetworkList = dropdownNetworkList.filter((network) => {
        if (isTestnet) {
            return ['base-sepolia', 'optimism-sepolia', 'arbitrum-sepolia', 'sepolia', 'avalanche-fuji', 'polygon-amoy'].includes(
                network.key,
            );
        } else {
            return ['cyber-mainnet', 'arbitrum-one', 'avalanche', 'mainnet', 'open-campus-test', 'polygon', 'base', 'odyssey'].includes(network.key);
        }
    });

    return (
        <div className="text-sm">
            <Menu as="div" className="relative inline-block text-left">
                <span>
                    <Menu.Button
                        onClick={openModal}
                        className={`h-[36px] w-[102px] font-gsans border border-[#D7DAE0]  dark:bg-[#1F202B] dark:border-[#3B3C40] dark:text-white text-base text-center inline-flex items-center px-4 py-3 ${
                            isMoreSelected ? 'bg-gray-800 text-white border-[#D7DAE0] dark:border-[#D7DAE0]' : 'bg-white text-gray-800'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 `}
                    >
                        {icon && isMoreSelected && <img src={icon} alt="" className="h-4 w-4 mr-2" />}
                        {isMoreSelected ? selectedNetwork : 'More'}
                        <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-500" aria-hidden="true" />
                    </Menu.Button>
                </span>

                {/* "More" button to open the modal */}
                {/* <button  className="ml-2 text-blue-600 underline hover:text-blue-400">
                    More
                </button> */}

                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <div className="py-6">
                            {/* Toggle Switch for Mainnet and Testnet */}
                            <div className="w-full mb-4 px-6">
                                <div className="relative ">
                                    
                                    <ul className="flex items-center px-1.5 py-1.5 dark:border-[#3B3C40] list-none rounded-md bg-[#F0F1F5] dark:bg-[#191A23] border border-[#D7DAE0]">
                                        <li className="z-30 flex-auto text-center">
                                            <button
                                                onClick={() => setIsTestnet(false)} // Set to Mainnet
                                                className={`z-30 flex items-center dark:text-[#DADEF1] justify-center font-gsans w-full px-0 py-2 text-base border border-[#D7DAE0] mb-0 transition-all duration-200 ease-in-out border-0 rounded-md cursor-pointer text-slate-600 ${
                                                    !isTestnet ? 'bg-white dark:border-[#3B3C40] dark:bg-[#1F202B] border-2 border-[#D7DAE0]  rounded-md' : 'bg-inherit'
                                                }`}
                                                aria-selected={!isTestnet}
                                            >
                                                Mainnet
                                            </button>
                                        </li>
                                        <li className="z-30 flex-auto text-center">
                                            <button
                                                onClick={() => setIsTestnet(true)} // Set to Testnet
                                                className={`z-30 flex items-center dark:text-[#DADEF1] justify-center font-gsans w-full px-0 py-2 text-base border border-[#D7DAE0] mb-0 transition-all duration-200 ease-in-out border-0 rounded-md cursor-pointer text-slate-600 ${
                                                    isTestnet ? 'bg-white border-2 dark:border-[#3B3C40] dark:bg-[#1F202B] border-[#D7DAE0]  rounded-md' : 'bg-inherit'
                                                }`}
                                                aria-selected={isTestnet}
                                            >
                                                Testnet
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                             <div className='border w-full dark:border-[#3B3C40]'></div>                       
                            {/* Display Networks */}
                            <div className="flex flex-wrap justify-center gap-4 py-6">
                                {filteredNetworkList.map(({ name, key, iconPath }) => (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setIsMoreSelected(true);
                                            onClickFcn(key);
                                            setIcon(iconPath);
                                            closeModal();
                                        }}
                                        className="w-[156px] h-[36px] flex text-center text-md dark:text-[#DADEF1] dark:border-[#3B3C40] font-gsans border-[#DAD7E0] text-[#646D8F] items-center p-2 border rounded-lg shadow-sm hover:bg-gray-100"
                                    >
                                        <img src={iconPath} alt={name} className="h-4 w-4 mr-2" />
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Modal>
                )}
            </Menu>
        </div>
    );
}

export default ChipDropdown;
