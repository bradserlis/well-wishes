import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

class Comment extends Component {
  render(){
    return(
      <li key={this.props.data._id.toString()}>
        <Card> 
          <Card.Content>
            <Card.Header>
              <h3>{this.props.data.username}</h3> 
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Card.Description>
              <p>{this.props.data.content}</p>
              <p><strong>{this.props.data.likes}</strong> Likes</p>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>  
              <p>{this.props.data.createdAt.toDateString()}</p>
          </Card.Content>
        </Card> 
      </li>        
    )
  }
}

export default Comment;
