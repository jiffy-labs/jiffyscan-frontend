import React, {useState} from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import check from '../../../public/images/Success.svg';
import Link from 'next/link';
import MiniFooter from '@/components/global/minifooter';
import {signIn} from "next-auth/react";
import {Amplify, Auth} from "aws-amplify";
import Spinner from "@/components/common/Spinner";
import UserInfo from '../Profile/userInfo'
import TextField from "@mui/material/TextField";
import {useRouter} from "next/router";

const COGNITO_REGION = process.env.NEXT_PUBLIC_COGNITO_REGION;
const LOGIN_REGISTER_COGNITO_CLIENT_ID = process.env.NEXT_PUBLIC_LOGIN_REGISTER_COGNITO_CLIENT_ID;
const COGNITO_USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;

type userProps = {
    name: string,
    designation: string,
    companyName:string,
    receiveUpdates: string
};

const RegisterComponent = () => {
    const userDefualt = {
        name: "",
        designation: "",
        companyName: "",
        receiveUpdates: "false"
    };
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(userDefualt);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const {query} = useRouter();
    const handleRegistration = async () => {
        // Validate confirm password
        setErrorMessage('');
        setSuccessMessage('');
        if (!email || !password || !confirmPassword) {
            setErrorMessage('All fields are required');
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage('Invalid email format');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        setLoading(true)

        const awsAmplifyConfig = {
            mandatorySignId: true,
            region: COGNITO_REGION,
            userPoolId: COGNITO_USER_POOL_ID,
            userPoolWebClientId: LOGIN_REGISTER_COGNITO_CLIENT_ID
        }
        Amplify.configure(awsAmplifyConfig)
        const { name, designation, companyName, receiveUpdates}: userProps = user;
        const params = {
            password: password,
            username: email,
            attributes: {email,
                name,
                'custom:receiveUpdates': receiveUpdates ?? "",
                'custom:designation': designation ?? "",
                'custom:companyName': companyName ?? ""
            }
        }
        try {
            const signUpResponse = await Auth.signUp(params);
            console.log("DeliveryMedium:", signUpResponse)
            if (signUpResponse) {
                if (signUpResponse.codeDeliveryDetails.DeliveryMedium === "EMAIL") {
                    setSuccessMessage("Please check your email for verification link")
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage('An unexpected error occurred');
                console.error('An unexpected error occurred:', err);
            }
        }
        setLoading(false)
    };
    const handleLoginWithGoogle = async () => {
        setLoading(true)
        await signIn("cognito_google", {redirect: false, callbackUrl: `http://localhost:3000${query?.callBack}`})
    };

    const handleUser = async ({validates, user}:  any) => {
        if (validates['name'].error) {
            setErrorMessage( validates['name'].msg);
        } else {
            setErrorMessage('');
        }
        setUser(user);
    };
    const handleConfirmPdW = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
        } else {
            setErrorMessage('');
        }
    };
    return (
        <>
            <div
                className="w-full Maincontainer bg-dark-600 d-flex justify-content-center align-items-center"
                style={{height: 'auto !important', minHeight: '100vh'}}
            >
                <div className="container w-full gap-20 px-6 pt-6"
                     style={{display: 'flex', justifyContent: 'center', marginTop: "-35px"}}>
                    <div className="mt-20">
                        <Image src={logo} alt="logo" className="text-center "/>
                        <div style={{display: 'flex', alignItems: 'center'}} className="mt-3">
                            <Image src={check} alt="logo" className="text-center " style={{marginTop: '-66px'}}/>
                            <p className="ml-3 text-white">
                                <span style={{color: '#90A4AE'}}>Real-time Monitoring. </span>Track <br/> Ethereum
                                network hash-rate and
                                <br/> difficulty in real-time with charts and <br/> historical data.
                            </p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}} className="mt-3">
                            <Image src={check} alt="logo" className="mt-2 text-center" style={{marginTop: '-66px'}}/>
                            <p className="ml-3 text-white">
                                <span style={{color: '#90A4AE'}}>Miner Distribution Analysis.</span>
                                <br/>
                                Analyze miner distribution on the
                                <br/>
                                network to understand risks to <br/>
                                security and decentralization.
                            </p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}} className="mt-3">
                            <Image src={check} alt="logo" className="mt-2 text-center" style={{marginTop: '-66px'}}/>
                            <p className="ml-3 text-white">
                                <span style={{color: '#90A4AE'}}>Miner Distribution Analysis.</span>
                                <br/>
                                Analyze miner distribution on the
                                <br/>
                                network to understand risks to <br/>
                                security and decentralization.
                            </p>
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div className="px-10 py-5 mt-8 bg-white rounded sec-box"
                             style={{height: 'auto !important', width: '464px'}}>
                            <p className="mt-4 text-xl text-center text-black font-weight-bold"
                               style={{fontSize: '1.5rem'}}>
                                Register
                            </p>
                            {errorMessage && <div
                              className="relative block w-full p-2 mt-5 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                                {errorMessage}
                            </div>}
                            {successMessage && <div
                              className="relative block w-full p-4 mt-5 text-base leading-5 text-white bg-green-500 rounded-lg opacity-100 font-regular">
                                {successMessage}
                            </div>}
                            {loading && <div className={'align-items-center d-flex flex justify-center mt-3'}>
                              <Spinner height={'1rem'} width={'1rem'}/>
                            </div>}
                            <button
                                type="button"
                                onClick={() => handleLoginWithGoogle()}
                                className="w-full hidden mt-4 text-center justify-center focus:ring-0 focus:outline-none rounded border border-dark-200 md:text-md sm:text-sm text-[10px] px-5 py-3 inline-flex items-center mb-2"
                            >
                                <img src="/images/google.svg" alt=""/>
                                <span className="uppercase font-medium text-dark-600 ml-1 sm:ml-2 tracking-[1.5px]">continue with google</span>
                            </button>
                            <TextField
                                label="Email"
                                id="input_email"
                                size="small"
                                variant="standard"
                                type="text"
                                className="w-full mb-6"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <TextField
                                label="Password"
                                id="input_password"
                                size="small"
                                variant="standard"
                                type="password"
                                className="w-full mb-6"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <TextField
                                label="Password repeat"
                                id="input_password_repeat"
                                size="small"
                                variant="standard"
                                type="password"
                                className="w-full mb-6"
                                onBlur={handleConfirmPdW}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <UserInfo handleInfo={handleUser}  />
                            <button
                                className="w-full py-2 text-center text-white rounded font-weight-bold bg-dark-600 mt-9"
                                onClick={handleRegistration}
                                type="button">
                                REGISTER
                            </button>
                            <p className="text-center text-black text-md font-weight-bold mt-9">
                                By clicking “Create account” or “Continue with Google” or “Continue with Github”, you
                                agree to the&nbsp;
                                jiffyscan.xyz
                                <a
                                    href="https://www.notion.so/adityaagarwal/Terms-of-Use-0012b80699cc4b948cdae9e42983035b"
                                    style={{color: '#1976D2'}}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Terms of Service
                                </a>
                                &nbsp;and&nbsp;
                                <a
                                    href="https://adityaagarwal.notion.site/Privacy-Policy-5f05315af636474797f1255d338a0d76?pvs=4"
                                    style={{color: '#1976D2'}}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Privacy Policy
                                </a>
                            </p>

                            <Link href="/login">
                                <p className="mt-5 text-center text-black text-md font-weight-bold">
                                    Already have an account? <span style={{color: '#1976D2'}}>Log in</span>
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
                <MiniFooter/>
            </div>
        </>
    );
};
export default RegisterComponent;
