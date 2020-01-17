
import React from 'react'
import { Map as LeafletMap, TileLayer, Marker ,Popup} from 'react-leaflet';
import '../styles/Map.css';
import Modal from 'react-responsive-modal';
import PopupWindow from './PopupWindow';
import RoutingMachine from './RoutingMachine';

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMapInit : false,
      showDirectionText: false,
      open : false,
      // Eventually, this hard code should be replaced with a call to backend
      sites : [
        {
          name:"Test Site 1",
          position:[33.775620, -84.396286]
        },
        {
          name:"Test Site 2",
          position:[33.776620, -84.396286]
        },
        {
          name:"Test Site 3",
          position:[33.777620, -84.396286]
        }
      ],

      //site to open the popupwindow on
      targetSite : null

    };

    this.state.targetSite = this.state.sites[0];
  }


  onOpenModal = (site) => {
    this.setState({
      targetSite: site,
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
    return markers
  };

  // Returns the UI element for the direction routing
  addRouting = () => {
    if (this.state.isMapInit) {
      return ( <RoutingMachine
        //Hard code for proof of concept. Change once we have user location data.
        from={[33.774620, -84.397286]}
        to={this.state.targetSite.position}
        map={this.map}
        show={this.state.showDirectionText}
      />);
    }
  };

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
            ref={this.saveMap}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='© OpenStreetMap contributors'
        />

        {/* Add a bunch of things to the map here */}
        {this.addRouting()}
        {this.addMarkers()}

        {/* https://github.com/reactjs/react-modal */}
        <Modal open={this.state.open} onClose={this.onCloseModal} className="centered">
          <PopupWindow site = {this.state.targetSite} />
        </Modal>
      </LeafletMap>
    );
  }
}
export default Map;