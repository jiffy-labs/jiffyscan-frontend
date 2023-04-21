import { useRouter } from 'next/router';
import { useConfig } from '@/context/config';
import Home from '@/views/home/Home';
import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/globals/Layout';
import { getNetworkParam } from '@/components/common/utils';
import ReactGA from 'react-ga4';
import { duration } from 'moment';

function Index() {
    const router = useRouter();

    const { query } = router;

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <Layout>
            <Home />
        </Layout>
    );
}

export default Index;
Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
