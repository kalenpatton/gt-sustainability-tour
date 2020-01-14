
import React from 'react'
import { Map as LeafletMap, TileLayer, Marker ,Popup} from 'react-leaflet';
import '../styles/Map.css';
import Modal from 'react-responsive-modal';
import PopupWindow from './PopupWindow';

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open:false
    };
  }


  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

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
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[33.775620, -84.396286]}>
          <Popup >   {/* Popup for any custom information. */}
            <p>(Name of the stop)</p>
            <button onClick={this.onOpenModal}>See details</button>

            {/* https://github.com/reactjs/react-modal */}
            <Modal open={this.state.open} onClose={this.onCloseModal} className="centered">
             <PopupWindow/>
            </Modal>
          </Popup>



        </Marker>
      </LeafletMap>
    );
  }
}
export default Map;