import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts';
import { Comments } from '../api/comments';

class Post extends Component {
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

    renderComments = async () => {
    let commentsArr = [];
    // this.props.commentsArray.forEach((url) => {
    //   let foundComment = Comments.findOne({_id: url})
      // console.log('what was the found comment?', foundComment); 
    // })
    // console.log('how did the commentsArray turn out', commentsArray);
    // Comments.findOne({_id: comment})
    console.log('this.props.comments', this.props.comments);
    return this.props.commentsArray.map((id)=>{
      let matchedComment = this.props.comments.find((comment)=> comment._id === id)
      console.log('what is matchedComment', matchedComment);
      return (
        <li key={matchedComment._id}>
          <p>{matchedComment.content}</p>
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
          {this.renderComments()}
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

export default withTracker(() =>{
  Meteor.subscribe('comments');

  return {
    comments: Comments
    .find({})
    .fetch()
  }
})(Post);
