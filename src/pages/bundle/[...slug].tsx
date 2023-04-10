import { getNetworkParam } from '@/components/common/utils';
import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import RecentAddressActivity from '@/views/recentAddressActivityBundle/recentAddressActivity';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

function RecentAccount() {
    const router = useRouter();
    const { slug } = router.query;
    console.log("🚀 ~ file: [...slug].tsx:11 ~ RecentAccount ~ slug:", slug)

    return (
        <div>
            <RecentAddressActivity slug={slug} />
        </div>
    );
}

export default RecentAccount;

RecentAccount.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
