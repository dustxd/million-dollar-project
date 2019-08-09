import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
} from '@material-ui/core';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class AccountDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      right: false,
    };
  }

  toggleDrawer = (side, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({[side]: open });
  };
  
  render() {
    const { onClickLogout, classes } = this.props;
    const sideList = (side) => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.toggleDrawer(side, false)}
        onKeyDown={this.toggleDrawer(side, false)}
      >
      <List subheader={<ListSubheader>Account</ListSubheader>} className={classes.root}>
        
          {['My Account', 'Logout'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon onClick={onClickLogout}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List subheader={<ListSubheader>This App</ListSubheader>} className={classes.root}>
          {['About'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <Tooltip title="Account" aria-label="Account">
          <IconButton onClick={this.toggleDrawer('right', true)}>
            <Icon color="secondary">account_circle</Icon>
          </IconButton>
        </Tooltip>
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          {sideList('right')}
        </Drawer>
      </div>
    
      );
  }
}
export default withStyles(styles)(AccountDrawer);