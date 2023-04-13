import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import LatestUserOpsComponent from '@/views/recentUserOps/UserOperations';
import { useRouter } from 'next/router';
import { getNetworkParam } from '@/components/common/utils';
import ReactGA from 'react-ga4';

function LatestUserOps() {
    const router = useRouter();

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }, [])


    return (
        <div>
            <LatestUserOpsComponent />
        </div>
    );
}

export default LatestUserOps;

LatestUserOps.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
