import React, { Component } from 'react';
import Entry from './Entry';
import ButtonNewPage from './ButtonNewPage';

class Page extends Component {
  render() {
    if (this.props.page == "right") {
      return (
        <div className="grid-item right-page">
          <Entry header="Jun 8 | Sat"/>
          <ButtonNewPage />
        </div>
      );
    }
    if (this.props.page == "left") {
      return (
        <div className="grid-item left-page">
          <Entry header="Grocery list" />
          <Entry header="Snack list" />
        </div>
      );
    }
  }
}

export default Page;