import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard'
import SurveyNew from './survey/SurveyNew';

class App extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
        return (
            <div >
            <BrowserRouter>
            <div>
                <Header/>
                <Route exact path="/"  component={Landing} ></Route>
                <Route exact path="/surveys"  component={Dashboard} ></Route>
                <Route path="/surveys/new" component={SurveyNew} ></Route>
            </div>
            </BrowserRouter>
            </div>
        );
    }
    
};

export default connect(null, actions)(App);
// const App = () =>{
//     return (
//         <div >
//         <BrowserRouter>
//         <div>
//             <Header/>
//             <Route path="/" exact component={Landing} ></Route>
//             <Route path="/surveys" exact component={DashBoard} ></Route>
//             <Route path="/surveys/new" component={SurveyNew} ></Route>
//         </div>
//         </BrowserRouter>
//         </div>
//     );
// };

