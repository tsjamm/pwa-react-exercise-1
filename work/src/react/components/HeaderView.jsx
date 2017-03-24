
/** Header */

import React, { Component } from 'react';

export class HeaderView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <header id="header" className="header">
            <div id="headerContainer" className="header-container">
                <div id="logoWrapper" className="logo-wrapper">
                    <span className="mm-blue">Hello</span>{this.props.headerTitle}
                </div>
            </div>
        </header>
        )
    }
}
