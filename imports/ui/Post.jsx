import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

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
      { this.props.post.owner === Meteor.userId() ? 
        (
          <button
          className="delete"
          onClick={this.deletePost}
          >
          &times;
          </button>
        ) : ''
      }
        <span className='text'>      
        <strong>{this.props.post.title}</strong>
        : 
        {this.props.post.content}
        </span>
        <br />
        <p> comments: </p>
        <ul>
        { this.renderComments() }
        </ul>
        <form className="new-comment" onSubmit={this.handleSubmit}>
            <textarea
              type="text"
              ref="commentContentInput"
              placeholder="New comment..."
            />
            <button
              onSubmit={this.handleSubmit}
            >
            Submit
            </button>
          </form>
      </li>
    );
  }
}
