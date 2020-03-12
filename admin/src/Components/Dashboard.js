// Dashboard.js
// Adapted from https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0

import React, { Component } from 'react';
import Map from "./Map";
import Modal from 'react-responsive-modal';
import PopupWindow from './PopupWindow';
import APIHandler from './APIHandler';

const AUTH_URL = '/api/authenticate';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sites : APIHandler.getLocations(this.updateOnLocationLoad),
            isModalOpen: false,

            //the site currently in focus in the popup window
            focusedSite : null
        };

        this.state.focusedSite = this.state.sites[0];
    }

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

    handleEditIntro = () => {

    };

    handleEditSite = (site) => {
        this.openModal(site);
    };

    handleDeleteSite = (site) => {

    };

    onSaveSite = (site, isNew) => {
        if (isNew) {
            let newSites = [...this.state.sites];
            newSites.push(site);
            this.setState({sites: newSites});
            this.closeModal();
        }

    }

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