import React from 'react';
import MaterialTable from 'material-table';

export default function Results() {
const [state, setState] = React.useState({
    columns: [
      { title: 'Date', field: 'date' },
      { title: 'Type', field: 'type' },
      { title: 'Details', field: 'content' },
      // { title: '', field: 'details' },
      // { title: '', field: 'redirect' }
    ],
    data: [
      { 
        date: '2019-06-20',
        type: 'entry',
        content: '...test today...'
      },
      { date: '2019-06-15',
        type: 'list',
        content: 'Testing 1 2 3'
      }
    ]
  })

  return (
    <div className="search-container">
      <MaterialTable
        title="Search Results"
        columns={state.columns}
        data={state.data}
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
            onClick: (event, rowData) => {
              //Operation to redirect to page
            }
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />
    </div>
  );
}



