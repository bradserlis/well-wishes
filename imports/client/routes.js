import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { render, ReactDOM } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Landing from '../ui/Landing';
import Home from '../ui/Home';
import Search from '../ui/Search';
import MainLayout from './layouts/MainLayout';

class Router extends Component {

  render() {
    if (this.props.currentUser) {
      return (
        <Switch>
          <Route path='/home' render={props => <Home {...props} />} />
          <Route path='/search' render={props => <Search {...props} />} />
          <Redirect to='/home' />
        </Switch>
      )
    }
    else {
      return (
        <Switch>
          <Route exact path='/' render={props => <Landing {...props} />} />
          <Redirect to='/' />
        </Switch>
      )
    }
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(Router);