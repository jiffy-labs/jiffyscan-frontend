import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useState} from 'react';
import pages from './pages.json';
import Menu from './Menu';

export default function Pages() {
    const { pathname } = useRouter();

    return (
        <div className="flex md:flex-row flex-col md:items-center gap-4 md:gap-6">
            {pages.map(({ id, name, url, dropdown }) => {
                if (name == 'Home') {
                    return <Menu key={id} name={name} dropdown={dropdown} id={id.toString()} url={url} />;
                } else {
                    return <Menu key={id} name={name} dropdown={dropdown} id={id.toString()} />;
                }
            })}

            
                <Link legacyBehavior href="https://dashboard.jiffyscan.xyz/" passHref>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lg:hidden bg-[#275EC9] text-white no-underline hover:no-underline rounded-[27px] h-[40px] px-[24px] py-[8px] flex items-center justify-center gap-2 font-roboto text-base font-normal leading-[20px]"
                    >
                        Visit Dashboard
                    </a>
                </Link>
            
        </div>
    );
}

