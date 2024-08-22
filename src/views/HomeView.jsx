import { PageCover } from "../components/HomeView/PageCover";
import { Presentation } from "../components/HomeView/Presentation";
import { Wines } from "../components/HomeView/Wines";
import { WordsAbout } from "../components/HomeView/WordsAbout";

import ContactForm from "../components/ui/ContactForm/ContactForm";

import "../components/HomeView/HomeView.css";
import LocationMap from "../components/ui/Map/LocationMap";

export const HomeView = () => {
  return (
    <>
      <PageCover />
      <Presentation />
      <Wines />
      <WordsAbout />
      <ContactForm />
      <div className="container">
        <LocationMap />
      </div>
    </>
  );
};

export default HomeView;
