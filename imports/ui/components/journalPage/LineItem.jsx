import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { flexbox } from '@material-ui/system';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Bullet from './Bullet';

const styles = {
  line: {
    border: 'none',
    background: 'none',
    // margin: 'auto',
    // flex: 1,
  },
  bullet: {
    // margin: 'auto',
    // marginRight: '1em',
  },
  form: {
    // display: 'flex',
    // alignItems: 'center',
    // minHeight: '1.5em',
  },
};
class LineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  handleFormChange =(e) => {
    this.setState({
      content: e.target.value,
    });
  }

  handleSubmit =(e) => {
    e.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ListItem button>
          <ListItemIcon>
            <Bullet type={this.props.bulletType} />
          </ListItemIcon>
          <ListItemText>
            <InputBase
              className={classes.line}
              defaultValue={this.props.content}
              inputProps={{ 'aria-label': 'naked' }}
            />
          </ListItemText>
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(LineItem);
