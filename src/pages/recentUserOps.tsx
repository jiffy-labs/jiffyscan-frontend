import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import LatestUserOpsComponent from '@/views/recentUserOps/UserOperations';
import { useRouter } from 'next/router';

function LatestUserOps() {
    const router = useRouter();
    const { setSelectedNetwork } = useConfig();

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
            <LatestUserOpsComponent />
        </div>
    );
}

export default LatestUserOps;

LatestUserOps.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
