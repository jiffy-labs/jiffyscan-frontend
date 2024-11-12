import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

function Logo() {
    return (
        <Link href="/">
            <div className="relative h-48 w-48">
                <Image
                    className="dark:hidden block"
                    src="/JiffyLogo.svg"
                    alt="Jiffy Logo"
                    layout="fill"
                    objectFit="contain"
                    priority // This ensures it’s loaded quickly for LCP
                />
                <Image
                    className="hidden dark:block"
                    src="/JiffyLogo_dark.svg"
                    alt="Jiffy Dark Logo"
                    layout="fill"
                    objectFit="contain"
                    priority
                />
            </div>
        </Link>
    );
}

export default Logo;
