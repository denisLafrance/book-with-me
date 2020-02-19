import React from 'react';
import { Field, reduxForm } from 'redux-form';
import BwmInput from '../shared/form/BwmInput';
import { BwmResErrors } from '../shared/form/BwmResError';


const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
          <Field
            name="username"
            label="Username"
            component="input"
            type="text"
            className="form-control"
            component={BwmInput}
          />
          <Field
            name="email"
            label="Email"
            component="input"
            type="email"
            className="form-control"
            component={BwmInput}
          />
          <Field
            name="password"
            label="Password"
            component="input"
            type="password"
            className="form-control"
            component={BwmInput}
          />
          <Field
            name="passwordConfirmation"
            label="Password Confirmation"
            component="input"
            type="password"
            className="form-control"
            component={BwmInput}
          />
 
        <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
          Register
        </button>
            <BwmResErrors errors={errors}/>
    </form>
  )
}

const validate = values => {
    const errors = {}
   
    if(values.username && values.username.length < 4) {
        errors.username = 'Username min length is 4 characters';
    }

    if(!values.username) {
        errors.username = 'Please enter a username';
    }

    if(!values.email) {
        errors.email = 'Please enter an email address'
    }

    if(!values.passwordConfirmation) {
        errors.passwordConfirmation = 'Please enter password confirmation';
    }

    if(values.password !== values.passwordConfirmation) {
        errors.password = 'Passwords must be the same';
    }

    if(!values.password) {
        errors.password = 'Please enter a password';
    }

    return errors
  }

export default reduxForm({
  form: 'registerForm', // a unique identifier for this form
  validate: validate
})(RegisterForm)