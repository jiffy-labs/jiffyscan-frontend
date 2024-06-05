import SEO from '@/components/common/SEO';
import { getNetworkParam } from '@/components/common/utils';
import Layout from '@/components/global/Layout';
import { useConfig } from '@/context/config';
import Bundler from '@/views/bundle/Bundle';
import BundlerNew from '@/views/bundle/BundleNew';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import ReactGA from 'react-ga4';

function RecentAccount() {
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <SEO/>
            <BundlerNew slug={slug} />
        </div>
    );
}

export default RecentAccount;

RecentAccount.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
