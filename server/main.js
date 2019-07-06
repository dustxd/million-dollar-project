import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
// import {Template} from 'meteor/templating';
import {Entries} from '/imports/api/entries.js';
import { keys } from '@material-ui/core/styles/createBreakpoints';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    insertLink(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );

    insertLink(
      'Follow the Guide',
      'http://guide.meteor.com'
    );

    insertLink(
      'Read the Docs',
      'https://docs.meteor.com'
    );

    insertLink(
      'Discussions',
      'https://forums.meteor.com'
    );
  }
});

// Entries.schema = new SimpleSchema({
//   entryId: {type: String},
//   header: {type: String},
//   type: {type: String},
//   listItems: []
// })


// console.log(Entries.find({}));