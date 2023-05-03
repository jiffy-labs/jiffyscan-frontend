import { NETWORK_LIST } from '@/components/common/constants';
import { useConfig } from '@/context/config';
import { checkIfValidTerm, constructRedirectUrl } from '@/components/common/utils';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Options from './Options';
import { LinearProgress, Snackbar } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (toast: any, message: string) => {
    toast.error(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored"
    })
}

function Searchblock({ isNavbar }: { isNavbar: boolean }) {
    const { push } = useRouter();
    const [searching, setSearching] = useState(false);
    const [term, setTerm] = useState('');

    const handleChange = (e: any) => setTerm(e.target.value.trim());

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (checkIfValidTerm(term)) {
            setSearching(true);
            const res = await fetch(`https://api.jiffyscan.xyz/v0/searchEntry?entry=${term}`);
            if (res.status === 200) {
                const data = await res.json();
                let redirectUrl;
                if (data.foundInNetwork && data.type && data.term)
                    redirectUrl = constructRedirectUrl(data.type, data.foundInNetwork, data.term);
                if (redirectUrl) {
                    push(redirectUrl);
                } else {
                    showToast(toast, "No results found")
                }
                setSearching(false);
            } else {
                showToast(toast, "Invalid search term ?")
                setSearching(false);
            }
        } else {
            showToast(toast, "Invalid search term ?")
        }
    };

    if (isNavbar) {
        return (
            <div className="shadow-300 bg-white rounded border-dark-200 flex-grow max-w-[400px]">
                <label className="flex justify-center">
                    <span onClick={handleSubmit} className="p-2.5 border-r border-dark-200" role="button">
                        <img src="/images/search.svg" alt="" />
                    </span>
                    <div className="flex items-center gap-2.5 pr-3 flex-grow">
                        <input
                            type="text"
                            className="text-base placeholder:text-dark-500 text-dark-600 px-3 py-2 flex-grow"
                            placeholder="Search..."
                            value={term}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                        />
                        <span className="bg-dark-400 px-3 h-5 flex justify-center items-center rounded-full">
                            <img className="" src="/images/span (1).svg" alt="" />
                        </span>
                    </div>
                </label>
                {searching && <LinearProgress />}
                <ToastContainer />
            </div>
        );
    } else {
        return (
            <div className="shadow-300 bg-white rounded border-dark-200 flex-grow max-w-[812px]">
                <label className="flex justify-center">
                    {/* <Options networkValue={networkValue} setNetworkValue={setNetworkValue} /> */}
                    <div className="flex items-center gap-2.5 pr-4 flex-grow">
                        <input
                            type="text"
                            className="text-base placeholder:text-dark-500 text-dark-600 px-4 py-2 flex-grow truncate min-w-0 max-w-none w-[0px]"
                            placeholder="Search by block number, address, hash, or userOp hash..."
                            value={term}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                        />
                        <span className="bg-dark-400 px-3 h-5 justify-center items-center rounded-full md:flex hidden">
                            <img className="" src="/images/span (1).svg" alt="" />
                        </span>
                    </div>
                    <div
                        role="button"
                        className="flex items-center gap-2 py-3.5 px-5 bg-dark-600 rounded-r text-white font-medium text-md tracking-[1.25px] uppercase"
                        onClick={handleSubmit}
                    >
                        <img src="/images/icon-container (25).svg" alt="" />
                        <span className="md:block hidden">Search</span>
                    </div>
                </label>
                {searching && <LinearProgress />}
                <ToastContainer />
            </div>
        );
    }
}

export default Searchblock;
