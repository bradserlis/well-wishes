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

  // componentDidMount = () => {
  //   let commentsArr = [];
  //   console.log('sanity check - props.commentsArray', this.props.commentsArray);
  //   this.props.commentsArray.forEach((url) => {
  //     console.log('what is being searched for on each', url);
  //     let foundComment = Comments.find({}).fetch();
  //     console.log('found Comment', foundComment);
  //   })
  //   // console.log('how did the commentsArray turn out', commentsArray);
  // }

  renderComments = () => {
    this.props.post.comments.map((comment)=>{
      return (
        <li key={comment.content.toString()}>
          <p>{comment.content}</p>
        </li>        
      )
    })
  }

  render() {
    console.log('sanity check - postid', this.props.post._id);
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
