import React, { Component } from 'react';
import Entry from './Entry';
import ButtonNewPage from './ButtonNewPage';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { page } = this.props;

    if (page === 'left') {
      return (
        <div className="grid-item left-page">
          <Entry header="Grocery list" />
          <Entry header="Snack list" />
        </div>
      );
    }

    return (
      <div className="grid-item right-page">
        <Entry header="Jun 8 | Sat" />
        <ButtonNewPage />
      </div>
    );
  }
}

export default Page;
