import React, { Component } from 'react';
import { Icon, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

const NUM_PREVIEW_ITEMS = 3;

class DetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    const { lineItems } = this.props;
    const { open } = this.state;
    const displayedLineItems = open ? lineItems : lineItems.slice(0, NUM_PREVIEW_ITEMS);
    const isPreviewAll = lineItems.length <= NUM_PREVIEW_ITEMS;

    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        {
          <div>
            {
              displayedLineItems.map(lineItem => (
                <Typography key={lineItem._id}>
                  {lineItem.content}
                </Typography>
              ))
            }
          </div>
        }
        {
          isPreviewAll
            ? null // Hide show more button if preview already shows all line items
            : (
              <IconButton onClick={() => this.setState(prevState => ({ open: !prevState.open }))}>
                <Icon>{open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</Icon>
              </IconButton>
            )
        }
      </div>
    );
  }
}

export default withStyles(styles)(DetailView);
