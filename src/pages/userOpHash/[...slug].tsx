import Layout from '@/components/globals/Layout';
import UserOperations from '@/views/userOp/UserOperation';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

function RecentUserOps() {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div>
            <UserOperations slug={slug} />
        </div>
    );
}

export default RecentUserOps;

RecentUserOps.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
