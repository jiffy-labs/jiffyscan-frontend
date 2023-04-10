import { NETWORK_LIST } from '@/components/common/constants';
import { useConfig } from '@/context/config';
import { checkIfValidTerm, constructRedirectUrl } from '@/components/common/utils';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Options from './Options';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Searchblock() {
    const { push } = useRouter();
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [term, setTerm] = useState('');
    const [networkValue, setNetworkValue] = useState<number>(0);

    const handleChange = (e: any) => setTerm(e.target.value.trim());

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (checkIfValidTerm(term)) {
            const res = await fetch(`https://api.jiffyscan.xyz/v0/searchEntry?entry=${term}&network=${NETWORK_LIST[networkValue].key}`);
            if (res.status === 200) {
                const data = await res.json();
                let redirectUrl;
                if (data.foundInNetwork && data.type && data.term)
                    redirectUrl = constructRedirectUrl(data.type, data.foundInNetwork, data.term);
                if (redirectUrl) {
                    push(redirectUrl);
                } else {
                    setOpen(true);
                    setErrorMessage('No results found');
                }
            } else {
                setOpen(true);
                setErrorMessage('Invalid search term or network ?');
            }
        } else {
            setOpen(true);
            setErrorMessage('Invalid search term or network ?');
        }
    };

    const handleClose = (e: any) => {
        setOpen(false);
    }

    return (
        <div className="shadow-300 bg-white rounded border-dark-200 flex-grow max-w-[812px]">
            <label className="flex justify-center">
                <Options networkValue={networkValue} setNetworkValue={setNetworkValue} />
                <div className="flex items-center gap-2.5 pr-4 flex-grow">
                    <input
                        type="text"
                        className="text-base placeholder:text-dark-500 text-dark-600 px-4 py-2 flex-grow truncate min-w-0 max-w-none w-[0px]"
                        placeholder="Search by block number, address, hash, or userOp hash..."
                        value={term}
                        onChange={handleChange}
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Searchblock;
