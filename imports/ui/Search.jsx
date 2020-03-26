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
  constructor(props) {
    super(props);
    if (this.props.posts.length > 0) {
      let postIndex = Math.floor(Math.random() * this.props.posts.length);
      this.state = {
        chosenPostId: this.props.posts[postIndex]._id
      }
    }
  }

  renderOnePost = () => {
    let postChoice = this.props.posts.find((post) => {
      return post._id === this.state.chosenPostId
    })
    return <Post key={this.state.chosenPostId} post={postChoice} />
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
        {this.props.posts.length > 0 && this.renderOnePost()}
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
