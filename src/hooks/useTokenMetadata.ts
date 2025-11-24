import React from 'react';
import { ethers } from 'ethers';
import { NETWORK_RPC_MAP } from '@/components/common/constants';

// ERC20 ABI for metadata functions
const ERC20_ABI = [
    'function decimals() view returns (uint8)',
    'function symbol() view returns (string)',
    'function name() view returns (string)'
];

// ERC721 ABI for metadata functions
const ERC721_ABI = [
    'function symbol() view returns (string)',
    'function name() view returns (string)'
];

/**
 * Fetch ERC20 token metadata via RPC call
 */
async function fetchERC20Metadata(tokenAddress: string, network: string) {
    try {
        const rpcUrl = NETWORK_RPC_MAP[network];
        if (!rpcUrl) {
            return { decimals: null, symbol: null, name: null, error: true };
        }

        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

        const [decimals, symbol, name] = await Promise.all([
            contract.decimals().catch(() => null),
            contract.symbol().catch(() => null),
            contract.name().catch(() => null)
        ]);

        return {
            decimals: decimals !== null ? Number(decimals) : null,
            symbol: symbol || null,
            name: name || null,
            error: false
        };
    } catch (error) {
        console.error(`Failed to fetch ERC20 metadata for ${tokenAddress}:`, error);
        return { decimals: null, symbol: null, name: null, error: true };
    }
}

/**
 * Fetch ERC721 NFT metadata via RPC call
 */
async function fetchERC721Metadata(tokenAddress: string, network: string) {
    try {
        const rpcUrl = NETWORK_RPC_MAP[network];
        if (!rpcUrl) {
            return { symbol: null, name: null, error: true };
        }

        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const contract = new ethers.Contract(tokenAddress, ERC721_ABI, provider);

        const [symbol, name] = await Promise.all([
            contract.symbol().catch(() => null),
            contract.name().catch(() => null)
        ]);

        return {
            symbol: symbol || null,
            name: name || null,
            error: false
        };
    } catch (error) {
        console.error(`Failed to fetch ERC721 metadata for ${tokenAddress}:`, error);
        return { symbol: null, name: null, error: true };
    }
}

/**
 * Hook to fetch ERC20 token metadata when missing (only for monad-testnet)
 */
export function useERC20Metadata(
    address: string | null,
    network: string,
    decimals: number | null,
    symbol: string,
    name: string | null
) {
    const [fetchedMetadata, setFetchedMetadata] = React.useState<{
        decimals: number | null;
        symbol: string | null;
        name: string | null;
    } | null>(null);
    const [rpcFailed, setRpcFailed] = React.useState(false);
    const fetchInitiated = React.useRef(false);

    React.useEffect(() => {
        const propsHaveMetadata = decimals !== null && symbol && name;

        if (!fetchInitiated.current && !propsHaveMetadata && address && network === 'monad-testnet') {
            fetchInitiated.current = true;
            fetchERC20Metadata(address, network).then((result) => {
                if (result.error) {
                    setRpcFailed(true);
                } else {
                    setFetchedMetadata(result);
                }
            });
        }
    }, [address, network, decimals, symbol, name]);

    return {
        decimals: fetchedMetadata?.decimals ?? decimals,
        symbol: fetchedMetadata?.symbol ?? symbol,
        name: fetchedMetadata?.name ?? name,
        rpcFailed
    };
}

/**
 * Hook to fetch ERC721 NFT metadata when missing (only for monad-testnet)
 */
export function useERC721Metadata(
    address: string | null,
    network: string,
    symbol: string,
    name: string | null
) {
    const [fetchedMetadata, setFetchedMetadata] = React.useState<{
        symbol: string | null;
        name: string | null;
    } | null>(null);
    const [rpcFailed, setRpcFailed] = React.useState(false);
    const fetchInitiated = React.useRef(false);

    React.useEffect(() => {
        const propsHaveMetadata = symbol && name;

        if (!fetchInitiated.current && !propsHaveMetadata && address && network === 'monad-testnet') {
            fetchInitiated.current = true;
            fetchERC721Metadata(address, network).then((result) => {
                if (result.error) {
                    setRpcFailed(true);
                } else {
                    setFetchedMetadata(result);
                }
            });
        }
    }, [address, network, symbol, name]);

    return {
        symbol: fetchedMetadata?.symbol ?? symbol,
        name: fetchedMetadata?.name ?? name,
        rpcFailed
    };
}
