// Login.js
// Adapted from https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0
// import APIHandler from './APIHandler';
import React, { Component } from 'react';
import APIHandler from './APIHandler';
const AUTH_URL = '/api/authenticate';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password: ''
        };
    }
    //controls login and fixes input change
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
            const{email, password} = this.state;
            var users = this.APIHandler.getUsers(this.state);

                    

            };
        // TODO: Use fetch to authenticate. For now, just log in

        // fetch(AUTH_URL, {
        //     method: 'POST',
        //     body: JSON.stringify(this.state),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(res => {
        //     if (res.status === 200) {
        //         this.props.history.push('/');
        //     } else {
        //         const error = new Error(res.error);
        //         throw error;
        //     }
        // })
        // .catch(err => {
        //     console.error(err);
        //     alert('Error logging in please try again');
        // });

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required
                    />
                </div>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}