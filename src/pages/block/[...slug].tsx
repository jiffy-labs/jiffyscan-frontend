import SEO from '@/components/common/SEO';
import { getNetworkParam } from '@/components/common/utils';
import Layout from '@/components/global/Layout';
import { useConfig } from '@/context/config';
import RecentBlockActivity from '@/views/recentBlockActivity/recentBlockActivity';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import ReactGA from 'react-ga4';

function RecentBlock() {
    const router = useRouter();
    const { slug } = router.query;
    const { selectedNetwork, setSelectedNetwork } = useConfig();

    useEffect(() => {
        setSelectedNetwork(getNetworkParam());
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <SEO/>
            <RecentBlockActivity slug={slug} />
        </div>
    );
}

export default RecentBlock;

RecentBlock.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
