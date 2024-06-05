export const NETWORK_LIST = [
    {
        name: 'Polygon',
        key: 'matic',
        iconPath: '/images/polygon-icon.svg',
        iconPathInverted: '/images/polygon-icon.svg',
    },
    {
        name: 'Optimism',
        key: 'optimism',
        iconPath: '/images/icon-container (6).svg',
        iconPathInverted: '/images/icon-container (6).svg',
    },
    {
        name: 'Mainnet',
        key: 'mainnet',
        iconPath: '/images/ethereum-logo-rainbow.svg',
        iconPathInverted: '/images/ethereum-logo-rainbow.svg',
    },
    {
        name: 'Base',
        key: 'base',
        iconPath: '/images/base-logo.svg',
        iconPathInverted: '/images/base-logo.svg',
    },
    {
        name: 'Vanar Testnet',
        key: 'vanar-testnet',
        iconPath: '/images/vanarlogo.svg',
        iconPathInverted: '/images/vanarlogo.svg',
    },
    {
        name: 'Cyber Mainnet',
        key: 'cyber-mainnet',
        iconPath: '/images/cyber-logo.svg',
        iconPathInverted: '/images/cyber-logo.svg',
    },
    {
        name: 'Fuse',
        key: 'fuse',
        iconPath: '/images/fuse-logo.svg',
        iconPathInverted: '/images/fuse-logo.svg',
    },
    {
        name: 'Base',
        key: 'base',
        iconPath: '/images/base-logo.svg',
        iconPathInverted: '/images/base-logo.svg',
    },
    {
        name: 'Base Sepolia',
        key: 'base-sepolia',
        iconPath: '/images/base-logo.svg',
        iconPathInverted: '/images/base-logo.svg',
    },
    {
        name: 'Optimism Sepolia',
        key: 'optimism-sepolia',
        iconPath: '/images/icon-container (6).svg',
        iconPathInverted: '/images/icon-container (6).svg',
    },
    {
        name: 'Arbitrum One',
        key: 'arbitrum-one',
        iconPath: '/images/arbitrum-logo.svg',
        iconPathInverted: '/images/arbitrum-logo.svg',
    },
    // {
    //     name: 'Goerli',
    //     key: 'goerli',
    //     iconPath: '/images/eth-diamond-purple.svg',
    //     iconPathInverted: '/images/eth-diamond-purple.svg',
    // },
    {
        name: 'Avalanche',
        key: 'avalanche',
        iconPath: '/images/avalanche-logo-red.svg',
        iconPathInverted: '/images/avalanche-logo-red.svg',
    },
    // {
    //     name: 'Mumbai',
    //     key: 'mumbai',
    //     iconPath: '/images/polygon-mumbai-icon.svg',
    //     iconPathInverted: '/images/polygon-mumbai-inverted.svg',
    // },
    {
        name: 'Polygon Amoy',
        key: 'polygon-amoy',
        iconPath: '/images/polygon-mumbai-icon.svg',
        iconPathInverted: '/images/polygon-mumbai-inverted.svg',
    },
    // {
    //     name: 'Arbitrum Goerli',
    //     key: 'arbitrum-goerli',
    //     iconPath: '/images/arbitrum-logo.svg',
    //     iconPathInverted: '/images/arbitrum-logo.svg',
    // },
    {
        name: 'Arbitrum Sepolia',
        key: 'arbitrum-sepolia',
        iconPath: '/images/arbitrum-logo.svg',
        iconPathInverted: '/images/arbitrum-logo.svg',
    },
    {
        name: 'Sepolia',
        key: 'sepolia',
        iconPath: '/images/eth-diamond-purple.svg',
        iconPathInverted: '/images/eth-diamond-purple.svg',
    },
    {
        name: 'Avalanche Fuji',
        key: 'avalanche-fuji',
        iconPath: '/images/avalanche-logo-red.svg',
        iconPathInverted: '/images/avalanche-logo-red.svg',
    },
    {
        name: 'Fantom',
        key: 'fantom',
        iconPath: '/images/fantom-logo.svg',
        iconPathInverted: '/images/fantom-logo.svg',
    },
    {
        name: 'Fantom Testnet',
        key: 'fantom-testnet',
        iconPath: '/images/fantom-logo.svg',
        iconPathInverted: '/images/fantom-logo.svg',
    },
    {
        name: 'Gnosis',
        key: 'gnosis',
        iconPath: '/images/gnosis-logo.svg',
        iconPathInverted: '/images/gnosis-logo.svg',
    },
    // {
    //     name: 'Base Testnet',
    //     key: 'base-testnet',
    //     iconPath: '/images/base-logo.svg',
    //     iconPathInverted: '/images/base-logo.svg',
    // },
    {
        name: 'Binance Smart Chain',
        key: 'bsc',
        iconPath: '/images/bsc-logo.svg',
        iconPathInverted: '/images/bsc-logo.svg',
    },
    {
        name: 'BNB Testnet',
        key: 'bnb-testnet',
        iconPath: '/images/bsc-logo.svg',
        iconPathInverted: '/images/bsc-logo.svg',
    },

    // {
    //     name: 'Celo Alfajores',
    //     key: 'celo-alfajores',
    //     iconPath: '/images/Celo_logo_black.svg',
    //     iconPathInverted: '/images/celo_logo.svg',
    // },
];

export const NETWORKS_WHITELISTED_FOR_NO_LOGIN = ['mainnet', 'goerli', 'sepolia', 'optimism-goerli', 'optimism', 'fuse'];

export const PAGE_SIZE_LIST: number[] = [10, 25, 50, 100];

interface NETWORK_ICON_MAP {
    [key: string]: string;
}

export const NETWORK_ICON_MAP: NETWORK_ICON_MAP = {
    mainnet: '/images/ethereum-logo-rainbow.svg',
    // goerli: '/images/eth-diamond-purple.svg',
    sepolia: '/images/eth-diamond-purple.svg',
    matic: '/images/polygon-icon.svg',
    // mumbai: '/images/polygon-mumbai-icon.svg',
    'optimism-sepolia': '/images/icon-container (6).svg',
    optimism: '/images/icon-container (6).svg',
    'arbitrum-one': '/images/arbitrum-logo.svg',
    // 'arbitrum-goerli': '/images/arbitrum-logo.svg',
    'arbitrum-sepolia': '/images/arbitrum-logo.svg',
    avalanche: '/images/avalanche-logo-red.svg',
    'avalanche-fuji': '/images/avalanche-logo-red.svg',
    fantom: '/images/fantom-logo.svg',
    'fantom-testnet': '/images/fantom-logo.svg',
    // 'base-testnet': '/images/base-logo.svg',
    base: '/images/base-logo.svg',
    'base-sepolia': '/images/base-logo.svg',
    gnosis: '/images/gnosis-logo.svg',
    bsc: '/images/bsc-logo.svg',
    'bnb-testnet': '/images/bsc-logo.svg',
    fuse: '/images/fuse-logo.svg',
    // 'celo-alfajores': '/images/Celo_logo_black.svg',
    // degen: '/images/degen-logo.png',
    'polygon-amoy': '/images/polygon-mumbai-icon.svg',
    'cyber-mainnet': '/images/cyber-logo.svg',
    'vanar-testnet': '/images/vanarlogo.svg',
    testnet: '/images/vanar-testnet',
};

export const ANKR_API_NETWORKS:{ [key: string]: string } = {

    mainnet: 'eth',

    sepolia: 'eth_sepolia',

    matic: 'polygon',
    'optimism-sepolia': 'optimism_sepolia',
    'arbitrum-one': 'arbitrum',
   
    'arbitrum-sepolia': 'arbitrum_sepolia',
    optimism: 'optimism',
    avalanche: 'avalanche',
   
    'base-sepolia': 'base_sepolia',
    fantom: 'fantom',
    'fantom-testnet': 'fantom_testnet',
    gnosis: 'gnosis',
    bsc: 'bsc',
    'bnb-testnet': 'bsc_testnet_chapel',
    'avalanche-fuji': 'avalanche_fuji',
    fuse: 'fuse',
    base: 'base',
   

    'polygon-amoy': 'polygon_amoy',
    'cyber-mainnet': 'cyber-mainnet',
    'vanar-testnet': 'vanar-testnet'

}
export const NETWORK_SCANNER_MAP: { [key: string]: string } = {
    mainnet: 'https://etherscan.io',
    goerli: 'https://goerli.etherscan.io',
    sepolia: 'https://sepolia.etherscan.io',
    // mumbai: 'https://mumbai.polygonscan.com',
    matic: 'https://polygonscan.com',
    'optimism-sepolia': 'https://sepolia-optimism.etherscan.io/',
    'arbitrum-one': 'https://arbiscan.io',
    // 'arbitrum-goerli': 'https://goerli.arbiscan.io',
    'arbitrum-sepolia': 'https://sepolia.arbiscan.io',
    optimism: 'https://optimistic.etherscan.io',
    avalanche: 'https://snowtrace.io',
    // 'base-testnet': 'https://goerli.basescan.org',
    'base-sepolia': 'https://sepolia.basescan.org',
    fantom: 'https://ftmscan.com/',
    'fantom-testnet': 'https://testnet.ftmscan.com',
    gnosis: 'https://gnosisscan.io',
    bsc: 'https://bscscan.com',
    'bnb-testnet': 'https://testnet.bscscan.com',
    'avalanche-fuji': 'https://testnet.snowtrace.io',
    fuse: 'https://explorer.fuse.io',
    base: 'https://basescan.org',
    // 'celo-alfajores': 'https://alfajores.celoscan.io',
    degen: 'https://explorer.degen.tips',
    'polygon-amoy': 'https://www.oklink.com/amoy',
    'cyber-mainnet': 'https://cyber-explorer.alt.technology',
    'vanar-testnet': 'https://explorer-vanguard.vanarchain.com',
    testnet: 'https://explorer-vanguard.vanarchain.com',
};

export const ENTRY_POINT_ADDRESS_MAP: { [key: string]: string } = {
    V5: '0x0576a174D229E3cFA37253523E645A78A0C91B57',
    V6: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    V7: '0x0000000071727de22e5e9d8baf0edac6f37da032',
};
export const POWERED_BY_LOGO_MAP: { [id: string]: { [id: string]: string } } = {
    pimlico: {
        small: '/images/pimlico.svg',
        wide: '',
    },
    biconomy: {
        small: '/images/Biconomy-small.svg',
        wide: '/images/Biconomy-wide.svg',
    },
    candide: {
        small: '/images/candide.svg',
        wide: '/images/candide.svg',
    },
    ambire: {
        small: '/images/ambire-logo.svg',
        wide: '/images/ambire-logo.svg',
    },
};

export const fallBack = 'fallback';
