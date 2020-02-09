// Dashboard.js
// Adapted from https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0

import React, { Component } from 'react';

const AUTH_URL = '/api/authenticate';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }

    render() {
        return (
            <div className="dash">
                <h1>Dashboard</h1>
            </div>
        );
    }
}