import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts';
import Post from './Post.jsx';

class App extends Component {
  renderPosts = () => {
    return this.props.posts.map((post) => (
      <Post key={post._id} post={post} />
    ));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Find the text field via the React ref
    const content = ReactDOM.findDOMNode(this.refs.contentInput).value.trim();
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();

    let text = {
      content: content,
      title: title,
    }

    Meteor.call('posts.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.contentInput).value = '';
    ReactDOM.findDOMNode(this.refs.titleInput).value = '';
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1> Post List </h1>

          { this.props.currentUser ?
            (
              <div id='post-container'>
                <form className="new-task" onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    ref="titleInput"
                    placeholder="Post title"
                  />
                  <textarea
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
              </div>
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
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({ owner: {$ne: Meteor.userId()} }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
