import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { Posts } from '../api/posts';
import { Comments } from '../api/comments';  
import Post from './Post.jsx';
import MainLayout from '../client/layouts/MainLayout';

class Home extends Component {
  
  renderPosts = () => {
    return this.props.posts
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((post) => (
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
  
  render(){
    return (
      <div className='home-container'>
        <h1> Home page </h1>
        <div id='home-form-container'>
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
        <div className='home-posts'>
        <ul>
          {this.renderPosts()}
        </ul>
        </div>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts', 'comments');

  return {
    currentUser: Meteor.user(),
    posts: Posts
    .find({owner: Meteor.userId()})
    .fetch(),
    comments: Comments
    .find({}).fetch()
  };
})(Home);
