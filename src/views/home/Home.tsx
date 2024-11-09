import Button from '@/components/common/Button';
import Table, { tableDataT, tableDataTCollection } from '@/components/common/table/Table';
import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import RecentMetrics from '@/components/global/recent_metrics/RecentMetrics';
import { useSearchParams } from 'next/navigation';
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
import { session } from 'next-auth/core/routes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoginModal from '@/components/global/LoginModal';
import { useSessionContext, SessionContextType } from '@/context/auth0Context';
import { DefaultSession } from 'next-auth';
import { useUserSession } from '@/context/userSession';
import Link from 'next/link';
import { MdArrowForwardIos } from 'react-icons/md';
import Chains from './Chains';

declare module 'next-auth' {
    interface User {
        email: string;
        email_verified: boolean;
        exp: number;
        name: string;
        picture: string;
        sub: string;
        expires_at: number;
        provider?: string;
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}

const getBlockCondition = (expTime: number | null | undefined): boolean => {
    return expTime ? expTime < Date.now() / 1000 : true;
};

function Home() {
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    const { isLoggedIn } = useUserSession();

    const [block, setBlock] = useState(false);
    const [triggerBlock, setTriggerBlock] = useState(false);
    const [bundlesTables, setBundlesTables] = useState<tableDataTCollection>({ [selectedNetwork]: BundlesTable } as tableDataTCollection);
    const [operationsTables, setOperationsTables] = useState<tableDataTCollection>({
        [selectedNetwork]: OperationsTable,
    } as tableDataTCollection);
    const [bundlersTables, setBundlersTables] = useState<tableDataTCollection>({
        [selectedNetwork]: BundlersTable,
    } as tableDataTCollection);
    const [paymastersTables, setPaymastersTables] = useState<tableDataTCollection>({
        [selectedNetwork]: PaymastersTable,
    } as tableDataTCollection);
    const [userOpTableLoading, setUserOpTableLoading] = useState(true);
    const [bundleTableLoading, setBundleTableLoading] = useState(true);
    const [bundlerTableLoading, setBundlerTableLoading] = useState(true);
    const [paymasterTableLoading, setPaymasterTableLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loginErrorDisplayed, setLoginErrorDisplayed] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        refreshBundlesTable(selectedNetwork);
        refreshUserOpsTable(selectedNetwork);
        refreshBundlersTable(selectedNetwork);
        refreshPaymastersTable(selectedNetwork);
        // turnBlockOnAfterXSeconds(10);
    }, [selectedNetwork]);

    // useEffect(() => {
    //     if(triggerBlock) {
    //         setBlock(!isLoggedIn());
    //     }
    // }, [triggerBlock])

    useEffect(() => {
        const error = searchParams.get('error');
        if (window && error && !loginErrorDisplayed) {
            toast.error('Failed to log you in. Please try again ! ERROR: ' + error, {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored',
            });
            setLoginErrorDisplayed(true);
        }
    });

    // //turn on block after 10 seconds
    // const turnBlockOnAfterXSeconds = (seconds: number) => {
    //     setTimeout(() => {
    //         blockView();
    //     }, seconds * 1000);
    // };

    // const blockView = () => {
    //     setTriggerBlock(true);
    // };

    const refreshBundlesTable = async (network: string) => {
        setBundleTableLoading(true);
        const bundles = await getLatestBundles(network, 5, 0, toast);
        let newRows = [] as tableDataT['rows'];
        bundles.forEach((bundle) => {
            newRows.push({
                token: {
                    text: bundle.transactionHash,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'trx',
                },
                ago: getTimePassed(bundle.blockTime),
                userOps: bundle.userOpsLength + '',
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
                userOps: `${paymaster.userOpsLength}`,
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
                userOps: `${bundler.bundleLength}`,
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

    return (
        <div className='bg-[#F0F1F5] dark:bg-[#19191A]'>
            <Navbar />
            <section className="py-16 ">
                <div className="container px-24">
                    {/* <h1 className="mb-2 text-xl font-bold leading-8 md:text-3xl md:mb-4">
                        UserOp Explorer for{' '}
                        <a href="https://eips.ethereum.org/EIPS/eip-4337" target="_blank" style={{ textDecoration: 'underline' }}>
                            4337
                        </a>
                    </h1> */}
                    <div className=''>
                        <Searchblock isNavbar={false} />
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="flex flex-col items-center justify-center gap-3 py-1 mb-4 md:gap-4">
                    {/* <Header
                        icon="/images/cube-unfolded.svg"
                        headerText="Select network to explore"
                        infoText="Shows latest Activity for different entities in a chain"
                    /> */}
                    <h1 className='font-gsans font-semibold text-base text-[#195BDF] dark:text-[#598AEB]'>EXPLORE</h1>
                    <h2 className='text-[28px] md:text-[32px] font-dmsans text-[#1F1F1F] dark:text-[#BCBFCC] font-medium py-2'>What&apos;s Happening On...</h2>
                    <NetworkSelector selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork} disabled={loading} />
                </div>
            </div>
            {/* <RecentMetrics selectedNetwork={selectedNetwork} setLoading={setLoading} loading={loading} /> */}
            <div>
                <section className={`mb-12`}>
                    {block ? <LoginModal showClose={true} block={block} setBlock={setBlock} /> : null}
                    <div className={`container grid grid-cols-1 gap-10 lg:grid-cols-2 ${block && 'blur'}`}>
                        <div>
                            <div className="mt-4 border-t bg-white dark:bg-[#1D1E1F] dark:text-[#989BA6] border-l border-r dark:border-[#444444] border-[#D7DAE0]  px-10 py-6 flex items-center justify-between rounded-t-lg font-semibold font-dmsans sm:text-base md:text-xl">
                                {/* <Button href="/recentBundles">View all bundles</Button> */}
                                <p>Transactions</p>
                                <Link href="/recentBundles" className="text-[#195BDF] dark:text-[#598AEB] flex items-center gap-2">
                                    View Transactions <MdArrowForwardIos className="w-4 h-4" />
                                </Link>
                            </div>
                            <Table
                                {...(bundlesTables[selectedNetwork] as tableDataT)}
                                columns={BundlesTable['columns']}
                                loading={bundleTableLoading}
                                caption={{
                                    children: 'Recent Bundles',
                                    icon: '/images/swap-vertical-bold (1).svg',
                                    text: 'Recent bundles Processed by selected chain',
                                }}
                                key="recentBundlesTable"
                            />
                        </div>
                        <div>
                            <div className="mt-4 border-t border-l border-r bg-white dark:text-[#989BA6] dark:bg-[#1D1E1F] dark:border-[#444444] border-[#D7DAE0] px-10 py-6 flex items-center justify-between rounded-t-lg font-semibold font-dmsans sm:text-base md:text-xl">
                                <p>UserOps</p>
                                <Link href="/recentUserOps" className="text-[#195BDF] dark:text-[#598AEB] flex items-center gap-2">
                                    View UserOps <MdArrowForwardIos className="w-4 h-4" />
                                </Link>
                            </div>
                            <Table
                                {...(operationsTables[selectedNetwork] as tableDataT)}
                                columns={OperationsTable['columns']}
                                loading={userOpTableLoading}
                                caption={{
                                    children: 'Recent User Operations',
                                    icon: '/images/swap-vertical-bold (1).svg',
                                    text: 'Recent User Operations Processed by selected chain',
                                }}
                                key="recentUserOpsTables"
                            />
                            {/* <div className="mt-4">
                                <Button href="/recentUserOps">View all User operations</Button>
                            </div> */}
                        </div>
                    </div>
                </section>
                <section className={`mb-12 ${block && 'blur'}`}>
                    <div className="container grid grid-cols-1 gap-10 lg:grid-cols-2">
                        <div>
                            <div className="mt-4 border-t border-l border-r bg-white dark:text-[#989BA6] dark:bg-[#1D1E1F] dark:border-[#444444] border-[#D7DAE0] px-10 py-6 flex items-center justify-between rounded-t-lg font-semibold font-dmsans sm:text-base md:text-xl">
                                <p>Top Bundlers</p>
                                <Link href="/bundlers" className="text-[#195BDF] dark:text-[#598AEB] flex items-center gap-2">
                                    View Bundlers<MdArrowForwardIos className="w-4 h-4" />
                                </Link>
                            </div>
                            <Table
                                {...(bundlersTables[selectedNetwork] as tableDataT)}
                                columns={BundlersTable['columns']}
                                loading={bundlerTableLoading}
                                caption={{
                                    children: 'Top Bundlers',
                                    icon: '/images/swap-vertical-bold (1).svg',
                                    text: 'Top Bundlers by selected chain',
                                }}
                                key="topBundlersTable"
                            />

                            {/* <div className="mt-4">
                                <Button href="/bundlers">View all Bundlers</Button>
                            </div> */}
                        </div>
                        <div>
                        <div className="mt-4 border-t border-l border-r bg-white dark:text-[#989BA6]  dark:bg-[#1D1E1F] dark:border-[#444444] border-[#D7DAE0] px-10 py-6 flex items-center justify-between rounded-t-lg font-semibold font-dmsans sm:text-base md:text-xl">
                                <p>Top Paymasters</p>
                                <Link href="/paymasters" className="text-[#195BDF] dark:text-[#598AEB] flex items-center gap-2">
                                    View Paymasters<MdArrowForwardIos className="w-4 h-4" />
                                </Link>
                            </div>
                            <Table
                                {...(paymastersTables[selectedNetwork] as tableDataT)}
                                columns={PaymastersTable['columns']}
                                loading={paymasterTableLoading}
                                caption={{
                                    children: 'Top Paymasters',
                                    icon: '/images/swap-vertical-bold (1).svg',
                                    text: 'Top Paymaster by selected chain',
                                }}
                                key="topPaymastersTable"
                            />
                            {/* <div className="mt-4">
                                <Button href="/paymasters">View all Paymasters</Button>
                            </div> */}
                        </div>
                    </div>
                </section>
            </div>
            <Chains/>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default Home;
