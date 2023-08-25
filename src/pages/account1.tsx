import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/global/Layout';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga4';
import SEO from '@/components/common/SEO';
import AccountComponent from '@/views/account1/account1';

function Account1() {
    const router = useRouter();

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <SEO/>
            {/* <TopPaymasters /> */}
            <AccountComponent/>
        </div>
    );
}

export default Account1;

Account1.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
