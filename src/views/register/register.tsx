import React from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import github from '../../../public/images/github.png';
import check from '../../../public/images/Success.svg';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import MiniFooter from '@/components/global/minifooter';

const RegisterComponent = () => {
    const responseGoogleSuccess = (response: any) => {
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
    return (
        <>
            <div
                className="Maincontainer bg-dark-600  d-flex justify-content-center align-items-center w-full"
                style={{ height: 'auto !important', minHeight: '100vh' }}
            >
                <div className="container w-full pt-6 px-6 gap-20" style={{ display: 'flex', justifyContent: 'center' ,marginTop:"-35px"}}>
                    <div className="mt-20">
                        <Image src={logo} alt="logo" className=" text-center" />
                        <div style={{ display: 'flex', alignItems: 'center' }} className="mt-3">
                            <Image src={check} alt="logo" className=" text-center" style={{ marginTop: '-66px' }} />
                            <p className="text-white ml-3">
                                <span style={{ color: '#90A4AE' }}>Real-time Monitoring. </span>Track <br /> Ethereum network hash-rate and
                                <br /> difficulty in real-time with charts and <br /> historical data.
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }} className="mt-3">
                            <Image src={check} alt="logo" className="text-center mt-2" style={{ marginTop: '-66px' }} />
                            <p className="text-white ml-3">
                                <span style={{ color: '#90A4AE' }}>Miner Distribution Analysis.</span>
                                <br />
                                Analyze miner distribution on the
                                <br />
                                network to understand risks to <br />
                                security and decentralization.
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }} className="mt-3">
                            <Image src={check} alt="logo" className="text-center mt-2" style={{ marginTop: '-66px' }} />
                            <p className="text-white ml-3">
                                <span style={{ color: '#90A4AE' }}>Miner Distribution Analysis.</span>
                                <br />
                                Analyze miner distribution on the
                                <br />
                                network to understand risks to <br />
                                security and decentralization.
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="sec-box bg-white rounded px-10 mt-8 py-5" style={{ height: 'auto !important', width: '464px' }}>
                            <p className="text-black text-xl font-weight-bold mt-4 text-center" style={{ fontSize: '1.5rem' }}>
                                Register
                            </p>
                            <GoogleLogin
                                clientId="YOUR_GOOGLE_CLIENT_ID"
                                onSuccess={responseGoogleSuccess}
                                onFailure={responseGoogleFailure}
                                cookiePolicy={'single_host_origin'}
                                className="box rounded py-2 mt-6 w-full gap-3 text-cente"
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
                                className="form-control text-black bottom-border w-full mt-9"
                                placeholder="Email"
                                id="validationCustom01"
                                required
                            />
                            <input
                                type="text"
                                className="form-control text-black bottom-border w-full mt-9"
                                placeholder="Password"
                                id="validationCustom01"
                                required
                            />
                            <input
                                type="text"
                                className="form-control text-black bottom-border w-full mt-9"
                                placeholder="Password repeat"
                                id="validationCustom01"
                                required
                            />
                            <button className="text-white font-weight-bold text-center bg-dark-600 w-full rounded py-2 mt-9">
                                REGISTER
                            </button>
                            <p className="text-black text-md font-weight-bold mt-9 text-center">
                                By clicking “Create account” or “Continue with Google” or “Continue with Github”, you agree to the&nbsp;
                                jiffyscan.xyz
                                <a
                                    href="https://www.notion.so/adityaagarwal/Terms-of-Use-0012b80699cc4b948cdae9e42983035b"
                                    style={{ color: '#1976D2' }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Terms of Service
                                </a>
                                &nbsp;and&nbsp;
                                <a
                                    href="https://adityaagarwal.notion.site/Privacy-Policy-5f05315af636474797f1255d338a0d76?pvs=4"
                                    style={{ color: '#1976D2' }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Privacy Policy
                                </a>
                            </p>

                            <Link href="/login">
                                <p className=" text-black text-md font-weight-bold mt-5 text-center">
                                    Already have an account? <span style={{ color: '#1976D2' }}>Log in</span>
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
                    }
                    @media (max-width: 576px) {
                        .Maincontainer{
                            height:auto !important;
                        }
                    .container {
                        flex-direction:column
                    }
                      }
                      @media (min-width: 576px) and (max-width: 768px) {
                        .Maincontainer{
                            height:auto !important;
                        }
                        .container {
                            flex-direction:column;
                            width:450px !important;
                        }
                      }
                      @media (min-width: 768px) and (max-width: 992px) {
                        .footer{
                            margin-bottom: 40px !important;
                        }
                      }
                      .box{
                        border:1px solid #e5e7eb !important;
                        box-shadow:none !important;
                        border-radius: 5px !important;
                      }
                      .sec-box button{
                        justify-content:center
                      }
                    `}
                            </style>
                        </div>
                    </div>
                </div>
                <MiniFooter />
            </div>
        </>
    );
};
export default RegisterComponent;
