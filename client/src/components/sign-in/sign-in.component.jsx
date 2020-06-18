import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'
import './sign-in.styles.scss'

const SignIn = ({ emailSignInStart, googleSignInStart  }) => {
    const [ userCredentials, setCredentials ] = useState({ email: '', password: '' })

    const {email, password} = userCredentials
    const handleSubmit = async event => {
        event.preventDefault();
       

        emailSignInStart( email, password)
       
    }

    const handleChange = event => {
        const {value, name} = event.target
        
        setCredentials({ ...userCredentials, [name]: value })
    }


    return (
        <div className = 'sign-in'>
            <h1>I already have an account</h1>
            <span>Sign with your email and password</span>

            <form onSubmit = { handleSubmit }>
                <FormInput name = "email" 
                type = "email" label = 'email' 
                handleChange = { handleChange } 
                value = { email } required />
                <FormInput name = "password" 
                label = 'Password' type = "password" 
                handleChange = { handleChange } 
                value = { password } required />
                <div className = 'buttons'>
                    <CustomButton type = 'submit'> Sign in</CustomButton>
                    <CustomButton type = 'button' onClick = {googleSignInStart} isGoogleSignIn >
                    Sign in with google
                    </CustomButton>
                </div>
                
            </form>
        </div>
    )
    }

const mapStateToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapStateToProps)(SignIn)