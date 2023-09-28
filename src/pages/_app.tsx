import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ConfigProvider } from '@/context/config';
import { Analytics } from '@vercel/analytics/react';
import '../styles/main.sass';
import ReactGA from 'react-ga4';
import SessionStore from '@/context/session';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const TRACKING_ID = 'G-8HQ9S4Z1YF';
ReactGA.initialize(TRACKING_ID);

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <div>
            <SessionStore>
                <ConfigProvider>{getLayout(<Component {...pageProps} />)}</ConfigProvider>
            </SessionStore>
            <Analytics />
        </div>
    );
}
