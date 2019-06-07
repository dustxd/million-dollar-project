import React, { Component } from 'react';
import Header from './Header';
import ButtonNewPage from './ButtonNewPage';

class Page extends Component {

    render() {
        return (
            <div className="grid-item">
                <Header />
                <div className="entry">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                </div>
                <ButtonNewPage isVisible = {this.props.isRightPage}  />
            </div>
        )
    }
}

export default Page;