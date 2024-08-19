import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./LocationMap.css";

const LocationMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "TU_API_KEY_DE_GOOGLE_MAPS",
  });

  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({ lat: coords.latitude, lng: coords.longitude });
      },
      (error) => console.error("Error obteniendo la ubicación:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="container">
      <div className="location-map-heading">
        <h1>Nos encontramos aqui</h1>
      </div>

      <GoogleMap
        center={location}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "400px" }}
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
};

export default LocationMap;
