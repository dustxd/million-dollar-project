import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const LineItems = new Mongo.Collection('lineItems');
export default LineItems;

/* Restrict what info (rows/documents in a table/collection) the user can see */
if (Meteor.isServer) {
  Meteor.publish('lineItems', function lineItemsPublication(entryId) {
    return LineItems.find({ entryId });
  });
}

/* Restrict user's actions (i.e. write permission to database and business logic in api) */
Meteor.methods({
  'lineItems.insert': (newLineItem) => {
    check(newLineItem, Object);

    const {
      type,
      status,
      content,
      entryId,
    } = newLineItem;

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    LineItems.insert({
      type,
      status,
      content,
      entryId,
      owner: Meteor.userId(),
    });
  },
  'lineItems.remove': (lineItemId) => {
    check(lineItemId, String);

    LineItems.remove(lineItemId);
  },
});
