import Layout from '@/components/global/Layout';
import LatestBundlesComponent from '@/views/recentBundles/Bundles';
import { useConfig } from '@/context/config';
import router from 'next/router';
import React, { ReactElement } from 'react';
import { useEffect } from 'react';
import { getNetworkParam } from '@/components/common/utils';
import ReactGA from 'react-ga4';
import SEO from '@/components/common/SEO';

function LatestBundles() {
    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <SEO/>
            <LatestBundlesComponent />
        </div>
    );
}

export default LatestBundles;

LatestBundles.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
