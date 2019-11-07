import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'; 
import { render, ReactDOM } from 'react-dom';

import App from '../ui/App';
import Home from '../ui/Home';
import Search from '../ui/Search';
import MainLayout from './layouts/MainLayout';

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <div>
        <MainLayout />
        <Switch>
          <Route exact path='/' render={props => <App {...props} />} />
          <Route path='/home' render={props => <Home {...props} />} />
          <Route path='/search' render={props => <Search {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>,
    document.getElementById('react-target'));
});
