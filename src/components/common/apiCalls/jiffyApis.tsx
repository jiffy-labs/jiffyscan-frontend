import axios from 'axios';
import { fallBack } from '../constants';

export interface UserOp {
    userOpsLength: any;
    userOps: any;
    id: string | null;
    transactionHash: string | null;
    userOpHash: string;
    sender: string;
    paymaster: string;
    nonce: number;
    actualGasCost: number;
    actualGasPrice: number;
    actualGasUsed: number | null;
    success: Boolean;
    revertReason: string | null;
    blockTime: number | null;
    blockNumber: number | null;
    network: string;
    input: string | null;
    target: string | null;
    callData: string | null;
    beneficiary: string | null;
    factory: string | null;
    value: number | null;
    verificationGasLimit: string | null;
    preVerificationGas: string | null;
    maxFeePerGas: number | null;
    maxPriorityFeePerGas: number | null;
    paymasterAndData: string | null;
    signature: string | null;
    userOpsCount?: number | null;
}

export interface AddressActivity {
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
    totalDeposit: string;
}
export interface PayMasterActivity {
    userOps: UserOp[];
    userOpsLength: number;
    id: number;
    address: string;
    network: string;
    totalDeposits: string;
}
export interface Bundle {
    userOpsLength: number;
    transactionHash: string;
    network: string;
    blockNumber: number;
    blockTime: number;
    userOps: UserOp[];
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
    activeWallets: string[];
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

const performApiCall = (network: string): boolean => {
    if (!network && network != fallBack) return false;
    return true
}

export const getLatestUserOps = async (selectedNetwork: string, pageSize: number, pageNo: number): Promise<UserOp[]> => {
    if (!performApiCall(selectedNetwork)) return [] as UserOp[]; 
    const response = await fetch(
        'https://api.jiffyscan.xyz/v0/getLatestUserOps?network=' + selectedNetwork + '&first=' + pageSize + '&skip=' + pageNo * pageSize,
    );
    const data = await response.json();
    if ('userOps' in data) {
        return data.userOps as UserOp[];
    }
    return [] as UserOp[];
};

export const getLatestBundles = async (selectedNetwork: string, pageSize: number, pageNo: number): Promise<Bundle[]> => {
    if (!performApiCall(selectedNetwork)) return [] as Bundle[];
    const response = await fetch(
        'https://api.jiffyscan.xyz/v0/getLatestBundles?network=' + selectedNetwork + '&first=' + pageSize + '&skip=' + pageNo * pageSize,
    );
    const data = await response.json();
    if ('bundles' in data) {
        return data.bundles as Bundle[];
    }
    return [] as Bundle[];
};

export const getDailyMetrics = async (selectedNetwork: string, noOfDays: number): Promise<DailyMetric[]> => {
    if (!performApiCall(selectedNetwork)) return [] as DailyMetric[];
    const response = await fetch('https://api.jiffyscan.xyz/v0/getDailyMetrics?network=' + selectedNetwork + '&noOfDays=' + noOfDays);
    const data = await response.json();
    if ('metrics' in data) {
        return data.metrics as DailyMetric[];
    }
    return [] as DailyMetric[];
};

export const getGlobalMetrics = async (selectedNetwork: string): Promise<GlobalCounts> => {
    if (!performApiCall(selectedNetwork)) return {} as GlobalCounts;
    const response = await fetch('https://api.jiffyscan.xyz/v0/getGlobalCounts?network=' + selectedNetwork);
    const data = await response.json();
    if ('metrics' in data) {
        return data.metrics as GlobalCounts;
    }
    return {} as GlobalCounts;
};
export const getUserOp = async (userOpHash: string, selectedNetwork: string): Promise<UserOp[]> => {
    const response = await fetch(
        'https://api.jiffyscan.xyz/v0/getUserOp?hash=' + userOpHash + (selectedNetwork ? '&network=' + selectedNetwork : ''),
    );
    const data = await response.json();
    if ('userOps' in data) {
        return data.userOps as UserOp[];
    }

    return [] as UserOp[];
};
export const getAddressActivity = async (
    userOpHash: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
): Promise<AddressActivity> => {
    if (!performApiCall(selectedNetwork)) return {} as AddressActivity;
    const response = await fetch(
        'https://api.jiffyscan.xyz/v0/getAddressActivity?address=' +
            userOpHash +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            pageNo * pageSize,
    );
    const data = await response.json();
    if ('accountDetail' in data) {
        return data.accountDetail as AddressActivity;
    }
    return {} as AddressActivity;
};
export const getPayMasterDetails = async (
    userOpHash: string,
    selectedNetwork: string,
    pageSize: number,
    pageNo: number,
): Promise<PayMasterActivity> => {
    if (!performApiCall(selectedNetwork)) return {} as PayMasterActivity;
    const response = await fetch(
        'https://api.jiffyscan.xyz/v0/getPaymasterActivity?address=' +
            userOpHash +
            '&network=' +
            selectedNetwork +
            '&first=' +
            pageSize +
            '&skip=' +
            pageNo * pageSize,
    );
    const data = await response.json();
    if ('paymasterDetail' in data) {
        return data.paymasterDetail as PayMasterActivity;
    }

    return {} as PayMasterActivity;
};
export const getPoweredBy = async (beneficiary: string, paymaster: string): Promise<PoweredBy> => {
    const response = await fetch(
        'https://2wfk6evtcd.execute-api.us-east-2.amazonaws.com/default/getPoweredByValues?beneficiary=' +
            beneficiary +
            '&paymaster=' +
            paymaster,
    );
    const data = await response.json();
    if (data) {
        return data as PoweredBy;
    }
    return {} as PoweredBy;
};

export const getBlockDetails = async (blockNumber: string, selectedNetwork: string): Promise<UserOp[]> => {
    if (!performApiCall(selectedNetwork)) return [] as UserOp[];
    const response = await fetch(
        'https://api.jiffyscan.xyz/v0/getBlockActivity?blockNumber=' + blockNumber + '&network=' + selectedNetwork,
    );
    const data = await response.json();
    if ('userOps' in data) {
        return data.userOps as UserOp[];
    }

    return [] as UserOp[];
};
export const getAccountDetails = async (userOpHash: string, selectedNetwork: string): Promise<UserOp> => {
    const response = await fetch('https://api.jiffyscan.xyz/v0/getAddressActivity?address=' + userOpHash + '&network=' + selectedNetwork);
    const data = await response.json();
    if ('accountDetail' in data) {
        return data.accountDetail as UserOp;
    }

    return {} as UserOp;
};
