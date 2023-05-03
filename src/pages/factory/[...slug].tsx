import { getNetworkParam } from '@/components/common/utils';
import Layout from '@/components/global/Layout';
import { useConfig } from '@/context/config';
import Factory from '@/views/factory/Factory';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import ReactGA from 'react-ga4';

function RecentBundler() {
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <Factory slug={slug} />
        </div>
    );
}

export default RecentBundler;

RecentBundler.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;