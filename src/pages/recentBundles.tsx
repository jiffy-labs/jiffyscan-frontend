import Layout from '@/components/globals/Layout';
import LatestBundlesComponent from '@/views/recentBundles/Bundles';
import { useConfig } from '@/context/config';
import router from 'next/router';
import React, { ReactElement } from 'react';
import { useEffect } from 'react';
import { getNetworkParam } from '@/components/common/utils';

function LatestBundles() {
    return (
        <div>
            <LatestBundlesComponent />
        </div>
    );
}

export default LatestBundles;

LatestBundles.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
