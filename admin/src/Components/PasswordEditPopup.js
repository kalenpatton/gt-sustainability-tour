import React from 'react';
import APIHandler from './APIHandler';

export default class PasswordEditPopup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPass: '',
            newPass: '',
            verifyNewPass: '',
            errorText: ''
        };
        this.save = this.props.onSave;
        console.log(this.isNew)
    }

    onSubmit = (event) => {
        const { currentPass, newPass, verifyNewPass } = this.state
        event.preventDefault();
        event.stopPropagation();
        if (newPass != verifyNewPass) {
            this.setError("Passwords must match.");
            return;
        }
        if (newPass.length < 8) {
            this.setError("Password must be at least 8 characters.");
            return;
        }
        APIHandler.postPassChange(this.state.currentPass, this.state.newPass, (res) => {
            if (res.ok) {
                alert("Password changed!")
                this.props.onClose();
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
                <h2>Change Password</h2>
                <form onSubmit={this.onSubmit}>
                    <div className='left-text'>
                        <div>
                            {'Current Password: '}
                            <input
                                className="form-in"
                                type="password"
                                name="currentPass"
                                value={this.state.currentPass}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            {'New Password: '}
                            <input
                                className="form-in"
                                type="password"
                                name="newPass"
                                value={this.state.newPass}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            {'Confirm New Password: '}
                            <input
                                className="form-in"
                                type="password"
                                name="verifyNewPass"
                                value={this.state.verifyNewPass}
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