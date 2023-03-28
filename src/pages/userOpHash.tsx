import Layout from '@/components/globals/Layout';
import RecentUserOps from '@/views/userOp/UserOperation';
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
