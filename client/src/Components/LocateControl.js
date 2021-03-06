import { Component } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

class LocateControl extends Component {



  componentDidMount() {
    const { startDirectly, mapHandler} = this.props;
    const { map } = this.props.leaflet;

    const lc = new Locate({
        keepCurrentZoomLevel: true,
        flyTo: true,
        setView: 'untilPan',
        clickBehavior: {
            inView: 'setView',
            outOfView: 'setView',
            inViewNotFollowing: 'setView'
        }
    });
    lc.addTo(map);

    map.on('locationfound', (e) => {
      // mapHandler.handleLocationFound(e.latlng.lat, e.latlng.lng)
      mapHandler.setRouteStart([e.latlng.lat, e.latlng.lng]);
    });

    if (startDirectly) {
      // request location update and set location
      lc.start();
    }
  }

  render() {
    return null;
  }
}

export default withLeaflet(LocateControl);