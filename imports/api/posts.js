import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Random } from 'meteor/random';
import { isAfter } from 'date-fns';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  //this code only runs on the server
  Meteor.publish('posts', () => {
    return Posts.find();
  });
}

Meteor.methods({
  'posts.insert'(text) {
    check(text, Object);

    // make sure user is logged in before inserting
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.insert({
      title: text.title,
      content: text.content,
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      createdAt: new Date(), // current time
      comments: []
    })
  },
  'users.checkCommentTimer'(event) {
    if (event === 'postComment') {
      let nextComment = Meteor.users.findOne(this.userId).nextTimeCommentAt || true;
      if (nextComment == true) {
        return true
      } else {
        return (isAfter(Date.now(), nextComment));
      }
    }
  },
  'comments.insert'(content, postId) {
    check(content, String);

    // make sure user is logged in before inserting
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    let date = new Date();

    Posts.update(
      { _id: postId.toString() },
      {
        $push:
          {
            comments:
              {
                _id: Random.id(),
                content: content,
                owner: this.userId,
                username: Meteor.users.findOne(this.userId).username,
                createdAt: date
              }
          }
      }, () => {
        Meteor.users.update({ _id: this.userId }, {
          $set: {
            lastTimeCommented: date,
            nextTimeCommentAt: date.addDays(1)
          }
        })
      });
  },
  'likes.insert'(commentId, postId) {
    check(commentId, String);
    check(postId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.update(
      {
        '_id': postId.toString(),
        'comments._id': commentId.toString()
      },
      {
        $inc:
          {
            'comments.$.likes': 1
          }
      })
  },
  'posts.remove'(postId) {
    check(postId, String);

    const post = Posts.findOne(postId);
    if (post.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.remove(postId);
  },
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
  },
  comments: {
    type: Array,
  },
  'comments.$': Object,
  'comments.$._id': String,
  'comments.$.content': String,
  'comments.$.owner': String,
  'comments.$.username': String,
  'comments.$.createdAt': {
    type: Date,
    autoValue: () => { return new Date() },
  },
  'comments.$.likes': {
    type: Number,
    defaultValue: 0,
    optional: true,
  },
}, { check });

Posts.attachSchema(PostSchema);


