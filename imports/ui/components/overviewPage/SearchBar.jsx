import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../../css/overviewPage/Overview.css';

const styles = {
  textField: {

  },
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
    };
  }

  handleTextFieldChange = (event) => {
    this.setState({ searchField: event.target.value });
  }

  render() {
    const { user, classes } = this.props;

    return (
      <div>
        <h1>Hi, {user.firstName}!</h1>
        <TextField
          id="search-bar"
          label="Search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={event => this.handleTextFieldChange(event)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);
