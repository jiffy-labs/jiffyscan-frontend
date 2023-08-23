import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import google from '../../../public/images/google.png';
import github from '../../../public/images/github.png';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import Copyright from '@/components/global/footer/Copyright';
import Donations from '@/components/global/footer/Donations';
import Footer from '@/components/global/footer/Footer';

const LoginComponent = () => {
    const responseGoogleSuccess = (response: any) => {
        window.location.reload();
        console.log('Google login success:', response);
    };

    const responseGoogleFailure = (error: any) => {
        console.error('Google login error:', error);
    };

    const handleGithubLogin = async () => {
        try {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user`;
        } catch (error) {
            console.error('Error initiating GitHub login:', error);
        }
    };

    const shouldShowLogin = true;

    return (
        <div className="main-box bg-dark-600" style={{ height: '100vh !important' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image src={logo} alt="logo" className="mt-10 text-center" />
                <div className="whitebox bg-white rounded px-10 mt-11 py-5" style={{ height: '546px', width: '464px' }}>
                    <p className="text-black text-xl font-weight-bold mt-4 text-center" style={{ fontSize: '1.4rem' }}>
                        Login
                    </p>
                    <GoogleLogin
                        clientId="YOUR_GOOGLE_CLIENT_ID"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={responseGoogleSuccess}
                        onFailure={responseGoogleFailure}
                        cookiePolicy={'single_host_origin'}
                        className="rounded py-2 mt-6 w-full gap-3 text-center"
                        // style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        style={{
                            border: '1px solid #e5e7eb', // Add the border style
                            // ... other styles ...
                        }}
                    >
                        <p className="text-black font-weight-bold">LOGIN WITH GOOGLE</p>
                    </GoogleLogin>

                    <button
                        onClick={handleGithubLogin}
                        className="rounded border py-2 text-black font-weight-bold mt-2 w-full gap-3"
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image src={github} alt="logo" />
                        <p className="text-black font-weight-bold" style={{ marginLeft: '17px' }}>
                            LOGIN WITH GITHUB
                        </p>
                    </button>

                    <p className="text-black text-md font-weight-bold mt-5 text-center">or</p>
                    <input
                        type="text"
                        className="form-control text-black bottom-border w-full mt-5 mt-lg-9"
                        placeholder="Email"
                        id="validationCustom01"
                        required
                    />
                    <input
                        type="text"
                        className="form-control text-black bottom-border w-full mt-5 mt-lg-9"
                        placeholder="Password"
                        id="validationCustom01"
                        required
                    />
                    <button className="text-white font-weight-bold text-center bg-dark-600 w-full rounded py-2 mt-8">LOGIN</button>
                    <p className="text-black text-xl font-weight-bold mt-9 text-center" style={{ color: '#1976D2', fontSize: '14px' }}>
                        Reset Password
                    </p>
                    <Link href="/register">
                        <p className=" text-black text-xl font-weight-bold mt-5 text-center" style={{ fontSize: '14px' }}>
                            No account? <span style={{ color: '#1976D2' }}>Create one</span>
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
                            `}
                    </style>
                </div>
            </div>
            {<LoginComponent /> ? (
                <div
                    className="footer flex flex-wrap gap-3 md:gap-10 justify-between text-white"
                    style={{ marginTop: '13%', padding: '0 100px' }}
                >
                    <Copyright />
                    <Donations />
                </div>
            ) : (
                <Footer />
            )}
        </div>
    );
};
export default LoginComponent;
