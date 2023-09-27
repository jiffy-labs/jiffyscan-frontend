import SEO from '@/components/common/SEO'
import React, { ReactElement, useEffect } from 'react';
import Layout from '@/components/global/Layout';
import Recovery from "../views/recover/recover"
import ReactGA from 'react-ga4';


function Recover  () {
    useEffect(() => {
        ReactGA.send({ hitType: 'Recover', page: window.location.pathname });
    }, []);
  return (
    <div>
        <SEO/>
        <Recovery />
    </div>
  )
}

export default Recover;

Recover.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;