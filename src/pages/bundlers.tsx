import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/global/Layout';
import { useConfig } from '@/context/config';
import TopBundlers from '@/views/topBundlers/TopBundlers';
import { useRouter } from 'next/router';
import { getNetworkParam } from '@/components/common/utils';
import ReactGA from 'react-ga4';
import SEO from '@/components/common/SEO';

function LatestUserOps() {
    const router = useRouter();

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <SEO/>
            <TopBundlers />
        </div>
    );
}

export default LatestUserOps;

LatestUserOps.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
