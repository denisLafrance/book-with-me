import React from 'react';
import { Field, reduxForm } from 'redux-form';
import BwmInput from '../shared/form/BwmInput';
import {BwmResErrors} from '../../components/shared/form/BwmResError';
import { required, minLength4} from '../shared/validators';


const LoginForm = (props) => {
    const {handleSubmit, pristine, submitting, valid, submitCb, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
          <Field
            name="email"
            label="Email"
            component={BwmInput}
            type="email"
            className="form-control"
            validate={[required, minLength4]}
          />
          <Field
            name="password"
            label="Password"
            component={BwmInput}
            type="password"
            className="form-control"
            validate={[required]}
          />
 
        <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
          Login
        </button>
        <BwmResErrors errors={errors} />
        
    </form>
  )
  
}
/*
const validate = values => {
  const errors = {}
 

  if(!values.email) {
      errors.email = 'Please enter an email address'
  }


  if(!values.password) {
      errors.password = 'Please enter a password';
  }

  return errors
}*/



export default reduxForm({
  form: 'loginForm', // a unique identifier for this form
  
  
})(LoginForm)