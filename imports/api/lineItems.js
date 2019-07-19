import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const LineItems = new Mongo.Collection('lineItems');
export default LineItems;

/* Restrict what info (rows/documents in a table/collection) the user can see */
if (Meteor.isServer) {
  // Meteor combines the results of different queries on the same collection,
  // but we don't want to return all the documents to the client side because
  // it is a security breach. Hence, we are duplicating the queries for now.
  Meteor.publish('lineItems', entryId => LineItems.find({ entryId }));
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
  'lineItems.update': (lineItemId, updatedLineItem) => {
    check(lineItemId, String);
    check(updatedLineItem, Object);

    LineItems.update(lineItemId, updatedLineItem);
  },
});
