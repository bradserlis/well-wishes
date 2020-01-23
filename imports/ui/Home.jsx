import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { 
  Container, 
  Form,
  Input,
  Button, 
} from 'semantic-ui-react'

import { Posts } from '../api/posts';
import Post from './Post.jsx';
import PostForm from './PostForm';
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
      <Container>
      <div className='home-container'>
        <h1> Home page </h1>
        <div id='home-form-container'>
        <PostForm />
        </div>
        <div className='home-posts'>
        <ul>
          {this.renderPosts()}
        </ul>
        </div>
      </div>
      </Container>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts');

  return {
    currentUser: Meteor.user(),
    posts: Posts
    .find({owner: Meteor.userId()})
    .fetch(),
  };
})(Home);

