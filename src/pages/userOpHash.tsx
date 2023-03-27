import Layout from '@/components/globals/Layout';
import LatestUserOps from '@/views/latestUserOps/UserOperations';
import RecentUserOps from '@/views/userOp/RecentUserOps';
import React, { ReactElement } from 'react';

function recentUserOps() {
    return (
        <div>
            <RecentUserOps />
        </div>
    );
}

export default recentUserOps;

recentUserOps.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;