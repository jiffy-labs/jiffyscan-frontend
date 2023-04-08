import { useRouter } from 'next/router';
import { useConfig } from '@/context/config';
import Home from '@/views/home/Home';
import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/globals/Layout';
import { getNetworkState } from '@/components/common/utils';

function Index() {
    const router = useRouter();
    const { query } = router;
    
    const { selectedNetwork, setSelectedNetwork } = useConfig();

    useEffect(() => {
        setSelectedNetwork(getNetworkState(router.query));
    }, [])

    useEffect(() => {
        if (query?.network == selectedNetwork) return;
        const href = {
            pathname: router.basePath,    
            query: {...query, network: selectedNetwork},
        };
        router.push(href, undefined, { shallow: true });
    }, [selectedNetwork]);

    

    return (
        <Layout>
            <Home />
        </Layout>
    );
}

export default Index;
Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
