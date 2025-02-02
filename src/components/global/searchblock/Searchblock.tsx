import { NETWORK_LIST } from '@/components/common/constants';
import { useConfig } from '@/context/config';
import { checkIfValidTerm, constructRedirectUrl } from '@/components/common/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Options from './Options';
import { LinearProgress, Snackbar } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function Searchblock({ isNavbar }: { isNavbar: boolean }) {
    const { push } = useRouter();
    const [searching, setSearching] = useState(false);
    const [term, setTerm] = useState('');
    const [animateState, setAnimateState] = useState(false);
    const [networkValue, setNetworkValue] = useState<number>(-1);
    const searchRef: any = useRef(null);

    const handleChange = (e: any) => setTerm(e.target.value.trim());

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const keyDownHandler = (event: KeyboardEvent) => {
        if (event.metaKey && event.key === 'k') {
            event.preventDefault();
            if (searchRef.current) searchRef.current.focus();
            // animate for 1 second
            setAnimateState(true);

            setTimeout(() => {
                setAnimateState(false);
            }, 500);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    });

    const handleSubmit = async () => {
        if (checkIfValidTerm(term)) {
            setSearching(true);
            const res = await fetch(`https://api.jiffyscan.xyz/v0/searchEntry?entry=${term.toLocaleLowerCase()}${networkValue != -1 ? `&network=${NETWORK_LIST[networkValue].key}` : ""}`);
            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                
                let redirectUrl;
                if (data.foundInNetwork && data.type && data.term) {
                    // If the type is 'bundle', change it to 'tx'
                    const type = data.type === 'bundle' ? 'tx' : data.type;
                    redirectUrl = constructRedirectUrl(type, data.foundInNetwork, data.term);
                }
    
                if (redirectUrl) {
                    push(redirectUrl);
                } else {
                    showToast(toast, 'No results found');
                }
                setSearching(false);
            } else {
                showToast(toast, 'Invalid search term ?');
                setSearching(false);
            }
        } else {
            showToast(toast, 'Invalid search term ?');
        }
    };
    

    if (isNavbar) {
        return (
            <div
                className={`shadow-300 bg-white rounded border-dark-200 flex-grow max-w-[400px] ${
                    animateState ? `focus-within:translate-y-2 focus-within:-translate-x-2   focus-within:scale-125` : ''
                } duration-150`}
                //     className={`shadow-300 bg-white rounded border-dark-200 flex-grow max-w-[400px]
                //     focus-within:translate-y-2 focus-within:-translate-x-2   focus-within:scale-125
                // duration-150`}
            >
                <label className="flex justify-center">
                    
                    <div className="flex items-center gap-0 pr-3 flex-grow focus-within:shadow-xl">
                    <Options networkValue={networkValue} setNetworkValue={setNetworkValue} />
                        <input
                            type="text"
                            className="flex-grow px-3 py-2 text-base placeholder:text-dark-500 text-dark-600 border-none"
                            placeholder="Search..."
                            value={term}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            ref={searchRef}
                        />
                        <span className="flex items-center justify-center h-5 px-3 mr-[0.5rem] rounded-full bg-dark-400">
                            <img className="" src="/images/span (1).svg" alt="" />
                        </span>
                        <span onClick={handleSubmit} className="p-2.5 border-l border-dark-200 " role="button">
                        <img src="/images/search.svg" alt="" />
                    </span>
                    </div>

                </label>
                {searching && <LinearProgress />}
                <ToastContainer />
            </div>
        );
    } else {
        return (
            <div
                className={`shadow-300 bg-white rounded border-dark-200 flex-grow max-w-[812px] 
                     duration-120
                    ${animateState ? `focus-within:translate-y-2 focus-within:-translate-x-2   focus-within:scale-125` : ''} duration-150`}
            >
                <label className="flex justify-center">
                    <Options networkValue={networkValue} setNetworkValue={setNetworkValue} />
                    <div className="flex items-center gap-2.5 pr-4 flex-grow focus-within:shadow-xl ">
                        <input
                            type="text"
                            className="text-base placeholder:text-dark-500  text-dark-600 px-4 py-2 flex-grow truncate min-w-0 max-w-none w-[0px] border-none"
                            placeholder="Search by block number, address, hash, or userOp hash..."
                            value={term}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            ref={searchRef}
                        />
                        <span className="items-center justify-center hidden h-5 px-3 rounded-full bg-dark-400 md:flex">
                            <img className="" src="/images/span (1).svg" alt="" />
                        </span>
                    </div>
                    <div
                        role="button"
                        className="flex items-center gap-2 py-3.5 px-5  bg-dark-600 rounded-r text-white font-medium text-md tracking-[1.25px] uppercase"
                        onClick={handleSubmit}
                    >
                        <img src="/images/icon-container (25).svg" alt="" />
                        <span className="hidden md:block">Search</span>
                    </div>
                </label>
                {searching && <LinearProgress />}
                <ToastContainer />
            </div>
        );
    }
}

export default Searchblock;
