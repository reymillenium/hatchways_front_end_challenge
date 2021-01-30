import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// Routes & redirect:
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

// Redux:
import {connect} from 'react-redux';

// Additional:
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";


const Students = asyncComponent(() => import("./containers/Students"));

class App extends Component {

  render() {
    return (
        <div className="App">

        </div>
    );
  }

}

export default App;
