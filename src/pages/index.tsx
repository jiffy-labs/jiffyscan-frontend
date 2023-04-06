import { useRouter } from 'next/router';
import { useConfig } from '@/context/config';
import Home from '@/views/home/Home';
import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/globals/Layout';

function Index() {
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    const router = useRouter();

    // Get the current query parameters
    const { query } = router;

    useEffect(() => {
        const networkParam = query['network'];
        // If network parameter is present in URL, set it in context
        if (networkParam && typeof networkParam === 'string') {
            setSelectedNetwork(networkParam);
        }
    }, [query]);

    useEffect(() => {
        // Update URL with new value of selectedNetwork
        const newQuery = {
            ...query,
            network: selectedNetwork,
        };
        const href = {
            pathname: '/',
            query: newQuery,
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
