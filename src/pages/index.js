import { useState } from 'react'; 
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
import NetworkFilter from '@/components/homepage/NetworkFilter';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const [network, setNetwork] = useState('');

    const handleNetworkChange = (newNetwork) => {
        if (network === newNetwork) {
            setNetwork('');
        } else {
            setNetwork(newNetwork);

        }
    };

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
                        
                        <NetworkFilter network={network} handleNetworkChange={handleNetworkChange}/>
                    </div>
                    <div className="items-center justify-center mx-auto overflow-auto">
                        <RecentMetrics />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row overflow-auto mx-auto lg:w-full">
                    <LatestBundles network={network}/>
                    <LatestUserOps network={network}/>
                </div>
            </Layout>
        </>
    );
}
