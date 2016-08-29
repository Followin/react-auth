import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

const renderInput = field =>
  <div>
    <input type={field.type} id={field.name} {...field.input} className="form-control"/>
    {field.meta.touched &&
     field.meta.error &&
     <div className="error">{field.meta.error}</div>}
  </div>;

class Signup extends Component {
  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label htmlFor="email">Email: </label>
          <Field component={renderInput} name="email" type="text"/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password: </label>
          <Field component={renderInput} name="password" type="password"/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <Field component={renderInput} name="passwordConfirm" type="password"/>
        </fieldset>
        {this.renderAlert()}
        <button className="btn btn-primary">Sign Up</button>
      </form>
    )
  };

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }
}

function validate({email, password, passwordConfirm}) {
  const errors = {};

  if(!email) {
    errors.email = 'Please enter an email';
  }

  if(!passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(!password) {
    errors.password = 'Please enter a password';
  }

  if (password !== passwordConfirm) {
    errors.password = "Passwords must match";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const FormComponent = reduxForm({form: 'signup', validate })(Signup);

export default connect(mapStateToProps, actions)(FormComponent);