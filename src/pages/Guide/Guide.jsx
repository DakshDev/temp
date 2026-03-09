import React from 'react'
import HeroGuide from './HeroGuide'
import FeaturesSec from './FeaturesSec'
import JourneySec from './JourneySec'
import FaqSec from './FaqSec'
import Join from './Join'
import TrustedBy from '../../components/TrustedBy'
import SuccessStories from '../../components/SuccessStories'
import { MentorCarousel } from '../../components/MentorCarousel'

const Guide = () => {
  return (
     <section className='overflow-hidden'>
      <HeroGuide/>
      <TrustedBy />
      <FeaturesSec/>
      <SuccessStories />
      <JourneySec />
      <MentorCarousel />
      <Join />
      <FaqSec />
     </section>  
  )
}

export default Guide