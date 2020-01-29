import React, { Component } from 'react';
import { Card, Feed, Icon } from 'semantic-ui-react';

class Comment extends Component {
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
                  <Icon name='like' /> {this.props.data.likes} Likes
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

          // <Card.Content>
          //   <Card.Description>
          //     <h3>{this.props.data.username}</h3> 
          //   </Card.Description>
          // </Card.Content>
          // <Card.Content>
          //   <Card.Description>
          //     <p>{this.props.data.content}</p>
          //     <p><strong>{this.props.data.likes}</strong> Likes</p>
          //   </Card.Description>
          // </Card.Content>
          // <Card.Content extra>  
          //     <p>{this.props.data.createdAt.toDateString()}</p>
          // </Card.Content>
