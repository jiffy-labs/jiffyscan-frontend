import React, {useState} from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import Link from 'next/link';
import MiniFooter from '@/components/global/minifooter';
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";
import Spinner from "@/components/common/Spinner";

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLoginWithGoogle = async () => {
        try {
            setLoading(true)
            const googleSignInResponse = await signIn("cognito_google")
            if (googleSignInResponse?.error) {
                setErrorMessage(googleSignInResponse.error)
            } else {
                await router.push('/')
            }
        } catch (error: any) {
            console.error('Error initiating Google login:', error);
            setErrorMessage(error.message)
        }
        setLoading(false)
    };

    async function handleLogin() {
        setLoading(true)
        try {
            const signInResponse = await signIn("Credentials_signIn", {email, password, redirect: false,})
            console.log("signInResponse:", signInResponse)
            if (signInResponse?.error) {
                setErrorMessage(signInResponse.error)
            } else {
                await router.push('/')
            }
        } catch (error: any) {
            console.error('Error initiating cognito login:', error);
            setErrorMessage(error.message)
        }
        setLoading(false)
    }

    // useEffect(() => {
    //         signOut({redirect: false})
    //     }, []
    // )
    return (
        <div className="main-box bg-dark-600" style={{height: 'auto !important', minHeight: '100vh'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Image src={logo} alt="logo" className="mt-10 text-center"/>
                <div className="whitebox bg-white rounded px-10 mt-11 py-5" style={{height: '546px', width: '464px'}}>
                    <p className="text-black text-xl font-weight-bold mt-4 text-center" style={{fontSize: '1.4rem'}}>
                        Login
                    </p>
                    {errorMessage && <div
                      className="font-regular mt-5 relative block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                        {errorMessage}
                    </div>}
                    {successMessage && <div
                      className="font-regular mt-5 relative  block w-full rounded-lg bg-green-500 p-4 text-base leading-5 text-white opacity-100">
                        {successMessage}
                    </div>}
                    {loading && <div className={'align-items-center d-flex flex justify-center mt-3'}>
                      <Spinner height={'1rem'} width={'1rem'}/>
                    </div>}
                    <button
                        type="button"
                        onClick={() => handleLoginWithGoogle()}
                        className="w-full mt-5 text-center justify-center focus:ring-0 focus:outline-none rounded border border-dark-200 md:text-md sm:text-sm text-[10px] px-5 py-3 inline-flex items-center mb-2"
                    >
                        <img src="/images/google.svg" alt=""/>
                        <span
                            className="uppercase font-medium text-dark-600 ml-1 sm:ml-2 tracking-[1.5px]">continue with google</span>
                    </button>

                    <p className="text-black text-md font-weight-bold mt-5 text-center">or</p>
                    <input
                        type="text"
                        className="form-control text-black bottom-border w-full mt-5 mt-lg-9"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        required
                    />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control text-black bottom-border w-full mt-5 mt-lg-9"
                        placeholder="Password"
                        id="password"
                        required
                    />
                    <button
                        onClick={() => handleLogin()}
                        className="text-white font-weight-bold text-center bg-dark-600 w-full rounded py-2 mt-8">LOGIN
                    </button>
                    <p className="text-black text-xl font-weight-bold mt-9 text-center"
                       style={{color: '#1976D2', fontSize: '14px'}}>
                        Reset Password
                    </p>
                    <Link href="/register">
                        <p className=" text-black text-xl font-weight-bold mt-5 text-center" style={{fontSize: '14px'}}>
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
