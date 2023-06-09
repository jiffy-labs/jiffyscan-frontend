import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <Link rel="icon" href="./favicon.ico" />
                <meta name="description" content="User Operation explorer for Account Abstraction (ERC-4337)" />
                <meta name="keywords" content="4337, Account Abstraction, Explorer, BlockChain, Paymaster, Bundler, Entrypoint"></meta>
                <meta name="author" content="Jiffy Labs"></meta>
                <meta property="og:title" content="Jiffy Scan - User Op Explorer" />
                <meta property="og:type" content="blockchain explorer" />
                <meta property="og:url" content="https://www.jiffyscan.xyz/" />
                <meta property="og:image" content="https://jiffyscan-public-assets.s3.us-east-2.amazonaws.com/favicon.ico" />
                <meta name="twitter:card" content="summary_large_image"></meta>
                <meta name="twitter:site" content="@jiffylabs"></meta>
                <meta name="twitter:creator" content="@jiffylabs"></meta>
                <meta name="twitter:title" content="Jiffy Scan - User Op Explorer"></meta>
                <meta name="twitter:description" content="User Operation explorer for Account Abstraction (ERC-4337)"></meta>
                <meta name="twitter:image" content="https://jiffyscan-public-assets.s3.us-east-2.amazonaws.com/favicon.ico"></meta>
                <title>Jiffy Scan - User Op Explorer</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
