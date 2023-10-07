// components/Paywall.js
import { useState } from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';

type LoginModalProps = {
    showClose?: boolean;
    block: boolean;
    setBlock: (block: boolean) => void;
};

function LoginModal(props: LoginModalProps) {

    if (!props.block) return null;

    return (
        <div className="absolute z-10 flex flex-col items-center justify-center inset-x-1">
            <div className="relative p-6 text-center bg-white rounded-lg shadow-lg">
                {props.showClose && <button
                    className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
                    onClick={() => props.setBlock(false)} // You'll need to implement the closeLoginDialog function
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>}
                <h1 className="mb-4 text-3xl font-semibold">Kindly Login</h1>
                <p className="mb-8 text-gray-600">Sign In to Continue.</p>
                <div className={'inline-flex'}>
                    <div className={'mr-4'}>
                        <Button onClick={() => signIn('github')}>GITHUB</Button>
                    </div>
                    <Button onClick={() => signIn('twitter')}>TWITTER</Button>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
