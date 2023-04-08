import React, { useState, useRef, useEffect } from 'react';
import Chip from '@/components/common/chip/Chip';
import { NETWORK_LIST } from '@/components/common/constants';
import ChipDropdown from '@/components/common/chip/ChipDropdown';
import useWindowDimensions from './utils';

function NetworkSelector({
    selectedNetwork,
    handleNetworkChange,
    disabled,
}: {
    selectedNetwork: string;
    handleNetworkChange: (network: string) => void;
    disabled: boolean;
}) {
    const [isMoreSelected, setIsMoreSelected] = useState(false);
    const [endIndex, setEndIndex] = useState(3);

    const width = useWindowDimensions().width;

    useEffect(() => {
        // If width more than 768px, display 3 chips, else display 1 chip
        // and everything else in dropdown
        if ((width as number) > 768) {
            setEndIndex(3);
        } else {
            setEndIndex(1);
            setIsMoreSelected(false);
        }
    }, [width]);

    const displayNetworkList = NETWORK_LIST.slice(0, endIndex);
    const dropdownNetworkList = NETWORK_LIST.slice(endIndex, NETWORK_LIST.length);

    return (
        <div className="flex flex-wrap items-center gap-1">
            {displayNetworkList.map(({ name, key, iconPath, iconPathInverted }, index) => (
                <Chip
                    key={index}
                    onClick={() => {
                        // if (!isLoading) {
                        handleNetworkChange(key);
                        setIsMoreSelected(false);
                        // }
                    }}
                    startIcon={selectedNetwork === key ? iconPathInverted : iconPath}
                    color={`${selectedNetwork === key ? 'dark-700' : 'white'}`}
                    disabled={disabled}
                >
                    {name}
                </Chip>
            ))}
            <ChipDropdown
                onClickFcn={handleNetworkChange}
                isMoreSelected={isMoreSelected}
                setIsMoreSelected={setIsMoreSelected}
                dropdownNetworkList={dropdownNetworkList}
                disabled={disabled}
            />
        </div>
    );
}

export default NetworkSelector;
