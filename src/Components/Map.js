
import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup ,Tooltip} from 'react-leaflet';
import '../styles/Map.css';

class Map extends React.Component {
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
          <Popup>
            Popup for any custom information.
          </Popup>
          <Tooltip>
            Tooltip for any custom information.
          </Tooltip>
        </Marker>
      </LeafletMap>
    );
  }
}
export default Map;