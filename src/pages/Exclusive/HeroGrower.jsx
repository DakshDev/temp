import Banner from "../../assets/Grower/SessionsGrower.webp";
import Banner1 from "../../assets/Grower/SessionsGrowerMobile.webp";
import LeftShade from "../../assets/Grower/LeftShade.webp"
import RightShade from "../../assets/Grower/RightShade.webp"
import WatchAVideo from "../../components/WatchAVideo";
import ExclusiveAccessCard from "./ExclusiveAccessCard";
import PayButton from "../../components/PayButton";
import { useTranslation } from "../../hooks/useTranslation";

const HeroGrower = () => {
  const tr = useTranslation(); 
  return (
    <section className="bg-GrayBg pt-20 overflow-hidden">
      {/* Heading and Paragraph  */}
      <div className=" mx-auto px-6 text-center flex flex-col items-center-safe z-10
                  xs:w-[90vw]
                  xl:w-[90vw] 2xl:w-[1400px]">
        <h1 className="font-Urbanist font-semibold leading-tight tracking-tight text-textPrimary
                xs:text-Heading8 sm:text-Heading6 md:text-Heading5 lg:text-Heading4 xl:text-Heading3 2xl:text-Heading1">
          {tr("exclusive_hero_title")}
        </h1>
        <p className="font-Urbanist font-normal leading-relaxed tracking-normal text-textGray mt-6 
                xs:text-Paragraph6 md:text-Paragraph5 lg:text-Paragraph4">
          {tr("exclusive_hero_subtitle")}
        </p>

        {/* Button Join the waitlist */}
        <div className="flex mt-2 flex-col md:flex-row gap-4 items-center justify-center">

          <div className="z-2">
            <PayButton text={tr("exclusive_hero_unlock_btn")} />
          </div>
        
        <div className="w-fit relative z-2">
          <WatchAVideo text={tr("exclusive_hero_watch_btn")} />
        </div>
        </div>
        
      </div>

      {/* Image Section */}
      <div className="xs:mt-10 lg:mt-16 xs:mb-5 lg:mb-0 mx-auto xs:w-full xl:w-[1050px] z-0 relative">
        <img loading='lazy' src={Banner} className="z-10  blur-sm  relative xs:hidden lg:inline lg:relative lg:w-full lg:h-auto " />
        <img loading='lazy' src={Banner1} className="z-10  blur-sm relative xs:inline xs:w-full xs:h-full lg:hidden" />


        {/* left Shade */}
        <div className="absolute xs:top-0 lg:-top-48 lg:-left-60 z-0">
          <img loading='lazy' src={LeftShade} alt="" className="" />
        </div>
        {/* Right Shade */}
        <div className="absolute xs:top-0 lg:-top-48 lg:-right-60 z-0">
          <img loading='lazy' src={RightShade} alt="" className="" />
        </div>


        <div className="">
          <ExclusiveAccessCard />
        </div>


      </div>
    </section>
  );
};

export default HeroGrower;
