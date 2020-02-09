import { MapLayer, withLeaflet} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

class Routing extends MapLayer {
    createLeafletElement() {
        const { map, from, to, show,route} = this.props;
        

        this.control = L.Routing.control({
            show: true,
            
            autoRoute: true,
            collapsible: true,
            collapseBtnClass:'leaflet-routing-collapse-btn',
            showAlternatives:false,
            draggableWaypoints: false,
            addWaypoints: false,
            createMarker: (() => null),

            
            
            position: 'bottomleft',
            // waypoints: [
            //     L.latLng(from[0], from[1]),
            //     L.latLng(to[0], to[1]),    
            // ],
            waypoints:[L.latLng(from[0], from[1]),...route],

            lineOptions: {
                styles: [{color: '#EAAA00', opacity: 1, weight: 5}]
             },

            router: L.Routing.osrmv1({
                serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1',
                useHints: false,
                show:true
            })
        });
        
        
        
        this.control.route();
        this.control.addTo(map.leafletElement);
        this.plan = this.control.getPlan();
        

        return this.plan;
    }

    // updateLeafletElement(fromProps, toProps) {
    //     const { from, to, show } = toProps;
    //     this.plan.setWaypoints([
    //         L.latLng(from[0], from[1]),
    //         L.latLng(to[0], to[1]),
    //     ]);
    //     if (fromProps.to[0] != to[0] || fromProps.to[1] != to[1]) {
    //         this.control.route();
    //     }
    //     if (show) {
    //         this.control.show();
    //     } else {
    //         this.control.hide();
    //     }
    // }

    updateLeafletElement(toProps) {
            const { from,route } = toProps;
            this.plan.setWaypoints([L.latLng(from[0], from[1]),...route]);
            //console.log([L.latLng(from[0], from[1]),...routines]);
            this.control.route();
            this.control.show();
    }

}

export default withLeaflet(Routing)