import React, { Component } from 'react';
import { Icon } from '@material-ui/core';

class Entry extends Component {
  onClickDeleteEntry = (entryId) => {
    const { actions } = this.props;
    actions.deleteResource(entryId, 'entries');
  }

  render() {
    const { header, entryId } = this.props;

    return (
      <div>
        <span className="header">{header}</span>
        <Icon onClick={() => this.onClickDeleteEntry(entryId)}>delete</Icon>
        <div className="entry">
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
        </div>
      </div>
    );
  }
}

export default Entry;