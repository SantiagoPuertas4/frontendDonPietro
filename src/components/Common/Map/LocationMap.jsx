import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
import "./LocationMap.css";

const libraries = ['places'];

const LocationMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "TU_API_KEY_DE_GOOGLE_MAPS",
    libraries,
  });

  const [location] = useState({ lat: 40.7128, lng: -74.0060 });
  const mapRef = useRef(null);
  
  //Para almacenar la referencia del marcador
  const markerRef = useRef(null); 
  

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position: location,
      });
    }
  }, [isLoaded, location]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="container">
      <div className="location-map-heading">
        <h1>Nos encontramos aquí</h1>
      </div>

      <GoogleMap
        center={location}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "400px" }}
        onLoad={(map) => (mapRef.current = map)}
      />
    </div>
  );
};

export default LocationMap;
