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
} from 'semantic-ui-react'

import { Posts } from '../api/posts';
import Comment from './Comment';

 export default class Post extends Component {
   constructor(props){
     super(props)
     this.state={
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
    return this.props.post.comments.map((comment)=> (
      <Comment data={comment} key={comment._id.toString()} />
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
                <div>
                <Confirm
                  open={this.state.openConfirm}
                  onCancel={this.closeConfirm}
                  onConfirm={this.deletePost}
                />
                <Button
                floated='right'
                className="delete"
                onClick={this.openConfirm}
                >
                &times;
                </Button>
                </div>
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
        <Card.Content>
          <ul style={{'listStyle':'none'}}>
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
