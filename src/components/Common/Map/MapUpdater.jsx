import { useMap } from "react-leaflet";
import PropTypes from "prop-types";

export const MapUpdater = ({ center }) => {
  const map = useMap();
  map.setView(center);

  return null;
};
MapUpdater.propTypes = {
  center: PropTypes.array.isRequired,
};
