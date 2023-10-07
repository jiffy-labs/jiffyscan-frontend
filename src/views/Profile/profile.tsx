import React, { useState } from 'react';
import Navbar from '@/components/global/navbar/Navbar';
import TextField from '@mui/material/TextField';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ProfileSection from './profileSection';
import Visibilitypassword from './visibilityPassword';
import UserInfo from './userInfo'
import { isValidEmail, validateEmail, validatePassword } from '@/components/common/validation/validation';
import { Divider } from '@mui/material';
import Footer from '@/components/global/footer/Footer';

const Profile = () => {
    const validationOdj = {
        'current password': { error:false, fb: false, msg:'' },
        'email': { error:false, fb: false, msg:''},
        'new password' : { error:false, fb: false, msg:'' },
        'password' : { error:false, fb: false, msg:'' }
    }
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState<any>('');
    const [emailError, setEmailError] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameSuccess, setNameSuccess] = useState('');
    const [emailSuccess, setEmailSuccess] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [isValid, setValidates] = useState(validationOdj);

    const handleValidation = ({target}:any ) => {
        const { value, name, type } = target;
        let error = value === ''
        let msg =''
        if(!value) {
            msg  =`${name} is required`
        } else if (name == 'email') {
            msg  =  validateEmail(value);
            error  =  !isValidEmail(value);
        } else if (type === 'password') {
            msg  =  validatePassword(value);
        }
        setValidates({...isValid, [name]:{error, msg}})
    }

    const nameValue = ({validates}:  any) => {
        if (validates['name'].error) {
            setNameError(validates['name'].msg);
        } else {
            setNameError('');
            //todo: need create submit method
            setNameSuccess(' Display name purely for a decorative purpose');
        }
    };

    const emailValue = () => {
            setEmailError('');
            setEmailSuccess('You will receive a confirmation message to your current email');
    };

    const passwordValue = () => {
            setPasswordError('');
            setPasswordSuccess('New Password save successfully');
    };

    function ValidationMsg({ error, success }: any) {
        return (
            <div className="flex ml-4">
                <span className={` ${error ? 'text-red-500' : 'text-green-700'} flex items-end`}>
                { error ||  success}
                </span>
            </div>
        );
    }

    return (
        <div className="">
                <Navbar searchbar />
            <section className="px-3">
                <div className="container">
                    <div className="flex flex-col pt-2 pb-48">
                        <div>
                            <h1 className="text-3xl font-bold">
                                My Profile
                            </h1>
                        </div>
                        <ProfileSection title="Account" buttonText="SAVE CHANGES" onClick={nameValue}>
                            <div className="flex-col w-2/4">
                                <div className="xl:w-11/12 md:w-5/6 lg:w-4/5 w-11/12">
                                    <UserInfo handleInfo={nameValue} />
                                </div>
                            </div>
                            <Divider orientation="vertical" flexItem />
                            <ValidationMsg error={nameError} success={nameSuccess} />
                        </ProfileSection>
                        <ProfileSection title="Change Email" buttonText="SAVE CHANGES" onClick={emailValue}>
                            <div className="flex-col w-2/4 pr-6">
                                <TextField
                                    label="New Email Address"
                                    id="emailAddress"
                                    size="small"
                                    name='email'
                                    variant="standard"
                                    className="w-full mb-6"
                                    value={newEmail}
                                    error={isValid['email']?.error}
                                    helperText={isValid['email']?.msg}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    onBlur={handleValidation}
                                />
                                <Visibilitypassword
                                    value = {password}
                                    className="mr-6"
                                    name = "password"
                                    label='Current Password'
                                    error={isValid['password']?.error}
                                    helperText={isValid['password']?.msg}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <Divider orientation="vertical" flexItem />
                            <ValidationMsg success={emailSuccess} />
                        </ProfileSection>
                        <ProfileSection title="Change Password" buttonText="SAVE CHANGES" onClick={passwordValue}>
                            <div className="flex-col w-2/4 pr-6">
                                <TextField
                                    label="Current Password"
                                    id="standard2"
                                    name="current password"
                                    size="small"
                                    variant="standard"
                                    className="w-full mr-6 mb-6"
                                    type="password"
                                    error={isValid['current password']?.error}
                                    helperText={isValid['current password']?.msg}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    onBlur={handleValidation}
                                />
                                <TextField
                                    label="New Password"
                                    id="standard3"
                                    name="new password"
                                    size="small"
                                    variant="standard"
                                    type="password"
                                    className="w-full mb-6"
                                    error={isValid['new password']?.error}
                                    helperText={isValid['new password']?.msg}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <Divider orientation="vertical" flexItem />
                            <ValidationMsg error={isValid['current password']?.msg || isValid['new password']?.msg} success={passwordSuccess} />
                        </ProfileSection>
                            <div className='mt-6'>
                            <button className="rounded-md border py-3 px-4 tracking-wider text-md">
                                MORE <MoreHorizIcon className="ml-2 mb-1 text-sm" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Profile;


