import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Function that protects a component by requiring authorization
// Taken from https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0

const CHK_TKN_URL = '/checkToken';

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
            // TODO: Check to make sure token is valid. For now, assume it is.

            // fetch(CHK_TKN_URL)
            //     .then(res => {
            //         if (res.status === 200) {
            //             this.setState({ loading: false });
            //         } else {
            //             const error = new Error(res.error);
            //             throw error;
            //         }
            //     })
            //     .catch(err => {
            //         console.error(err);
            //         this.setState({ loading: false, redirect: true });
            //     });
            this.setState({loading: false});
        }
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return <ComponentToProtect {...this.props} />;
        }
    }
}