import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { 
  Container, 
  Form,
  Input,
  Button,
  TextArea,
  Message 
} from 'semantic-ui-react'

const PostForm = () => {
  const [postContent, setPostContent] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [success, setSuccess] = useState(false);

  showSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }


  updateContent = (content) => {
    setPostContent(content.target.value)
  }

  updateTitle = (title) => {
    setPostTitle(title.target.value)
  }

  handleSubmit = () => {
    event.preventDefault();

    let text = {
      content: postContent,
      title: postTitle,
    }

    Meteor.call('posts.insert', text);

    // Clear form
    setPostContent('');
    setPostTitle('');
    this.showSuccess();
  }


  return (
    <Form onSubmit={this.handleSubmit} success>
        <Form.Input
          placeholder='Post Title'
          value={postTitle}
          onChange={this.updateTitle}
        />
        <Form.TextArea
          placeholder='Post Content'
          value={postContent}
          onChange={this.updateContent}
        />
        <Button primary content='Submit' />
        { success ?
        ( 
          <Message
            success
            header='Added Post Successfully'
          /> 
        ) : ''
        }
    </Form>
  )
}

export default PostForm;
