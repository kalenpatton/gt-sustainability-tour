
import React from 'react'
import { Map as LeafletMap, TileLayer, Marker ,Popup} from 'react-leaflet';
import Modal from 'react-responsive-modal';
import PopupWindow from './PopupWindow';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMapInit : false,
            showDirectionText: false,
            isModalOpen : false,
            // Eventually, this hard code should be replaced with a call to backend
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

            //the site currently in focus in the popup window
            focusedSite : null
        };

        this.state.focusedSite = this.state.sites[0];
    }

    // Object that contains methods to edit the map. Can be passed to children
    // components, like the popup window.
    mapHandler = {

    };

    handleEditSite = (site) => {
        this.onOpenModal(site);
    };

    handleDeleteSite = (site) => {

    };

    onOpenModal = (site) => {
        this.setState({
            focusedSite: site,
            isModalOpen: true
        });
        console.log(site);
    };

    onCloseModal = () => {
        this.setState({ isModalOpen: false });
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
                            <button
                                onClick={() => this.handleEditSite(site)}
                                className="optionBtn">
                                Edit Site
                            </button>
                            <button
                                onClick={() => this.handleDeleteSite(site)}
                                className="optionBtn">
                                Delete Site
                            </button>
                        </div>
                    </Popup>
                </Marker>
            );
        }
        return markers
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
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                {/* Add a bunch of things to the map here */}
                {this.addMarkers()}

                {/* https://github.com/reactjs/react-modal */}
                <Modal
                    open={this.state.isModalOpen}
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