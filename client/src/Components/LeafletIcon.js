import L from 'leaflet';

var brightIcon = new L.Icon({
  iconUrl: 'marker-icon-2x-orange.png',
  shadowUrl: 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var defaultIcon = new L.Icon({
  iconUrl: 'marker-icon-2x-blue.png',
  shadowUrl: 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default { brightIcon,  defaultIcon};