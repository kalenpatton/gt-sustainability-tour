import { MapLayer, withLeaflet} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

class Routing extends MapLayer {
    createLeafletElement() {
        const { map, from, to, show} = this.props
        this.control = L.Routing.control({
            show: show,
            autoRoute: false,
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
        this.control.route();
        this.control.addTo(map.leafletElement);
        this.plan = this.control.getPlan();

        return this.plan;
    }

    updateLeafletElement(fromProps, toProps) {
        const { from, to, show } = toProps;
        this.plan.setWaypoints([
            L.latLng(from[0], from[1]),
            L.latLng(to[0], to[1]),
        ]);
        if (fromProps.to[0] != to[0] || fromProps.to[1] != to[1]) {
            this.control.route();
        }
        if (show) {
            this.control.show();
        } else {
            this.control.hide();
        }
    }

}

export default withLeaflet(Routing)