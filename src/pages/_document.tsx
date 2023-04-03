import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="./favicon.ico" />
                <meta name="description" content="User Operation explorer for Account Abstraction (ERC-4337)" />
                <meta name="keywords" content="4337, Account Abstraction, Explorer, BlockChain, Paymaster, Bundler, Entrypoint"></meta>
                <meta name="author" content="Jiffy Labs"></meta>
                <meta property="og:title" content="Jiffy Scan - User Op Explorer" />
                <meta property="og:type" content="blockchain explorer" />
                <meta property="og:url" content="https://www.jiffyscan.xyz/" />
                <meta property="og:image" content="./favicon.ico" />
                <meta name="twitter:card" content="summary_large_image"></meta>
                <title>Jiffy Scan - User Op Explorer</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
