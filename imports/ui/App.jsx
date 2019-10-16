import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts';
import Post from './Post.jsx';

class App extends Component {
  renderPosts = () => {
    return this.props.posts.map( (post) => (
      <Post key={post._id} post={post} />
    ));
  }

  render() {
    return (
      <div className='container'>
        <header>
          <h1> Post List </h1>
        </header>

        <ul>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

export default withTracker( ()=> {
  return { 
    posts: Posts.find().fetch(),
  };
})(App);
