import React, { Component } from 'react';

import { Posts } from '../api/posts.js';

export default class Post extends Component {
  deletePost = () => {
    Posts.remove(this.props.post._id);
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
