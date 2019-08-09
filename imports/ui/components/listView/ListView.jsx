import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Results from './Results';

const styles = {
  listViewContainer: {
    padding: '20px',
  },
};

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes, actions, mode } = this.props;

    return (
      <div className={classes.searchContainer}>
        <Results actions={actions} mode={mode}/>
      </div>
    );
  }
}

export default withStyles(styles)(ListView);
