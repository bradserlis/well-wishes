import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { Posts } from '../api/posts.js';

export default class Post extends Component {
  deletePost = () => {
    Meteor.call('posts.remove', this.props.post._id);
  }
    handleSubmit = (event) => {
    event.preventDefault();
    // Find the text field via the React ref
    const content = ReactDOM.findDOMNode(this.refs.commentContentInput).value.trim();
    const postId = this.props.post._id;

    let text = {
      content: content,
      postId: postId
    }

    Meteor.call('comments.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.commentContentInput).value = '';
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
