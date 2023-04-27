import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import TopPaymasters from '@/views/topPaymasters/TopPaymasters';
import { useRouter } from 'next/router';
import { getNetworkParam } from '@/components/common/utils';
import ReactGA from 'react-ga4';

function LatestUserOps() {
    const router = useRouter();

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <TopPaymasters />
        </div>
    );
}

export default LatestUserOps;

LatestUserOps.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
