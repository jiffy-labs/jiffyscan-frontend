import React, { useState, useEffect, useRef } from 'react';
import { NETWORK_LIST } from '@/components/common/constants';
import { useRouter } from 'next/router';
import { checkIfValidTerm, constructRedirectUrl } from '@/components/common/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LinearProgress } from '@mui/material';

const showToast = (toast: any, message: string) => {
    toast.error(message, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'colored',
    });
};

const SearchBox = ({networkValue, setNetworkValue}: any) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNetworks, setFilteredNetworks] = useState(NETWORK_LIST);
    
    const [searching, setSearching] = useState(false);
    const [animateState, setAnimateState] = useState(false);
    const searchRef = useRef(null);
    const { push } = useRouter();
    // const [networkDropdown, setNetworkDropdown] = useState<string | null>("mainnet");

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
   

    const handleValue = (index: number) => {
        setNetworkValue(index);
        
        setIsDropdownOpen(false); // Close dropdown after selection
        setOpen(false);
        
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault(); // Prevent form submission
        if (checkIfValidTerm(searchTerm)) {
            setSearching(true);
            try {
                const res = await fetch(`https://api.jiffyscan.xyz/v0/searchEntry?entry=${searchTerm.toLowerCase()}${networkValue !== -1 ? `&network=${NETWORK_LIST[networkValue].key}` : ''}`);
                if (res.status === 200) {
                    const data = await res.json();
                    console.log('API Response:', data);
                    let redirectUrl;
                    if (data.foundInNetwork && data.type && data.term)
                        redirectUrl = constructRedirectUrl(data.type, data.foundInNetwork, data.term);
                    console.log('Constructed URL:', redirectUrl); 
                    if (redirectUrl) {
                        push(redirectUrl);
                    } else {
                        showToast(toast, 'No results found');
                    }
                } else {
                    showToast(toast, 'Invalid search term ?');
                }
            } catch (error) {
                console.error('Error:', error);
                showToast(toast, 'An error occurred');
            } finally {
                setSearching(false);
            }
        } else {
            showToast(toast, 'Invalid search term ?');
        }
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

    return (
        <form className="w-full h-16">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-2 flex items-center ps-3 cursor-pointer" onClick={handleDropdownToggle}>
                    <div className='flex' onClick={() => setOpen((v) => !v)}>
                        <img src={networkValue !== -1 ? NETWORK_LIST[networkValue].iconPathInverted : "/zap2.svg"} alt="" style={{ width: '20px', height: 'auto' }} />
                        <img className={`duration-100 ${open ? 'rotate-180' : ''}`} src="/images/chevron-down.svg" alt="" />
                    </div>
                    <div className="border-r-2 h-6 mx-2"></div>
                </div>

                {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 max-h-60 overflow-y-auto" >
                        <div className="p-2">
                            <input
                                type="text"
                                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500"
                                placeholder="Search Chains..."
                                value={searchTerm}
                                
                            />
                        </div>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            {filteredNetworks.map(({ name, iconPath }, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => handleValue(index)}
                                    >
                                        <img src={iconPath} alt={name} className="w-5 h-5" />
                                        <span>{name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-24 text-sm md:text-base font-inter text-gray-900 border border-gray-300 rounded-t-2xl bg-[#FFFFFF] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for a transaction using Transaction Id"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}
                    required
                />

                <p className="text-[#9E9E9E] hidden md:block border absolute right-11 bottom-3.5 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg shadow-sm text-sm px-2.5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Ctrl
                </p>
                <p className="text-[#9E9E9E] hidden md:block absolute right-4 bottom-3.5 border bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg shadow-sm text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    K
                </p>
            </div>
            {searching && <LinearProgress />}
            <ToastContainer />
        </form>
    );
};

export default SearchBox;
