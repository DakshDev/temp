import { useRef, useEffect, useState } from "react";
import Banner from "../../assets/Grower/SessionsGrower.webp";
import JoinWaitlist_Btn from "../../components/JoinWaitlist_Btn";
import LeftShade from "../../assets/Grower/LeftShade.webp"
import RightShade from "../../assets/Grower/RightShade.webp"

const HeroGrower = ({tr, lang}) => {
const videoRef = useRef(null);
const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
  const handleLoad = () => {
    setTimeout(() => {
      setLoadVideo(true); // load video after page finishes
    }, 1000);
  };
  if (document.readyState === "complete") {
    handleLoad();
  } else {
    window.addEventListener("load", handleLoad);
  }
  return () => window.removeEventListener("load", handleLoad);
}, []);

  const englishVideo = "https://res.cloudinary.com/deeyacqys/video/upload/v1769690026/Nawaya_Explainer_English_crohuo.mp4";
  const arabicVideo = "https://res.cloudinary.com/deeyacqys/video/upload/v1769703539/Nawaya_Explainer_in_Arabic_iudo7a.mp4";
  const germanVideo = "https://res.cloudinary.com/deeyacqys/video/upload/v1770045380/Nawaya_Hero_Video_in_German_eplpkn.mp4";
  const videoSrc = lang === 'ar' ? arabicVideo : lang === 'de' ? germanVideo : englishVideo;
  
  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };
  




  
  return (
    <section className="bg-GrayBg pt-20 overflow-hidden">
      {/* Heading and Paragraph  */}
      <div className=" mx-auto  xs:px-0 sm:px-6 text-center flex flex-col items-center-safe z-8
                  xs:w-[90vw]
                  xl:w-[90vw] 2xl:w-[1400px]">
        <h1 className={`font-Urbanist font-semibold leading-tight tracking-tight capitalize text-textPrimary
    xs:text-Heading8 sm:text-Heading6 md:text-Heading5 lg:text-Heading4 xl:text-Heading3 2xl:text-Heading1
    ${lang === "ar" ? "tracking-normal" : "tracking-tight"}`}>
          {tr("hero_headline_1")}<br />
          {tr("hero_headline_2")}
        </h1>
        <p className={`font-Urbanist font-normal leading-relaxed text-textGray mt-6 text-center
    xs:text-Paragraph6 md:text-Paragraph5 lg:text-Paragraph4
    ${lang === "ar" ? "leading-loose tracking-normal" : ""}`} >
          {tr("hero_subtitle_1")} {" "}
          <br className="xs:hidden lg:inline" />
          {tr("hero_subtitle_2")}
        </p>

        {/* Button Join the waitlist */}
        <div className="w-fit mt-6 relative z-8 ">
          <JoinWaitlist_Btn label={tr("hero_waitlist_button")} />
        </div>
      </div>

      {/* Video Section */}
      <div className="xs:mt-10 lg:mt-16 xs:mb-5 lg:mb-0 mx-auto xs:w-full xl:w-[1050px] relative xs:px-4 sm:px-6 lg:px-0">
        <div className="relative z-2 w-full aspect-video rounded-2xl lg:rounded-3xl overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            controlsList="nodownload"
            muted
            autoPlay
            playsInline
            preload="none"
            poster={Banner}
            onClick={handleVideoClick}
            controls
            disablePictureInPicture
          >
            {loadVideo && (
              <source src={videoSrc} type="video/mp4" />
            )}
          </video>
        </div>

        {/* left Shade */}
        <div className="hidden md:block md:absolute xs:top-0 lg:-top-48 lg:-left-60 z-0">
          <img src={LeftShade} alt="" className="" />
        </div>
        {/* Right Shade */}
        <div className="hidden md:block md:absolute xs:top-0 lg:-top-48 lg:-right-60 z-0">
          <img src={RightShade} alt="" className="" />
        </div>
      </div>
    </section>
  );
};

export default HeroGrower;
