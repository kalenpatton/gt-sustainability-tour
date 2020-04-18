import React, { Component } from 'react';
import APIHandler from './APIHandler';
import { Redirect } from 'react-router-dom';

// Function that protects a component by requiring authorization
// Taken from https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0

export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        componentDidMount() {
            APIHandler.checkToken(res => {
                if (res) {
                    this.setState({
                        redirect: false,
                        loading: false,
                        email: res.email,
                        usertype: res.usertype
                    })
                } else {
                    this.setState({
                        redirect: true,
                        loading: false
                    })
                }
            })
        }
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return <ComponentToProtect {...this.props} email={this.state.email} usertype={this.state.usertype} />;
        }
    }
}