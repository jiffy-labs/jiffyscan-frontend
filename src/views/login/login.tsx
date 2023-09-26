import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import Link from 'next/link';
import MiniFooter from '@/components/global/minifooter';
import {signIn, useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import Spinner from '@/components/common/Spinner';
import {mockProviders} from 'next-auth/client/__tests__/helpers/mocks';
import {TextField} from '@mui/material';

const LoginComponent = () => {
    const {data: session, status, update} = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const {query} = router;

    const handleLoginWithGoogle = async () => {
        try {
            setLoading(true);
            const googleSignInResponse = await signIn('cognito_google', {
                redirect: false,
                callbackUrl: `http://localhost:3000${query?.callBack}`,
            });
            console.log('googleSignInResponse:', googleSignInResponse);
            if (googleSignInResponse?.error) {
                setErrorMessage(googleSignInResponse.error);
                setLoading(false);
            }
        } catch (error: any) {
            console.error('Error initiating Google login:', error);
            setLoading(false);
            setErrorMessage(error.message);
        }
    };

    async function handleLogin() {
        setLoading(true);
        try {
            const signInResponse = await signIn('Credentials_signIn', {
                email,
                password,
                redirect: true,
                callbackUrl: query?.callBack ? `${query?.callBack}` : '/',
            });
            console.log('signInResponse:', signInResponse);
            if (signInResponse?.error) {
                setErrorMessage(signInResponse.error);
                setLoading(false);
            }
        } catch (error: any) {
            console.error('Error initiating cognito login:', error);
            setErrorMessage(error.message);
            setLoading(false);
        }
    }

    // useEffect(() => {
    //         signOut({redirect: false})
    //     }, []
    // )
    return (
        <div className="main-box bg-dark-600" style={{height: 'auto !important', minHeight: '100vh'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Image src={logo} alt="logo" className="mt-10 text-center"/>
                <div className="px-10 py-5 bg-white rounded whitebox mt-11" style={{height: '546px', width: '464px'}}>
                    <p className="mt-4 text-xl text-center text-black font-weight-bold" style={{fontSize: '1.4rem'}}>
                        Login
                    </p>
                    {errorMessage && (
                        <div
                            className="relative block w-full p-4 mt-5 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div
                            className="relative block w-full p-4 mt-5 text-base leading-5 text-white bg-green-500 rounded-lg opacity-100 font-regular">
                            {successMessage}
                        </div>
                    )}
                    {loading && (
                        <div className={'align-items-center d-flex flex justify-center mt-3'}>
                            <Spinner height={'1rem'} width={'1rem'}/>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => handleLoginWithGoogle()}
                        className="w-full mt-5 text-center hidden justify-center focus:ring-0 focus:outline-none rounded border border-dark-200 md:text-md sm:text-sm text-[10px] px-5 py-3 inline-flex items-center mb-2"
                    >
                        <img src="/images/google.svg" alt=""/>
                        <span className="uppercase font-medium text-dark-600 ml-1 sm:ml-2 tracking-[1.5px]">continue with google</span>
                    </button>

                    {/* <p className="mt-5 text-center text-black text-md font-weight-bold">or</p> */}
                    <br/>
                    <br/>
                    <br/>
                    <TextField
                        label="Email"
                        id="email"
                        size="small"
                        variant="standard"
                        type="text"
                        className="w-full mb-6"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        id="password"
                        size="small"
                        variant="standard"
                        type="password"
                        className="w-full mb-6"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        onClick={() => handleLogin()}
                        className="w-full py-2 mt-8 text-center text-white rounded font-weight-bold bg-dark-600"
                    >
                        LOGIN
                    </button>

                    <Link href={`/resetPassword`}>
                        <p className="mt-5 text-xl text-center text-black font-weight-bold" style={{fontSize: '14px', color: '#1976D2'}}>
                            Reset Password
                        </p>
                    </Link>

                    <Link href={`/register?callBack=${router.query.callBack ? router.query.callBack : '/'}`}>
                        <p className="mt-5 text-xl text-center text-black font-weight-bold" style={{fontSize: '14px'}}>
                            No account? <span style={{color: '#1976D2'}}>Create one</span>
                        </p>
                    </Link>
                    <style>
                        {`
                            .bottom-border {
                              border-left: none;
                              border-right: none;
                              border-top: none;
                              border-radius: 0;
                              border-bottom: 1px solid #000;
                            }
                            .bottom-border::placeholder {
                              color: #000;
                            }  @media (max-width: 576px) {
                             .main-box{
                                height:auto !important;
                                padding:0 30px !important;
                             }
                             .whitebox{
                               width:auto !important;
                             }
                             .footer{
                                margin-top:125px;
                            }
                              }
                              @media (min-width: 576px) and (max-width: 768px) {
                                .whitebox{
                                    width:auto !important;
                                  }
                                  .main-box{
                                    height:auto !important;
                                 }
                              }
                              @media (min-width: 768px) and (max-width: 1700px) {
                                 .whitebox{
                                    width:auto !important;
                                  }
                              }
                              .whitebox button{
                                justify-content:center
                              }
                              .box{
                                border:1px solid #e5e7eb !important;
                                box-shadow:none !important;
                                border-radius: 5px !important;
                              }
                            `}
                    </style>
                </div>
            </div>
            <MiniFooter/>
        </div>
    );
};
export default LoginComponent;
