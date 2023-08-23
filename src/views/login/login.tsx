import Image from 'next/image';
import React from 'react';
import logo from '../../../public/images/logo.png';
import google from '../../../public/images/google.png';
import github from '../../../public/images/github.png';
import Link from 'next/link';
import MiniFooter from '@/components/global/minifooter';
const LoginComponent = () => {
    return (
        <div className="main-box bg-dark-600" style={{ height: '100vh !important' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image src={logo} alt="logo" className="mt-10 text-center" />
                <div className="whitebox bg-white rounded px-10 mt-11 py-5" style={{ height: '100%' }}>
                    <p className="text-black text-xl font-weight-bold mt-4 text-center" style={{ fontSize: '1.4rem' }}>
                        Login
                    </p>
                    <button
                        className="rounded border py-2 mt-6 w-full gap-3"
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image src={google} alt="logo" />
                        <p className="text-black font-weight-bold">LOGIN WITH GOOGLE</p>
                    </button>
                    <button
                        className="rounded border py-2 text-black font-weight-bold mt-2 w-full gap-3"
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image src={github} alt="logo" />
                        <p className="text-black font-weight-bold">LOGIN WITH GITHUB</p>
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
                    <button className="text-white font-weight-bold text-center bg-dark-600 w-full rounded py-2 mt-9">LOGIN</button>
                    <p className="text-black text-xl font-weight-bold mt-9 text-center" style={{ color: '#1976D2' }}>
                        Reset Password
                    </p>
                    <Link href="/register">
                        <p className=" text-black text-xl font-weight-bold mt-5 text-center">
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
                            `}
                    </style>
                </div>
            </div>
            <div className="footer mb-10" style={{marginTop: '13%'}}>
                <MiniFooter/>
            </div>
        </div>
    );
};
export default LoginComponent;