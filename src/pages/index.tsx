import { useRouter } from 'next/router';
import { useConfig } from '@/context/config';
import Home from '@/views/home/Home';
import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/globals/Layout';

function Index() {
    const router = useRouter();
    const { query } = router;
    
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    const getNetworkState = (query:any) => {
        console.log(query);
        let network = query['network']?.toString();
        return network != null ? network : 'mainnet';
    };

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
