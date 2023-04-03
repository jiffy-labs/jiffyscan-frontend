import Layout from '@/components/globals/Layout';
import RecentAddressActivity from '@/views/recentAddressActivity/recentAddressActivity';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

function RecentAddress() {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div>
            <RecentAddressActivity slug={slug} />
        </div>
    );
}

export default RecentAddress;

RecentAddress.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
