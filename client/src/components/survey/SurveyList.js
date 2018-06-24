import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SurveyList extends Component {

  componentDidMount(){
    this.props.fetchSurvey()
  };

  renderContent () {
    return (this.props.survey
      .reverse()
      .map( survey => {
      return <div 
        className="card blue-grey darken-1 white-text" 
        style={ {maxWidth : '500px', margin: '12px auto'} }
        key={survey._id}>
        <div className="card-content">
          <span className="card-title">{survey.title}</span>
          <p> { survey.body }</p>
          <p className="right">
            Sent on : {new Date(survey.dateSent).toLocaleDateString()}
          </p>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      </div>
    }) );
  };

  render() {
    return (
      <div>
        { this.renderContent() }
      </div>
    );
  };
};

function mapStateToProps({ survey }){
  return { survey };
};


export default connect(mapStateToProps, actions)(SurveyList);
