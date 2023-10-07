import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/global/Layout';
import ManageApi from '@/views/ApiKeys';
import ReactGA from 'react-ga4';
import SEO from '@/components/common/SEO';

function ApiKeys() {
    useEffect(() => {
        ReactGA.send({ hitType: 'CreateAPIKey', page: window.location.pathname });
    }, []);

    return (
        <div>
            {/* <SEO/>
            <ManageApi /> */}
            test
        </div>
    );
}

export default ApiKeys;

ApiKeys.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
