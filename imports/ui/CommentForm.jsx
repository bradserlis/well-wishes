import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { 
  Container, 
  Form,
  Input,
  Button,
  TextArea,
  Message 
} from 'semantic-ui-react';

class PostForm extends Component {
  handleSubmit = () => {
    event.preventDefault();

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
