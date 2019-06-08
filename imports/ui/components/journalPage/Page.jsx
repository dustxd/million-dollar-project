import React, { Component } from 'react';
import Header from './Header';
import ButtonNewPage from './ButtonNewPage';

class Page extends Component {
    
    render() {
        if (this.props.page == "right") {
            return (
                <div className="grid-item right-page">
                    <Header />
                    <div className="entry">
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                    </div>
                    <ButtonNewPage />
                </div>
            )
        } 
        if (this.props.page == "left") { 
            return (
                <div className="grid-item left-page">
                    <Header />
                    <div className="entry">
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                    </div>

                </div>
            )
        }
    }
}

export default Page;