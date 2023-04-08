import moment from 'moment';
import { NETWORK_ICON_MAP } from './constants';

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
    else return 'ETH';
}

export const getFee = (amount: number, network: string) => {
    let fee: string = amount?.toString();
    let symbol: string = getSymbol(network);
    if (amount > 10 ** 13) {
        fee = (amount / 10 ** 18).toFixed(4).toString();
    } else if (amount > 10 ** 6) {
        fee = (amount / 10 ** 9).toFixed(4).toString();
        symbol = 'GWEI';
    } else {
        fee = amount?.toString() ? amount?.toString() : '0';
        symbol = 'WEI';
    }
    return fee + ' ' + symbol;
};

export const getCurrencySymbol = (amount: number, network: string): string => {
    let gasFee: number = amount;
    if (gasFee > 10 ** 13) {
        return getSymbol(network);
    } else if (gasFee > 10 ** 9) {
        return 'GWEI';
    } else {
        return 'WEI';
    }
};
export const shortenString = (str: string) => {
    if (str?.length <= 10) {
        return str;
    }
    const firstChars = str?.slice(0, 6);
    const lastChars = str?.slice(-4);

    return `${firstChars}...${lastChars}`;
};

const getNetworkFromUrl = () => {
    // console.log('what is window?' , window.location)
    var url_string = window.location.href; 
    var url = new URL(url_string);
    var network = url.searchParams.get("network");
    // console.log('network ', network);
    return network;
}

const getLocallyStoredNetwork = () => {
    const storedNetwork = localStorage.getItem('network');
    return storedNetwork ? storedNetwork : '';
}

export const getNetworkParam = () => {
    // console.log('query', query);
    // console.log(JSON.stringify(query));
    let network = getNetworkFromUrl();

    if (!network) {
        network = getLocallyStoredNetwork();
    }

    if (!(network in NETWORK_ICON_MAP)) {
        network = 'mainnet';
    }

    return network;
};
