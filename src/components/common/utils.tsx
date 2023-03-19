import moment from "moment";

export const getTimePassed = (timestamp: number): string => {
  let timePassedInEpoch = new Date().getTime() - timestamp * 1000;
  let timePassedMoment = moment.duration(timePassedInEpoch);
  return timePassedMoment.humanize().replace('minutes', 'min') + ' ago';
}

export const getDate = (daySinceEpoch: number): string => {
    const epochTime = daySinceEpoch * 24 * 60 * 60 * 1000;
    const date = new Date(epochTime);
    return date.toLocaleDateString()
}

export function getSymbol(network: string): string { 
    if (network == "goerli") return "ETH"
    else if (network == "mainnet") return "ETH"
    else if (network == "mumbai") return "MATIC"
    else if (network == "optimism-goerli") return "ETH"
    else if (network == "matic") return "MATIC"
    else return "ETH";
}

export const getCurrencySymbol = (amount: number, network: string): string => {
    let gasFee:number = amount
    if (gasFee > 10**13) {
        return getSymbol(network)
    } else if (gasFee > 10**9) {
        return  "GWEI";
    } else {
        return "WEI";
    }
}