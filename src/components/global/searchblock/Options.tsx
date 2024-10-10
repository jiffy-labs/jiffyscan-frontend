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
        <div className="relative z-0 dark:bg-[#1D1E1F] dark:border-[#444444] rounded-full">
            <div className="py-3 rounded-full px-6 border-l h-[64px]  flex items-center gap-1 text-md dark:border-[#444444]" role="button" onClick={toggler}>
                {/* {/* <img src={NETWORK_LIST[value].img} alt="" /> */}

                <img src={networkValue != -1 ? NETWORK_LIST[networkValue].iconPathInverted : "/zap2.svg"} alt="" style={{ width: '20px', height: 'auto' }} />
                {/* <span>{NETWORK_LIST[networkValue].name}</span> */}
                <img className={`duration-100 ${open ? 'rotate-180' : ''}`} src="/images/chevron-down.svg" alt="" />
            </div>
            {open && (
                <div className="">
                    <div onClick={toggler} className="fixed inset-0 z-100 bg-transparent" />
                    <div className="absolute left-0 bg-white dark:bg-[#1D1E1F] w-[200%] py-1 border-dark-200 shadow-200">
                        <div className="flex flex-col">
                            <div
                                onClick={() => handleValue(-1)}
                                className="flex items-center whitespace-no-wrap gap-2 py-2 px-3 hover:bg-dark-600/10 text-md"
                                role="button"

                            >
                                <img src={"/zap2.svg"} alt="" style={{ width: '20px', height: 'auto' }} />
                                <span>Quick search</span>
                            </div>
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
