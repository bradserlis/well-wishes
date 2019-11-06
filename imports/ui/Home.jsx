import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts';
import Post from './Post.jsx';
import MainLayout from '../client/layouts/MainLayout';

class Home extends Component {
  
  renderPosts = () => {
    return this.props.posts.map((post) => (
      <Post key={post._id} post={post} />
    ));
  }
  
  render(){
    return (
      <div className='home-container'>
        <h1> Home page </h1>
        <p> You are {Meteor.user().username} </p>
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
  Meteor.subscribe('posts');

  return {
    currentUser: Meteor.user(),
    posts: Posts.find({owner: Meteor.userId()}).fetch(),
  };
})(Home);
