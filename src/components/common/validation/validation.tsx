export const validateName = (name: any) => {
    let msg = '';
     if (name.trim().length < 2) {
        msg = 'Name must be at least 2 characters long.';
    } 
    return msg;
};

export const validateEmail = (email: string ) => {
    if (!isValidEmail(email)) return 'Invalid email address';
    return '';
};

export const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const validatePassword = (pwd :string) => {
    if (!isvalidpassword(pwd)) return  'At least 6 characters including a number, and lowercase letter';
    return '';
};

const isvalidpassword = (newPassword: string) => {
    const passwordregex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return passwordregex.test(newPassword);
};
