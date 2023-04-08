import { getNetworkState } from '@/components/common/utils';
import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import RecentAddressActivity from '@/views/recentAddressActivity/recentAddressActivity';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

function RecentAddress() {
    const router = useRouter();
    const { slug } = router.query;
    const { selectedNetwork, setSelectedNetwork } = useConfig();


    useEffect(() => {
        setSelectedNetwork(getNetworkState(router.query));
    }, [selectedNetwork])

    return (
        <div>
            <RecentAddressActivity slug={slug} />
        </div>
    );
}

export default RecentAddress;

RecentAddress.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
