import React, { Component } from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import AccountsUIWrapper from './AccountsUIWrapper';
import Router from '../client/routes';
import MainLayout from '../client/layouts/MainLayout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='router-container'>
          <Router />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

