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
        name: 'Optimism',
        key: 'optimism',
        iconPath: '/images/icon-container (6).svg',
        iconPathInverted: '/images/icon-container (6).svg',
    },
    {
        name: 'Optimism Goerli',
        key: 'optimism-goerli',
        iconPath: '/images/icon-container (6).svg',
        iconPathInverted: '/images/icon-container (6).svg',
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
        name: 'Arbitrum',
        key: 'arbitrum-one',
        iconPath: '/images/arbitrum-logo.svg',
        iconPathInverted: '/images/arbitrum-logo.svg',
    }
];

interface NETWORK_ICON_MAP {
    [key: string]: string;
}

export const NETWORK_ICON_MAP: NETWORK_ICON_MAP = {
    mainnet: '/images/ethereum-logo-rainbow.svg',
    goerli: '/images/eth-diamond-purple.svg',
    matic: '/images/polygon-icon.svg',
    mumbai: '/images/polygon-mumbai-icon.svg',
    'optimism-goerli': '/images/icon-container (6).svg',
    'optimism': '/images/icon-container (6).svg',
    'arbitrum-one': '/images/arbitrum-logo.svg',
};

export const NETWORK_SCANNER_MAP: { [key: string]: string } = {
    mainnet: 'https://etherscan.io/tx/',
    goerli: 'https://goerli.etherscan.io/tx/',
    mumbai: 'https://mumbai.polygonscan.com/tx/',
    matic: 'https://polygonscan.com/tx/',
    'optimism-goerli': 'https://goerli-optimism.etherscan.io/tx/',
    'arbitrum-one': 'https://arbiscan.io/tx/',
    'optimism': 'https://optimistic.etherscan.io/tx/'
};
