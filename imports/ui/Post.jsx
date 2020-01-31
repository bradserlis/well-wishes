import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import {
  Card,
  Button,
  Form,
  TextArea,
  Confirm,
  Icon,
} from 'semantic-ui-react'

import { Posts } from '../api/posts';
import Comment from './Comment';
import CommentForm from './CommentForm';

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openConfirm: false
    }
  }

  openConfirm = () => {
    this.setState({
      openConfirm: true
    })
  }

  closeConfirm = () => {
    this.setState({
      openConfirm: false
    })
  }

  deletePost = () => {
    Meteor.call('posts.remove', this.props.post._id);
    this.closeConfirm();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Find the text field via the React ref
    const content = ReactDOM.findDOMNode(this.refs.commentContentInput).value.trim();
    const postId = this.props.post._id;

    Meteor.call('comments.insert', content, postId);

    // Clear form
    ReactDOM.findDOMNode(this.refs.commentContentInput).value = '';
  }

  renderComments = () => {
    return this.props.post.comments.map((comment) => (
      <Comment data={comment} postId={this.props.post._id} key={comment._id.toString()} />
    ))
  }

  render() {
    return (
      <div className='post-container'>
        <li>
          <Card raised>
            <Card.Content>
              <Card.Header>
                <div className='post-header-container'>
                  {this.props.post.title}
                  {this.props.post.owner === Meteor.userId() &&
                    (
                      <div className='delete-post-container'>
                        <Confirm
                          open={this.state.openConfirm}
                          onCancel={this.closeConfirm}
                          onConfirm={this.deletePost}
                        />
                        <Icon
                          name='close'
                          circular
                          onClick={this.openConfirm} />
                      </div>
                    )
                  }
                </div>
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                {this.props.post.content}
              </Card.Description>
            </Card.Content>
            {this.props.post.comments.length > 0 ?
              (
                <Card.Content>
                  <ul style={{ 'listStyle': 'none', 'paddingInlineStart': '0' }}>
                    {this.renderComments()}
                  </ul>
                </Card.Content>
              )
              : null}
            <Card.Content>
              <CommentForm post={this.props.post} />
            </Card.Content>
          </Card>
        </li>
      </div>
    );
  }
}
