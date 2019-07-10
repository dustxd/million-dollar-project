import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@material-ui/core';

const styles = {
  itemTextField: {

  },
};
class LineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  onClickBullet = () => {
    console.log('clicked');
  }

  onChangeContent = (e) => {
    this.setState({
      content: e.target.value,
    });
  }

  handleSubmit =(e) => {
    e.preventDefault();
  }

  getBulletIcon = (type, status) => {
    if (type === 'TASK') {
      switch (status) {
        case 'TODO':
          return 'lens';
        case 'COMPLETED':
          return 'done';
        case 'SCHEDULED':
          return 'chevron_left';
        case 'MIGRATED':
          return 'chevron_right';
        default:
          return null;
      }
    }

    if (type === 'EVENT') {
      return 'panorama_fish_eye';
    }

    if (type === 'NOTE') {
      return 'remove';
    }

    return null;
  }

  render() {
    const { classes, item } = this.props;
    const { type, status, content } = item;

    return (
      <div>
        <ListItem button>
          <ListItemIcon onClick={() => this.onClickBullet()}>
            <Icon>{this.getBulletIcon(type, status)}</Icon>
          </ListItemIcon>
          <ListItemText>
            <TextField
              className={classes.itemTextField}
              defaultValue={content}
              InputProps={{
                disableUnderline: true,
              }}
              onChange={e => this.onChangeContent(e)}
            />
          </ListItemText>
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(LineItem);
