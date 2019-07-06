import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
// import {Template} from 'meteor/templating';
import {Entries} from '/imports/api/entries.js';
import { keys } from '@material-ui/core/styles/createBreakpoints';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

function insertEntry(header, type, listItems){
  Entries.insert(
    {header: header,
      type: type,
      listItems: listItems
  }
  )
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

  // insertEntry(
  //   '07/05/2019',
  //   'entry',
  //   [{status: 'ongoing', content: 'Test Item 1'},
  //    {status: 'ongoing', content: 'Test Item 2'}
  // ]
  // )
});

Entries.schema = new SimpleSchema({
  header: {type: String},
  type: {type: String},
  // listItems: {type: []}
})


console.log(Entries.find());