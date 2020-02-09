// Dashboard.js
// Adapted from https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0

import React, { Component } from 'react';
import Map from "./Map";

const AUTH_URL = '/api/authenticate';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }

    handleAddStop = () => {

    };

    handleEditIntro = () => {

    };

    render() {
        return (
            <div className="dash">
                <header>
                    <h1>Dashboard</h1>
                    <div className="toolbar">
                        <button onClick={this.handleAddStop} className="optionBtn">Add Site</button>
                        <button onClick={this.handleEditIntro} className="optionBtn">Edit Intro</button>
                    </div>
                </header>
                <Map />
            </div>
        );
    }
}