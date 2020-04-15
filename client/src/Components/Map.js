
import React from 'react'
import { Map as LeafletMap, TileLayer, Marker ,Popup} from 'react-leaflet';
import '../styles/Map.css';
import Modal from 'react-responsive-modal';
import PopupWindow from './PopupWindow';
import RoutingMachine from './RoutingMachine';
import LocateControl from './LocateControl';
import APIHandler from './APIHandler';

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
            // the next site the user is being routed to
            nextStop: null,
            // the starting point of the route
            routeState: null,

            routeList:[],
        };
       
        console.log(this.state.selectedFilters);
        this.addRouting = this.addRouting.bind(this);
        props.setRef(this);
    }

    filterOut=()=>{
        var selectedFilters = new Set(); 
        
        this.props.filters.forEach((e)=>{
            selectedFilters.add(e.label);
        })
        this.setState({selectedFilters:selectedFilters});
        return selectedFilters;
    }

    // Object that contains methods to edit the map. Can be passed to children
    // components, like the popup window.
    mapHandler = {
        // logic for setting the next stop on the tour
        setNextStop : (site) => {
            this.setState({ nextStop: site});
        },

        //route start: current pos
        setRouteStart : (location) =>  {
            this.setState({ routeStart: location })

        },

        addToRoute:(pos) => {
            this.setState((prevState) => {  
                return {
                    routeList: [...prevState.routeList, pos]
                };  
            });
            console.log(this.state.routeList.length);
            if(this.state.routeList.length === 0){
                this.changeShowNextStop(pos.name);
            }
        },

        changeOrder:(newRoute)=>{
            this.setState({routeList:newRoute}); 
            if(this.state.routeList.length==0){
                this.changeShowNextStop("N/A");
            }
            else{
                this.changeShowNextStop(this.state.routeList[0].name);
            }
            //this.changeShowNextStop(this.state.routeList[0].name);
        },

    };

    updateOnLocationLoad = (location_arr) => {
       //randomly add some filters for testing 
        for(let i=0;i<location_arr.length;i+=2){
            location_arr[i].filters="Energy and Emissions";
        }
        for(let i=1;i<location_arr.length;i+=2){
            location_arr[i].filters="Water";
        }
        for(let i=0;i<location_arr.length;i+=3){
            location_arr[i].filters="Materials Management,Built Environment";
        }

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
        this.setState(
            { nextStop: this.state.focusedSite },
            console.log("nextStop updated")    
        );

        this.updateDefaultRoute();

        return location_arr;
    };

    //filtering 
    updatefiltedSites = () => {
        var selected=this.filterOut();

        var newSites=[];
        for(let i=0;i<this.state.allSites.length;i++){
            
            var filterList = this.state.allSites[i].filters.split(",");
            for(let j=0;j<filterList.length;j++){
                if(selected.has(filterList[j])){
                    newSites.push(this.state.allSites[i]);
                    break;
                }
            }
        }
       
        console.log("all sites:");
        console.log(this.state.allSites);
        console.log("new sites:");
        console.log(newSites);
        this.setState(
            { sites: newSites },
            console.log("filtered sites updated")
        );

    }

    //default route 
    updateDefaultRoute = () => {
        var route = [];
        for(let i=1; i <= this.state.allSites.length; i++){
            for (let j=0; j < this.state.allSites.length; j++) {
                var num_str = this.state.allSites[j].stop_num;
                console.log(num_str)
                if (num_str != 'null') {
                    var num = parseInt(num_str)
                    if (num == i) {
                        route.push(this.state.allSites[i]);
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
            { routeList: route },
            console.log("default route updated")
        );

    }

    changeShowNextStop=(name)=>{ 
        this.props.settingHandler.showNextStop(name);
    }

    onOpenModal = (site) => {
        this.setState({
            focusedSite: site,
            open: true,
        });
        console.log(this.state.focusedSite);

        //test
        this.updatefiltedSites();
        //this.updateDefaultRoute();

    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onCloseList=() => {
        this.setState({openList:false});
    }

    onOpenList=()=>{
        this.setState({openList:true});
    }

    // Returns UI elements for all site markers
    addMarkers = () => {
        var markers = [];
        if (this.state.sites.length == undefined) {
            return markers;
        }
        for (var i=0; i<this.state.sites.length; i++) {
            let site = this.state.sites[i];
            markers.push(
                <Marker position={site.position} key={i}>
                    <Popup>   {/* Popup for any custom information. */}
                        <div className="center-text">
                            <p>{site.name}</p>
                            <button onClick={() => this.onOpenModal(site)}>See details</button>
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
        if (this.state.sites.length == undefined
            || this.state.focusedSite == undefined
            || this.state.nextStop == undefined) {
            return;
        }
      
        var list=[];
        this.state.routeList.forEach((e)=>{list.push(e.position);});
      
        if (this.state.isMapInit && this.state.routeStart) {
            console.log("Routing updated");
            return ( <RoutingMachine
                //Hard code for proof of concept. Change once we have user location data.
                from={this.state.routeStart}
                to={this.state.nextStop.position}

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
                        maxBounds={ [[33.75,-84.41],[33.8, -84.38]]} //southWest,northEast
                        maxBoundsViscosity={1.0}
                        ref={this.saveMap}
            >
                
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
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

const mapDispaychToProps = dispatch =>{
    return{
        setFilters: filters => dispatch({type:"SET_FILTERS",payload:filters})
    };
}
export default connect(mapStateToProps,mapDispaychToProps)(Map);