export const NETWORK_LIST = [
    {
        name: 'Mainnet',
        key: 'mainnet',
        iconPath: '/images/ethereum-logo-rainbow.svg',
        iconPathInverted: '/images/ethereum-logo-rainbow.svg',
    },
    {
        name: 'Goerli',
        key: 'goerli',
        iconPath: '/images/eth-diamond-purple.svg',
        iconPathInverted: '/images/eth-diamond-purple.svg',
    },
    {
        name: 'Arbitrum One',
        key: 'arbitrum-one',
        iconPath: '/images/arbitrum-logo.svg',
        iconPathInverted: '/images/arbitrum-logo.svg',
    },
    {
        name: 'Avalanche',
        key: 'avalanche',
        iconPath: '/images/avalanche-logo-red.svg',
        iconPathInverted: '/images/avalanche-logo-red.svg',
    },
    {
        name: 'Optimism Goerli',
        key: 'optimism-goerli',
        iconPath: '/images/icon-container (6).svg',
        iconPathInverted: '/images/icon-container (6).svg',
    },
    {
        name: 'Arbitrum Goerli',
        key: 'arbitrum-goerli',
        iconPath: '/images/arbitrum-logo.svg',
        iconPathInverted: '/images/arbitrum-logo.svg',
    },
    {
        name: 'Optimism',
        key: 'optimism',
        iconPath: '/images/icon-container (6).svg',
        iconPathInverted: '/images/icon-container (6).svg',
    },
    {
        name: 'Sepolia',
        key: 'sepolia',
        iconPath: '/images/eth-diamond-purple.svg',
        iconPathInverted: '/images/eth-diamond-purple.svg',
    },
    {
        name: 'Polygon',
        key: 'matic',
        iconPath: '/images/polygon-icon.svg',
        iconPathInverted: '/images/polygon-icon.svg',
    },
    {
        name: 'Mumbai',
        key: 'mumbai',
        iconPath: '/images/polygon-mumbai-icon.svg',
        iconPathInverted: '/images/polygon-mumbai-inverted.svg',
    },
    {
        name: 'Avalanche Fuji',
        key: 'avalanche-fuji',
        iconPath: '/images/avalanche-logo-red.svg',
        iconPathInverted: '/images/avalanche-logo-red.svg',
    },
];

interface NETWORK_ICON_MAP {
    [key: string]: string;
}

export const NETWORK_ICON_MAP: NETWORK_ICON_MAP = {
    mainnet: '/images/ethereum-logo-rainbow.svg',
    goerli: '/images/eth-diamond-purple.svg',
    sepolia: '/images/eth-diamond-purple.svg',
    matic: '/images/polygon-icon.svg',
    mumbai: '/images/polygon-mumbai-icon.svg',
    'optimism-goerli': '/images/icon-container (6).svg',
    optimism: '/images/icon-container (6).svg',
    'arbitrum-one': '/images/arbitrum-logo.svg',
    'arbitrum-goerli': '/images/arbitrum-logo.svg',
    'avalanche': '/images/avalanche-logo-red.svg',
    'avalanche-fuji': '/images/avalanche-logo-red.svg',
};

export const NETWORK_SCANNER_MAP: { [key: string]: string } = {
    mainnet: 'https://etherscan.io',
    goerli: 'https://goerli.etherscan.io',
    sepolia: 'https://sepolia.etherscan.io',
    mumbai: 'https://mumbai.polygonscan.com',
    matic: 'https://polygonscan.com/tx',
    'optimism-goerli': 'https://goerli-optimism.etherscan.io',
    'arbitrum-one': 'https://arbiscan.io',
    'arbitrum-goerli': 'https://goerli.arbiscan.io',
    optimism: 'https://optimistic.etherscan.io',
    avalanche: 'https://snowtrace.io',
    "avalanche-fuji": 'https://testnet.snowtrace.io'
};

export const fallBack = 'fallback';
