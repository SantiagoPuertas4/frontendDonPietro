// import { useLoadScript, GoogleMap } from "@react-google-maps/api";
// import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useState } from "react";

import "leaflet/dist/leaflet.css";
import "./LocationMap.css";
import { MapUpdater } from "./MapUpdater";

// const libraries = ["places"];

const LocationMap = () => {
  const [location, setLocation] = useState({
    lat: "-26.8365342",
    lng: "-65.2070863",
  });
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "TU_API_KEY_DE_GOOGLE_MAPS",
  //   libraries,
  // });

  // const [location] = useState({ lat: 40.7128, lng: -74.006 });
  // const mapRef = useRef(null);

  // //Para almacenar la referencia del marcador
  // const markerRef = useRef(null);

  // useEffect(() => {
  //   if (isLoaded && mapRef.current) {
  //     markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
  //       map: mapRef.current,
  //       position: location,
  //     });
  //   }
  // }, [isLoaded, location]);

  // if (!isLoaded) return <div>Cargando mapa...</div>;

  // -26.8365833 -65.2097473

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
      lng: "-65.22262",
    });
  };
  return (
    <div className="">
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
        <div className="d-flex flex-column align-items-center">
          <button
            onClick={() => handleGralPaz()}
            className="btn btnCustom w-50 mt-1"
          >
            Surcursal Gral Paz
          </button>
          <button
            onClick={() => handleCaminoDelPeru()}
            className="btn btnCustom w-50 mt-1"
          >
            Surcursal Camino del Peru
          </button>
          <button
            onClick={() => handleMiguelLillo()}
            className="btn btnCustom w-50 mt-1"
          >
            Surcursal Miguel Lillo
          </button>
        </div>
      </div>
    </div>
    // <div className="container">
    //   <div className="location-map-heading">
    //     <h1>Nos encontramos aquí</h1>
    //   </div>

    //   <GoogleMap
    //     center={location}
    //     zoom={15}
    //     mapContainerStyle={{ width: "100%", height: "400px" }}
    //     onLoad={(map) => (mapRef.current = map)}
    //   />
    // </div>
  );
};

export default LocationMap;
