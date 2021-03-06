// Login.js
// Adapted from https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0
// import APIHandler from './APIHandler';
import React from 'react';
import APIHandler from './APIHandler';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password: '',
            errorText:''
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
        const{ email, password } = this.state;
        APIHandler.postLogin(email, password, (res) => {
            if (res.ok) {
                this.props.history.push('/admindash');
            } else {
                this.setState({errorText:res.error});
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Campus Sustainability Tour</h1>
                <h1>Administrator Panel</h1>
                <p>Please log in to continue</p>
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
                <div className = "error-text">
                    {this.state.errorText}
                </div>
                <input type="submit" value="Log in"/>
            </form>
        );
    }
}