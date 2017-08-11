// SurveyForm shows the inputs for user to input data about the survey they want to create
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';

import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {
  renderFields() {
    return _.map(formFields, ({ name, label }) => {
      return <Field key={name} type="text" name={name} label={label} component={SurveyField} />
    });
  }
  render() {
    return <form className='surveyForm' onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
      {this.renderFields()}
      <Link to='/surveys' className="btn-flat red white-text">
        Cancel <i className="material-icons left">cancel</i>
      </Link>
      <button className="btn-flat right white-text blue">
        Next <i className="material-icons right">chevron_right</i>
      </button>
    </form>;
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors; // if errors object is empty, redux form will assume that everything is validated
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);