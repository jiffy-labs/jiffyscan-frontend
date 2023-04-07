import Layout from '@/components/globals/Layout';
import RecentAccountOps from '@/views/recentAddressActivity/RecentAddressActivity';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

function RecentAccount() {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div>
            <RecentAccountOps slug={slug} />
        </div>
    );
}

export default RecentAccount;

RecentAccount.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
