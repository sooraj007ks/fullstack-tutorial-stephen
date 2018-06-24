// npm i --save redux react-redux react-router-dom materialize-css
//axios redux-thunk
import 'materialize-css/dist/css/materialize.min.css';
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {logger} from 'redux-logger';

import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// For testing
// import axios from 'axios';
// window.axios = axios;
// window.surverTest = {
//   title: "Survey Test",
//   subject : "Emaily",
//   body : "Do you like our service ?",
//   recipients : "sooraj007ks@gmail.com"
// };
// function postSUrveyTest(){
//   window.axios.post('api/surveys', window.surverTest);
// }

const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger));

ReactDOM.render(<Provider store={store}><App /></Provider>,
     document.getElementById('root')
    );

