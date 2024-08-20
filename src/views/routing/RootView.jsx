import { Outlet } from "react-router-dom";

import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";

const RootView = () => {
  return (
    <>
      <Header />
      <main className="container my-3 flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootView;
