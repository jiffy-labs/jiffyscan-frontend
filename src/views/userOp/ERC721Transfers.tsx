import LinkAndCopy from '@/components/common/LinkAndCopy';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import { getFee, shortenString } from '@/components/common/utils';
import { Divider } from '@mui/material';
import React from 'react';

export interface ERC721Transfer {
    key: number;
    address: string | null;
    from: string;
    to: string;
    tokenId: string;
    symbol: string;
    decimals: number | null;
    name: string | null;
    sender: string;
    selectedNetwork: string;
}

// TODO: Implement serverless function to fetch NFT metadata via RPC call
// This function will be called when metadata (symbol, name) is missing
// but we have the token address and network
async function fetchNFTMetadata(tokenAddress: string, network: string): Promise<{
    symbol: string | null;
    name: string | null;
}> {
    // Placeholder for future implementation
    // Will make RPC call to blockchain to get NFT metadata
    // Example: Call ERC721 contract methods: symbol(), name()
    console.log(`TODO: Fetch NFT metadata for token ${tokenAddress} on network ${network}`);
    return {
        symbol: null,
        name: null
    };
}

function ERC721Transfers({ key, address, symbol, from, to, tokenId, decimals, name, sender, selectedNetwork }: ERC721Transfer) {

    // Case 1: All metadata is present (symbol, name)
    const hasAllMetadata = symbol && name;

    // Case 2: Missing metadata but have address and network to make RPC call
    const canFetchMetadata = !hasAllMetadata && address && selectedNetwork;

    // Trigger RPC call if we need to fetch metadata
    React.useEffect(() => {
        if (canFetchMetadata) {
            fetchNFTMetadata(address!, selectedNetwork);
        }
    }, [address, selectedNetwork, canFetchMetadata]);

    // Render the tokenId/value section
    const renderTokenInfo = () => {
        // Case 1: All metadata is present - show full info
        if (hasAllMetadata && tokenId) {
            return (
                <div>
                    TokenId:&nbsp;
                    <LinkAndCopy
                        text={tokenId}
                        link={NETWORK_SCANNER_MAP[selectedNetwork] + '/token/' + address + '?a=' + parseInt(tokenId)}
                        copyText={null}
                    />{' '}
                    {symbol} (
                    {<LinkAndCopy text={name} link={NETWORK_SCANNER_MAP[selectedNetwork] + '/token/' + address} copyText={null} />})
                </div>
            );
        }

        // Case 2: Have from, to, tokenId, address, selectedNetwork but missing metadata - show tokenId
        if (from && to && tokenId && address && selectedNetwork) {
            return (
                <div>
                    TokenId: {tokenId}
                    {address ? <> ({<LinkAndCopy link={NETWORK_SCANNER_MAP[selectedNetwork] + "/token/" + address} text="NFT" copyText={null} />})</> : ''}
                </div>
            );
        }

        // Case 3: Missing essential data - show "Value: unavailable"
        return (
            <div>
                Value: unavailable
            </div>
        );
    };

    return (
        <div key={key} className="items-center flow-root md:flex">
            <div className="">
                From: <LinkAndCopy link={'/account/' + from} text={shortenString(from)} copyText={from} />
            </div>
            <div className="">
                To: <LinkAndCopy link={'/account/' + to} text={shortenString(to)} copyText={to} />{' '}
            </div>
            {renderTokenInfo()}
            <Divider className="mt-2 mr-4 md:hidden " />
        </div>
    );
}

export default ERC721Transfers;
