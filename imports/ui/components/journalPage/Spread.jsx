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
    const { loading, classes, actions } = this.props;

    return (
      loading
        ? <LinearProgress />
        : (
          <div className={classes.spreadContainer}>
            <div className="spread grid-container">
              <Page actions={actions} page="left" />
              <Page actions={actions} page="right" />
            </div>
          </div>
        )
    );
  }
}

export default withStyles(styles)(Spread);
