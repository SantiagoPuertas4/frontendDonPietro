import React from 'react'
import { PageCover } from '../components/HomeView/PageCover'
import { Presentation } from '../components/HomeView/Presentation'

import '../components/HomeView/HomeView.css'

export const HomeView = () => {
  return (
    <>
      <PageCover/>
      <Presentation/>
    </>
  )
}

export default HomeView;
