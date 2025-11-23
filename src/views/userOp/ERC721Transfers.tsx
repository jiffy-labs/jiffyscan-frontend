import LinkAndCopy from '@/components/common/LinkAndCopy';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import { shortenString } from '@/components/common/utils';
import { Divider } from '@mui/material';
import React from 'react';
import { useERC721Metadata } from '@/hooks/useTokenMetadata';

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

function ERC721Transfers({ key, address, symbol, from, to, tokenId, decimals, name, sender, selectedNetwork }: ERC721Transfer) {
    // Use custom hook to fetch metadata if missing (only for monad-testnet)
    const metadata = useERC721Metadata(address, selectedNetwork, symbol, name);

    const hasAllMetadata = metadata.symbol && metadata.name;

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
                    {metadata.symbol} (
                    {<LinkAndCopy text={metadata.name!} link={NETWORK_SCANNER_MAP[selectedNetwork] + '/token/' + address} copyText={null} />})
                </div>
            );
        }

        // Case 2: Missing metadata - show unavailable, or tokenId if RPC failed
        if (from && to && tokenId && address && selectedNetwork) {
            if (metadata.rpcFailed) {
                // RPC call failed - show tokenId as fallback
                return (
                    <div>
                        TokenId: {tokenId}
                        {address ? <> ({<LinkAndCopy link={NETWORK_SCANNER_MAP[selectedNetwork] + "/token / " + address} text="NFT" copyText={null} />})</> : ''}
                    </div >
                );
            }
            // RPC call pending or not yet attempted - show unavailable
            return (
                <div>
                    Value: unavailable
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
