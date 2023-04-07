import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import UserOperations from '@/views/userOp/UserOperation';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

function RecentUserOps() {
    const router = useRouter();
    const { slug } = router.query;
    const { selectedNetwork, setSelectedNetwork } = useConfig();

    const getNetworkState = (query:any) => {
        console.log(query);
        let network = query['network']?.toString();
        return network != null ? network : 'mainnet';
    };

    useEffect(() => {
        setSelectedNetwork(getNetworkState(router.query));
    }, [])

    return (
        <div>
            <UserOperations slug={slug} />
        </div>
    );
}

export default RecentUserOps;

RecentUserOps.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
