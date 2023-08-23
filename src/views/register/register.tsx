import React from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import google from '../../../public/images/google.png';
import github from '../../../public/images/github.png';
import check from '../../../public/images/Success.svg';
import Link from 'next/link';
import Footer from '@/components/global/footer/Footer';
import Copyright from '@/components/global/footer/Copyright';
import Donations from '@/components/global/footer/Donations';

const RegisterComponent = () => {
    return (
        <>
            <div
                className="Maincontainer bg-dark-600  h-screen d-flex justify-content-center align-items-center w-full"
                style={{ height: '100vh' }}
            >
                <div className="container w-full pt-6 gap-20" style={{ display: 'flex', justifyContent: 'center' }}>
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
                        <div className="sec-box bg-white rounded px-10 mt-8 py-5" style={{ height: '645px', width: '464px' }}>
                            <p className="text-black text-xl font-weight-bold mt-4 text-center" style={{ fontSize: '1.5rem' }}>
                                Register
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
                                By clicking “Create account” or “Continue with Google” or “Continue with Github”, you agree to the
                                jiffyscan.xyz <span style={{ color: '#1976D2' }}>Terms of Service</span> and
                                <span style={{ color: '#1976D2' }}>Privacy Policy</span>
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
                            margin-bottom: 40px;
                        }
                      }
                    `}
                            </style>
                        </div>
                    </div>
                </div>
                {<RegisterComponent /> ? (
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
        </>
    );
};
export default RegisterComponent;
