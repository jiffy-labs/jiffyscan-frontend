import axios from 'axios';
import { fallBack } from '../constants';
import cache from 'memory-cache';
import { BigNumber } from 'ethers';
import { fetchRetry } from '../utils';
import { NETWORK_LIST ,ANKR_API_NETWORKS } from '../constants';
export interface UserOp {
    id: string | null;
    transactionHash: string | null;
    userOpHash: string;
    sender: string;
    accountSender: { factory: string };
    paymaster: string;
    nonce: number;
    actualGasCost: number;
    actualGasPrice: number;
    actualGasUsed: number | null;
    success: Boolean;
    revertReason: string | null;
    blockTime: number | null;
    timeSeenInAltMempool: number | null;
    timeSeenInMainMempool: number | null;
    blockNumber: number | null;
    network: string;
    input: string | null;
    target: string[] | null;
    accountTarget: { factory: string };
    callData: string[] | null;
    preDecodedCallData: string | null;
    beneficiary: string | null;
    factory: string | null;
    value: BigNumber[] | null;
    verificationGasLimit: string | null;
    preVerificationGas: string | null;
    maxFeePerGas: number | null;
    maxPriorityFeePerGas: number | null;
    paymasterAndData: string | null;
    signature: string | null;
    entryPoint: string;
    block: true;
    erc20Transfers: {
        contractAddress: string;
        from: string;
        to: string;
        value: string;
        decimals: string;
        name: string;
        symbol: string;
    };
    erc721Transfers: {
        contractAddress: string;
        from: string;
        to: string;
        tokenId: string;
        decimals: string;
        name: string;
        symbol: string;
    };
}

export interface Trace {
    action: {
        from: string;
        callType: string;
        gas: string;
        input: string;
        to: string;
        value: string;
    };
    blockHash: string;
    blockNumber: number;
    result: {
        gasUsed: string;
        output: string;
    };
    subtraces: number;
    traceAddress: number[];
    transactionHash: string;
    transactionPosition: number;
    type: string;
    semantics: {
        functionName: string;
        params: string[];
        function: string;
        arguments: string[];
    };
}

export interface erc20Transfer {
    from: string;
    to: string;
    value: string;
    invoked: string;
    name: string | null;
    decimals: number | null;
    address: string | null;
}

export interface Transaction {
    tx_hash: string;
    block_height: number;
    block_signed_at: string;
    from_address: string;
    to_address: string;
    value: string;
    successful: boolean;
    gas_price: number;
}

export interface metadata {
    traces: Trace[];
    erc20Transfers: erc20Transfer[];
}

export interface AddressActivity {
    accountDetail: AccountDetail;
    ethBalance: string | null;
    tokenBalances: tokenBalance[] | null;
    erc20Transfers: tokenTransferAlchemy[] | null;
    erc721Transfers: tokenTransferAlchemy[] | null;
}

export interface AccountDetail {
    userOps: UserOp[];
    userOpsCount: string;
    id: string;
    address: string;
    network: string;
    blockTime: string;
    blockNumber: string;
    factory: string;
    paymaster: string;
    userOpHash: string;
    totalDeposits: string;
}

export interface tokenBalance {
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    contract_address: string;
    supports_erc: null;
    logo_url: string;
    last_transferred_at: string;
    native_token: boolean;
    type: string;
    balance: string;
    balance_24h: string;
    quote_rate: number;
    quote_rate_24h: number;
    quote: number;
    pretty_quote: string;
    quote_24h: string;
    pretty_quote_24h: string;
    nft_data: null;
    is_spam: null;
}

// export interface erc20Transfer {
//     to: string
//     from: string
//     asset: string;
//     value: string;
//     rawContract: {
//         address: string
//         value: string
//     }
// }

// export interface erc721Transfer {
//     to: string
//     from: string
//     asset: string;
//     rawContract: {
//         address: string
//         value: string | null;
//     }
//     tokenId: string;
// }

export interface tokenTransferAlchemy {
    to: string;
    from: string;
    asset: string;
    blockNum: string; // hex
    hash: string;
    rawContract: {
        address: string;
        value: string | null;
        decimal: string | null;
    };
    tokenId: string;
    metadata?: {
        blockTimestamp?: string;
    };
}

// export interface erc721Transfer {
//     to: string;
//     from: string;
//     rawContract: {
//         address: string
//         value: string | null;
//     }
//     asset: string;
//     tokenId: string;
// }
export interface NetworkResponse {
    message?: string;
  }

export interface FactoryDetails {
    id: string;
    address: string;
    network: string;
    accountsLength: string;
    accounts: AccountDetail[];
}

export interface Block {
    userOps: UserOp[];
    userOpsLength: number;
    network: string;
    blockNumber: number;
    blockTime: number;
}
export interface PayMasterActivity {
    userOps: UserOp[];
    userOpsLength: number;
    id: number;
    address: string;
    network: string;
    totalDeposits: string;
    gasSponsored: string;
}
export interface Bundle {
    userOpsLength: number;
    address: string;
    transactionHash: string;
    network: string;
    blockNumber: number;
    blockTime: number;
    from: string;
    status: number;
    transactionFee: number;
    userOps: UserOp[];
    success: Boolean | true;
}
export interface DailyMetric {
    userOpsDaily: string;
    bundleDaily: string;
    walletsCreatedDaily: string;
    gasCostCollectedDaily: string;
    userOpsTotal: string;
    bundlesTotal: string;
    walletsCreatedTotal: string;
    gasCostCollectedTotal: string;
    daySinceEpoch: string;
    activeWalletsDaily: string;
    paymasterTotal: string;
    bundlerTotal: string;
    factoryTotal: string;
    activeWallets: string[];
}

export interface Bundler {
    bundleLength: string;
    actualGasCostSum: string;
    address: string;
    transactionFeeSum: string;
    id: string;
    userOpsLength: string;
}
export interface GlobalCounts {
    userOpCounter: number;
    id: number;
    walletsCreated: number;
    bundleCounter: number;
}

export interface PoweredBy {
    paymaster: string;
    factory: string;
    sender: string;
    beneficiary: string;
}

export enum AddressType {
    BUNDLERS,
    PAYMASTERS,
    FACTORIES,
}

export interface AddressInfo {
    company: string;
    type: AddressType;
    entryPoints: string[];
}
export interface AddressMapping {
    [key: string]: AddressInfo;
}
export interface ItemProps {
    userOpHash: string;
    network: string;
}

const performApiCall = (network: string): boolean => {
    if (!network && network != fallBack) return false;
    return true;
};

export interface GasDetails {
    gasUsed: string;
    gasLimit: string;
    gasPrice: string;
    baseFee: string;
    maxPriorityFeePerGas: string;
    maxFeePerGas: string;
  }
  
  export interface LogsDetails {
    numberOfUserOps: number;
    internalTransactions: string;
  }
  export type LogEntry = {
    logIndex: number | null;
    transactionHash: string;
    transactionLogIndex: number | null;
    topics: string[];
    removed: boolean | null;
    data: string;
    address: string;
    event_name: string;
    eventName: string;
    topicsDecoded: { [key: string]: string };
    dataDecoded: { [key: string]: string | number };
};

  interface UserOpData{
    hash: string;
    age: string;
    sender: string;
    target: string;
    fee: string;
    success: boolean;
    actualGasUsed: number;
  }
interface TransactionDetails {
    txHash: string;
    timestamp: string;
    from: string;
    to: string;
    blockNumber: number;
    trxFee: string;
    gasDetails: GasDetails;
    callData: string;
    revenue: string;
    profit: string;
    logsDetails: LogsDetails;
    userOps: UserOpData[]
}
  export interface ApiResponse {
    transactionDetails: TransactionDetails;
    responseTime: number;
  }

const PRO_API = 'https://api.jiffyscan.xyz';
const DEV_API = 'https://api-dev.jiffyscan.xyz';
const API_URL = process.env.NEXT_PUBLIC_APP_ENV === 'production' ? PRO_API : DEV_API;
const X_API_Key = process.env.NEXT_PUBLIC_X_API_KEY;

export const showToast = (toast: any, message: string, type?: string) => {
    if (type == 'warning') {
        toast.warning(message, {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
        });
    } else if (type == 'success') {
        toast.success(message, {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
        });
    } else {
        toast.error(message, {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
        });
    }
};

const cachedFetch = async (url: string) => {
    const cachedResponse = cache.get(url);
    if (cachedResponse) {
        return cachedResponse;
    } else {
        const hours = 24;
        const response = await fetch(url, { headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' } });
        const data = await response.json();
        cache.put(url, data, hours * 1000 * 60 * 60);
        return data;
    }
};

export const getUserOpMetadata = async (userOpHash: string, network: string, toast: any): Promise<metadata> => {
    if (!performApiCall(network)) return {} as metadata;
    if (network != 'mainnet') return {} as metadata;

    let response;
    try {
        response = await fetch(`https://api.jiffyscan.xyz/v0/getUserOpMetadata?userOpHash=${userOpHash}&network=${network}`, {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        });
    } catch (e) {
        // showToast(toast, 'Error fetching metadata');
        return {} as metadata;
    }

    if (response.status != 200) {
        showToast(toast, 'Error fetching metadata');
        return {} as metadata;
    }
    const data = await response.json();
    return data;
};

export const populateERC20TransfersWithTokenInfo = async (metaData: metadata): Promise<metadata> => {
    let populatedMetaData = metaData;
    await Promise.all(
        populatedMetaData.erc20Transfers.map(async (erc20Transfer, index) => {
            if (erc20Transfer.address) {
                const nameAndDecimal = await cachedFetch('/api/getERC20NameAndDecimals?address=' + erc20Transfer.address);
                erc20Transfer.name = nameAndDecimal.name;
                erc20Transfer.decimals = nameAndDecimal.decimals;
            }
            populatedMetaData.erc20Transfers[index] = erc20Transfer;
        }),
    );
    return populatedMetaData;
};

export const getAddressMapping = async (): Promise<AddressMapping> => {
    const response = await fetch('https://xe2kr8t49e.execute-api.us-east-2.amazonaws.com/default/getAAAddressMapping', {
        headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
    });
    if (response.status != 200) {
        return {} as AddressMapping;
    }
    const data = await response.json();
    return data;
};

export const getTopPaymasters = async (
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
    toast: any,
): Promise<PayMasterActivity[]> => {
    if (!performApiCall(selectedNetwork)) return [] as PayMasterActivity[];

    const topPaymastersDataUrl = API_URL +
            '/v0/getTopPaymasters?network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0);
    
    const options = {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
    };

    const response = await fetchRetry(topPaymastersDataUrl, options);

    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('paymasters' in data) {
        if (data.paymasters.length == 0) {
            showToast(toast, 'Could not find any paymasters', 'warning');
        }
        return data.paymasters as PayMasterActivity[];
    }
    return [] as PayMasterActivity[];
};

export const getTopBundlers = async (selectedNetwork: string, pageSize: number, pageNo: number, toast: any): Promise<Bundler[]> => {
    if (!performApiCall(selectedNetwork)) return [] as Bundler[];
    const response = await fetch(
        API_URL +
            '/v0/getTopBundlers?network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    );
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('bundlers' in data) {
        if (data.bundlers.length == 0) {
            showToast(toast, 'No data found');
        }
        return data.bundlers as Bundler[];
    }
    return [] as Bundler[];
};

export const getTopFactories = async (selectedNetwork: string, pageSize: number, pageNo: number, toast: any): Promise<FactoryDetails[]> => {
    if (!performApiCall(selectedNetwork)) return [] as FactoryDetails[];
    const response = await fetch(
        API_URL +
            '/v0/getTopFactories?network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    );
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('factories' in data) {
        if (data.factories.length == 0) {
            showToast(toast, 'No data found');
        }
        return data.factories as FactoryDetails[];
    }
    return [] as FactoryDetails[];
};

export const getLatestUserOps = async (selectedNetwork: string, pageSize: number, pageNo: number, toast: any): Promise<UserOp[]> => {
    if (!performApiCall(selectedNetwork)) return [] as UserOp[];
    const response = await fetch(
        API_URL +
            '/v0/getLatestUserOps?network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    );
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('userOps' in data) {
        if (data.userOps.length == 0) {
            showToast(toast, 'No data found');
        }
        return data.userOps as UserOp[];
    }
    return [] as UserOp[];
};

export const getLatestBundles = async (selectedNetwork: string, pageSize: number, pageNo: number, toast: any): Promise<Bundle[]> => {
    if (!performApiCall(selectedNetwork)) return [] as Bundle[];
    const response = await fetch(
        API_URL +
            '/v0/getLatestBundles?network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    );
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('bundles' in data) {
        if (data.bundles.length == 0) {
            showToast(toast, 'Error fetching data');
        }
        return data.bundles as Bundle[];
    }
    return [] as Bundle[];
};

export const getDailyMetrics = async (selectedNetwork: string, noOfDays: number, toast: any): Promise<DailyMetric[]> => {
    if (!performApiCall(selectedNetwork)) return [] as DailyMetric[];
    const response = await fetch(API_URL + '/v0/getDailyMetrics?network=' + selectedNetwork + '&noOfDays=' + noOfDays, {
        headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
    });
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('metrics' in data) {
        if (data.metrics.length == 0) {
            showToast(toast, 'Error fetching data');
        }
        return data.metrics as DailyMetric[];
    }
    return [] as DailyMetric[];
};

export const getWeeklyData = async (selectedNetwork: string, noOfDays: number, toast: any): Promise<any> => {
    if (!performApiCall(selectedNetwork)) return [] as DailyMetric[];
    const response = await fetch(
        `https://8yu00jz0rj.execute-api.us-east-2.amazonaws.com/default/getChartData?network=${selectedNetwork}&noOfDays=${noOfDays}`,
    );

    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('weeklyData' in data) {
        if (!('userOpMetric' in data.weeklyData)) {
            showToast(toast, 'Error fetching data');
        }
        return data.weeklyData;
    }
    return [];
};

export const getGlobalMetrics = async (selectedNetwork: string, toast: any): Promise<GlobalCounts> => {
    if (!performApiCall(selectedNetwork)) return {} as GlobalCounts;
    const response = await fetch(API_URL + '/v0/getGlobalCounts?network=' + selectedNetwork, {
        headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
    });
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('metrics' in data) {
        if (Object.keys(data.metrics).length == 0) {
            showToast(toast, 'Error fetching data');
        }
        return data.metrics as GlobalCounts;
    }
    return {} as GlobalCounts;
};

export const getUserOp = async (userOpHash: string, toast: any, Authorization?: string): Promise<UserOp[]> => {
    type Headers = {
        'x-api-key': string;
        Authorization?: string;
    };
    const header = {
        'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5',
    } as Headers;
 
    if (Authorization) {
        header['Authorization'] = Authorization;
    }
    const response = await fetch(API_URL + '/v0/getUserOp?hash=' + userOpHash, {
        headers: header,
    });
    console.log(API_URL)
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    console.log("userop fetched :", data)
    if ('userOps' in data) {
        // if (data.userOps.length == 0) {
        //     showToast(toast, 'Error fetching data');
        // }
        
      
        return data.userOps as UserOp[];
    }

    return [] as UserOp[];
};

export const getAddressActivity = async (
    userOpHash: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
    toast: any,
): Promise<AddressActivity> => {
    if (!performApiCall(selectedNetwork)) return {} as AddressActivity;
    const response = await fetch(
        API_URL +
            '/v0/getAddressActivity?address=' +
            userOpHash +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    ).catch((e) => {
        console.log(e);
        return null;
    });

    if (response == null) return {} as AddressActivity;
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();

    return data as AddressActivity;
};

export const getAddressBalances = async (
    userOpHash: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
    toast: any,
): Promise<tokenBalance[]> => {
    if (!performApiCall(selectedNetwork)) return [] as tokenBalance[];
    const response = await fetch(
        API_URL +
            '/v0/getAddressBalances?address=' +
            userOpHash +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    ).catch((e) => {
        console.log(e);
        return null;
    });

    if (response == null) return [] as tokenBalance[];
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();

    return data.tokenBalances as tokenBalance[];
};

export const getAddressTransactions = async (
    userOpHash: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
    toast: any,
): Promise<Transaction[]> => {
    if (!performApiCall(selectedNetwork)) return [] as Transaction[];
    const response = await fetch(
        API_URL +
            '/v0/getAddressTransactions?address=' +
            userOpHash +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    ).catch((e) => {
        console.log(e);
        return null;
    });

    if (response == null) return [] as Transaction[];
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();

    return data.transactions as Transaction[];
};

export const getAddressERC20Transfers = async (
    userOpHash: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
    toast: any,
): Promise<tokenTransferAlchemy[]> => {
    if (!performApiCall(selectedNetwork)) return [] as tokenTransferAlchemy[];
    const response = await fetch(
        API_URL +
            '/v0/getAddressERC20Transfers?address=' +
            userOpHash +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    ).catch((e) => {
        console.log(e);
        return null;
    });

    if (response == null) return [] as tokenTransferAlchemy[];
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();

    return data.erc20Transfers as tokenTransferAlchemy[];
};

export const getAddressERC721Transfers = async (
    userOpHash: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
    toast: any,
): Promise<tokenTransferAlchemy[]> => {
    if (!performApiCall(selectedNetwork)) return [] as tokenTransferAlchemy[];
    const response = await fetch(
        API_URL +
            '/v0/getAddressNFTTransfers?address=' +
            userOpHash +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    ).catch((e) => {
        console.log(e);
        return null;
    });

    if (response == null) return [] as tokenTransferAlchemy[];
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();

    return data.erc721Transfers as tokenTransferAlchemy[];
};

export const getFactoryDetails = async (
    factory: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
    toast: any,
): Promise<FactoryDetails> => {
    if (!performApiCall(selectedNetwork)) return {} as FactoryDetails;
    const response = await fetch(
        API_URL +
            '/v0/getFactoryDetails?factory=' +
            factory +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    );
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('factoryDetails' in data) {
        if (Object.keys(data.factoryDetails).length == 0) {
            showToast(toast, 'Error fetching data');
        }
        return data.factoryDetails as FactoryDetails;
    }
    return {} as FactoryDetails;
};

export const getPayMasterDetails = async (
    userOpHash: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
    toast: any,
): Promise<PayMasterActivity> => {
    if (!performApiCall(selectedNetwork)) return {} as PayMasterActivity;
    const response = await fetch(
        API_URL +
            '/v0/getPaymasterActivity?address=' +
            userOpHash +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    );
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('paymasterDetail' in data) {
        if (Object.keys(data.paymasterDetail).length == 0) {
            showToast(toast, 'Error fetching data');
        }
        return data.paymasterDetail as PayMasterActivity;
    }
    return {} as PayMasterActivity;
};
export const getPoweredBy = async (beneficiary: string, paymaster: string, toast: any): Promise<PoweredBy> => {
    const response = await fetch(
        'https://2wfk6evtcd.execute-api.us-east-2.amazonaws.com/default/getPoweredByValues?beneficiary=' +
            beneficiary +
            '&paymaster=' +
            paymaster,
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    );
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if (data) {
        if (Object.keys(data).length == 0) {
            showToast(toast, 'Error fetching data');
        }
        return data as PoweredBy;
    }
    return {} as PoweredBy;
};

export const getBlockDetails = async (
    blockNumber: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
    toast: any,
): Promise<Block> => {
    if (!performApiCall(selectedNetwork)) return {} as Block;
    const response = await fetch(
        API_URL +
            '/v0/getBlockActivity?blockNumber=' +
            blockNumber +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    );
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('block' in data) {
        if (Object.keys(data.block).length == 0) {
            showToast(toast, 'Error fetching data');
        }
        return data.block as Block;
    }

    return {} as Block;
};

export const getAccountDetails = async (userOpHash: string, selectedNetwork: string, toast: any): Promise<UserOp> => {
    const response = await fetch(API_URL + '/v0/getAddressActivity?address=' + userOpHash + '&network=' + selectedNetwork, {
        headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
    });
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('accountDetail' in data) {
        if (Object.keys(data.accountDetail).length == 0) {
            showToast(toast, 'Error fetching data');
        }
        return data.accountDetail as UserOp;
    }

    return {} as UserOp;
};

export const getBundleDetails = async (
    userOpHash: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
    toast: any,
): Promise<Bundle> => {
    if (!performApiCall(selectedNetwork)) return {} as Bundle;
    const response = await fetch(
        API_URL +
            '/v0/getBundleActivity?bundle=' +
            userOpHash +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    ).catch((e) => {
        console.log(e);
        return null;
    });

    if (response == null) return {} as Bundle;
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('bundleDetails' in data) {
        if (Object.keys(data.bundleDetails).length == 0) {
            showToast(toast, 'Error fetching data');
        }
        return data.bundleDetails as Bundle;
    }
    return {} as Bundle;
};

export const getBundleDetailsRpc = async (
    txHash: string,
    selectedNetwork: string,
  ): Promise<ApiResponse> => {
    console.log("selectednetwork :" , selectedNetwork , ANKR_API_NETWORKS[selectedNetwork])

    const response = await fetch(
      `https://api-dev.jiffyscan.xyz/v0/getBundleDetails?txHash=${txHash}&network=${ANKR_API_NETWORKS[selectedNetwork]}`, 
      {
        headers: {
          'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5',
        },
      }
    ).catch((e) => {
      console.log(e);
      throw new Error('Error fetching transaction details');
    });
  
    if (!response.ok) {
      throw new Error('Error fetching transaction details');
    }
  
    const data: ApiResponse = await response.json();
    console.log(data);
  
    return data;
  };

export const getBundlerDetails = async (
    userOpHash: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
    toast: any,
): Promise<Bundle> => {
    if (!performApiCall(selectedNetwork)) return {} as Bundle;
    const response = await fetch(
        API_URL +
            '/v0/getBundlerActivity?address=' +
            userOpHash +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            (pageNo * pageSize >= 0 ? pageNo * pageSize : 0),
        {
            headers: { 'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5' },
        },
    );
    // if (response == null) return {} as Bundle;
    if (response.status != 200) {
        showToast(toast, 'Error fetching data');
    }
    const data = await response.json();
    if ('bundlerDetails' in data) {
        if (Object.keys(data.bundlerDetails).length == 0) {
            showToast(toast, 'Error fetching data');
        }
        return data.bundlerDetails as Bundle;
    }
    return {} as Bundle;
};

export const fetchAPIKeyList = async (Authorization: string, sub: string) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${API_URL}/user/getxapikey?usersub=${sub}`,
        headers: {
            Authorization: Authorization,
            'x-api-key': X_API_Key,
        },
    };
    return await axios.request(config);
};

export const createAPIKey = async (Authorization: string, toast: any) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_URL}/user/createxapikey`,
        headers: {
            Authorization,
            'x-api-key': X_API_Key,
        },
    };
    try {
        return await axios.request(config).then(() => {
            showToast(toast, `API Key Created SuccessFully`, 'success');
        });
    } catch (error: any) {
        if (error.request) {
            showToast(toast, `No response received, ${error.request}`);
        } else {
            console.error('Error:', error.message);
        }
    }
};

export const resolveBNSAddress = async (address: String, network: string): Promise<String> => {
    let name = '';

    if (address && address.length > 2 && address.slice(0, 2) == '0x' && address.length == 42) {
        const BnsResponse = await axios.get('https://resolver-api.basename.app/v1/addresses/' + address.toString(), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
        name = BnsResponse?.data?.name ? BnsResponse.data.name : '';
    }
    return name;
};


export const fetchData = async (item : ItemProps) => {
    let data;
    try {
        const res = await fetch(`${API_URL}/v0/getUserOpLogs?userOpHash=${item.userOpHash}&network=${item.network}`, {
            headers: {
                'x-api-key': X_API_Key || 'TestAPIKeyDontUseInCode', 
            },
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        data = await res.json();
    } catch (error) {
        console.error("Error fetching data: ", error);
        data = {};  //failed - empty logs 
    }
    return data;
};

export const fetchNetworkData = async (term: string): Promise<NetworkResponse[]> => {
    return Promise.all(
      Object.entries(NETWORK_LIST).map(async ([_, networkItem]) => {
        if (typeof networkItem === 'object' && networkItem !== null && 'key' in networkItem) {
          const response = await fetch(`https://api.jiffyscan.xyz/v0/searchEntry?entry=${encodeURIComponent(term)}&network=${networkItem.key}`);
          return response.json();
        } else {
          throw new Error(`Invalid network item`);
        }
      })
    );
  };