import LinkAndCopy from '@/components/common/LinkAndCopy';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import { getFee, shortenString } from '@/components/common/utils';
import { Divider } from '@mui/material';
import React from 'react';

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

// TODO: Implement serverless function to fetch token metadata via RPC call
// This function will be called when metadata (decimals, symbol, name) is missing
// but we have the token address and network
async function fetchTokenMetadata(tokenAddress: string, network: string): Promise<{
    decimals: number | null;
    symbol: string | null;
    name: string | null;
}> {
    // Placeholder for future implementation
    // Will make RPC call to blockchain to get token metadata
    // Example: Call ERC20 contract methods: decimals(), symbol(), name()
    console.log(`TODO: Fetch metadata for token ${tokenAddress} on network ${network}`);
    return {
        decimals: null,
        symbol: null,
        name: null
    };
}

function ERC20Transfers({ key, address, symbol, from, to, value, decimals, name, sender, selectedNetwork }: ERC20Transfer) {

    // Case 1: All metadata is present (decimals, symbol, name)
    const hasAllMetadata = decimals !== null && symbol && name;

    // Case 2: Missing metadata but have address and network to make RPC call
    const canFetchMetadata = !hasAllMetadata && address && selectedNetwork;

    // Trigger RPC call if we need to fetch metadata
    React.useEffect(() => {
        if (canFetchMetadata) {
            fetchTokenMetadata(address!, selectedNetwork);
        }
    }, [address, selectedNetwork, canFetchMetadata]);

    // Render the amount/value section
    const renderAmount = () => {
        // Case 1: All metadata is present - show formatted amount
        if (hasAllMetadata && value) {
            return (
                <div className="">
                    Amount:&nbsp;
                    {getValue(value, decimals)}{' '}
                    {symbol}{' '}
                    ({<LinkAndCopy link={NETWORK_SCANNER_MAP[selectedNetwork] + "/address/" + address} text={name} copyText={null} />})
                </div>
            );
        }

        // Case 2: Have from, to, value, address, selectedNetwork but missing metadata - show raw value
        if (from && to && value && address && selectedNetwork) {
            return (
                <div className="">
                    Value: {value}
                    {address ? <> ({<LinkAndCopy link={NETWORK_SCANNER_MAP[selectedNetwork] + "/address/" + address} text="Token" copyText={null} />})</> : ''}
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
