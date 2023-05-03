import { getNetworkParam } from '@/components/common/utils';
import Layout from '@/components/global/Layout';
import { useConfig } from '@/context/config';
import RecentPaymentMaster from '@/views/recentPaymentMaster/recentPaymentMaster';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import ReactGA from 'react-ga4';

function RecentPayment() {
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <RecentPaymentMaster slug={slug} />
        </div>
    );
}

export default RecentPayment;

RecentPayment.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
