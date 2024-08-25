import React from "react";
import AboutUs from "../components/AboutUs/AboutUs";
import LocationMap from "../components/ui/Map/LocationMap";

export const AboutUsView = () => {
  return (
    <>
      <AboutUs />
      <div className="container d-flex flex-column g-3 mt-5">
          <LocationMap />
        </div>
    </>
  );
};

export default AboutUsView;
