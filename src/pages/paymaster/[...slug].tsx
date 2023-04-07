import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import RecentPaymentMaster from '@/views/recentPaymentMaster/recentPaymentMaster';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

function RecentPayment() {
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
            <RecentPaymentMaster slug={slug} />
        </div>
    );
}

export default RecentPayment;

RecentPayment.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
