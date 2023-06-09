import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/global/Layout';
import { useConfig } from '@/context/config';
import TopFactories from '@/views/topFactories/TopFactories';
import { useRouter } from 'next/router';
import { getNetworkParam } from '@/components/common/utils';
import ReactGA from 'react-ga4';
import SEO from '@/components/common/SEO';

function Factories() {
    const router = useRouter();

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <SEO/>
            <TopFactories />
        </div>
    );
}

export default Factories;

Factories.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
