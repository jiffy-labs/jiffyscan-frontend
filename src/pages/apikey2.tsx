import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/global/Layout';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga4';
import SEO from '@/components/common/SEO';
import ApiKeys2Component from '@/views/ApiKeys2/ApiKeys2';

function ApiKeys2() {
    const router = useRouter();

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <SEO />
            <ApiKeys2Component />
        </div>
    );
}

export default ApiKeys2;

ApiKeys2.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
