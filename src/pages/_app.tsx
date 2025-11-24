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
import { VscSparkleFilled } from "react-icons/vsc";
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

  const handleSwitchToV2 = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.hostname = 'v2.jiffyscan.xyz';
    window.location.href = currentUrl.toString();
  };



  return (
    <div className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <PHProvider>
        <SessionProvider session={session}>
          <UserSessionStore>
            <NameServiceStore>
              <ConfigProvider>{getLayout(<div><TopBanner /><Component {...pageProps} /></div>)}</ConfigProvider>
              <HeapAnalytics />
            </NameServiceStore>
          </UserSessionStore>
        </SessionProvider>
        <Analytics />
        {/* Floating Button for Switching to v2 */}
        {/* <button
                id='switch-to-v2'
    onClick={handleSwitchToV2}
    className="fixed bottom-10 flex items-center gap-2 text-16 right-5 bg-[#EED5CD] border-2 font-kaisei font-semibold border-[#EEC3A4] text-[#3C40F1] py-2 px-4 rounded-lg transition duration-300 z-50 overflow-hidden" 
>
    <img src="/sparkling.svg" alt="" />
    Switch to v2

    {/* Glass Shine Effect *\/}
    <span className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-xs animate-shine pointer-events-none rounded-lg"></span>
</button> */}

      </PHProvider>
    </div>
  );
}
