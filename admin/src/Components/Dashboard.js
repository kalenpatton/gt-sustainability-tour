// Dashboard.js
// Adapted from https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0

import React, { Component } from 'react';
import Map from "./Map";
import Modal from 'react-responsive-modal';
import PopupWindow from './PopupWindow';
import APIHandler from './APIHandler';
import PasswordEditPopup from './PasswordEditPopup';
import ManageAdminsPopup from './ManageAdminsPopup';
import EditRoutePopup from './EditRoutePopup';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sites : APIHandler.getLocations(this.updateOnLocationLoad),
            isModalOpen: false,
            isIntroModalOpen:false,
            isPassEditOpen:false,
            isEditRouteOpen:false,
            isManageAdminsOpen:false,

            //the site currently in focus in the popup window
            focusedSite : null,
            info: APIHandler.getIntro(this.introCallBack),
        };

        this.state.focusedSite = this.state.sites[0];
        console.log(this.props.email)
    };

    updateOnLocationLoad = (location_arr) => {
        console.log(location_arr);
        this.setState(
            { sites: location_arr },
            console.log("Sites updated")
        );
        // this.setState(
        //     { focusedSite: this.state.sites[0] },
        //     console.log("focusedSite updated")
        // );
        // this.setState(
        //     { nextStop: this.state.focusedSite },
        //     console.log("nextStop updated")
        // );

        return location_arr;
    };


    openModal = (site) => {
        this.setState({
            focusedSite: site,
            isModalOpen: true
        });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleAddStop = () => {
        this.openModal(false);
    };


    //the intro handlers
    handleEditIntro = () => {
        this.openIntroModel();

    };

    openPassEdit=()=>{
        this.setState({isPassEditOpen:true});
    };
    closePassEdit=()=>{
        this.setState({isPassEditOpen:false});
    };

    openEditRoute=()=>{
        this.setState({isEditRouteOpen:true});
    };
    closeEditRoute=()=>{
        this.setState({isEditRouteOpen:false});
    };
    saveEditRoute=()=>{
        this.setState({isEditRouteOpen:false});
        APIHandler.getLocations(this.updateOnLocationLoad)
    };
    openManageAdmins=()=>{
        this.setState({isManageAdminsOpen:true});
    };
    closeManageAdmins=()=>{
        this.setState({isManageAdminsOpen:false});
    };

    openIntroModel=()=>{
        this.setState({isIntroModalOpen:true});
    };
    closeIntroModal=()=>{
        this.setState({isIntroModalOpen:false});
    };

    introChange = (event) => {

        this.setState({info: event.target.value});
    };

    saveIntro=()=>{
        //need to replace this with database opertion
        console.log(`save ${this.state.info} to database`);
        APIHandler.postIntro(this.state.info);

    };

    introCallBack = (response) => {
        //console.log(response);
        this.setState({info:response.information})
    }


    //the site handlers
    handleEditSite = (site) => {
        this.openModal(site);
    };

    handleDeleteSite = (site) => {
        if (window.confirm(`Are you sure you want to delete '${site.name}'?`)) {
            APIHandler.deleteSite(site, (response) => {
                APIHandler.getLocations(this.updateOnLocationLoad)
            });
        }
    };

    handleEditFilters = () =>{
        console.log('call to backend to get filters');
    };

    onSaveSite = (site, isNew) => {
        if (isNew) {
            // let newSites = [...this.state.sites];
            // newSites.push(site);
            // this.setState({sites: newSites});
            APIHandler.postSite(site, (response) => {
                APIHandler.getLocations(this.updateOnLocationLoad)
            });
        } else {
            APIHandler.putSite(site, (response) => {
                APIHandler.getLocations(this.updateOnLocationLoad)
            });
        }
        this.closeModal();
    };

    render() {
        return (
            <div className="dash">
                <header>
                    <div className="profile-info">
                        <div>Logged in as: {this.props.email}</div>
                        <div>
                            <button onClick={this.openPassEdit}>Change Password</button>
                            {this.props.usertype === "superadmin" ? <button onClick={this.openManageAdmins}>Manage Admin Accounts</button> : null}
                        </div>
                    </div>
                    <h1>Dashboard</h1>
                    <div className="toolbar">
                        <button onClick={this.handleAddStop} className="optionBtn">Add Site</button>

                        <button onClick={this.openEditRoute} className="optionBtn">Edit Default Route</button>

                        <button onClick={this.handleEditIntro} className="optionBtn">Edit Intro</button>

                        <Modal
                            open={this.state.isEditRouteOpen}
                            onClose={this.closeEditRoute}>
                            <EditRoutePopup
                                sites = {this.state.sites}
                                onSave = {this.saveEditRoute}/>
                        </Modal>

                        <Modal
                            open={this.state.isIntroModalOpen}
                            onClose={this.closeIntroModal}
                            className="centered editSiteModal">
                            <textarea value={this.state.info} onChange={this.introChange} style={{ height: 300, width: 300, display: 'block', margin: 10 }}/>
                            <button className="optionBtn centered" onClick={this.saveIntro}>save</button>
                        </Modal>
                        <Modal
                            open={this.state.isPassEditOpen}
                            onClose={this.closePassEdit}>
                            <PasswordEditPopup
                                email = {this.props.email}
                                onClose = {this.closePassEdit}/>
                        </Modal>
                        <Modal
                            open={this.state.isManageAdminsOpen}
                            onClose={this.closeManageAdmins}>
                            <ManageAdminsPopup
                                email = {this.props.email}
                                onClose = {this.closeManageAdmins}/>
                        </Modal>

                        <button onClick={this.handleEditFilters} className="optionBtn">Edit Filters</button>
                    </div>
                </header>
                <div className="map-container">
                    <Map
                        sites={this.state.sites}
                        handleEditSite={this.handleEditSite}
                        handleDeleteSite={this.handleDeleteSite}/>
                </div>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.closeModal}
                    className="centered editSiteModal">
                    <PopupWindow
                        onSaveSite = {this.onSaveSite}
                        site = {this.state.focusedSite}
                        mapHandler = {this.mapHandler}/>
                </Modal>
            </div>
        );
    }
}