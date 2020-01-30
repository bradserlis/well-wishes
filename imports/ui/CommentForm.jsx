import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { 
  Container, 
  Form,
  Input,
  Button,
  TextArea,
  Message 
} from 'semantic-ui-react';

class PostForm extends Component {
  constructor(props){
    super(props)
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
  
  render(){
    
    return(
      <Form className="new-comment-form" onSubmit={this.handleSubmit}>
        <TextArea
          type="text"
          ref="commentContentInput"
          placeholder="New comment..."
          rows={2}
        />
        <Button
          primary
          onSubmit={this.handleSubmit}
        >
          Submit
        </Button>
      </Form>
    )
  }
}

export default PostForm;
