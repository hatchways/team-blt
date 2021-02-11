import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Modal from 'react-modal';
import '../themes/SignIn.css';
import { Link } from 'react-router-dom';
import { modalStyles } from '../themes/theme';


function SignIn() {
    const [modalIsOpen, setModalIsOpen] = useState(true);
    return (
        <Modal isOpen={modalIsOpen} style={modalStyles} >
            <div className='signIn'>
                
                <Typography variant='h4'>Sign in</Typography>
    
                <form className='signIn__input'>
                    <Typography variant='h6'>Your e-mail address:</Typography>
                    <TextField
                        input='text'
                        placeholder='E-mail' 
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        name='email'
                    />
          
                    <Typography variant='h6'>Password:</Typography>
                    <TextField
                        input='password'
                        placeholder='Password'
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        name='password'
                        type='password'
                        id='password'
                    />
           
                    <Button
                        type='submit'
                        variant='contained'
                        size='large'
                    >
                        Sign In
                    </Button>
                    
                </form>
    
                <div className='signIn__footer'>
                    Don't have an account? <Link to='./sign-up' className='link'>Create an Account</Link>
                </div>
            </div>
        </Modal>
        
    )
}

export default SignIn;
