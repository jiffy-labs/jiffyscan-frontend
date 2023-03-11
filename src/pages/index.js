import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from '@/components/shared/Header';
import SearchBar from '@/components/homepage/SearchBar';
import LatestData from '@/components/homepage/LatestData';
import LatestBundles from '@/components/homepage/LatestBundles';
import LatestUserOps from '@/components/homepage/LatestUserOps';
import Layout from '@/components/shared/Layout';
import RecentMetrics from '@/components/homepage/RecentMetrics';
import ViewAllBundlesButton from '@/components/homepage/ViewAllBundlesButton';
import ViewAllUserOpsButton from '@/components/homepage/ViewAllUserOpsButton';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <Layout>
                <div className="flex flex-col w-[343px] mx-auto py-6">
                    <h1 className="text-xl font-semibold pb-4">
                        The User Operations Explorer
                    </h1>
                    <SearchBar />
                </div>

                <div className="flex flex-col px-4 pb-6">
                    <h1 className="text-xl font-semibold pb-4">
                        Recent Metrics
                    </h1>
                    <RecentMetrics />
                </div>

                <div className="flex flex-col py-6 px-4">
                    <h1 className="text-xl font-semibold pb-4">
                        Latest Bundles
                    </h1>
                    <LatestBundles />
                    <div className="py-4">
                        <ViewAllBundlesButton />
                    </div>
                </div>

                <div className="flex flex-col py-6 px-4">
                    <h1 className="text-xl font-semibold pb-4">
                        Latest User Operations
                    </h1>
                    <LatestUserOps />
                    <div className="py-4">
                        <ViewAllUserOpsButton />
                    </div>
                </div>
            </Layout>
        </>
    );
}
