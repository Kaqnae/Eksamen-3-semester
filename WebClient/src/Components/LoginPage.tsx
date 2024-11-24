import React from 'react';
import Box from '@mui/material/Box';
import TextField from './TextField';
import Button from './Button';
import SDU from '../Images/SDU.webp'

const LoginForm = () => {
    const handleLogin = () =>{
        console.log('Login Clicked');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                '& .MuiTextField-root': {m: 1, width: '100%', maxWidth: '25ch'},
                '& .MuiButton.root': {m: 1, width: '100%', maxWidth: '25ch'},
            }}
        >
        <img src={SDU} alt='Logo' width='20%'></img>
        <TextField 
            required
            id='outlined-username'
            label='Username'
            defaultValue=''
        />
        <TextField 
            required
            id='outlined-password'
            label='Password'
            type='password'
            autoComplete='current-password'
        />
        <Button
        variant='contained'
        color='primary' 
        onClick={handleLogin}>Login</Button>
        </Box>
        
    );
   
};

export default LoginForm;