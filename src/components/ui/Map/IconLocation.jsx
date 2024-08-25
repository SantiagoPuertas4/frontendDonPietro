import Icon from "../../../../public/markerIcon.png";
import L from "leaflet";

const IconLocation = L.icon({
  iconUrl: Icon,
  iconRetinaUrl: Icon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  className: "iconoLeaflet",
});
export default IconLocation;
