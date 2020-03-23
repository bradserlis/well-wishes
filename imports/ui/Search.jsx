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
          <h3> Search </h3>
        </header>
        <div className='welcome-text'>
          <p>
            Here is a user's post that could use your well wishes!
        </p>
        </div>
        {this.props.posts && this.renderOnePost()}
      </Container>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({ owner: { $ne: Meteor.userId() } }).fetch()
  };
})(Search);
