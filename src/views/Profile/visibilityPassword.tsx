import React, {useState} from 'react'
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { FormControl, InputLabel, FormHelperText } from '@mui/material';

const VisibilityPassword = ({ value,onChange,onBlur, name, label, error, helperText, className }: any) => {
    const [showPwd, setShowPwd] = useState(false);
    const handlePwdVisibility = () => setShowPwd((show) => !show);
    return (
        <FormControl  variant="standard" className={`w-full mb-6 ${ className ?? ''}`}>
            <InputLabel htmlFor={`standard-adornment-${label}`}>{label}</InputLabel>
            <Input
            id="standard-adornment-password"
            type={showPwd ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            name={name}
            onBlur={onBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={handlePwdVisibility}
                >
                  {showPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
        />
            {error && <FormHelperText className="text-red-100 text-md">{helperText}</FormHelperText>}
        </FormControl>
  )
}

export default VisibilityPassword



