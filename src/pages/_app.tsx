import React from 'react';
import type {ReactElement, ReactNode} from 'react';
import type {GetServerSideProps, NextPage} from 'next';
import type {AppProps} from 'next/app';
import {ConfigProvider} from '@/context/config';
import {Analytics} from '@vercel/analytics/react';
import '../styles/main.sass';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

import ReactGA from 'react-ga4';
import {getSession, SessionProvider} from "next-auth/react";

const TRACKING_ID = 'G-8HQ9S4Z1YF';
ReactGA.initialize(TRACKING_ID);
export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
    const session = await getSession(ctx);
    return {
        props: {
            session,
        },
    };
}
export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <div>
            <SessionProvider session={pageProps.session}>
                <ConfigProvider>{getLayout(<Component {...pageProps} />)}</ConfigProvider>
                <Analytics/>
            </SessionProvider>
        </div>
    );
}
