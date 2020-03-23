import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {
  Container,
  Form,
  Input,
  Button,
  Modal
} from 'semantic-ui-react';

import { Posts } from '../api/posts';
import Post from './Post';
import PostForm from './PostForm';
import MainLayout from '../client/layouts/MainLayout';

class Home extends Component {
  state = {
    activePostId: null,
    showAddPost: false
  }

  addPostToggle = () => {
    this.setState({
      showAddPost: !this.state.showAddPost
    })
  }

  setActivePost = (e) => {
    this.setState({
      activePostId: e.target.value
    })
  }

  renderPostsList = () => {
    return this.props.posts
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((post) => (
        <li key={post._id.toString()}>
          <div className='home-posts-list-container'>
            <Button
              value={post._id}
              onClick={this.setActivePost}
            >
              {post.title}
            </Button>
          </div>
        </li>
      ));
  }

  renderActivePost = () => {
    let activePost = this.props.posts.filter((post) => post._id === this.state.activePostId);
    return (<Post key={activePost._id} post={activePost[0]} />)
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
      <Container>
        <div className='home-container'>
          <div className='home-title'>
            <header>
              <h3> Home </h3>
            </header>
          </div>
          <main>
            <div className='welcome-text'>
              <p>
                Thank you for contributing to Well Wishes. <br /> Search above to leave comments on another's post, and then you will be able to view recent comments to your own post.
              </p>
            </div>
            <Modal
              trigger={<Button positive circular>Add Post</Button>}
              centered={false}
              closeOnDimmerClick={false}
              closeIcon
            >
              <Modal.Header>Add Post</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <PostForm />
                </Modal.Description>
              </Modal.Content>
            </Modal>
            {this.state.showAddPost && (
              <div id='home-form-container'>
              </div>
            )}
            <div className='home-posts'>
              <div className='home-posts-list-container'>
                <ul style={{ 'listStyle': 'none' }}>
                  {this.renderPostsList()}
                </ul>
              </div>
              <div className='home-posts-active-post'>
                {this.state.activePostId && this.renderActivePost()}
              </div>
            </div>
          </main>
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
      .find({ owner: Meteor.userId() })
      .fetch(),
  };
})(Home);