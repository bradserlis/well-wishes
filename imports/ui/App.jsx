import React, { Component } from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';

import Router from '../client/routes';
import MainLayout from '../client/layouts/MainLayout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='router-container'>
          <MainLayout {...this.props}>
            <Router />
          </MainLayout>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

