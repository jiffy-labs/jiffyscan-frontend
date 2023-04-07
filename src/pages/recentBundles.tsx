import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import LatestBundles from '@/views/recentBundles/Bundles';
import router from 'next/router';
import React, { ReactElement, useEffect } from 'react';

function latestBundles() {
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
            <LatestBundles />
        </div>
    );
}

export default latestBundles;

latestBundles.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
