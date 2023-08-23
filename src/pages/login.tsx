import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/global/Layout';
import { useConfig } from '@/context/config';
import TopPaymasters from '@/views/topPaymasters/TopPaymasters';
import { useRouter } from 'next/router';
import { getNetworkParam } from '@/components/common/utils';
import ReactGA from 'react-ga4';
import SEO from '@/components/common/SEO';
import LoginComponent from '../views/login/login'

function Login() {
    const router = useRouter();

    // useEffect(() => {
    //     ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    // }, []);

    return (
        <div>
            <SEO/>
            {/* <TopPaymasters /> */}
            <LoginComponent/>
        </div>
    );
}

export default Login;

Login.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
