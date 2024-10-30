import React, { useState, useRef, useEffect } from 'react';
import Chip from '@/components/common/chip/Chip';
import { NETWORK_LIST } from '@/components/common/constants';
import ChipDropdown from '@/components/common/chip/ChipDropdown';
import useWindowDimensions from '../global/recent_metrics/utils';

const SET_DEFAULT_CHIP_SIZE = 4;

const isNetworkInDropdown = (network: string, dropdownNetworkList: any) => {
    for (let i = 0; i < dropdownNetworkList.length; i++) {
        if (dropdownNetworkList[i].key === network) {
            return true;
        }
    }
    return false;
};

function NetworkSelector({
    selectedNetwork,
    handleNetworkChange,
    disabled,
}: {
    selectedNetwork: string;
    handleNetworkChange: (network: string) => void;
    disabled?: boolean;
}) {
    const [endIndex, setEndIndex] = useState(SET_DEFAULT_CHIP_SIZE);
    const displayNetworkList = NETWORK_LIST.slice(0, endIndex);
    const dropdownNetworkList = NETWORK_LIST.slice(endIndex, NETWORK_LIST.length);
    const [isMoreSelected, setIsMoreSelected] = useState(isNetworkInDropdown(selectedNetwork, dropdownNetworkList) ? true : false);
    const width = useWindowDimensions().width;

    useEffect(() => {
        // If width more than 768px, display 3 chips, else display 1 chip
        // and everything else in dropdown
        if ((width as number) > 768) {
            setEndIndex(SET_DEFAULT_CHIP_SIZE);
        } else {
            setEndIndex(1);
        }
    }, [width]);

    useEffect(() => {
        setIsMoreSelected(isNetworkInDropdown(selectedNetwork, dropdownNetworkList) ? true : false);
    }, [selectedNetwork, endIndex]);

    return (
        <div className="flex flex-wrap items-center gap-1 text-base">
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
                selectedNetwork={selectedNetwork}
                isMoreSelected={isMoreSelected}
                setIsMoreSelected={setIsMoreSelected}
                dropdownNetworkList={dropdownNetworkList}
                disabled={disabled}
            />
        </div>
    );
}

export default NetworkSelector;
