import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { Route } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';

import { Entries } from '../../../api/entries';
import { withTracker } from 'meteor/react-meteor-data';



class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { title: 'Date Created', field: 'date' },
        { title: 'Header', field: 'header' },
        { title: 'Details', field: 'type' },
      ],
      data: []
    };
  } 

  render() {
    const { entries } = this.props;
    
    console.log(entries);


  return (
    <div className="search-container">
      <MaterialTable
        title="Search Results"
        columns={this.state.columns}
        data={entries}
        actions={[
          {
            icon:'add_circle_outline',
            tooltip:'See All Details',
            onClick: (event, rowData) => {
              //Operation to expand entire message
            }
          },
          {
            icon:'book',
            tooltip:'Go To Page',
            onClick: () => {
              const { coreProps, history } = this.props;
              // const { actions } = coreProps;
              // history.push('/singlePage',{ entry: _id})
            }
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />
    </div>
  );



  // onClickSignout = () => {
  //   const { coreProps, history } = this.props;
  //   const { actions } = coreProps;
  //   actions.logoutUser();
  //   history.push('/login');
  // }
  
}
}

export default ResultsContainer = withTracker(() => {
  Meteor.subscribe('entries');


  return {
    entries: Entries.find(
      {}, 
      {sort: {createdAt: -1}, 
      fields:{createdAt: 1, header: 1, type: 1, _id: 1}
    }).fetch(),
  };
})(Results)



