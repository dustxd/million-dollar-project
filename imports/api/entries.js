import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Entries = new Mongo.Collection('entries');
export default Entries;

/* Restrict what info (rows/documents in a table/collection) the user can see */
if (Meteor.isServer) {
  Meteor.publish('entries', function entriesPublication() {
    // Entries.find() returns the cursors, NOT the entries
    // themselves, i.e. Entries.find().fetch()
    return Entries.find({ owner: this.userId });
  });
}

/* Restrict user's actions (i.e. write permission to database and business logic in api) */
Meteor.methods({
  'entries.insert': (newEntry) => {
    check(newEntry, Object);

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    const {
      header,
      type,
      createdAt,
    } = newEntry;

    Entries.insert({
      header,
      type,
      createdAt,
      owner: Meteor.userId(),
    });
  },
  'entries.remove': (entryId) => {
    check(entryId, String);

    Entries.remove(entryId);
  },
  // 'entries.setHeader'(entryId, newHeader) {
  //   check(entryId, String);
  //   check(newHeader, String);

  //   Entries.update(entryId, { $set: { header: newHeader } });
  // },
});
