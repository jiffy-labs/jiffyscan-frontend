import moment from 'moment';
import { NETWORK_ICON_MAP } from './constants';
import { fee } from './table/Table';

export const getTimePassed = (timestamp: number): string => {
    let timePassedInEpoch = new Date().getTime() - timestamp * 1000;
    let timePassedMoment = moment.duration(timePassedInEpoch);
    return timePassedMoment.humanize().replace('minutes', 'min') + ' ago';
};

export const getDate = (daySinceEpoch: number): string => {
    const epochTime = daySinceEpoch * 24 * 60 * 60 * 1000;
    const date = new Date(epochTime);
    return date.toLocaleDateString();
};

export function getSymbol(network: string): string {
    if (network == 'goerli') return 'ETH';
    else if (network == 'mainnet') return 'ETH';
    else if (network == 'mumbai') return 'MATIC';
    else if (network == 'optimism-goerli') return 'ETH';
    else if (network == 'matic') return 'MATIC';
    else if (network == 'fuse') return 'FUSE';
    else return 'ETH';
}

export const getExplorerLogo = (network: string) => {
    if (network == "fuse") return "/images/blockscout_logo.svg";
    else return "/images/graph.svg";
}

export const getFee = (amount: number, network: string): fee => {
    let gasFee: number = amount;
    let fee: fee = {
        value: '0',
        gas: {
            children: getCurrencySymbol(gasFee, network),
            color: 'success',
        },
    };
    if (gasFee > 10 ** 13) {
        fee.value = (gasFee / 10 ** 18).toFixed(4).toString();
    } else if (gasFee > 10 ** 6) {
        fee.value = (gasFee / 10 ** 9).toFixed(4).toString();
    } else {
        fee.value = gasFee?.toString();
    }
    return fee;
};

export const getCurrencySymbol = (amount: number, network: string): string => {
    let gasFee: number = amount;
    if (gasFee > 10 ** 13) {
        return getSymbol(network);
    } else if (gasFee > 10 ** 6) {
        return 'GWEI';
    } else {
        return 'WEI';
    }
};

export const shortenString = (str: string, star = false) => {
    if (str?.length <= 10) {
        return str;
    }
    const firstChars = str?.slice(0, 6);
    const lastChars = str?.slice(-4);

    return `${firstChars}${star ? '**************': '...' }${lastChars}`;
};

const getNetworkFromUrl = () => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var network = url.searchParams.get('network');
    return network;
};

const getLocallyStoredNetwork = () => {
    const storedNetwork = localStorage.getItem('network');
    return storedNetwork ? storedNetwork : '';
};

export const getNetworkParam = () => {
    let network = getNetworkFromUrl();

    if (!network) {
        network = getLocallyStoredNetwork();
    }

    if (!(network in NETWORK_ICON_MAP)) {
        network = 'mainnet';
    }

    return network;
};

export const constructRedirectUrl = (type: string, network: string, term: string) => {
    if (type === 'userOpHash') {
        return `/userOpHash/${term}/?network=${network}`;
    } else if (type === 'account') {
        return `/account/${term}/?network=${network}`;
    } else if (type === 'paymaster') {
        return `/paymaster/${term}/?network=${network}`;
    } else if (type === 'beneficiarie') {
        return `/bundler/${term}/?network=${network}`;
    } else if (type === 'block') {
        return `/block/${term}/?network=${network}`;
    } else if (type === 'bundle') {
        return `/bundle/${term}/?network=${network}`;
    }
};

export const checkIfValidTerm = (term: string) => {
    if (!term) return false;
    if (term.length === 42 && term.slice(0, 2) == '0x') return true;
    if (term.length === 66 && term.slice(0, 2) == '0x') return true;
    if (term.length < 11 && !isNaN(parseInt(term))) return true;
    return false;
};
