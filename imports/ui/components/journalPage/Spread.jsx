import React, { Component } from 'react';
import { LinearProgress } from '@material-ui/core';

import Page from './Page';
import '../../css/journalPage/Spread.css';

class Spread extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { loading } = this.props;

    return (
      loading
        ? <LinearProgress />
        : (
          <div className="spread-container">
            <div className="spread grid-container">
              <Page page="left" />
              <Page page="right" />
            </div>
          </div>
        )
    );
  }
}

export default Spread;
