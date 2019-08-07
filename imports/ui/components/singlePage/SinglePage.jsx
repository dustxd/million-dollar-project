import React, { Component } from 'react';
import { Grid, LinearProgress, Paper, Icon, IconButton, Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import { withStyles, emphasize } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';

import Page from '../journalPage/Page';
// import StyledBreadCrumb from './StyledBreadCrumb';

const styles = {
  singleContainer: {
    padding: '20px',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '100%',
    minHeight: '-webkit-fill-available',
  },
};

const StyledBreadCrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: 24,
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

class SinglePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  changeMode = (mode) => {
    const { actions, index } = this.props;

    actions.updateIndexPage({
      page: index.page,
      mode,
    });
  }

  // entriesModeButtonColor = () => {
  //   const { index } = this.props;
  //   if (index.mode === 'entries') {
  //     return 'primary';
  //   }
  //   return 'default';
  // }

  // collectionsModeButtonColor = () => {
  //   const { index } = this.props;
  //   if (index.mode === 'collections') {
  //     return 'primary';
  //   }
  //   return 'default';
  // }

  modeButtonColor = (mode) => {
    const { index } = this.props;
    if (index.mode === mode) {
      return 'primary';
    }
    return 'default';
  }

  


  render() {
    const { loading, classes, actions, index } = this.props;

    return (
      loading
        ? <LinearProgress />
        : (
          <div className={classes.singleContainer}>
            <div className={classes.root}>
              {/* <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadCrumb 
                  component="a"
                  // href="#"
                  label="Entries"
                  avatar={
                    <Icon>date_range</Icon>
                  }
                  // onClick={handleClick}
                />
                <StyledBreadCrumb 
                  component="a"
                  href="#"
                  label="Collections"
                  avatar={
                    <Icon>list_alt</Icon>
                  }
                  // onClick={handleClick}
                />
              </Breadcrumbs> */}

              {/* <Fab size="small" variant="Entries" aria-label="delete" className={classes.fab}>
              
                <Icon>date_range</Icon>

              Entries
              </Fab> */}

              <Grid container spacing={0} justify="center">
                <Grid item xs={12} sm={8}>
                  <Button size="small" variant="contained" color={this.modeButtonColor('entries')} className={classes.button}>
                    <Icon>date_range</Icon>
                    Entries              
                  </Button>
                  <Button size="small" variant="contained" color={this.modeButtonColor('collections')} className={classes.button}>
                    <Icon>list_alt</Icon>
                    Collections            
                  </Button>
                  <Button size="small" variant="contained" color={this.modeButtonColor('createdAt')} className={classes.button}>
                    <Icon>access_time</Icon>
                    Created At              
                  </Button>
                  <Paper className={classes.paper}>
                    <Page type="DATED_SINGLE_PAGE" entryId={index.page} mode={index.mode} actions={actions} />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        )
    );
  }
}

export default withRouter(withStyles(styles)(SinglePage));
