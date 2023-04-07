import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import LatestUserOps from '@/views/recentUserOps/UserOperations';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

function latestUserOps() {
    const router = useRouter();
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
            <LatestUserOps />
        </div>
    );
}

export default latestUserOps;

latestUserOps.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
