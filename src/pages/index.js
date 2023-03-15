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
                <div className="flex flex-col w-[343px] lg:w-full py-6 mx-auto">
                    <h1 className="text-xl font-semibold pb-4">
                        The User Operations Explorer
                    </h1>
                    <span className="w-2/3">
                        <SearchBar />
                    </span>
                </div>

                <div className="flex flex-col pb-6 overflow-auto lg:w-full lg:overflow-visible">
                    <RecentMetrics />
                </div>

                <div className="flex flex-col sm:flex-row overflow-auto mx-auto lg:w-full lg:space-x-10">
                    <LatestBundles />
                    <LatestUserOps />
                </div>
            </Layout>
        </>
    );
}
