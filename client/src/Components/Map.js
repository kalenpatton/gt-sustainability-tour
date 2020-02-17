
import React from 'react'
import { Map as LeafletMap, TileLayer, Marker ,Popup} from 'react-leaflet';
import '../styles/Map.css';
import Modal from 'react-responsive-modal';
import PopupWindow from './PopupWindow';
import RoutingMachine from './RoutingMachine';
import LocateControl from './LocateControl';
import APIHandler from './APIHandler';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMapInit : false,
            showDirectionText: false,
            open : false,
            sites : APIHandler.getLocations(this.updateOnLocationLoad),

            // the site currently in focus in the popup window
            focusedSite : null,
            // the next site the user is being routed to
            nextStop: null,
            // the starting point of the route
            routeState: null,
        };
    }

    // Object that contains methods to edit the map. Can be passed to children
    // components, like the popup window.
    mapHandler = {
        // logic for setting the next stop on the tour
        setNextStop : (site) => {
            this.setState({ nextStop: site});
        },

        setRouteStart : (location) =>  {
            this.setState({ routeStart: location })
        }
    };

    updateOnLocationLoad = (location_arr) => {
        console.log(location_arr);
        this.setState(
            { sites: location_arr },
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

        return location_arr;
    };


    onOpenModal = (site) => {
        this.setState({
            focusedSite: site,
            open: true
        });
        console.log(site);
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

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
        if (this.state.isMapInit && this.state.routeStart) {
            console.log("Routing updated");
            return ( <RoutingMachine
                //Hard code for proof of concept. Change once we have user location data.
                from={this.state.routeStart}
                to={this.state.nextStop.position}
                map={this.map}
                show={this.state.showDirectionText}
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
                        onClick={this.handleClick}
                        ref={this.saveMap}
            >
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='© OpenStreetMap contributors'
                />

                {/* Functions for modifying the map here */}
                {this.addMarkers()}
                {this.addRouting()}
                
                <LocateControl
                    startDirectly
                    mapHandler={this.mapHandler}/>

                {/* https://github.com/reactjs/react-modal */}
                <Modal
                    open={this.state.open}
                    onClose={this.onCloseModal}
                    className="centered">
                    <PopupWindow
                        site = {this.state.focusedSite}
                        mapHandler = {this.mapHandler}/>
                </Modal>
            </LeafletMap>
        );
    }
}
export default Map;