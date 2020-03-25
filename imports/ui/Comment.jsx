import React, { Component } from 'react';
import { Card, Feed, Icon } from 'semantic-ui-react';

class Comment extends Component {
  addLike = () => {
    this.props.data.owner !== Meteor.userId() ?
      Meteor.call('likes.insert', this.props.data._id, this.props.postId) : alert('Cannot like your own comment');
  }

  render() {
    return (
      <li key={this.props.data._id.toString()}>
        <Feed>
          <Feed.Event>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>{this.props.data.username}</Feed.User>
                <Feed.Date> {this.props.data.createdAt.toDateString()} </Feed.Date>
              </Feed.Summary>
              <Feed.Extra text> {this.props.data.content} </Feed.Extra>
              <Feed.Meta>
                <Feed.Like>
                  <Icon onClick={this.addLike} name='like' /> {this.props.data.likes} Likes
                </Feed.Like>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </li>
    )
  }
}

export default Comment;
