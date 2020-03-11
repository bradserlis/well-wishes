import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { render, ReactDOM } from 'react-dom';

import Landing from '../ui/Landing';
import Home from '../ui/Home';
import Search from '../ui/Search';
import MainLayout from './layouts/MainLayout';

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={props => <Landing {...props} />} />
        <Route path='/home' render={props => <Home {...props} />} />
        <Route path='/search' render={props => <Search {...props} />} />
      </Switch>
    )
  }
}

export default Router;

  // document.getElementById('react-target');
