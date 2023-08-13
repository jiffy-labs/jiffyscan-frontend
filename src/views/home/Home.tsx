import Button from '@/components/common/Button';
import Table, { tableDataT } from '@/components/common/table/Table';
import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import RecentMetrics from '@/components/global/recent_metrics/RecentMetrics';
import React, { useState, useEffect } from 'react';
import BundlesTable from './bundles_table.json';
import BundlersTable from './bundlers_table.json';
import PaymastersTable from './paymasters_table.json';
import OperationsTable from './operations_table.json';
import Searchblock from '../../components/global/searchblock/Searchblock';
import NetworkSelector from '@/components/common/NetworkSelector';
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import { getLatestBundles, getLatestUserOps, getTopBundlers, getTopPaymasters } from '@/components/common/apiCalls/jiffyApis';
import { getFee, getTimePassed } from '@/components/common/utils';
import { useConfig } from '../../context/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoButton from '@/components/common/InfoButton';
import Header from '@/components/common/Header';

function Home() {
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    const [bundlesTable, setBundlesTable] = useState<tableDataT>(BundlesTable as tableDataT);
    const [operationsTable, setOperationsTable] = useState<tableDataT>(OperationsTable as tableDataT);
    const [bundlersTable, setBundlersTable] = useState<tableDataT>(BundlersTable as tableDataT);
    const [paymastersTable, setPaymastersTable] = useState<tableDataT>(PaymastersTable as tableDataT);
    const [userOpTableLoading, setUserOpTableLoading] = useState(true);
    const [bundleTableLoading, setBundleTableLoading] = useState(true);
    const [bundlerTableLoading, setBundlerTableLoading] = useState(true);
    const [paymasterTableLoading, setPaymasterTableLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        refreshBundlesTable(selectedNetwork);
        refreshUserOpsTable(selectedNetwork);
        refreshBundlersTable(selectedNetwork);
        refreshPaymastersTable(selectedNetwork);
    }, [selectedNetwork]);

    const refreshBundlesTable = async (network: string) => {
        setBundleTableLoading(true);
        const bundles = await getLatestBundles(network, 5, 0, toast);
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
        setBundlesTable({ ...bundlesTable, rows: newRows.slice(0, 5) });
        setBundleTableLoading(false);
    };

    const refreshPaymastersTable = async (network: string) => {
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
        setPaymastersTable({ ...paymastersTable, rows: newRows.slice(0, 10) });
        setPaymasterTableLoading(false);
    };

    const refreshBundlersTable = async (network: string) => {
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
        console.log(newRows);
        setBundlersTable({ ...bundlersTable, rows: newRows });
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
        setOperationsTable({ ...operationsTable, rows: newRows.slice(0, 5) });
        setUserOpTableLoading(false);
    };

    return (
        <div>
            <Navbar />
            <section className="py-6">
                <div className="container">
                    <h1 className="mb-2 text-xl font-bold leading-8 md:text-3xl md:mb-4">
                        UserOp Explorer for{' '}
                        <a href="https://eips.ethereum.org/EIPS/eip-4337" target="_blank" style={{ textDecoration: 'underline' }}>
                            4337
                        </a>
                    </h1>
                    <div>
                        <Searchblock isNavbar={false} />
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="flex flex-wrap items-center justify-between gap-3 py-2 mb-4 md:gap-10">
                    <Header
                        icon="/images/cube-unfolded.svg"
                        headerText="Recent Metrics"
                        infoText="Latest Activity from entrypoint, and smart contract wallets"
                    />                    
                    <NetworkSelector selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork} disabled={loading} />
                </div>
            </div>
            <RecentMetrics selectedNetwork={selectedNetwork} setLoading={setLoading} loading={loading} />
            <section className="mb-12">
                <div className="container grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div>
                        <Table
                            {...(bundlesTable as tableDataT)}
                            loading={bundleTableLoading}
                            caption={{
                                children: 'Recent Bundles',
                                icon: '/images/swap-vertical-bold (1).svg',
                                text: 'Recent bundles Processed by selected chain',
                            }}
                        />

                        <div className="mt-4">
                            <Button href="/recentBundles">View all bundles</Button>
                        </div>
                    </div>
                    <div>
                        <Table
                            {...(operationsTable as tableDataT)}
                            loading={userOpTableLoading}
                            caption={{
                                children: 'Recent User Operations',
                                icon: '/images/swap-vertical-bold (1).svg',
                                text: 'Recent User Operations Processed by selected chain',
                            }}
                        />
                        <div className="mt-4">
                            <Button href="/recentUserOps">View all User operations</Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mb-12">
                <div className="container grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div>
                        <Table
                            {...(bundlersTable as tableDataT)}
                            loading={bundlerTableLoading}
                            caption={{
                                children: 'Top Bundlers',
                                icon: '/images/swap-vertical-bold (1).svg',
                                text: 'Top Bundlers by selected chain',
                            }}
                        />

                        <div className="mt-4">
                            <Button href="/bundlers">View all Bundlers</Button>
                        </div>
                    </div>
                    <div>
                        <Table
                            {...(paymastersTable as tableDataT)}
                            loading={paymasterTableLoading}
                            caption={{
                                children: 'Top Paymasters',
                                icon: '/images/swap-vertical-bold (1).svg',
                                text: 'Top Paymaster by selected chain',
                            }}
                        />
                        <div className="mt-4">
                            <Button href="/paymasters">View all Paymasters</Button>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default Home;
