import React from 'react';
import APIHandler from './APIHandler';
import Modal from 'react-responsive-modal';
import AddAdminPopup from './AddAdminPopup';

export default class ManageAdminsPopup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            adminList:[],
            isAddAdminOpen: false,
            errorText:''
        };
        APIHandler.getUsers(this.onUpdateAdminList)
    }

    onUpdateAdminList = (res) => {
        this.setState(
            { adminList: res }
        );
    };

    openAddAdmin=()=>{
        this.setState({isAddAdminOpen:true});
    };
    closeAddAdmin=()=>{
        this.setState({isAddAdminOpen:false});
    };
    saveAddAdmin=()=>{
        this.setState({isAddAdminOpen:false});
        APIHandler.getUsers(this.onUpdateAdminList)
    };

    deleteUser = (admin) => {
        if (window.confirm("Delete the account " + admin.email + "?")) {
            APIHandler.deleteUser(admin.email, (res) => {
                if (res.ok) {
                    alert("User deleted.");
                    APIHandler.getUsers(this.onUpdateAdminList);
                } else {
                    this.setError(res.error)
                }
            })
        }
    }

    addTableRows = () => {
        var rows = []
        for (var i=0; i<this.state.adminList.length; i++) {
            let admin = this.state.adminList[i];
            rows.push(
                <tr key={admin.email}>
                    <td>{admin.email}</td>
                    <td>{admin.usertype}</td>
                    {admin.email != this.props.email ? <td>
                        <button onClick={() => this.deleteUser(admin)}>Delete</button>
                    </td> : null}
                </tr>
            );
        }
        return rows
    }

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
                <h2>Manage Admins</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.addTableRows()}
                    </tbody>
                </table>
                <div className="error-text">
                    {this.state.errorText}
                </div>
                <div>
                    <button onClick={this.openAddAdmin}>Add Account</button>
                </div>
                <Modal
                    open={this.state.isAddAdminOpen}
                    onClose={this.closeAddAdmin}>
                    <AddAdminPopup
                        email = {this.props.email}
                        onSave = {this.saveAddAdmin}/>
                </Modal>
            </div>
        );
    }
}