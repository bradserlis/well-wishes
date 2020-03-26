import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Container,
  Form,
  Input,
  Button,
  TextArea,
  Dimmer,
  Header
} from 'semantic-ui-react'

const PostForm = (props) => {
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [showDimmer, setShowDimmer] = useState(false);

  showSuccessDimmer = () => {
    setShowDimmer(true)
    setTimeout(() => {
      setShowDimmer(false)
    }, 1200)
    setTimeout(() => {
      props.addPostToggle()
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
    showSuccessDimmer();
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
      {showDimmer &&
        (
          <Dimmer active={showDimmer} page>
            <Header inverted>
              Added Post Sucessfully!
            </Header>
          </Dimmer>
        )
      }
    </Form>
  )
}

export default PostForm;
