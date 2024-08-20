import React, { useEffect, useState } from 'react';
import { NETWORK_LIST } from '@/components/common/constants';

function Options({ networkValue, setNetworkValue }: { networkValue: number; setNetworkValue: (value: number) => void }) {
    const [open, setOpen] = useState<boolean>(false);
    const toggler = () => setOpen((v) => !v);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredNetworks, setFilteredNetworks] = useState<any[]>(NETWORK_LIST); // Initialized with full list

    // console.log(networkValue,setNetworkValue)
    const handleValue = (index: number) => {
        setNetworkValue(index);
        // toggler();
        setOpen(false); // Close dropdown after selection

    };

    // Filter networks based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredNetworks(NETWORK_LIST); // Reset to full list when search term is empty
        } else {
            const filtered = NETWORK_LIST.filter((network) =>
                network.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredNetworks(filtered);
        }
    }, [searchTerm]);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    return (
        <div className="relative z-10">
            <div className="py-3 px-4 border-r border-dark-200 bg-white flex items-center gap-1 text-md" role="button" onClick={toggler}>
                {/* {/* <img src={NETWORK_LIST[value].img} alt="" /> */}

                <img src={networkValue != -1 ? NETWORK_LIST[networkValue].iconPathInverted : "/zap2.svg"} alt="" style={{ width: '20px', height: 'auto' }} />
                {/* <span>{NETWORK_LIST[networkValue].name}</span> */}
                <img className={`duration-100 ${open ? 'rotate-180' : ''}`} src="/images/chevron-down.svg" alt="" />
            </div>
            {open && (
                <div className="">
                    <div onClick={toggler} className="fixed inset-0 z-100 bg-transparent" />
                    <div className="absolute left-0 bg-white py-1 border-dark-200 shadow-200 w-52">
                        <div className="flex flex-col">
                        <div className="flex items-center gap-2 py-2 px-3 hover:bg-dark-600/10 text-md">
                                    <input
                                    type="text"
                                    className="px-0.5 py-0.5 rounded-md focus:outline-none focus:border-primary-400"
                                    placeholder="Search Chains..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                </div>
                            <div className='max-h-40 overflow-y-auto rounded-md p-2'>
                            {filteredNetworks.map(({ name, iconPath }, index) => (
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
                </div>
            )}
        </div>
    );
}

export default Options;
