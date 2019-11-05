import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'; 
import { render, ReactDOM } from 'react-dom';

import App from '../ui/App';
import MainLayout from './layouts/MainLayout';

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
      </Switch>
    </BrowserRouter>,
    document.getElementById('react-target'));
});
