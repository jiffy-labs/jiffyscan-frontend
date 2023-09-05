import {useRouter} from 'next/router';
import Home from '@/views/home/Home';
import React, {ReactElement, useEffect} from 'react';
import Layout from '@/components/global/Layout';
import ReactGA from 'react-ga4';
import SEO from '@/components/common/SEO';
import {useSession} from "next-auth/react";

function Index() {
    const router = useRouter();
    const {data: sessions, status} = useSession()
    const {query} = router;
    console.log("sessions:", sessions)
    useEffect(() => {
        ReactGA.send({hitType: 'pageview', page: window.location.pathname});
    }, []);

    return (
        <Layout>
            <SEO/>
            <Home/>
        </Layout>
    );
}

export default Index;
Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
