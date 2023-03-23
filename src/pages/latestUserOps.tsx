import Layout from '@/components/globals/Layout'
import LatestUserOps from '@/views/latestUserOps/UserOperations'
import React, { ReactElement } from 'react'

function latestUserOps() {
  return (
    <div>
      <LatestUserOps />
    </div>
  )
}

export default latestUserOps

latestUserOps.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
