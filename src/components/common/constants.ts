export const NETWORK_LIST = [
    {
        name: 'Mainnet',
        key: 'mainnet',
        iconPath: '/images/ethereum-logo-rainbow.svg',
        iconPathInverted: '/images/ethereum-logo-rainbow.svg',
    },
    {
        name: 'Matic',
        key: 'matic',
        iconPath: '/images/icon-container (5).svg',
        iconPathInverted: '/images/icon-container (5).svg',
    },
    {
        name: 'Optimism Goerli',
        key: 'optimism-goerli',
        iconPath: '/images/icon-container (6).svg',
        iconPathInverted: '/images/icon-container (6).svg',
    },
];

export const MORE_NETWORK_LIST = [
    {
        name: 'Arbitrum',
        key: 'arbitrum',
        iconPath: '/images/icon-container (6).svg',
        iconPathInverted: '/images/icon-container (6).svg',
    },
    {
        name: 'zkSync',
        key: 'zksync',
        iconPath: '/images/ethereum-logo-rainbow.svg',
        iconPathInverted: '/images/icon-container45.svg',
    },
];

interface NETWORK_ICON_MAP {
    [key: string]: string;
}

export const NETWORK_ICON_MAP: NETWORK_ICON_MAP = {
    mainnet: '/images/ethereum-logo-rainbow.svg',
    goerli: '/images/eth-diamond-purple.svg',
    matic: '/images/icon-container (5).svg',
    'optimism-goerli': '/images/icon-container (6).svg',
};
