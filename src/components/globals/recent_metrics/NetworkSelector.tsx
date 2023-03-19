import React, { useState } from 'react';
import Chip from '@/components/common/chip/Chip';
import { NETWORK_LIST } from '@/components/common/constants';
import ChipDropdown from '@/components/common/chip/ChipDropdown';

function NetworkSelector({
    selectedNetwork,
    handleNetworkChange,
}: {
    selectedNetwork: string;
    handleNetworkChange: (network: string) => void;
}) {
    const [isMoreSelected, setIsMoreSelected] = useState(false);

    return (
        <div className="flex flex-wrap items-center gap-1">
            {NETWORK_LIST.map(
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
            />
        </div>
    );
}

export default NetworkSelector;
