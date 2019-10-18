import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts';
import Post from './Post.jsx';
import AccountsUIWrapper from './AccountsUIWrapper';

class App extends Component {
  renderPosts = () => {
    return this.props.posts.map((post) => (
      <Post key={post._id} post={post} />
    ));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.contentInput).value.trim();
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
    Posts.insert({
      title: title,
      content: text,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date(), // current time
    });
    // Clear form
    ReactDOM.findDOMNode(this.refs.contentInput).value = '';
    ReactDOM.findDOMNode(this.refs.titleInput).value = '';
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1> Post List </h1>
          <AccountsUIWrapper />

          { this.props.currentUser ?
            (
              <form className="new-task" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  ref="titleInput"
                  placeholder="Post title"
                />
                <input
                  type="text"
                  ref="contentInput"
                  placeholder="Type to add new post"
                />
                <button
                  onSubmit={this.handleSubmit}
                >
                Submit
                </button>
              </form>
            ) : ''
          }
        </header>

        <ul>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    posts: Posts.find().fetch(),
    currentUser: Meteor.user(),
  };
})(App);
