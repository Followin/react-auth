import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderInput = field =>
    <input type={field.type} {...field.input} className="form-control"/>;

class Signin extends Component {
  handleFormSubmit({email, password}) {
    console.log(email, password);

    this.props.signinUser({ email, password });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label htmlFor="email">Email:</label>
          <Field name="email" component={renderInput} type="text"/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password:</label>
          <Field name="password" component={renderInput} type="password"/>
        </fieldset>
        {this.renderAlert()}
        <button className="btn btn-primary">Sign in</button>
      </form>
    );
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const FormComponent = reduxForm({ form: 'signin' })(Signin);
export default connect(mapStateToProps, actions)(FormComponent);
