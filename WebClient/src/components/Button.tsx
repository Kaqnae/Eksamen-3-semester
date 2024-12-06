import React from 'react';
import MuiButton, {ButtonProps as MuiButtonProps} from '@mui/material/Button';

type ButtonProps = MuiButtonProps & {
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({children, ...props}) =>{
    return(
        <MuiButton
            {...props}
            
        >
            {children}

        </MuiButton>
    );
};

export default Button;