import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';

import { Entries } from '../../../api/entries';
import Entry from './Entry';

const styles = {
  centerPage: {
    padding: '1em',
    paddingLeft: '3em',
  },
};



class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTracker: ""
    };
  }

  // getMostRecentEntry = () => {
  //   return Entries;
  // }

  render() {
    const { classes, page, entries, actions } = this.props;
    // console.log(entries);
    // entry = entries[0];
    // console.log(entries);
    // console.log(entries[0]);


    return (
      <div className={classes.centerPage}>
        {/* <Entry header={entries[0].header} />
          <Entry header={entries[1].header} /> */}
        {
            // entry = entries[0];
            entries.map(entry => ( 
              <Entry
                key={entry._id}
                header={entry && entry.header}
                actions={actions}
                entryId={entry._id}
              />
            ))
          }
      </div>
    );




  }
}

export default PageContainer = withTracker(() => {
  Meteor.subscribe('entries');

  return {
    // entries: Entries.find({header: "July 19, 2019"}).fetch(),
    entries: Entries.find({}, {sort: {createdAt: -1}, limit: 1}).fetch(),
    // entries: Entries.find().fetch(),

    // entries: Entries.aggregate(
    // [
    //   {$sort: {createdAt: 1}},
    //   {
    //     $group:
    //     {
    //       _id: 
    //     }
    //   }
    // ]
    // )
  };
})(withStyles(styles)(Page));
