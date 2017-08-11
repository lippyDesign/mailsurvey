// survey review is a component that displays the data to the user asking them to confirm the survey details
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import formFields from './formFields';

import { submitSurvey } from '../../actions';

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {

  const reviewFields = _.map(formFields, ({ name, label }) => <div key={name}><label>{label}</label><div>{formValues[name]}</div></div>);

  return <div>
    <h5>Please confirm your entries</h5>
    <div>
      {reviewFields}
    </div>
    <button className="btn-flat yellow darken-3 white-text" onClick={onCancel}>
      Back <i className="material-icons left">chevron_left</i>
    </button>
    <button className="btn-flat teal right white-text" onClick={() => submitSurvey(formValues, history)}>
      Send Survey <i className="material-icons right">email</i>
    </button>
  </div>;
}

const mapStateToProps = state => ({ formValues: state.form.surveyForm.values });

export default connect(mapStateToProps, { submitSurvey })(withRouter(SurveyReview));