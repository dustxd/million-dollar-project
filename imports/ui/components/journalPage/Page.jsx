import React, { Component } from 'react';
//import { Grid, Paper } from '@material-ui/core';
import Entry from './Entry';
import ButtonNewPage from './ButtonNewPage';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const styles = {
  leftPage: {
    padding: '1em',
    paddingRight: '3em',
  },
  rightPage: {
    padding: '1em',
    paddingLeft: '3em',
  }
};

class Page extends Component {
  
  render() {
    const { classes } = this.props;
    switch (this.props.page) {
      case "right":
      return (
          <div>
        {/* <Grid> */}
          <div className={classes.rightPage}>
          <Entry header="Jun 8 | Sat"/>
          {/* <ButtonNewPage /> */}
          </div>
          
        {/* </Grid>   */}
        </div>
      )
    case "left":
      return (
          <div>
        {/* <Grid> */}
       <div className={classes.rightPage}>
          <Entry header="A list" />
        </div>
        </div>
      );
    
    default:
      return (
      <div className="grid-item right-page">
      <div>
        <Entry header="Jun 8 | Sat" />
        <ButtonNewPage />
      </div>
      </div>
    );
  }
  
}

}
export default withStyles(styles)(Page);
