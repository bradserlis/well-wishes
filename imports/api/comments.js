import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Posts } from './posts.js';

export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
  //this code only runs on the server
  Meteor.publish('comments', () => {
    return Comments.find();
  });
}

Meteor.methods({
  'comments.insert'(text) {
    check(text, Object);

    // make sure user is logged in before inserting
    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Comments.insert(
    {
      content: text.content,
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      createdAt: new Date(), // current time,
      postId: text.postId
    }, (err, commentId) => {  
      Posts.update(
        { _id: text.postId },
        {
         $push: { comments: commentId }
        }
      ) 
    })
  },
  'comments.remove'(commentId) {
    check(commentId, String);

    const comment = Comments.findOne(commentId);
    if (comment.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Comments.remove(commentId);
  },
})

CommentSchema = new SimpleSchema({
  content: {
    type: String,
    label: "Content",
  },
  owner: {
    type: String,
    label: "Owner",
  },
  username: {
    type: String,
    label: "Username",
  },
  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: () => {
      return new Date()
    }
  },
  likes: {
    type: Number,
    label: 'Likes',
    optional: true,
    defaultValue: 0
  },
  postId: {
    type: String,
    label:'PostID',
  }
});

Comments.attachSchema(CommentSchema);

