import React, { ReactNode, Fragment, useState } from 'react';
import sx from './chip.module.sass';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export interface ChipProps {
    variant?: 'contained' | 'outlined';
    color?: 'dark-700' | 'white' | 'info' | 'success' | 'dark-400';
    className?: string;
    isMoreSelected: boolean;
    setIsMoreSelected: (isMoreSelected: boolean) => void;
    onClickFcn: (network: string) => void;
    moreNetworkList: {
        name: string;
        key: string;
        iconPath: string;
        iconPathInverted: string;
    }[];
}

function ChipDropdown(props: ChipProps) {
    const {
        variant = 'contained',
        isMoreSelected,
        className,
        setIsMoreSelected,
        onClickFcn,
        moreNetworkList,
    } = props;

    const color = isMoreSelected ? 'dark-700' : 'white';
    const [selectedNetwork, setSelectedNetwork] = useState('');
    const [icon, setIcon] = useState<string | null>(null);

    return (
        <div className="text-sm">
            <Menu as="div" className="relative inline-block text-left ">
                <span>
                    <Menu.Button
                        className={`${sx.wrapper} ${sx[variant]} ${sx[color]} ${
                            className || ''
                        }`}
                    >
                        {icon && isMoreSelected && (
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
                        <ChevronDownIcon
                            className="-mr-1 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1 flex flex-col">
                            {moreNetworkList.map(
                                ({ name, key, iconPath }, index) => (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                onClick={() => {
                                                    setSelectedNetwork(name);
                                                    setIsMoreSelected(true);
                                                    onClickFcn(key);
                                                    setIcon(iconPath);
                                                }}
                                                className={`
												${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} + 
												'block px-4 py-2 text-sm'
												`}
                                            >
                                                {name}
                                            </a>
                                        )}
                                    </Menu.Item>
                                )
                            )}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export default ChipDropdown;
