import React from "react";
import AboutUs from "../components/AboutUs/AboutUs";
import LocationMap from "../components/ui/Map/LocationMap";

export const AboutUsView = () => {
  return (
    <>
      <AboutUs />
      <div className="container">
        <LocationMap />
      </div>
    </>
  );
};

export default AboutUsView;
