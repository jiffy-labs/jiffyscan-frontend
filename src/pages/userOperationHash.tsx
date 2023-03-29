import Layout from '@/components/globals/Layout';
import RecentUserOpsHash from '@/views/userOp/UserOperationHash';
import React, { ReactElement } from 'react';

function recentUserOpsHash() {
    return (
        <div>
            <RecentUserOpsHash />
        </div>
    );
}

export default recentUserOpsHash;

recentUserOpsHash.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
