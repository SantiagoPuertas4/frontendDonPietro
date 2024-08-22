import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useState } from "react";

import "leaflet/dist/leaflet.css";
import "./LocationMap.css";
import { MapUpdater } from "./MapUpdater";

const LocationMap = () => {
  const [location, setLocation] = useState({
    lat: "-26.8365342",
    lng: "-65.2070863",
  });

  const handleGralPaz = () => {
    setLocation({
      lat: "-26.8365342",
      lng: "-65.2070863",
    });
  };

  const handleCaminoDelPeru = () => {
    setLocation({
      lat: "-26.8073202",
      lng: "-65.2625053",
    });
  };

  const handleMiguelLillo = () => {
    setLocation({
      lat: "-26.8328084",
      lng: "-65.2226200",
    });
  };
  return (
    <div className="px-4 text-center">
      <hr className="text-white mx-3" />
      <h2 className="text-white my-4 mt-5">Nos encontras aqui</h2>
      <div>
        <MapContainer center={location} zoom={16} zoomControl={true}>
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Don Pietro"
          />
          <Marker position={location}>
            <Popup>Aqui se encuentra Don Pietro</Popup>
          </Marker>
          <MapUpdater center={location} />
        </MapContainer>
        <div className="d-flex flex-column align-items-center row gap-2 my-3">
          <button
            onClick={() => handleGralPaz()}
            className="btn btnCustom col-8"
          >
            Surcursal Gral Paz
          </button>
          <button
            onClick={() => handleCaminoDelPeru()}
            className="btn btnCustom col-8"
          >
            Surcursal Camino del Peru
          </button>
          <button
            onClick={() => handleMiguelLillo()}
            className="btn btnCustom col-8"
          >
            Surcursal Miguel Lillo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
