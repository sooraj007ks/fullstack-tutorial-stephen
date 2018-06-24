import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './fileds';


class SurveyForm extends Component{
  renderFields(){
    return (
      <div>
      {FIELDS.map(( { label, name }, idx) => (
        <Field 
        label={label} 
        type="text" 
        name={name}
        key={idx} 
        component={SurveyField}
      />
      ))}
      </div>
    );
  };

  render(){
    return (
      <div className="my-container">
        <form onSubmit={this.props.handleSubmit( this.props.toggler )}>
          {this.renderFields()}
          <Link to="/surveys" className="btn btn-flat red white-text">
            Cancel
            <i className="material-icons right">cancel</i>
          </Link>
          <button type='submit' 
          className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function formValidation(values){
  
  const error = {};
  
  error["recipients"] = validateEmails(values.recipients || '');
  
  FIELDS.forEach( ( { name } ) => {
    if (!values[name]){
      error[name] = `You must provide a Survey ${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}`
    }
  })
  return error
};


export default reduxForm({
  validate: formValidation,
  destroyOnUnmount:false,
  form: 'surveyForm'
})(SurveyForm);