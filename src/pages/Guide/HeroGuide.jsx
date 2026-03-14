import  { useRef, useEffect } from 'react'
import Banner from "../../assets/Guide/HomeGuide.png";
import JoinWaitlist_Btn from "../../components/JoinWaitlist_Btn";
import LeftShade from "../../assets/Grower/LeftShade.webp"
import RightShade from "../../assets/Grower/RightShade.webp"
import { useLang } from '../../context/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

const HeroGuide = () => {

  const tr = useTranslation();
  const { lang } = useLang();
  const videoRef = useRef(null);

  const englishVideo = "https://res.cloudinary.com/deeyacqys/video/upload/v1769690026/Nawaya_Explainer_English_crohuo.mp4";
  const arabicVideo = "https://res.cloudinary.com/deeyacqys/video/upload/v1769703539/Nawaya_Explainer_in_Arabic_iudo7a.mp4";
  const germanVideo = "https://res.cloudinary.com/deeyacqys/video/upload/v1770045380/Nawaya_Hero_Video_in_German_eplpkn.mp4";
  const videoSrc = lang === 'ar' ? arabicVideo : lang === 'de' ? germanVideo : englishVideo;
 
  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  // ensure video source updates when language changes
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    try {
      if ('src' in vid) {
        vid.src = videoSrc;
      } else {
        const srcEl = vid.querySelector && vid.querySelector('source');
        if (srcEl) srcEl.src = videoSrc;
      }
      vid.load();
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.then === 'function') playPromise.catch(() => {});
    } catch (e) {
      // ignore
    }
  }, [videoSrc]);

  return (
    <section className="bg-GrayBg pt-20 overflow-hidden">
      {/* Heading and Paragraph  */}
      <div className="mx-auto  xs:px-0 sm:px-6 text-center flex flex-col items-center-safe z-10 
                  xs:w-[90vw]
                  xl:w-[90vw] 2xl:w-[1400px]">
        <h1 className="font-Urbanist font-semibold leading-tight tracking-tight capitalize text-textPrimary text-center
                xs:text-Heading8 sm:text-Heading7 md:text-Heading5 lg:text-Heading4 xl:text-Heading3 2xl:text-Heading1  ">
          {tr("guide_hero_h1_l1")}
          <br className='' />
          {tr("guide_hero_h1_l2")}
        </h1>
        <p className="font-Urbanist mx-2 font-normal leading-relaxed tracking-normal text-textGray mt-6 text-center xs:text-Paragraph6 md:text-Paragraph5 lg:text-Paragraph4">
          {tr("guide_hero_sub_l1")}
          <br />
          {tr("guide_hero_sub_l2")}
        </p>

        {/* Button Join the waitlist */}
        <div className="w-fit mt-6 relative z-10 ">
          <JoinWaitlist_Btn label={tr("guide_hero_cta_waitlist")} />
        </div>
      </div>

      {/* Video Section */}
      <div className="xs:mt-10 lg:mt-16 xs:mb-5 lg:mb-0 mx-auto xs:w-full xl:w-[1050px] relative xs:px-4 sm:px-6 lg:px-0">
        <div className="relative z-2 w-full aspect-video rounded-2xl lg:rounded-3xl overflow-hidden">
          <video 
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            controls
            autoPlay
            muted
            playsInline
            poster={Banner}
            onClick={handleVideoClick}
            controlsList="nodownload"
            disablePictureInPicture
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* left Shade */}
        <div className="hidden md:block md:absolute xs:top-0 lg:-top-48 lg:-left-60 z-0">
          <img loading='lazy' src={LeftShade} alt="" className="" />
        </div>
        {/* Right Shade */}
        <div className="hidden md:block md:absolute xs:top-0 lg:-top-48 lg:-right-60 z-0">
          <img loading='lazy' src={RightShade} alt="" className="" />
        </div>
      </div>
    </section>
  )
}

export default HeroGuide