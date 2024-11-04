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
    const handleSwitchToV2 = () => {
        const currentUrl = new URL(window.location.href);
        currentUrl.hostname = 'www.jiffyscan.xyz';
        window.location.href = currentUrl.toString();
    };

    return (
        <>
            <div
                className={`${GeistSans.variable} ${GeistMono.variable}`}
                style={{
                    transform: 'scale(0.9)', // Scale down to 90%
                    transformOrigin: 'top left', // Keep the transform origin at the top left
                    width: '111.11%', // Set width to 111.11% for 90% scaling
                    height: '100vh',
                }}
            >
                <PHProvider>
                    <SessionProvider session={session}>
                        <UserSessionStore>
                            <NameServiceStore>
                                <ConfigProvider>
                                    <ThemeProvider>
                                        {getLayout(
                                            <div>
                                                <Component {...pageProps} />
                                            </div>,
                                        )}
                                    </ThemeProvider>
                                </ConfigProvider>
                                <HeapAnalytics />
                            </NameServiceStore>
                        </UserSessionStore>
                    </SessionProvider>
                    <Analytics />
                </PHProvider>
            </div>
            
            {/* Floating Button */}
            <button
                onClick={handleSwitchToV2}
                className="fixed bottom-10 right-5 flex justify-center items-center text-center gap-2 text-base bg-[#FFFFFF] dark:bg-[#1F202B] border-2 font-kaisei font-semibold border-[#D7DAE0] dark:border-[#3B3C40] text-[#6366F1] py-2 px-4 rounded-lg transition duration-300 z-50 shadow-xl dark:shadow-black/40 w-36"
            >
                {/* <img src="/sparkling.svg" alt="Sparkling Icon" /> */}
                Back to v1
            </button>
        </>
    );
}
