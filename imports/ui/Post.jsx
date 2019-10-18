import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts.js';

export default class Post extends Component {
  deletePost = () => {
    Meteor.call('posts.remove', this.props.posts._id);
  }

  render() {
    return (
      <li>
        <button
          className="delete"
          onClick={this.deletePost}
        >
        &times;
        </button>
        <span className='text'>      
        <strong>{this.props.post.title}</strong>
        : 
        {this.props.post.content}
        </span>
      </li>
    );
  }
}
