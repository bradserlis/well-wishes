import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {
  Container,
  Form,
  Input,
  Button,
} from 'semantic-ui-react'

import { Posts } from '../api/posts';
import Post from './Post.jsx';

class Search extends Component {

  renderPosts = () => {
    return this.props.posts.map((post) => (
      <Post key={post._id} post={post} />
    ));
  }

  renderOnePost = () => {
    let postChoice = Math.floor(Math.random() * this.props.posts.length);
    console.log(this.props.posts[postChoice])
    return <Post key={this.props.posts[postChoice]._id} post={this.props.posts[postChoice]} />
  }

  // componentDidMount = () => {
  //   this.renderOnePost();
  // }


  render() {

    return (
      <Container>
        <header>
          <h1> Post List </h1>
        </header>
        <ul>
          {this.props.posts && this.renderOnePost()}
        </ul>
      </Container>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({ owner: { $ne: Meteor.userId() } }).fetch(),
    currentUser: Meteor.user(),
  };
})(Search);
