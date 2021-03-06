import { MapLayer, withLeaflet} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

class Routing extends MapLayer {
    createLeafletElement() {
        // eslint-disable-next-line
        const { map, from, to, show} = this.props;


        this.control = L.Routing.control({
            show: show,
            autoRoute: false,
            collapsible: true,
            showAlternatives:false,
            draggableWaypoints: false,
            addWaypoints: false,
            createMarker: (() => null),



            position: 'bottomleft',
            waypoints: [
                this.posToLatLng(from),
                this.posToLatLng(to),
            ],

            //all routes
            // waypoints:[L.latLng(from[0], from[1]),...route],

             //only route to the next stop
            // waypoints:[L.latLng(from[0], from[1]),route[0]],

            lineOptions: {
                styles: [{color: '#EAAA00', opacity: 1, weight: 5}],
                missingRouteStyles:[{color: 'black', opacity: 0.8, weight: 2, dashArray: '7,12'}]
             },

            router: L.Routing.osrmv1({
                serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1',
                useHints: false,
                // show:true
            })
        });


        this.control.route();
        this.control.addTo(map.leafletElement);
        this.plan = this.control.getPlan();

        return this.plan;
    }

    posToLatLng(pos) {
        if (pos == null) {
            return null;
        }
        return L.latLng(pos[0], pos[1])
    }

    updateLeafletElement(fromProps, toProps) {
        const { from, to, show } = toProps;
        this.plan.setWaypoints([
            this.posToLatLng(from),
            this.posToLatLng(to),
        ]);
        if (fromProps.to == null ||( to != null && (fromProps.to[0] != to[0] || fromProps.to[1] != to[1]))) {
            this.control.route();
        }
        if (show) {
            this.control.show();
        } else {
            this.control.hide();
        }
    }

    // updateLeafletElement(toProps) {
    //         const { from, to,show } = toProps;
    //         console.log("route updated:" + route.length)

    //         //all route
    //         //this.plan.setWaypoints([L.latLng(from[0], from[1]),...route]);

    //         //route to next stop
    //         this.plan.setWaypoints([L.latLng(from[0], from[1]),route[0]]);
    //         this.control.route();
    //         if(show){
    //             this.control.show();
    //         }else{
    //             this.control.hide();
    //         }
    // }

}

export default withLeaflet(Routing)