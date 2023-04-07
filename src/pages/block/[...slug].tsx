import Layout from '@/components/globals/Layout';
import RecentBlockActivity from '@/views/recentBlockActivity/recentBlockActivity';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

function RecentBlock() {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div>
            <RecentBlockActivity slug={slug} />
        </div>
    );
}

export default RecentBlock;

RecentBlock.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
