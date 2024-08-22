import { useMap } from "react-leaflet";
import PropTypes from "prop-types";

export const MapUpdater = ({ center }) => {
  const map = useMap();
  map.setView(center);
  map.setZoom(15);
  map.setMinZoom(14);
  map.setMaxZoom(16);

  return null;
};
MapUpdater.propTypes = {
  center: PropTypes.object.isRequired,
};
