import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ConfigProvider } from '@/context/config';
import { Analytics } from '@vercel/analytics/react';
import '../styles/main.sass';
import ReactGA from 'react-ga4';
import { SessionProvider } from 'next-auth/react';
import HeapAnalytics from '@/components/global/HeapAnalytics';
import UserSessionStore from '@/context/userSession';
import NameServiceStore from '@/context/nameServiceContext';
import PHProvider from '@/context/postHogProvider';
import { useTokenPrices } from '@/hooks/useTokenPrices';
import TopBanner from '@/components/global/navbar/TopBanner';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/context/ThemeContext';

const GeistSans = localFont({
  src: [
    {
      path: '../../public/fonts/Geist-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist-Bold.otf',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-geist-sans',
});

const GeistMono = localFont({
  src: '../../public/fonts/GeistMono-Regular.otf',
  variable: '--font-geist-mono',
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const TRACKING_ID = 'G-8HQ9S4Z1YF';
ReactGA.initialize(TRACKING_ID);

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    useTokenPrices();
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <div className={`${GeistSans.variable} ${GeistMono.variable}`} style={{
          transform: 'scale(0.85)',        // Scale down to 85%
                transformOrigin: 'top left',    // Keep the transform origin at the top left
                width: '117.65%',                // Set width to 117.65% to maintain layout
                height: '100vh', 
      }}>
            <PHProvider>
                <SessionProvider session={session}>
                    <UserSessionStore>
                        <NameServiceStore>
                            <ConfigProvider><ThemeProvider>{getLayout(<div><TopBanner/><Component {...pageProps} /></div>)}</ThemeProvider></ConfigProvider>
                            <HeapAnalytics />
                        </NameServiceStore>
                    </UserSessionStore>
                </SessionProvider>
                <Analytics />
            </PHProvider>
        </div>
    );
}
