import React, { Component } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { signUpStart } from '../../redux/user/user.actions'
import './sign-up.styles.scss'


class SignUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             displayName: '',
             email: '',
             password: '',
             confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { signUpStart } = this.props
        const {displayName, email, password, confirmPassword} = this.state

        if(password !== confirmPassword) {
            alert("password dont match");
            return;
        }
        signUpStart({ displayName, email, password })
    }

    handleOnchange = event => {
        const { name, value } = event.target


        this.setState({
            [name]: value
        })
    }
    
    render() {
        const {displayName, email, password, confirmPassword} = this.state
        return (
            <div className = 'sign-up'>
                <h2 className = 'title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className = 'sign-up-form' onSubmit = {this.handleSubmit}>
                    <FormInput
                     type = 'text'
                     name = 'displayName'
                     value = {displayName}
                     onChange = {this.handleOnchange}
                     label = 'Display Name'
                     required
                    />
                    <FormInput
                     type = 'email'
                     name = 'email'
                     value = {email}
                     onChange = {this.handleOnchange}
                     label = 'Email'
                     required
                    />
                    <FormInput
                     type = 'password'
                     name = 'password'
                     value = {password}
                     onChange = {this.handleOnchange}
                     label = 'Password'
                     required
                    />
                    <FormInput
                     type = 'password'
                     name = 'confirmPassword'
                     value = {confirmPassword}
                     onChange = {this.handleOnchange}
                     label = 'Confirm Password'
                     required
                    />
                    <CustomButton type = 'submit'>SIGN UP</CustomButton>
                </form>
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp)