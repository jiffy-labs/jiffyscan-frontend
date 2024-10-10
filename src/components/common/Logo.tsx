import Link from 'next/link';
import React from 'react';

function Logo() {
    return (
        <Link href="/">
            <img className=" dark:hidden block" src="/JiffyLogo.svg" alt="" />
            <img className="hidden dark:block block h-48 w-48" src="/JiffyLogo_dark.svg" alt="" />
            
        </Link>
    );
}

export default Logo;
