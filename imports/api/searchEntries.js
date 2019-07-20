import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Entries = new Mongo.Collection('searchEntries');

/* Restrict what info (rows/documents in a table/collection) the user can see */
if (Meteor.isServer) {
  Meteor.publish('entries', function entriesPublication() {
    // Entries.find() returns the cursors, NOT the entries
    // themselves, i.e. Entries.find().fetch()
    return Entries.find({ owner: this.userId });
  });
}

// /* Restrict user's actions (i.e. write permission to database and business logic in api) */
// Meteor.methods({
//   'searchEntries.insert'(newEntry) {
//     check(newEntry, Object);

//     const {
//       header,
//       type,
//       createdAt,
//     } = newEntry;

//     // Make sure the user is logged in before inserting a task
//     if (!Meteor.userId()) {
//       throw new Meteor.Error('not-authorized');
//     }

//     Search.insert({
//       header,
//       type,
//       createdAt,
//       owner: Meteor.userId(),
//     });
//   },
//   'searchEntries.remove'(entryId) {
//     check(entryId, String);

//     Search.remove(entryId);
//   },
//   // 'entries.setHeader'(entryId, newHeader) {
//   //   check(entryId, String);
//   //   check(newHeader, String);

//   //   Entries.update(entryId, { $set: { header: newHeader } });
//   // },
// });