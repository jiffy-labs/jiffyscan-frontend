import Layout from '@/components/globals/Layout';
import LatestBundlesComponent from '@/views/recentBundles/Bundles';
import { useConfig } from '@/context/config';
import router from 'next/router';
import React, { ReactElement } from 'react';
import { useEffect } from 'react';

function LatestBundles() {
    const { selectedNetwork, setSelectedNetwork } = useConfig();

    const getNetworkState = (query:any) => {
        console.log(query);
        let network = query['network']?.toString();
        return network != null ? network : 'mainnet';
    };

    useEffect(() => {
        setSelectedNetwork(getNetworkState(router.query));
    }, [])
    
    return (
        <div>
            <LatestBundlesComponent />
        </div>
    );
}

export default LatestBundles;

LatestBundles.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
