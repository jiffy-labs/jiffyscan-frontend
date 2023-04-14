import Layout from '@/components/globals/Layout';
import LatestBundlesComponent from '@/views/recentBundles/Bundles';
import { useConfig } from '@/context/config';
import router from 'next/router';
import React, { ReactElement } from 'react';
import { useEffect } from 'react';
import { getNetworkParam } from '@/components/common/utils';
import ReactGA from 'react-ga4';

function LatestBundles() {
    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <LatestBundlesComponent />
        </div>
    );
}

export default LatestBundles;

LatestBundles.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
