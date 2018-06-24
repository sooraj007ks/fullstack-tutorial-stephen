import React from 'react'
import { connect } from 'react-redux';
import FIELDS from './fileds';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';


function renderFields(formData){
  return FIELDS.map(({ label, name }, idx) => {
    return (
      <div key={ idx }>
        <label>{ label }</label>
        <div style={ {overflow: 'auto'} }>{ formData[ name ] }</div>
      </div>
    );
  });
}


const SurveyFormReview = ( {toggler, formData, sendSurvey, history} ) => {
  return (
    <div>
      <h3> Please confirm your entries </h3>
      <div>
        { renderFields(formData) }
      </div>
      <button
      className="blue white-text btn-flat"
      onClick={toggler}>
        Back
        <i className="material-icons left">keyboard_backspace
        </i>
      </button>
      <button
        className="green white-text btn-flat right"
        onClick={ () => sendSurvey(formData, history) }>
        Send Survey
        <i className="material-icons right">email
        </i>
      </button>
    </div>
  );
}

function mapstateToProps(state){
  return { formData : state.form.surveyForm.values }
}

export default connect(mapstateToProps, actions)(withRouter(SurveyFormReview));

// webhook Responce
// [0] [ { ip: '112.133.248.115',
// [0]     sg_event_id: 'oCZiWrE2Rc221hoVvm_TNQ',
// [0]     sg_message_id: 'nF_E9FvpSxCT5XPJwi8Orw.filter0005p3iad2-27527-5B2E6A3F-F.0',
// [0]     useragent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36',
// [0]     event: 'click',
// [0]     url_offset: { index: 0, type: 'html' },
// [0]     email: 'sooraj007ks@gmail.com',
// [0]     timestamp: 1529768543,
// [0]     url: 'http://localhost:3000/api/surveys/thanks' } ]
// [0] [ { ip: '112.133.248.115',
// [0]     sg_event_id: 'VuaEwpuBSoy_lPZ8EDmBnw',
// [0]     sg_message_id: 'nF_E9FvpSxCT5XPJwi8Orw.filter0005p3iad2-27527-5B2E6A3F-F.0',
// [0]     useragent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36',
// [0]     event: 'click',
// [0]     url_offset: { index: 1, type: 'html' },
// [0]     email: 'sooraj007ks@gmail.com',
// [0]     timestamp: 1529768607,
// [0]     url: 'http://localhost:3000/api/surveys/thanks' } ]