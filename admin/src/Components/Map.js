
import React from 'react'
import { Map as LeafletMap, TileLayer, Marker ,Popup} from 'react-leaflet';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMapInit : false,
            showDirectionText: false,
            // Eventually, this hard code should be replaced with a call to backend

        };

    }

    // Object that contains methods to edit the map. Can be passed to children
    // components, like the popup window.
    mapHandler = {

    };

    // Returns UI elements for all site markers
    addMarkers = () => {
        var markers = [];
        for (var i=0; i<this.props.sites.length; i++) {
            let site = this.props.sites[i];
            markers.push(
                <Marker position={site.position} key={i}>
                    <Popup>   {/* Popup for any custom information. */}
                        <div className="center-text">
                            <p>{site.name}</p>
                            <button
                                onClick={() => this.props.handleEditSite(site)}
                                className="optionBtn">
                                Edit Site
                            </button>
                            <button
                                onClick={() => this.props.handleDeleteSite(site)}
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
                className="main-map"
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
            </LeafletMap>
        );
    }
}
export default Map;