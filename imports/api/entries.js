import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Entries = new Mongo.Collection('entries');

Meteor.methods({
  'entries.insert'(newEntry) {
    check(newEntry, Object);

    const {
      header,
      type,
      createdAt,
    } = newEntry;

    Entries.insert({
      header,
      type,
      createdAt,
    });
  },
});