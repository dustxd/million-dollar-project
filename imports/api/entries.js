import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Entries = new Mongo.Collection('entries');

/* Restrict what info (rows/documents in a table/collection) the user can see */
if (Meteor.isServer) {
  Meteor.publish('entries', function entriesPublication() {
    // Entries.find() returns the cursors, NOT the entries
    // themselves, i.e. Entries.find().fetch()
    return Entries.find();
  });
}

/* Restrict user's actions (i.e. write permission to database and business logic in api) */
Meteor.methods({
  'entries.insert'(newEntry) {
    check(newEntry, Object);

    const {
      header,
      type,
      createdAt,
    } = newEntry;
    // // Make sure the user is logged in before inserting a task
    // if (!Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Entries.insert({
      header,
      type,
      createdAt,
      // owner: Meteor.userId(),
      // username: Meteor.user().username,
    });
  },
  // 'entries.remove'(entryId) {
  //   check(entryId, String);

  //   Entries.remove(entryId);
  // },
  // 'entries.setHeader'(entryId, setHeader) {
  //   check(entryId, String);
  //   check(setHeader, String);

  //   Entries.update(entryId, { $set: { header: setHeader } });
  // },
});