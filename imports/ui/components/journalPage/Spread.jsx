import React, { Component } from 'react';
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Page from './Page';
import '../../css/journalPage/Spread.css';

const styles = {
  spreadContainer: {
    paddingTop: '20px',
  },
};

class Spread extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { loading, classes } = this.props;

    return (
      loading
        ? <LinearProgress />
        : (
          <div className={classes.spreadContainer}>
            <div className="spread grid-container">
              <Page page="left" />
              <Page page="right" />
            </div>
          </div>
        )
    );
  }
}

export default withStyles(styles)(Spread);
