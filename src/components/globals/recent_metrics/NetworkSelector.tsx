import React from 'react'
import Chip from "@/components/common/chip/Chip";
import { NETWORK_LIST } from '@/components/common/constants';

function NetworkSelector({ selectedNetwork, handleNetworkChange }: { selectedNetwork: string, handleNetworkChange: (network: string) => void }) {
    return (
        <div className="flex flex-wrap items-center gap-1">
            {NETWORK_LIST.map(({ name, key, iconPath, iconPathInverted }, index) => (
                <Chip
                    key={index}
                    onClick={() => handleNetworkChange(key)}
                    startIcon={selectedNetwork === key ? iconPath : iconPathInverted}
                    color={`${selectedNetwork === key ? "dark-700" : "white"}`}
                >
                    {name}
                </Chip>
            ))}
        </div>
    )
}

export default NetworkSelector
