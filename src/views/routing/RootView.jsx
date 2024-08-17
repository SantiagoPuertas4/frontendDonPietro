import { Outlet } from 'react-router-dom';

import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';

const RootView = () => {
  return (
    <>
      <Header />
      <main className='container-fluid flex-grow-1 p-0'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootView;