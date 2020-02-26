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
} from 'semantic-ui-react'

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

  componentDidMount = () => {
    console.log('sanity check - checkCommentTimer', Meteor.call('users.checkCommentTimer'));
  }

  render() {
    return (
      <Container>
        <div className='home-container'>
          <div className='home-title'>
            <header>
              <h1> Home page </h1>
            </header>
          </div>
          <main>
            <div className='home-welcome-text'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et malesuada. In vitae turpis massa sed elementum tempus egestas. Cursus mattis molestie a iaculis at. Velit sed ullamcorper morbi tincidunt ornare massa. Gravida neque convallis a cras semper. Ut consequat semper viverra nam libero justo. Ut porttitor leo a diam sollicitudin tempor id. Aliquam purus sit amet luctus. Senectus et netus et malesuada fames ac turpis egestas maecenas.
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