import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import Link from 'next/link';
import MiniFooter from '@/components/global/minifooter';
import {Amplify, Auth} from "aws-amplify";
import Spinner from '@/components/common/Spinner';
import { TextField } from '@mui/material';
import { isValidEmail, validateEmail, validatePassword } from '@/components/common/validation/validation';

const COGNITO_REGION = process.env.NEXT_PUBLIC_COGNITO_REGION;
const LOGIN_REGISTER_COGNITO_CLIENT_ID = process.env.NEXT_PUBLIC_LOGIN_REGISTER_COGNITO_CLIENT_ID;
const COGNITO_USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;

const Recover = () => {
    const validationObject = {
        email: { error: false, fb: false, msg: '' },
        newPassword: { error: false, fb: false, msg: '' },
        confirmPassword: { error: false, fb: false, msg: '' },
        verificationCode: { error: false, fb: false, msg: '' },
    };
    const [isValid, setValidate] = useState(validationObject);
    const [email, setEmail] = useState('');
    const [activeConfirmCode, setActiveConfirmCode] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        verificationCode: '',
        newPassword: '',
        confirmPassword: '',
    });

    const awsAmplifyConfig = {
        mandatorySignId: true,
        region: COGNITO_REGION,
        userPoolId: COGNITO_USER_POOL_ID,
        userPoolWebClientId: LOGIN_REGISTER_COGNITO_CLIENT_ID
    };
    Amplify.configure(awsAmplifyConfig);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleValidation = ({ target }: any) => {
        const { value, name, type } = target;
        const { newPassword } = user;
        let error = !value;
        let msg = '';
        if (!value) {
            msg = `${name} is required`;
        } else if (name === 'email') {
            msg = validateEmail(value);
            error = !isValidEmail(value);
        } else if (type === 'password') {
            msg = validatePassword(value);
            if(msg) error = true
            if (name === 'confirmPassword' &&  newPassword !== value)  {
                error = true
                msg ='Password does not match'
            }
        }
        setValidate({ ...isValid, [name]: { error, msg } });
    };

    const resetPassword = async (email: string) => {
        try {
            await Auth.forgotPassword(email);
            return { success: true };
        } catch (err: any) {
            console.error('Error requesting password reset:', err);
            return { success: false, error: err?.message };
        }
    };

    const handleResetPassword = async () => {
        setLoading(true);
        const resetResult = await resetPassword(email);
        setLoading(false);
        if (resetResult.success) {
            setSuccessMessage('Verification code sent to your email');
            setActiveConfirmCode(true);
        } else {
            setErrorMessage(resetResult.error || 'An unexpected error occurred');
        }
    };

    async function handleRest() {
        if(activeConfirmCode) {
                 await handleConfirmPwd()
        } else if (!email || validateEmail(email)) {
            setErrorMessage(isValid.email.msg);
        } else {
            setErrorMessage('');
          return  handleResetPassword()
        }
    }

    async function handleConfirmPwd() {
        const {verificationCode, confirmPassword, newPassword} = user;
        if(verificationCode && newPassword === confirmPassword ) {
            setLoading(true);
            try {
                await Auth.forgotPasswordSubmit(email, verificationCode, newPassword);
                setLoading(false);
                setActiveConfirmCode(false);
                setSuccessMessage('Password reset successfully');
            } catch (error) {
                console.error('Error resetting password:', error);
            }
        } else {
            setErrorMessage( 'Please enter valid data ');
        }
        setEmail('')
        setLoading(false);
    }

    return (
        <div className="main-box bg-dark-600" style={{ height: 'auto !important', minHeight: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image src={logo} alt="logo" className="mt-10 text-center" />
                <div className="whitebox bg-white rounded px-10 mt-11 py-5" style={{ width: '464px' }}>
                    <p className="text-black text-xl font-weight-bold mt-4 text-center" style={{ fontSize: '1.4rem' }}>
                        Reset Password
                    </p>
                    {errorMessage && (
                        <div className="font-regular mt-5 relative block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div className="font-regular mt-5 relative block w-full rounded-lg bg-green-500 p-4 text-base leading-5 text-white opacity-100">
                            {successMessage}
                        </div>
                    )}
                    {loading && (
                        <div className={'align-items-center d-flex flex justify-center mt-3'}>
                            <Spinner height={'1rem'} width={'1rem'} />
                        </div>
                    )}
                    {!activeConfirmCode ? (
                        <TextField
                            label="Email Address"
                            id="emailAddress"
                            size="small"
                            name="email"
                            variant="standard"
                            className="w-full mb-6 mt-5"
                            value={email}
                            error={isValid['email']?.error}
                            helperText={isValid['email']?.msg}
                            onChange={(e: any) => setEmail(e.target.value)}
                            onBlur={handleValidation}
                        />
                    ) : (
                        <>
                            <TextField
                                label="Verification Code"
                                id="code"
                                size="small"
                                name="verificationCode"
                                variant="standard"
                                className="w-full mb-6 mt-5"
                                value={user.verificationCode}
                                error={isValid['verificationCode']?.error}
                                helperText={isValid['verificationCode']?.msg}
                                onChange={handleInputChange}
                                onBlur={handleValidation}
                            />
                            <TextField
                                label="New Password"
                                id="newPassword"
                                name="newPassword"
                                size="small"
                                variant="standard"
                                className="w-full mr-6 mb-6"
                                type="password"
                                value={user.newPassword}
                                onChange={handleInputChange}
                                onBlur={handleValidation}
                                error={isValid['newPassword']?.error}
                                helperText={isValid['newPassword']?.msg}
                            />
                            <TextField
                                label="Confirm Password"
                                id="confirmPassword"
                                name="confirmPassword"
                                size="small"
                                variant="standard"
                                type="password"
                                className="w-full mb-6"
                                onBlur={handleValidation}
                                value={user.confirmPassword}
                                onChange={handleInputChange}
                                error={isValid['confirmPassword']?.error}
                                helperText={isValid['confirmPassword']?.msg}
                            />
                        </>
                    )}
                        <button
                            onClick={handleRest}
                            className="text-white font-weight-bold text-center bg-dark-600 w-full rounded py-2 mt-5"
                        >
                            {!activeConfirmCode ? 'RESET PASSWORD' : ' Confirm'}
                        </button>
                    <Link href="/login">
                        <p className=" text-black text-xl font-weight-bold mt-5 text-center mb-5" style={{ color: '#1976D2',fontSize: '14px' }}>
                             Sign in
                        </p>
                    </Link>
                </div>
            </div>
            <MiniFooter />
        </div>
    );
};

export default Recover;
