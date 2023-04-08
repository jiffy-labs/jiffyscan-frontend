import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import LatestUserOpsComponent from '@/views/recentUserOps/UserOperations';
import { useRouter } from 'next/router';
import { getNetworkParam } from '@/components/common/utils';

function LatestUserOps() {
    const router = useRouter();
    
    return (
        <div>
            <LatestUserOpsComponent />
        </div>
    );
}

export default LatestUserOps;

LatestUserOps.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
