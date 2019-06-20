import React from 'react';
import MaterialTable from 'material-table';
import '../../css/overviewPage/SearchPage.css';

export default function Results() {
const [state, setState] = React.useState({
  columns: [
    {title: 'Date', field: 'date' },
    {title: 'Type', field: 'type'},
    {title: '', field: 'content'},
    {title: '', field: 'details'},
    {title: '', field: 'redirect'}
  ],
  data: [
    {date: '2019-06-20',
     type: 'entry',
     content: '...test today...'
    },
    {date: '2019-06-15',
     type: 'list',
     content: 'Testing 1 2 3'
    }
  ]
})

	render()
		return (
			<div className="search-container">
        <MaterialTable
          title="Results"
          columns={state.columns}
          data={state.data}
        />
			</div>
		);
}



export default SearchPage;