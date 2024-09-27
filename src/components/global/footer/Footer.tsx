import IconButton from '@/components/common/icon_button/IconButton';
import Token from '@/components/common/Token';
import Link from 'next/link';
import React from 'react';
import BacktoTop from './BacktoTop';
import Copyright from './Copyright';
import Donations from './Donations';
import pages from './pages.json';
import socials from './social.json';
import FeedbackCard from './FeedbackCard';
import Script from 'next/script';

function Footer() {
    return (
        <>
            <FeedbackCard />
            <footer className="py-8 text-white bg-dark-600 md:py-12">
                <div className="container flex flex-col gap-8 md:gap-12">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="flex gap-1 items-center -ml-3 md:ml-0">
                            {socials.map(({ icon, id, url }) => (
                                <Link className="grid place-content-center w-14 h-14" target="_blank" href={url} key={id}>
                                    <img src={icon} alt="" />
                                </Link>
                            ))}
                        </div>
                        <div className="">
                            <BacktoTop />
                        </div>
                    </div>
                    <hr className="border-dark-300" />
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        <div>
                            <div className="mb-6">
                                <Link href="/">
                                    <img src="/images/Frame 22.svg" alt="" />
                                </Link>
                            </div>
                            <p className="text-sm">
                                A block explorer and analytics platform for Account Abstraction on EVM chains using EIP-4337.
                            </p>
                        </div>
                        {pages.map(({ id, lists, name }) => (
                            <div key={id} className="md:place-self-center md:self-start">
                                <b className="block mb-6 text-sm font-normal text-dark-200">{name}</b>
                                <div className="flex flex-col gap-3 md:gap-5">
                                    {lists.map(([name, url], index) => (
                                        <Link
                                            className="flex gap-2 items-center font-bold text-white group"
                                            key={index}
                                            target="_blank"
                                            href={url}
                                        >
                                            <span>{name}</span>
                                            <img
                                                className="duration-100 group-hover:translate-x-1"
                                                src="/images/icon-container (17).svg"
                                                alt=""
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className="border-dark-300" />
                    <div className="flex flex-wrap gap-3 justify-between md:gap-10">
                        <Copyright />
                        <Donations />
                    </div>
                    <Script
                        id="dealfront"
                        dangerouslySetInnerHTML={{
                            __html: `(function(ss,ex){ window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; (function(d,s){ fs=d.getElementsByTagName(s)[0]; function ce(src){ var cs=d.createElement(s); cs.src=src; cs.async=1; fs.parentNode.insertBefore(cs,fs); }; ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); })(document,'script'); })('lYNOR8xyObe7WQJZ');`,
                        }}
                    />
                </div>
            </footer>
        </>
    );
}

export default Footer;
