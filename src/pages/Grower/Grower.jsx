import HeroGrower from './HeroGrower'
import FeaturesSec from './FeaturesSec'
import JourneySec from './JourneySec'
import FaqSec from './FaqSec'
import ExclusiveAccessCard from './ExclusiveAccessCard'
import TrustedBy from '../../components/TrustedBy'
import { useTranslation } from '../../hooks/useTranslation'
// Lazy Import //
import { MentorCarousel } from '../../components/MentorCarousel'
import { useLang } from '../../context/LanguageContext'
import SuccessStories from '../../components/SuccessStories'

const Grower = () => {
  const tr = useTranslation();
  const { lang } = useLang();

  return (
    <section className='overflow-hidden h-fit'>
      <HeroGrower tr={tr} lang={lang} />
      <TrustedBy tr={tr} />
      <FeaturesSec tr={tr} />
      <SuccessStories tr={tr} />
      <JourneySec tr={tr} />
      <MentorCarousel tr={tr} lang={lang} />
      <ExclusiveAccessCard  
        tr={tr}
        headline={tr("exclusive_headline")} 
        subheadline={tr("exclusive_subheadline")}
        body={tr("exclusive_body")} 
      /> 
      <FaqSec tr={tr} />
    </section>
  )
}

export default Grower