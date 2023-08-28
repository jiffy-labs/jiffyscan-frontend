import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/global/Layout';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga4';
import SEO from '@/components/common/SEO';
import ApiKeys1Component from '@/views/apikeys/apikeys';

function Apikeys1() {
    const router = useRouter();

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }, []);

    return (
        <div>
            <SEO />
            <ApiKeys1Component />
        </div>
    );
}

export default Apikeys1;

Apikeys1.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
