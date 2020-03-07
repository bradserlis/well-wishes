import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {
  Container,
  Form,
  Input,
  Button,
} from 'semantic-ui-react';

import { Posts } from '../api/posts';
import Post from './Post.jsx';

class Search extends Component {

  renderOnePost = () => {
    let postChoice = Math.floor(Math.random() * this.props.posts.length);
    return <Post key={this.props.posts[postChoice]._id} post={this.props.posts[postChoice]} />
  }

  render() {
    return (
      <Container>
        <header>
          <h1> Post List </h1>
        </header>
        <main>
          <ul>
            {this.props.posts && this.renderOnePost()}
          </ul>
        </main>
      </Container>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('otherUserPosts');

  return {
    posts: Posts.find().fetch()
  };
})(Search);
