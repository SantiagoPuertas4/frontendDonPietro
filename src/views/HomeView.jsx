import { PageCover } from "../components/HomeView/PageCover";
import { Presentation } from "../components/HomeView/Presentation";
import { Wines } from "../components/HomeView/Wines";
import { WordsAbout } from "../components/HomeView/WordsAbout";

import ContactForm from "../components/ui/ContactForm/ContactForm";

import "../components/HomeView/HomeView.css";

export const HomeView = () => {
  return (
    <>
      <PageCover />
      <Presentation />
      <Wines />
      <WordsAbout />
      <ContactForm />
    </>
  );
};

export default HomeView;
