import React, { Component } from 'react';

class ButtonNewPage extends Component {
    render() {
        if (this.props.isVisible) {
            return (
                <div className="button-new-page">
                    <button> A button </button>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }
}

export default ButtonNewPage;