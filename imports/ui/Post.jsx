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
  state = {
    openConfirm: false,
    showCommentForm: false,
    showComments: false
  }

  toggleCommentForm = () => {
    this.setState({
      showCommentForm: !this.state.showCommentForm
    })
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

  renderCommentsCheck = () => {
    Meteor.call('users.checkCommentTimer', 'checkComments', (error, result) => {
      if (error) {
        throw error
      }
      this.setState({ showComments: result })
    })
  }

  renderComments = () => {
    return this.props.post.comments.map((comment) => (
      <Comment data={comment} postId={this.props.post._id} key={comment._id.toString()} />
    ))
  }

  componentDidMount = () => {
    this.props.post.owner === Meteor.userId() ? this.renderCommentsCheck() : this.setState({
      showComments: true
    })
  }

  render() {
    return (
      <div className='post-container'>
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
                      <Button
                        circular
                        negative
                        icon={'close'}
                        size={'mini'}
                        onClick={this.openConfirm}
                      >
                      </Button>
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
          {this.props.post.comments.length > 0 &&
            (
              <Card.Content>
                <ul style={{ 'listStyle': 'none', 'paddingInlineStart': '0' }}>
                  {this.state.showComments === true ? this.renderComments() : <p className='comment-timer-fail-message'> Please post to another user to see your comments! </p>}
                </ul>
              </Card.Content>
            )
          }
          <Card.Content>
            <Button
              positive
              circular
              content='Add Comment'
              onClick={this.toggleCommentForm}
            />
            {
              this.state.showCommentForm &&
              <CommentForm post={this.props.post} />
            }
          </Card.Content>
        </Card>
      </div>
    );
  }
}
