import React from 'react';
import APIHandler from './APIHandler';

export default class AddAdminPopup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            type: 'admin',
            email: '',
            password: '',
            verifypassword: '',
            errorText: ''
        };
        this.save = this.props.onSave;
        console.log(this.isNew)
    }

    onSubmit = (event) => {
        const { password, verifypassword } = this.state
        event.preventDefault();
        event.stopPropagation();
        if (password !== verifypassword) {
            this.setError("Passwords must match.");
            return;
        }
        if (password.length < 8) {
            this.setError("Password must be at least 8 characters.");
            return;
        }
        APIHandler.postAddUser(this.state.email, this.state.password, this.state.type, (res) => {
            if (res.ok) {
                alert("Admin added!")
                this.props.onSave();
            } else {
                this.setError(res.error)
            }
        })
    };

    setError = (text) => {
        this.setState({errorText: text})
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    render(){
        return(
            <div className="popupwindow">
                <h2>Add Admin Account</h2>
                <form onSubmit={this.onSubmit}>
                    <div className='left-text'>
                        <div>
                            {'User Type: '}
                            <select
                                id="admin-type"
                                name="type"
                                value={this.state.type}
                                onChange={this.handleInputChange}
                                required>
                                <option value={"admin"}>{"admin"}</option>
                                <option value={"superadmin"}>{"superadmin"}</option>
                            </select>
                        </div>
                        <div>
                            {'Email: '}
                            <input
                                className="form-in"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            {'Password: '}
                            <input
                                className="form-in"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            {'Confirm Password: '}
                            <input
                                className="form-in"
                                type="password"
                                name="verifypassword"
                                value={this.state.verifypassword}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="error-text">{this.state.errorText}</div>
                    </div>
                    <input type="submit" value="Save"/>
                </form>
            </div>
        );
    }
}