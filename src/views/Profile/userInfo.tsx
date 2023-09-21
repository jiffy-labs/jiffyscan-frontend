import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, FormControlLabel, Checkbox, NativeSelect } from '@mui/material';
import TextField from '@mui/material/TextField';
import { validateName } from "@/components/common/validation/validation";

function UserInfo({handleInfo} :any) {
    const validationOdj = {
        name: { error:false, fb: false, msg:'' },
        designation: { error:false, fb: false, msg:'' },
        companyName: { error:false, fb: false, msg:'' },
    }
    const [isValid, setValidate] = useState(validationOdj);
    const [user, setUser] = useState({
        name: '',
        designation: '',
        companyName: '',
        receiveUpdates: false,
    });

    const designations = [{ name: '' , value: 'Select' }, { name: 'Founder', value:'Founder' }, { name: 'Engineer', value:'Engineer' }, { name: 'Other', value:'Other' }]

    const handleInputChange = ({target}: any) => {
        const { name, value, type, checked } = target;
        const newValue = type === 'checkbox' ? checked.toString() : value;
        setUser({
            ...user,
            [name]: newValue,
        });
    };

    const handleValidation = ({ target }: any ) => {
        const { name, value  } = target;
        let error = false;
        let msg ='';
        if(name === 'name') {
            error = !value;
            msg = validateName(value)
        };
        let validates = {...isValid, [name]: {error, msg}};
        setValidate(validates)
    }

    useEffect(() => {
        handleInfo({user, validates: isValid})
    },[isValid, user]);

    return (
        <>
            <TextField
                label="Name"
                name="name"
                id="name"
                size="small"
                variant="standard"
                className="mb-6 w-full"
                value={user.name}
                onChange={handleInputChange}
                onBlur={handleValidation}
            />
            <FormControl className="w-full mb-6">
                <InputLabel variant="standard" htmlFor="designation-id">
                    Designation
                </InputLabel>
                <NativeSelect
                    inputProps={{
                        name: 'designation',
                        id: 'designation-id',
                    }}
                    value={user.designation}
                    onChange={handleInputChange}
                >
                    {designations.map((val) => (
                        <option key={val.value} value={val.value}>
                            {val.name}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>
            <TextField
                label="Company Name"
                id="companyName"
                size="small"
                variant="standard"
                className="w-full mb-6"
                value={user.companyName}
                onChange={handleInputChange}
                name="companyName"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="receiveUpdates"
                        checked={user.receiveUpdates}
                        onChange={handleInputChange}
                    />
                }
                label="Receive updates regarding jiffyscan"
                className="w-full"
            />
        </>
    );
}

export default UserInfo;
