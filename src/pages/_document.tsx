import SEO from '@/components/common/SEO';
import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
    return (
        <Html>
            <Head>
                <Link rel="icon" href="./favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
