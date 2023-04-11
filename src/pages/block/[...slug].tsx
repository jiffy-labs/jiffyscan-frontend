import { getNetworkParam } from '@/components/common/utils';
import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import RecentBlockActivity from '@/views/recentBlockActivity/recentBlockActivity';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

function RecentBlock() {
    const router = useRouter();
    const { slug } = router.query;
    const { selectedNetwork, setSelectedNetwork } = useConfig();

    useEffect(() => {
        setSelectedNetwork(getNetworkParam());
    }, []);

    return (
        <div>
            <RecentBlockActivity slug={slug} />
        </div>
    );
}

export default RecentBlock;

RecentBlock.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
