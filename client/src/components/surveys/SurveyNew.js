// SurveyNew show SurveyForm and SurveyReview
import React from 'react';
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends React.Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) return <SurveyReview onCancel={() => this.setState({ showFormReview: false })} />;
    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
  }

  render() {
    return <div>
      {this.renderContent()}
    </div>;
  }
}

export default reduxForm({ // by default the redux form will destroy values on unmount of SurveyNew component
  form: 'surveyForm'
})(SurveyNew);