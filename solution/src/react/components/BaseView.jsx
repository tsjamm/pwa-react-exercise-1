
/** The Base View */
/** This view wraps the Header and the Main Views */

import React, { Component } from 'react';

import { HeaderView } from './HeaderView.jsx';

var BaseViewModel = {
    headerTitle: "React"
}

export class BaseView extends Component {
    constructor(props) {
        super(props);
        this.state = BaseViewModel
        this.onHelloReactClick = this.onHelloReactClick.bind(this);
        this.onHelloWorldClick = this.onHelloWorldClick.bind(this);
    }
    onHelloReactClick() {
        this.setState({headerTitle: "React"});
    }
    onHelloWorldClick(){
        this.setState({headerTitle: "World"});
    }
    render() {
        return (
            <div id="bodyContainer" className="body-container">

                <div id="headerWrapper" className="header-wrapper">
                    {/* Header Section Begins */ }
                    <HeaderView headerTitle={this.state.headerTitle}/>
                    {/* Header Section Ends */ }
                </div>

                <div id="mainWrapper" className="main-wrapper">
                    <main id="main" className="main">
                        <div id="mainContainer" className="main-container">
                            <br />
                            <button onClick={this.onHelloReactClick}>Hello React!</button>
                            <br /><br />
                            <button onClick={this.onHelloWorldClick}>Hello World!</button>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}
