import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import pages from './pages.json';
import Menu from './Menu';

export default function Pages() {
    const { pathname } = useRouter();

    return (
        <div className="flex md:flex-row flex-col md:items-center space-x-8 gap-4 md:gap-6 text-[#646D8F] dark:text-[#BCBFCC]">
            {pages.map(({ id, name, url, dropdown }) => {
                if (name == 'Home') {
                    return <Menu key={id} name={name} dropdown={dropdown} id={id.toString()} url={url} />;
                } else {
                    return <Menu key={id} name={name} dropdown={dropdown} id={id.toString()} />;
                }
            })}
        </div>
    );
}
