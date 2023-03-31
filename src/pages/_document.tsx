import { Html, Head, Main, NextScript } from 'next/document';
import favicon from '@/public/favicon.ico';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="./favicon.ico" />
                <title>Jiffy Scan</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
