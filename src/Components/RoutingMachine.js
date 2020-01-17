import { MapLayer, withLeaflet} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

class Routing extends MapLayer {
    createLeafletElement() {
        const { map, from, to, show} = this.props
        this.control = L.Routing.control({
            show: show,
            collapsible: true,
            draggableWaypoints: false,
            addWaypoints: false,
            createMarker: (() => null),
            // position: 'topleft',
            waypoints: [
                L.latLng(from[0], from[1]),
                L.latLng(to[0], to[1]),
            ],
            router: L.Routing.osrmv1({
                serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1',
                useHints: false
            })
        });
        this.control.addTo(map.leafletElement);
        this.plan = this.control.getPlan();
        console.log(this.control)

        return this.plan;
    }

    updateLeafletElement(fromProps, toProps) {
        const { from, to, show } = this.props;
        this.plan.setWaypoints([
            L.latLng(from[0], from[1]),
            L.latLng(to[0], to[1]),
        ]);
        if (show) {
            this.control.show();
        } else {
            this.control.hide();
        }
    }

}

export default withLeaflet(Routing)