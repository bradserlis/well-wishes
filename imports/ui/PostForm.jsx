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
    this.showSuccess();
  }


  return (
    <Form onSubmit={this.handleSubmit} success>
      <Form.Group>
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
        <Form.Button content='Submit' />
        { success ?
        ( 
          <Message
            success
            header='Form Completed'
            content="You're all signed up for the newsletter"
          /> 
        ) : ''
        }
      </Form.Group>
    </Form>
  )
}

export default PostForm;
  

    // <Form className="new-task" onSubmit={this.handleSubmit}>
    //   <Form.Field>
    //     <label>Post Title</label>
    //     <input 
    //     placeholder='Post Title'
    //     onChange={this.updateTitle}
    //     value={postTitle}
    //     />
    //   </Form.Field>
    //   <Form.TextArea
    //   onChange={this.updateContent}
    //   value={''}
    //   />
    //   <Button
    //     type='submit'
    //     onSubmit={this.handleSubmit}
    //   >
    //   Submit
    //   </Button>
    // </Form>
