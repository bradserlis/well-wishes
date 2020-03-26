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

const PostForm = (props) => {
  const [postContent, setPostContent] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [successPostMessage, setSuccessPostMessage] = useState(false);

  showPostSuccess = () => {
    setSuccessPostMessage(true);
    setTimeout(() => {
      props.addPostToggle()
      setSuccessPostMessage(false)
    }, 2000)
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
    this.showPostSuccess();
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
      {successPostMessage ?
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
