
import React from 'react'
import { Map as LeafletMap, TileLayer, Marker ,Popup} from 'react-leaflet';
import APIHandler from './APIHandler';
import Reorder, { reorder } from 'react-reorder';

class EditRoutePopup extends React.Component {

    constructor(props) {
        super(props);
        let route = []
        props.sites.forEach((site)=>{
            if (site.stop_num > 0) {
                route.push(site);
            }
        })
        route.sort((a,b) => a.stop_num - b.stop_num)
        this.state = {
            isMapInit : false,
            route : route
        };

    }

    // Necessary for fixing map bug
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.isMapInit && this.state.isMapInit) {
            this.map.leafletElement.invalidateSize();
        }
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
                                onClick = {() => this.addToRoute(site)}
                                className="optionBtn">
                                Add to Route
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

    onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
        let newList = reorder(this.state.route, previousIndex, nextIndex);

        this.setState({
            route: newList
        });
    };

    // saves the map to this.map. Used for objects which need the map opject
    saveMap = (map) => {
        this.map = map;
        this.setState({
            isMapInit: true,
        });
    }

    addToRoute(site) {
        if (!this.state.route.includes(site)){
            let newRoute = this.state.route.slice();
            newRoute.push(site)
            this.setState({route: newRoute})
        }
    }

    // Remove image by index
    remove = (event, i) => {
        let newList = this.state.route.slice();
        newList.splice(i,1);
        this.setState({
            route: newList
        });
    }

    submit = () =>  {
        APIHandler.postRouteUpdate(this.state.route, (res) => {
            if (res.ok) {
                this.props.onSave();
            } else {
                alert(`Error: ${res.err}`)
            }
        })
    }

    render() {
        return (
            <div className='popupwindow'>
                <h2>Edit Default Route</h2>
                <p>Select the sites you wish to appear in the default route. You can also drag elements in the route to reorder them.</p>
                <div>
                    <LeafletMap
                    // This is the default lon and lat of GT
                                className='pick-route-map'
                                center={[33.775620, -84.396286]}
                                zoom={16}
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
                            url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />

                        {/* Add a bunch of things to the map here */}
                        {this.addMarkers()}

                        {/* https://github.com/reactjs/react-modal */}
                    </LeafletMap>
                </div>
                <div className='left-text'>
                    <p>Route:</p>
                    <Reorder
                        reorderId='route-list'
                        component='ol'
                        lock='horizontal'
                        onReorder={this.onReorder.bind(this)}
                        disabled={this.state.disableReorder}
                        className='route-list'
                        >
                            {
                                this.state.route.map((site, i) => (
                                    <li key={i}
                                        className='route-list-item'>
                                        {site.name}
                                        <button
                                            className='delete-list-item'
                                            onClick={(e)=>this.remove(e, i)}>
                                            &times;
                                        </button>
                                    </li>
                                ))
                            }
                    </Reorder>
                </div>
                <button onClick={this.submit}>Save</button>
            </div>
        );
    }
}
export default EditRoutePopup;