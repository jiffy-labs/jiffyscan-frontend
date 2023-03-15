import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from '@/components/shared/Header';
import SearchBar from '@/components/homepage/SearchBar';
import LatestData from '@/components/homepage/LatestData';
import LatestUserOps from '@/components/homepage/LatestUserOps';
import Layout from '@/components/shared/Layout';
import RecentMetrics from '@/components/homepage/RecentMetrics';
import ViewAllBundlesButton from '@/components/homepage/ViewAllBundlesButton';
import ViewAllUserOpsButton from '@/components/homepage/ViewAllUserOpsButton';
import LatestBundles from '@/components/homepage/LatestBundles';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <Layout>
                <div className="flex flex-col w-[343px] lg:w-5/6 py-6 mx-auto">
                    <h1 className="text-xl font-semibold pb-4">
                        The User Operations Explorer
                    </h1>
                    <SearchBar />
                </div>

                <div className="flex flex-col pb-6 mx-auto overflow-auto lg:w-5/6  lg:overflow-visible">
                    <div className="flex flex-row">
                        <h1 className="text-xl font-semibold pb-4 w-1/3">
                            Recent Metrics
                        </h1>
                        <div className="flex justify-end w-2/3 space-x-4 hidden lg:block">
                            <button className="rounded-xl border-2 px-4">
                                Goerli
                            </button>
                            <button className="rounded-xl border-2 px-4">
                                Mumbai
                            </button>
                            <button className="rounded-xl border-2 px-4">
                                Optimism Goerli
                            </button>
                            <button className="rounded-xl border-2 px-4">
                                More
                            </button>
                        </div>
                    </div>
                    <div className="items-center justify-center mx-auto overflow-auto">
                        <RecentMetrics />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row overflow-auto mx-auto lg:w-full">
                    <LatestBundles />
                    <LatestUserOps />
                </div>
            </Layout>
        </>
    );
}
