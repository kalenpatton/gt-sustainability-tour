
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
            sites : APIHandler.getLocations(location_arr => {
                this.state.sites = location_arr
                this.state.focusedSite = this.state.sites[0]
                this.state.nextStop = this.state.focusedSite
                console.log("Locations loaded")
        
                // addMarkers() returns list of markers which need to be rendered.
                // It used to be down in the render function but it can't execute until
                // after the promise is fulfilled
                this.addMarkers() 

                return location_arr
            }),

            // the site currently in focus in the popup window
            focusedSite : null,
            // the next site the user is being routed to
            nextStop: null,
            // the starting point of the route
            routeState: null
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
        console.log("Location markers added to map")
        return markers
    };

    // Returns the UI element for the direction routing
    addRouting = () => {
        if (this.state.isMapInit && this.state.routeStart) {
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

                {/* Functions for modifying the map EXCLUDING LOCATION STUFF here
                    Anything that requires the locations to be loaded should be called in updateState */
                     
                }
                
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