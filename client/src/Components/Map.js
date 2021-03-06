
import React from 'react'
import { Map as LeafletMap, TileLayer, Marker ,Popup} from 'react-leaflet';
import '../styles/Map.css';
import Modal from 'react-responsive-modal';
import PopupWindow from './PopupWindow';
import RoutingMachine from './RoutingMachine';
import LocateControl from './LocateControl';
import APIHandler from './APIHandler';
import Icons from './LeafletIcon';

import {connect} from "react-redux";

import RoutingList from './RoutingList';



class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            isMapInit : false,
            showDirectionText: true,
            open : false,

            allSites:null,
            sites : APIHandler.getLocations(this.updateOnLocationLoad),
            //sites:this.props.sites,

            selectedFilters:this.filterOut(),

            // the site currently in focus in the popup window
            focusedSite : null,
            // the starting point of the route
            routeState: null,

            routeList:[],
            routeSet:new Set(),
        };

        console.log(this.state.selectedFilters);
        this.addRouting = this.addRouting.bind(this);
        props.setRef(this);
    }

    componentWillMount(){

    }

    // get a set of selected filters. update selectedfilters in state.
    filterOut=()=>{
        var selectedFilters = new Set();
        //redux
        this.props.filters.forEach((e)=>{
            selectedFilters.add(e.label);
        })
        this.setState({selectedFilters:selectedFilters});
        return selectedFilters;
    }

    // Object that contains methods to edit the map. Can be passed to children
    // components, like the popup window.
    mapHandler = {
        //route start: current pos
        setRouteStart : (location) =>  {
            this.setState({ routeStart: location })

        },

        handleLocationFound : (lat, lng) => {
            this.setState({ routeStart: [lat, lng] })
        },

        addToRoute:(site) => {

            if(!this.state.routeSet.has(site)){
                this.state.routeSet.add(site);
                this.setState((prevState) => {
                    return {
                        routeList: [...prevState.routeList, site]
                    };
                }, this.changeShowNextStop);
            }
        },

        isNextStop:(site) => {
            return (this.state.routeList.length > 0
                    && this.state.routeList[0].id == site.id)
        },

        popNextSite:() => {
            let newRoute = this.state.routeList.slice()
            if (newRoute.length > 0) {
                newRoute.shift();
                this.setState({
                    routeList:newRoute,
                    routeSet: new Set(newRoute)
                }, this.changeShowNextStop);
            }
        },

        changeOrder:(newRoute,stop)=>{
            this.setState({
                routeList:newRoute,
                routeSet: new Set(newRoute)
            }, this.changeShowNextStop);
        },

    };

    updateOnLocationLoad = (location_arr) => {
        console.log(location_arr);
        this.setState(
            { sites: location_arr },
            console.log("Sites updated")
        );
        this.setState(
            { allSites: location_arr },
            console.log("Sites updated")
        );
        this.setState(
            { focusedSite: this.state.sites[0] },
            console.log("focusedSite updated")
        );

        this.updateDefaultRoute();

        return location_arr;
    };

    //filtering
    updateFilteredSites = () => {
        var selected=this.filterOut();

        var newSites=[];
        var newRoute=[];
        for(let i=0;i<this.state.allSites.length;i++){
            let site = this.state.allSites[i];

            var filterList = site.filters
            if (filterList == null) {
                newSites.push(site);
            } else {
                for(let j=0;j<filterList.length;j++){
                    if(selected.has(filterList[j])){
                        newSites.push(site);
                        break;
                    }
                }
            }
        }

        for(let i=0;i<this.state.routeList.length;i++){
            let site = this.state.routeList[i];

            var filterList = site.filters
            if (filterList == null) {
                newRoute.push(site);
            } else {
                for(let j=0;j<filterList.length;j++){
                    if(selected.has(filterList[j])){
                        newRoute.push(site);
                        break;
                    }
                }
            }
        }

        // console.log("all sites:");
        // console.log(this.state.allSites);
        // console.log("new sites:");
        console.log("New Route:")
        console.log(newRoute);
        this.setState(
            {
                sites: newSites ,
                routeList: newRoute,
                routeSet: new Set(newRoute)
            },
            this.changeShowNextStop
        );

    }

    //default route
    updateDefaultRoute = () => {
        var route = [];
        for(let i=1; i <= this.state.allSites.length; i++){
            for (let j=0; j < this.state.allSites.length; j++) {
                var num_str = this.state.allSites[j].stop_num;
                if (num_str != 'null') {
                    var num = parseInt(num_str)
                    if (num == i) {
                        route.push(this.state.allSites[j]);
                        break;
                    }
                }
            }

        }

        console.log("all sites:");
        console.log(this.state.allSites);
        console.log("default route:");
        console.log(route);
        this.setState(
            { routeList: route,
              routeSet: new Set(route)},
            this.changeShowNextStop);
    }

    changeShowNextStop=(site)=>{
        let name = this.state.routeList.length > 0 ? this.state.routeList[0].name : "N/A"
        this.props.settingHandler.showNextStop(name);
    }

    onOpenModal = (site) => {
        this.setState({
            focusedSite: site,
            open: true,
        });
        console.log(this.state.focusedSite);

        //test
        this.updateFilteredSites();

    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onCloseList=() => {
        this.setState({openList:false});
        this.changeShowNextStop();
    }

    onOpenList=()=>{
        this.setState({openList:true});
    }

    // Returns UI elements for all site markers
    addMarkers = () => {
        var markers = [];
        // eslint-disable-next-line
        if (this.state.sites.length == undefined) {
            return markers;
        }
        for (var i=0; i<this.state.sites.length; i++) {
            let site = this.state.sites[i];
            let isNextStop = this.mapHandler.isNextStop(site)
            markers.push(
                <Marker position={site.position} key={i} icon={isNextStop ? Icons.brightIcon : Icons.defaultIcon}>
                    <Popup>   {/* Popup for any custom information. */}
                        <div className="center-text">
                            <p>{site.name}</p>
                            <div className="buttons">
                                <button className={isNextStop?"brightBtn":"smallBtn"} onClick={() => this.onOpenModal(site)}>See Details</button>
                                <button className="smallBtn" onClick={() => this.mapHandler.addToRoute(site)}>Add to My Route</button>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            );
        }
        console.log("Location markers updated");
        return markers;
    };

    // Returns the UI element for the direction routing
    addRouting = () => {
        console.log("Adding routing...");
        // eslint-disable-next-line
        if (this.state.sites.length == undefined || this.state.focusedSite == undefined) {
            return;
        }

        var list=[];
        this.state.routeList.forEach((e)=>{list.push(e.position);});

        if (this.state.isMapInit && this.state.routeStart) {
            console.log("Routing updated");
            return ( <RoutingMachine
                from={this.state.routeStart}
                to={this.state.routeList.length > 0 ? this.state.routeList[0].position : null}

                route={list}

                map={this.map}
                show={this.props.textDirection}

            />);
        }
    };




    // What to do when the map is clicked
    handleClick = (e) => {
        console.log(e.latlng);
    }

    // saves the map to this.map. Used for objects which need the map opject
    saveMap = (map) => {
        this.map = map;
        this.setState({
            isMapInit: true
        });
        this.props.saveMap(map);
    }

    render() {
        return (

            <LeafletMap
            // This is the default lon and lat of GT
                        center={[33.775620, -84.396286]}
                        zoom={17}
                        maxZoom={19}
                        minZoom={14}
                        attributionControl={true}
                        zoomControl={true}
                        doubleClickZoom={true}
                        scrollWheelZoom={true}
                        dragging={true}
                        animate={true}
                        easeLinearity={0.35}
                        //onClick={this.handleClick}
                        maxBounds={ [[33.75,-84.42],[33.8, -84.38]]} //southWest,northEast
                        maxBoundsViscosity={1.0}
                        ref={this.saveMap}
            >

                <TileLayer
                //s z,x,y are all used for leaflet and aren't defined by us.
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                />

                {/* Functions for modifying the map here */}
                {this.addMarkers()}
                {this.addRouting()}

                <LocateControl
                    startDirectly
                    mapHandler={this.mapHandler}/>


                {/* change order */}
                <button onClick={this.onOpenList} id="route-button"><i className="fas fa-route fa-lg" style={{color:'#404040'}}></i></button>

                <Modal open={this.state.openList} onClose={this.onCloseList} className="centered">

                    <RoutingList stops={this.state.routeList} mapHandler = {this.mapHandler}/>

                </Modal>


                <Modal
                    open={this.state.open}
                    onClose={this.onCloseModal}
                    className="centered">
                    <PopupWindow
                        onClose={this.onCloseModal}
                        site = {this.state.focusedSite}
                        mapHandler = {this.mapHandler}
                        autoplay={this.props.autoplay}/>
                </Modal>

            </LeafletMap>

        );
    }
}


const mapStateToProps = (state) =>{
    return{
        filters: state.filters,
    };

}

const mapDispatchToProps = dispatch =>{
    return{
        setFilters: filters => dispatch({type:"SET_FILTERS",payload:filters})
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Map);