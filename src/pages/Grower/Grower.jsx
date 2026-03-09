import React from 'react'
import HeroGrower from './HeroGrower'
import FeaturesSec from './FeaturesSec'
import JourneySec from './JourneySec'
import FaqSec from './FaqSec'
import Footer from '../../components/Footer'
import ExclusiveAccessCard from './ExclusiveAccessCard'
import TrustedBy from '../../components/TrustedBy'
import SuccessStories from '../../components/SuccessStories'
import { MentorCarousel } from '../../components/MentorCarousel'
import { useTranslation } from '../../hooks/useTranslation'

const Grower = () => {

  const tr = useTranslation();

  return (
    <section className='overflow-hidden h-fit'>
      <HeroGrower/>
      <TrustedBy />
      <FeaturesSec/>
      <SuccessStories />
      <JourneySec />
      <MentorCarousel />
      <ExclusiveAccessCard  
        headline={tr("exclusive_headline")} 
        subheadline={tr("exclusive_subheadline")}
        body={tr("exclusive_body")} 
      /> 
      <FaqSec />
    </section>
  )
}

export default Grower