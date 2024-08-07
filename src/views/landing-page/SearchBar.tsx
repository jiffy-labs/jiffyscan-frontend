import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import { NETWORK_ICON_MAP, NETWORK_LIST } from '@/components/common/constants';
import { getLatestBundles, getLatestUserOps, getTopBundlers, getTopPaymasters } from '@/components/common/apiCalls/jiffyApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table, { tableDataT, tableDataTCollection } from '@/components/common/table/Table';
import { getFee, getTimePassed } from '@/components/common/utils';
import BundlesTable from '../home/bundles_table.json';
import BundlersTable from '../home/bundlers_table.json';
import PaymastersTable from '../home/paymasters_table.json';
import OperationsTable from '../home/operations_table.json';

const SearchBar = () => {
    const [activeTable, setActiveTable] = useState<string | null>('Bundles');
    const [bundlesData, setBundlesData] = useState<any[]>([]);
    const [userOpsData, setUserOpsData] = useState<any[]>([]);
    const [bundlersData, setBundlersData] = useState<any[]>([]);
    const [paymastersData, setPaymastersData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [networkValue, setNetworkValue] = useState<number>(-1);
    const [networkName, setNetworkName] = useState<string>('mainnet');

    const [block, setBlock] = useState(false);
    const [triggerBlock, setTriggerBlock] = useState(false);
    const [bundlesTables, setBundlesTables] = useState<tableDataTCollection>({
        ['mainnet']: BundlesTable,
    } as unknown as tableDataTCollection);
    const [operationsTables, setOperationsTables] = useState<tableDataTCollection>({
        [networkValue]: OperationsTable,
    } as tableDataTCollection);
    const [bundlersTables, setBundlersTables] = useState<tableDataTCollection>({
        [networkValue]: BundlersTable,
    } as tableDataTCollection);
    const [paymastersTables, setPaymastersTables] = useState<tableDataTCollection>({
        [networkValue]: PaymastersTable,
    } as tableDataTCollection);
    const [userOpTableLoading, setUserOpTableLoading] = useState(true);
    const [bundleTableLoading, setBundleTableLoading] = useState(true);
    const [bundlerTableLoading, setBundlerTableLoading] = useState(true);
    const [paymasterTableLoading, setPaymasterTableLoading] = useState(true);
    const [badgeValue, setBadgeValue] = useState('Bundles');

    const refreshBundlesTable = async (network: string) => {
        setBundleTableLoading(true);
        const bundles = await getLatestBundles(network, 5, 0, toast);
        console.log(bundles);
        let newRows = [] as tableDataT['rows'];
        bundles.forEach((bundle) => {
            newRows.push({
                token: {
                    text: bundle.transactionHash,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'bundle',
                },
                ago: getTimePassed(bundle.blockTime),
                userOps: bundle.userOpsLength + ' ops',
                status: true,
            });
        });
        bundlesTables[network] = { ...bundlesTables[network], rows: newRows.slice(0, 5) };
        setBundlesTables(bundlesTables);
        // console.log("bundlesTables",{ ...bundlesTables[network], rows: newRows.slice(0, 5) })
        setBundleTableLoading(false);
    };

    const refreshPaymastersTable = async (network: string) => {
        setPaymasterTableLoading(true);
        const paymasters = await getTopPaymasters(network, 5, 0, toast);
        let newRows: tableDataT['rows'] = [];
        paymasters.forEach((paymaster) => {
            newRows.push({
                token: {
                    text: paymaster.address,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'paymaster',
                },
                userOps: `${paymaster.userOpsLength} ops`,
                fee: getFee(parseInt(paymaster.gasSponsored), network),
            });
        });
        paymastersTables[network] = { ...paymastersTables[network], rows: newRows.slice(0, 10) };
        setPaymastersTables(paymastersTables);
        setPaymasterTableLoading(false);
    };

    const refreshBundlersTable = async (network: string) => {
        setBundlerTableLoading(true);
        const bundlers = await getTopBundlers(network, 5, 0, toast);
        let newRows: tableDataT['rows'] = [];
        bundlers.forEach((bundler) => {
            newRows.push({
                token: {
                    text: bundler.address,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'bundler',
                },
                userOps: `${bundler.bundleLength} bundles`,
                fee: getFee(parseInt(bundler.actualGasCostSum), network),
            });
        });
        bundlersTables[network] = { ...bundlersTables[network], rows: newRows.slice(0, 5) };
        setBundlersTables(bundlersTables);
        // console.log('bundlersTables',{ ...bundlersTables[network], rows: newRows.slice(0, 5) })
        setBundlerTableLoading(false);
    };

    const refreshUserOpsTable = async (network: string) => {
        setUserOpTableLoading(true);
        const userOps = await getLatestUserOps(network, 5, 0, toast);
        let newRows = [] as tableDataT['rows'];
        userOps.forEach((userOp) => {
            newRows.push({
                token: {
                    text: userOp.userOpHash,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'userOp',
                },
                ago: getTimePassed(userOp.blockTime!),
                sender: userOp.sender,
                target: userOp.target!,
                status: userOp.success!,
            });
        });
        setLoading(false);
        operationsTables[network] = { ...operationsTables[network], rows: newRows.slice(0, 5) };
        setOperationsTables(operationsTables);
        setUserOpTableLoading(false);
    };

    useEffect(() => {
        const networkName = networkValue !== -1 ? NETWORK_LIST[networkValue].key : 'mainnet';
        switch (badgeValue) {
            case 'Bundles':
                refreshBundlesTable(networkName);
                break;
            case 'UserOperations':
                refreshUserOpsTable(networkName);
                break;
            case 'Bundlers':
                refreshBundlersTable(networkName);
                break;
            case 'Paymaster':
                refreshPaymastersTable(networkName);
                break;
            default:
                break;
        }
    }, [networkValue, badgeValue]);

    const renderTable = () => {
        switch (activeTable) {
            case 'Bundles':
                return (
                    <div style={{ padding: '0px 16px 16px 16px' }}>
                        <Table
                            {...(bundlesTables[networkValue !== -1 ? NETWORK_LIST[networkValue].key : 'mainnet'] as tableDataT)}
                            columns={BundlesTable['columns']}
                            loading={bundleTableLoading}
                            key="recentBundlesTable"
                        />
                    </div>
                );
            case 'UserOperations':
                return (
                    <div style={{ padding: '0px 16px 16px 16px' }}>
                    <Table
                        {...(operationsTables[networkValue !== -1 ? NETWORK_LIST[networkValue].key : 'mainnet'] as tableDataT)}
                        columns={OperationsTable['columns']}
                        loading={userOpTableLoading}
                        key="recentUserOpsTables"
                    />
                    </div>
                );
            case 'Bundlers':
                return (
                    <div style={{ padding: '0px 16px 16px 16px' }}>
                    <Table
                        {...(bundlersTables[networkValue !== -1 ? NETWORK_LIST[networkValue].key : 'mainnet'] as tableDataT)}
                        columns={BundlersTable['columns']}
                        loading={bundlerTableLoading}
                        key="topBundlersTable"
                    />
                    </div>
                );
            case 'Paymaster':
                return (
                    <div style={{ padding: '0px 16px 16px 16px' }}>
                    <Table
                        {...(paymastersTables[networkValue !== -1 ? NETWORK_LIST[networkValue].key : 'mainnet'] as tableDataT)}
                        columns={PaymastersTable['columns']}
                        loading={paymasterTableLoading}
                        key="topPaymastersTable"
                    />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-[1080px] mx-auto mt-12 md:mt-48 px-4 md:px-0">
            <SearchBox networkValue={networkValue} setNetworkValue={setNetworkValue} />

            <div className="-mt-2 w-full max-w-[1080px] p-4 bg-[#F3F4F7] rounded-b-2xl shadow-md">
                <div className="flex flex-wrap">
                    <h1 className="hidden md:block p-4 text-md text-[#959595]">SEE LATEST</h1>
                    {['Bundles', 'UserOperations', 'Bundlers', 'Paymaster'].map((badge, index) => (
                        <div key={index} className="m-2 gap-4">
                            <button
                                className={`px-6 py-2 rounded-full text-ph ${
                                    activeTable === badge
                                        ? 'bg-[#6C47FF] border-2 font-medium text-white'
                                        : 'border-2 font-regular text-black'
                                }`}
                                onClick={() => {
                                    setBadgeValue(badge);
                                    setActiveTable(activeTable === badge ? null : badge);
                                    setLoading(false);
                                }}
                            >
                                {badge}
                            </button>
                        </div>
                    ))}
                </div>
                <div>{loading ? <p className="mt-4">Loading...</p> : activeTable && <div className="mt-4">{renderTable()}</div>}</div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SearchBar;
