import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component{
  state = { 
    showReviewForm : false,
    sendSuccess : false
   }

  toggleReviewForm = () => {
    this.setState((prevState) => ({ 
      showReviewForm: !prevState.showReviewForm 
    }));
  }

  renderContent(){
    if(this.state.showReviewForm){
      return <SurveyFormReview toggler={this.toggleReviewForm} />;
    }  
    return <SurveyForm toggler={this.toggleReviewForm} />
  }

  render(){
    return (
      <div className="my-container">
        { this.renderContent() }
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);