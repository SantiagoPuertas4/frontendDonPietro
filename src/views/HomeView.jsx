import { PageCover } from '../components/HomeView/PageCover';
import { Presentation } from '../components/HomeView/Presentation';
import { Wines } from '../components/HomeView/Wines';

import '../components/HomeView/HomeView.css'

export const HomeView = () => {
  return (
    <>
      <PageCover/>
      <Presentation/>
      <Wines/>
    </>
  )
}

export default HomeView;
