import Layout from '@/components/globals/Layout';
import LatestBundles from '@/views/latestBundles/Bundles';
import React, { ReactElement } from 'react';

function latestBundles() {
    return (
        <div>
            <LatestBundles />
        </div>
    );
}

export default latestBundles;

latestBundles.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
