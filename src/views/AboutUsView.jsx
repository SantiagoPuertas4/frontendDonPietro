import AboutUs from "../components/AboutUs/AboutUs";
import LocationMap from "../components/ui/Map/LocationMap";

export const AboutUsView = () => {
  return (
    <>
      <AboutUs />
      <section className="container d-flex flex-column g-3 mt-5">
        <LocationMap />
      </section>
    </>
  );
};

export default AboutUsView;
