import React, { Component } from 'react';
import { Card, Feed, Icon } from 'semantic-ui-react';

class Comment extends Component {
  addLike = () => {
    Meteor.call('likes.insert', this.props.data._id, this.props.postId);
  }

  render(){
    return(
      <li key={this.props.data._id.toString()}>
        <Card>
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
        </Card> 
      </li>        
    )
  }
}

export default Comment;
