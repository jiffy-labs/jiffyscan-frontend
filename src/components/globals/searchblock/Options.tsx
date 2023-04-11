import React, { useState } from 'react';
import { NETWORK_LIST } from '@/components/common/constants';

function Options({ networkValue, setNetworkValue }: { networkValue: number; setNetworkValue: (value: number) => void }) {
    const [open, setOpen] = useState<boolean>(false);
    const toggler = () => setOpen((v) => !v);

    const handleValue = (index: number) => {
        setNetworkValue(index);
        toggler();
    };

    return (
        <div className="relative z-0">
            <div className="py-3 px-4 border-r border-dark-200 bg-white flex items-center gap-1 text-md" role="button" onClick={toggler}>
                {/* {/* <img src={NETWORK_LIST[value].img} alt="" /> */}
                <span>{NETWORK_LIST[networkValue].name}</span>
                <img src={NETWORK_LIST[networkValue].iconPathInverted} alt="" style={{ width: '20px', height: 'auto' }} />
                <img className={`duration-100 ${open ? 'rotate-180' : ''}`} src="/images/chevron-down.svg" alt="" />
            </div>
            {open && (
                <div className="">
                    <div onClick={toggler} className="fixed inset-0 -z-20 bg-transparent" />
                    <div className="absolute left-0 bg-white min-w-full py-1 border-dark-200 shadow-200">
                        <div className="flex flex-col">
                            {NETWORK_LIST.map(({ name, key, iconPath, iconPathInverted }, index) => (
                                <div
                                    onClick={() => handleValue(index)}
                                    className="flex items-center whitespace-no-wrap gap-2 py-2 px-3 hover:bg-dark-600/10 text-md"
                                    role="button"
                                    key={index}
                                >
                                    <img src={iconPath} alt="" style={{ width: '20px', height: 'auto' }} />
                                    <span>{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Options;
