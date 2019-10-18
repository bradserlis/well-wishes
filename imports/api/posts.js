import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Posts = new Mongo.Collection('posts');

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
