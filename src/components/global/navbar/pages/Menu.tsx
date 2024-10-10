import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

function Menu(props: { name: string | any ; dropdown: string[][] | undefined; id: string; url?: string }) {
    const { pathname, push } = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const current = props.url === pathname;
    const menuRef = useRef<HTMLDivElement>(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseDropdown = () => {
        setIsOpen(false);
    };

    const redirectHome = () => {
        push('/');
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <div className="relative" id={props.id} ref={menuRef}>
            <button
                className={`flex items-center gap-1 text-xl tracking-[0.25px] underline-offset-[10px] decoration-2 font-gsans ${
                    current ? 'text-blue-200' : 'hover:no-underline'
                }`}
                onClick={props.url ? redirectHome : handleToggleDropdown}
            >
                {props.url ? (
                    <Link href={props?.url} className="hover:no-underline">
                        {props.name}
                    </Link>
                ) : (
                    props.name
                )}

                {props.dropdown != undefined ? <img src="/images/icon-container.svg" alt="" className='dark:hidden'/> : null}
                {props.dropdown != undefined ? <RiArrowDownSLine className='dark:block hidden w-5 h-5 ' /> : null}
                
            </button>

            {isOpen && (
                <div className="sticky md:absolute shadow top-full left-0 bg-white rounded-lg py-2 px-4">
                    <ul>
                        {props.dropdown?.map((menuItem, index) => (
                            <li key={index}>
                                <a className="text-gray-700 block px-4 py-2 text-sm" href={menuItem[1]} target={menuItem[2]}>
                                    {menuItem[0]}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Menu;
