
import React from 'react'
import { Map as LeafletMap, TileLayer, Marker ,Popup} from 'react-leaflet';

export default class LocationSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMapInit : false,
            showDirectionText: false,
            isModalOpen : false,
        };
        this.startPosition = this.props.position;

    };

    // Necessary for fixing map bug
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.isMapInit && this.state.isMapInit) {
            this.map.leafletElement.invalidateSize();
        }
    };

    addMarker = () => {
        return (
            <Marker
                position={this.props.position}
                draggable={true}
                onDrag={this.onMoveMarker}/>
        );
    };

    // What to do when the map is clicked
    handleClick = (e) => {

    };

    // saves the map to this.map. Used for objects which need the map opject
    saveMap = (map) => {
        this.map = map;
        this.setState({
            isMapInit: true
        });
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        let newPosition = [...this.props.position]

        if (name == 'lat') newPosition[0] = value;
        else if (name == 'lng') newPosition[1] = value;

        this.props.onChangeLocation(newPosition);
    };

    onMoveMarker = (event) => {
        this.props.onChangeLocation([event.latlng.lat, event.latlng.lng]);
    };

    render() {
        return (
            <div>
                <div className='center-text'>
                    {'Latitude: '}
                    <input
                        className="form-num-in"
                        type="number"
                        name="lat"
                        step={0.00001}
                        placeholder="Latitude"
                        value={this.props.position[0]}
                        onChange={this.handleInputChange}
                        required
                    />
                    {'Longitude: '}
                    <input
                        className="form-num-in"
                        type="number"
                        name="lng"
                        step={0.00001}
                        placeholder="Longitude"
                        value={this.props.position[1]}
                        onChange={this.handleInputChange}
                        required
                    />
                </div>

                <LeafletMap
                // This is the default lon and lat of GT
                            className='locate-select-map'
                            center={this.startPosition}
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
                    {this.addMarker()}

                    {/* https://github.com/reactjs/react-modal */}
                </LeafletMap>
            </div>
        );
    }
}