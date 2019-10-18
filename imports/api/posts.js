import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

Meteor.methods({
  'posts.insert'(text) {
    check(text, Object);

    // make sure user is logged in before inserting
    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.insert({
      title: text.title,
      content: text.content,
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      createdAt: new Date(), // current time
    })
  },
  'posts.remove'(postId) {
    check(postId, String);

    Posts.remove(postId);
  }
})

PostSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Post Title",
  },
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
  }
});

Posts.attachSchema(PostSchema);
