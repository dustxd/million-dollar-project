import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ABOUT from '../../constants/About';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
    color: '#fff',
  },
  devProfile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
  },
  button: {
    marginTop: 10,
    fontSize: '0.8em',
  }
};

class AccountDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      right: false,
      aboutOpen: false,
    };
  }

  handleAboutClickOpen = () => {
    this.setState({aboutOpen: true});
  }

  handleAboutClose = () => {
    this.setState({aboutOpen: false});
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
      <List subheader={<ListSubheader>My Account</ListSubheader>} className={classes.root}>

            <ListItem button key="Logout">
              <ListItemIcon onClick={onClickLogout}>
                <Icon>power_settings_new</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
      
        </List>
        <Divider />
        <List subheader={<ListSubheader>This App</ListSubheader>} className={classes.root}>
          
            <ListItem button key="about" onClick={this.handleAboutClickOpen}>
              <ListItemIcon>
              <Icon>info</Icon>
              </ListItemIcon>
              <ListItemText primary="About App" />
            </ListItem>
        </List>
      </div>
    );

    const devList = ABOUT.devs.map((dev) => {
      if (dev.photo !== "") {
        return(
          <div id={dev.name} className={classes.devProfile}>
            <Avatar alt={dev.name} src={dev.photo} className={classes.bigAvatar} />
            <Typography variant="button">{dev.name}</Typography>
            <Typography variant="overline">{dev.title}</Typography>
            <Button variant="outlined" color="primary" className={classes.root} href={dev.linkedin}>LinkedIn</Button>
          </div>
        )
      } else {
        let initial = dev.name.charAt(0);
        return(
          <div id={dev.name} className={classes.devProfile}>
            <Avatar alt={dev.name} className={classes.bigAvatar}>
            {initial}
            </Avatar>
            <Typography variant="button">{dev.name}</Typography>
            <Typography variant="overline">{dev.title}</Typography>
            <Button variant="outlined" color="primary" className={classes.root} href={dev.linkedin}>LinkedIn</Button>
          </div>
        )
      }
    });

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
        <div>
          <Dialog
            open={this.state.aboutOpen}
            onClose={this.handleAboutClose}
            aria-labelledby="about-app"
            aria-describedby="about-app"
          >
            <DialogTitle id="about-title">{ABOUT.title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="about-description">
              {ABOUT.description}
              </DialogContentText>
              <Grid container justify="center" alignItems="center">
                {devList}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleAboutClose} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    
      );
  }
}
export default withStyles(styles)(AccountDrawer);