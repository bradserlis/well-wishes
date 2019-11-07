import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts';
import Post from './Post.jsx';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <h1> Login Screen </h1>
        </header>
        <main>
        <p> Please login above </p>
        </main>
      </div>
    );
  }
}

export default App;
