import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import '../../css/overview/Overview.css';

const searchStyle = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}))

class SearchBar extends React.Component{
    render(){
        return (
            <div>
            <h1>Hi, gorgeous!</h1>
            <TextField 
            id="search-bar" 
            label="Search" 
            className={searchStyle.textField} 
            margin="normal"
            variant="outlined"
            />
            </div>
        );
    }
}

export default SearchBar;