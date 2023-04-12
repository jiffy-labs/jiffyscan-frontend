import { fallBack } from '@/components/common/constants';
import { getNetworkParam } from '@/components/common/utils';
import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import UserOperations from '@/views/userOp/UserOperation';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import ReactGA from 'react-ga4';

function RecentUserOps() {
    const router = useRouter();
    const { slug } = router.query;
    const { selectedNetwork, setSelectedNetwork } = useConfig();

    const customGetNetworkParam = (query: any) => {
        if (query.network) {
            return query.network;
        } else {
            return fallBack;
        }
    };

    useEffect(() => {
        setSelectedNetwork(customGetNetworkParam(router.query));
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }, []);

    return (
        <div>
            <UserOperations slug={slug} />
        </div>
    );
}

export default RecentUserOps;

RecentUserOps.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
