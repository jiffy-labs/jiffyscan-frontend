import React, { useState, useRef, useEffect } from 'react';
import Chip from '@/components/common/chip/Chip';
import { NETWORK_LIST } from '@/components/common/constants';
import ChipDropdown from '@/components/common/chip/ChipDropdown';
import useWindowDimensions from './utils';

function NetworkSelector({
    selectedNetwork,
    handleNetworkChange,
}: {
    selectedNetwork: string;
    handleNetworkChange: (network: string) => void;
}) {
    const [isMoreSelected, setIsMoreSelected] = useState(false);

    const endIndex = (useWindowDimensions().width as number) > 768 ? 3 : 1;
    const networkList = NETWORK_LIST.slice(0, endIndex);
    const moreNetworkList = NETWORK_LIST.slice(endIndex, NETWORK_LIST.length);

    return (
        <div className="flex flex-wrap items-center gap-1">
            {networkList.map(
                ({ name, key, iconPath, iconPathInverted }, index) => (
                    <Chip
                        key={index}
                        onClick={() => {
                            handleNetworkChange(key);
                            setIsMoreSelected(false);
                        }}
                        startIcon={
                            selectedNetwork === key
                                ? iconPath
                                : iconPathInverted
                        }
                        color={`${
                            selectedNetwork === key ? 'dark-700' : 'white'
                        }`}
                    >
                        {name}
                    </Chip>
                )
            )}
            <ChipDropdown
                onClickFcn={handleNetworkChange}
                isMoreSelected={isMoreSelected}
                setIsMoreSelected={setIsMoreSelected}
                moreNetworkList={moreNetworkList}
            />
        </div>
    );
}

export default NetworkSelector;
