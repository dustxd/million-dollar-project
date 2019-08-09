import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
};

class TranslucentPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={`${classes.root} ${this.props.className}`}>
        {this.props.children}
      </Paper>
    )
  }
}

export default withStyles(styles)(TranslucentPaper);
