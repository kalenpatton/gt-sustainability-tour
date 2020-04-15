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
            isIntroModalOpen:false,
            isFilterModalOpen:false,
            filters:APIHandler.getFilters(this.updateFilters),

            //the site currently in focus in the popup window
            focusedSite : null,
            intro:APIHandler.getIntro(this.updateIntro),
        };

        this.state.focusedSite = this.state.sites[0];
    };

    updateFilters =(filter)=>{
        this.setState({filters:filter});
    }

    updateIntro=(intro)=>{
        this.setState({intro:intro.information});
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


    //the intro handlers
    handleEditIntro = () => {
        this.openIntroModel();

    };
    openIntroModel=()=>{
        this.setState({isIntroModalOpen:true});
    };
    closeIntroModal=()=>{
        this.setState({isIntroModalOpen:false});
    };

    introChange=(event)=>{
        this.setState({intro: event.target.value});
    };

    saveIntro=()=>{
        //need to replace this with database opertion
        console.log(`save ${this.state.intro} to database`);

    };

    //the filter handlers
    handleEditFilters=()=>{
        this.setState({isFilterModalOpen:true});
    }
    closeFilterModal=()=>{
        this.setState({isFilterModalOpen:false});
    }
    filterChange=()=>{
        console.log(this.state.filters);

    }
    saveFilter=()=>{

    }

    //the site handlers
    handleEditSite = (site) => {
        this.openModal(site);
    };

    handleDeleteSite = (site) => {
        APIHandler.deleteSite(site, (response) => {
            APIHandler.getLocations(this.updateOnLocationLoad)
        });
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
        let filterList=<p>No filters listed</p>;
        if(this.state.filters){
           
        filterList = <div style={{height:500,width:300,display:'block',margin:10,overflow:"scroll"}}>
        {this.state.filters.map((e)=>{
            return <p style={{backgroundColor:"yellow"}}>
                <p key={e.id}>{e.filter}</p>
                <button>remove</button>
                </p>
        })}</div>
        }

        return (
            <div className="dash">
                <header>
                    <h1>Dashboard</h1>
                    <div className="toolbar">
                        <button onClick={this.handleAddStop} className="optionBtn">Add Site</button>

                        <button onClick={this.handleEditIntro} className="optionBtn">Edit Intro</button>

                        <Modal
                            open={this.state.isIntroModalOpen}
                            onClose={this.closeIntroModal}
                            className="centered editSiteModal">
                            <div style={{height:300,width:300,display:'block',margin:10}}>
                                <textarea value={this.state.intro} onChange={this.introChange} style={{height:280,width:290,resize:"none",rows:100,cols:100,wrap:"hard"}}></textarea>
    
                                <button className="optionBtn centered" onClick={this.saveIntro}>save</button>
                            </div>
                        </Modal>

                        <button onClick={this.handleEditFilters} className="optionBtn">Edit Filters</button>
                        <Modal
                            open={this.state.isFilterModalOpen}
                            onClose={this.closeFilterModal}
                            className="centered editSiteModal">
                            {filterList}
                            <hr/>
                            <p>Add more filters!</p>
                            <input/>
                            <button>add</button>
                            <hr/>
                            <button className="optionBtn centered" onClick={this.saveFilter}>save</button>
                        </Modal>
                       
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