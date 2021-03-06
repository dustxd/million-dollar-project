import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { SEARCH_CONSTRAINTS } from '../../../constants/ResourceConstants';

const styles = {

};

class DetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { lineItems, id, selectedLineItem } = this.props;
    const open = id === selectedLineItem;
    const displayedLineItems = open
      ? lineItems
      : lineItems.slice(0, SEARCH_CONSTRAINTS.NUM_PREVIEW_ITEMS);

    return (
      <div>
        {
          displayedLineItems.map(lineItem => (
            <Typography key={lineItem._id}>
              {lineItem.content}
            </Typography>
          ))
        }
      </div>
    );
  }
}

export default withStyles(styles)(DetailView);
