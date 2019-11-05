import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'; 
import { render, ReactDOM } from 'react-dom';

import App from '../ui/App';
import Home from '../ui/Home';
import MainLayout from './layouts/MainLayout';

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <div>
        <MainLayout />
        <Switch>
          <Route exact path='/' render={props => <App {...props} />} />
          <Route path='/home' component={Home} />
        </Switch>
      </div>
    </BrowserRouter>,
    document.getElementById('react-target'));
});
