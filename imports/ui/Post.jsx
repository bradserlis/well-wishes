import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, Button, Form, TextArea } from 'semantic-ui-react'

import { Posts } from '../api/posts';

 export default class Post extends Component {
  deletePost = () => {
    Meteor.call('posts.remove', this.props.post._id);
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
    return this.props.post.comments.map((comment)=> (
              <li key={comment._id.toString()}>
          <p>{comment.username} : {comment.content}</p>
        </li>        
    ))
  }

  render() {
    return (

    <li>
      <Card>
        <Card.Content>
          <Card.Header>
            { this.props.post.owner === Meteor.userId() && 
              (
                <Button
                floated='right'
                className="delete"
                onClick={this.deletePost}
                >
                &times;
                </Button>
              )
            }
            {this.props.post.title} 
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Description>
            {this.props.post.content} 
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <ul>
            { this.renderComments() }
          </ul>
          <Form className="new-comment" onSubmit={this.handleSubmit}>
            <TextArea
              type="text"
              ref="commentContentInput"
              placeholder="New comment..."
            />
            <Button
              onSubmit={this.handleSubmit}
            >
            Submit
            </Button>
          </Form>
        </Card.Content>
      </Card>        
    </li>
    );
  }
}
