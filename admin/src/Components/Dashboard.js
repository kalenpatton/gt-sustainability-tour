// Dashboard.js
// Adapted from https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0

import React, { Component } from 'react';
import Map from "./Map";
import Modal from 'react-responsive-modal';
import PopupWindow from './PopupWindow';

const AUTH_URL = '/api/authenticate';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sites : [
                { name:"Engineered Biosystems Building (EBB)", position:[33.7807, -84.3980] },
                { name:"Caddell Building", position:[33.77670, -84.39685] },
                { name:"Carbon Neutral Energy Solutions Lab (CNES)", position:[33.7709, -84.4020] },
                { name:"Clough Undergraduate Learning Commons", position:[33.7746, -84.3964] },
                { name:"Klaus Advanced Computing Building", position:[33.7771, -84.3963] },
                { name:"Glenn and Towers", position:[33.77326, -84.39131] },
                { name:"Historic Academy of Medicine", position:[33.77837, -84.38673] },
                { name:"Hinman Building", position:[33.77472, -84.39500] },
                { name:"Old Civil Engineering Building", position:[33.77414, -84.39465] },
                { name:"Stephen C. Hall Building", position:[33.77411, -84.39405] },
                { name:"Ken Byers Tennis Complex", position:[33.78118, -84.39432] },
                { name:"Scheller College of Business", position:[33.77635, -84.38785] },
                { name:"Marcus Nanotechnology Building", position:[33.77881, -84.39854] },
                { name:"McCamish Pavillion", position:[33.78068, -84.39278] },
                { name:"Zelnak Basketball Practice Facility", position:[33.77993, -84.39226] },
                { name:"Mewborn Field", position:[33.77928, -84.39323] },
                { name:"North Avenue Apartments and Dining Hall", position:[33.77091, -84.39167] },
                { name:"Chapin Building", position:[33.77332, -84.39527] },
                { name:"Fitten, Freeman, and Montag Halls", position:[33.77803, -84.40408] },
                { name:"Joseph B. Whitehead Student Health Center", position:[33.77480, -84.40287] },
                { name:"Campus Recreation Center (CRC)", position:[33.77549, -84.40344] },
                { name:"Mason Building", position:[33.77663, -84.39884] }

            ],
            isModalOpen: false,

            //the site currently in focus in the popup window
            focusedSite : null
        };

        this.state.focusedSite = this.state.sites[0];
    }

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