import LinkAndCopy from '@/components/common/LinkAndCopy';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import { shortenString } from '@/components/common/utils';
import { Divider } from '@mui/material';
import React from 'react';
import { useERC20Metadata } from '@/hooks/useTokenMetadata';

export interface ERC20Transfer {
    key: number;
    address: string | null;
    symbol: string;
    from: string;
    to: string;
    value: string;
    decimals: number | null;
    name: string | null;
    sender: string;
    selectedNetwork: string;
}

function getValue(value: string, decimals: number | null) {
    let response: number;
    if (decimals) {
        response = (parseInt(value) / 10 ** decimals);
    } else {
        response = (parseInt(value) / 10 ** 18);
    }

    if (response < 0.000001) {
        return response.toExponential();
    } else {
        return response.toFixed(6);
    }
}

function ERC20Transfers({ key, address, symbol, from, to, value, decimals, name, sender, selectedNetwork }: ERC20Transfer) {
    // Use custom hook to fetch metadata if missing (only for monad-testnet)
    const metadata = useERC20Metadata(address, selectedNetwork, decimals, symbol, name);

    const hasAllMetadata = metadata.decimals !== null && metadata.symbol && metadata.name;

    // Render the amount/value section
    const renderAmount = () => {
        // Case 1: All metadata is present - show formatted amount
        if (hasAllMetadata && value) {
            return (
                <div className="">
                    Amount:&nbsp;
                    {getValue(value, metadata.decimals)}{' '}
                    {metadata.symbol}{' '}
                    ({<LinkAndCopy link={NETWORK_SCANNER_MAP[selectedNetwork] + "/address/" + address} text={metadata.name!} copyText={null} />})
                </div>
            );
        }

        // Case 2: Missing metadata - show unavailable, or raw value if RPC failed
        if (from && to && value && address && selectedNetwork) {
            if (metadata.rpcFailed) {
                // RPC call failed - show raw value as fallback
                return (
                    <div className="">
                        Value: {value}
                        {address ? <> ({<LinkAndCopy link={NETWORK_SCANNER_MAP[selectedNetwork] + "/address/" + address} text="Token" copyText={null} />})</> : ''}
                    </div>
                );
            }
            // RPC call pending or not yet attempted - show unavailable
            return (
                <div className="">
                    Value: unavailable
                </div>
            );
        }

        // Case 3: Missing essential data - show "Value: unavailable"
        return (
            <div className="">
                Value: unavailable
            </div>
        );
    };

    return (
        <div key={key} className="items-center flow-root md:flex ">
            <div className="">From: <LinkAndCopy link={"/account/" + from} text={shortenString(from)} copyText={from} /></div>
            <div className="">To: <LinkAndCopy link={"/account/" + to} text={shortenString(to)} copyText={to} />{' '}</div>
            {renderAmount()}
            <Divider className='mt-2 mr-4 md:hidden ' />
        </div>
    );
}

export default ERC20Transfers;
