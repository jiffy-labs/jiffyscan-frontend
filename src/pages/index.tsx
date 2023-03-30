import { useRouter } from 'next/router';
import { useConfig } from '@/context/config';
import Home from '@/views/home/Home';
import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/globals/Layout';

function Index() {
    const { selectedNetwork } = useConfig();
    const router = useRouter();

    useEffect(() => {
        if (selectedNetwork) {
            // Get the current query parameters
            const { query } = router;

            // Append the new parameter
            const newQuery = {
                ...query,
                selectedNetwork,
            };

            // Construct the new URL with the updated query parameters
            const href = {
                pathname: '/',
                query: newQuery,
            };

            // Navigate to the new URL without causing a full page refresh
            router.push(href, undefined, { shallow: true });
        }
    }, [selectedNetwork]);

    return (
        <Layout>
            <Home />
        </Layout>
    );
}

export default Index;

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
