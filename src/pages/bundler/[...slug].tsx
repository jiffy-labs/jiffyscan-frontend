import { getNetworkParam } from '@/components/common/utils';
import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import Bundler from '@/views/bundler/Bundler';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import ReactGA from 'react-ga4';

function RecentBundler() {
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });

    }, []);

    return (
        <div>
            <Bundler slug={slug} />
        </div>
    );
}

export default RecentBundler;

RecentBundler.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
