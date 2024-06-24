import React, { ReactNode, Fragment, useState, useEffect } from 'react';
import sx from './chip.module.sass';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { NETWORK_ICON_MAP } from '../constants';

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
    const { variant = 'contained', isMoreSelected, className, setIsMoreSelected, onClickFcn, dropdownNetworkList, disabled, selectedNetwork } = props;

    const color = isMoreSelected ? 'dark-700' : 'white';
    const [icon, setIcon] = useState<string | null>(NETWORK_ICON_MAP[selectedNetwork]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredNetworks, setFilteredNetworks] = useState(props.dropdownNetworkList);

    useEffect(() => {
        setIcon(NETWORK_ICON_MAP[selectedNetwork]);
    },[selectedNetwork]);

    // Filtering networks based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredNetworks(dropdownNetworkList); 
        } else {
            const filtered = dropdownNetworkList.filter(network =>
                network.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredNetworks(filtered);
        }
    }, [searchTerm, dropdownNetworkList]);
    return (
        <div className="text-sm">
            <Menu as="div" className="relative inline-block text-left ">
                <span>
                    <Menu.Button className={`${sx.wrapper} ${sx[variant]} ${sx[color]} ${className || ''} ${disabled ? sx.disabled : ''}`}>
                        {(icon && isMoreSelected) && (
                            <img
                                src={icon}
                                alt=""
                                style={{
                                    height: '12px',
                                    width: '12px',
                                }}
                            />
                        )}

                        {isMoreSelected ? selectedNetwork : 'More'}
                        <ChevronDownIcon className="w-5 h-5 -mr-1 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                </span>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-52 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className='max-h-44 overflow-y-auto rounded-md p-2'>
                        <div className="flex flex-col py-1">
                             <input
                                    type="text"
                                    className="px-3 py-1 rounded-md mb-2 focus:outline-none focus:border-primary-400 w-40 text-sm"
                                    placeholder="Search Chains..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />

                            {/* Rendering filtered network items */}
                            {filteredNetworks.map(({ name, key, iconPath }, index) => (
                                    <Menu.Item key={key}>
                                        {({ active }) => (
                                            <a
                                                onClick={() => {
                                                    setIsMoreSelected(true);
                                                    onClickFcn(key);
                                                    setIcon(iconPath);
                                                }}
                                                className={`
                                                    ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} 
                                                    block flex items-center gap-3 px-4 py-2 text-sm
                                                `}
                                            >
                                                <img
                                                    src={iconPath}
                                                    alt=""
                                                    style={{
                                                        height: '12px',
                                                        width: '12px',
                                                    }}
                                                />
                                                {name}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))}
                        </div>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export default ChipDropdown;
