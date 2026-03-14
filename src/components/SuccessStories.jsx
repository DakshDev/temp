import { useState, useEffect } from 'react';
import portrait2 from "../assets/portraits/portrait-2.webp";
import portrait3 from "../assets/portraits/portrait-3.webp";
import portrait1 from "../assets/portraits/portrait-1.webp";
import portrait4 from "../assets/portraits/portrait-4.webp";
import portrait5 from "../assets/portraits/portrait-5.webp";
import portrait6 from "../assets/portraits/portrait-6.webp";
import portrait7 from "../assets/portraits/portrait-7.webp";
import portrait8 from "../assets/portraits/portrait-8.webp";
import portrait9 from "../assets/portraits/portrait-9.jpg";
import portrait10 from "../assets/portraits/portrait-10.webp";
import portrait11 from "../assets/portraits/portrait-11.webp";
import portrait12 from "../assets/portraits/portrait-12.webp";
import portrait13 from "../assets/portraits/portrait-13.webp";
import portrait14 from "../assets/portraits/portrait-14.webp";
import portrait15 from "../assets/portraits/portrait-15.webp";
import portrait16 from "../assets/portraits/portrait-16.webp";
import portrait17 from "../assets/portraits/portrait-17.webp";
import portrait18 from "../assets/portraits/portrait-18.webp";
import JoinWaitlist_Btn from './JoinWaitlist_Btn';

const leftPortraits = [
  { src: portrait1, size: "lg", opacity: "full", top: "5%", left: "15%" },
  { src: portrait2, size: "md", opacity: "full", top: "18%", left: "40%" },
  { src: portrait3, size: "md", opacity: "full", top: "35%", left: "10%" },
  { src: portrait15, size: "lg", opacity: "full", top: "48%", left: "35%" },
  { src: portrait5, size: "md", opacity: "full", top: "65%", left: "8%" },
  { src: portrait6, size: "lg", opacity: "full", top: "72%", left: "38%" },
  { src: portrait1, size: "sm", opacity: "ghost", top: "0%", left: "0%" },
  { src: portrait5, size: "sm", opacity: "ghost", top: "88%", left: "5%" },
  { src: portrait16, size: "sm", opacity: "full", top: "35%", left: "65%" },
  { src: portrait11, size: "sm", opacity: "full", top: "88%", left: "20%" },
];

const rightPortraits = [
  { src: portrait7, size: "lg", opacity: "full", top: "2%", left: "50%" },
  { src: portrait8, size: "md", opacity: "full", top: "15%", left: "20%" },
  { src: portrait17, size: "md", opacity: "full", top: "32%", left: "60%" },
  { src: portrait10, size: "lg", opacity: "full", top: "45%", left: "35%" },
  // { src: portrait11, size: "sm", opacity: "full", top: "38%", left: "72%" },
  { src: portrait12, size: "md", opacity: "full", top: "52%", left: "68%" },
  { src: portrait13, size: "lg", opacity: "full", top: "73%", left: "40%" },
  { src: portrait7, size: "sm", opacity: "ghost", top: "8%", left: "85%" },
  { src: portrait12, size: "sm", opacity: "ghost", top: "75%", left: "80%" },
  { src: portrait18, size: "sm", opacity: "full", top: "37%", left: "14%" },
  { src: portrait14, size: "sm", opacity: "full", top: "70%", left: "18%" },
];

// Small tablet portraits (768px - 900px) - minimal images
const tabletSmallLeftPortraits = [
  { src: portrait1, size: "lg", opacity: "full", top: "10%", left: "15%" },
  { src: portrait3, size: "md", opacity: "full", top: "40%", left: "8%" },
  { src: portrait5, size: "md", opacity: "full", top: "70%", left: "12%" },
];

const tabletSmallRightPortraits = [
  { src: portrait7, size: "lg", opacity: "full", top: "8%", left: "60%" },
  { src: portrait9, size: "md", opacity: "full", top: "38%", left: "65%" },
  { src: portrait12, size: "md", opacity: "full", top: "68%", left: "62%" },
];

// Medium tablet portraits (900px - 1024px) - more images
const tabletMediumLeftPortraits = [
  { src: portrait1, size: "lg", opacity: "full", top: "8%", left: "12%" },
  { src: portrait3, size: "md", opacity: "full", top: "30%", left: "5%" },
  { src: portrait5, size: "md", opacity: "full", top: "55%", left: "8%" },
  { src: portrait6, size: "lg", opacity: "full", top: "75%", left: "15%" },
  { src: portrait14, size: "sm", opacity: "ghost", top: "0%", left: "0%" },
];

const tabletMediumRightPortraits = [
  { src: portrait7, size: "lg", opacity: "full", top: "5%", left: "58%" },
  { src: portrait8, size: "md", opacity: "full", top: "28%", left: "65%" },
  { src: portrait9, size: "md", opacity: "full", top: "52%", left: "62%" },
  { src: portrait13, size: "lg", opacity: "full", top: "73%", left: "60%" },
  { src: portrait2, size: "sm", opacity: "ghost", top: "85%", left: "70%" },
];

// Desktop small portraits (1024px - 1280px) - more images than tablet
const desktopSmallLeftPortraits = [
  { src: portrait1, size: "lg", opacity: "full", top: "5%", left: "15%" },
  { src: portrait2, size: "md", opacity: "full", top: "18%", left: "40%" },
  { src: portrait3, size: "md", opacity: "full", top: "35%", left: "10%" },
  { src: portrait15, size: "lg", opacity: "full", top: "48%", left: "35%" },
  { src: portrait5, size: "md", opacity: "full", top: "65%", left: "8%" },
  { src: portrait6, size: "lg", opacity: "full", top: "72%", left: "38%" },
  { src: portrait1, size: "sm", opacity: "ghost", top: "0%", left: "0%" },
];

const desktopSmallRightPortraits = [
  { src: portrait7, size: "lg", opacity: "full", top: "2%", left: "50%" },
  { src: portrait8, size: "md", opacity: "full", top: "15%", left: "20%" },
  { src: portrait17, size: "md", opacity: "full", top: "32%", left: "60%" },
  { src: portrait10, size: "lg", opacity: "full", top: "45%", left: "35%" },
  { src: portrait12, size: "md", opacity: "full", top: "52%", left: "68%" },
  { src: portrait13, size: "lg", opacity: "full", top: "73%", left: "40%" },
  { src: portrait7, size: "sm", opacity: "ghost", top: "8%", left: "85%" },
];

const getSizeClasses = (size) => {
  switch (size) {
    case "sm":
      return "w-20 h-24 md:w-24 md:h-28 lg:w-28 lg:h-32";
    case "md":
      return "w-24 h-28 md:w-32 md:h-36 lg:w-36 lg:h-44";
    case "lg":
      return "w-28 h-32 md:w-36 md:h-44 lg:w-44 lg:h-52";
    default:
      return "w-24 h-28 md:w-32 md:h-36 lg:w-36 lg:h-44";
  }
};

const getOpacityClasses = (opacity) => {
  return opacity === "ghost" ? "opacity-20" : "opacity-100";
};

const PortraitCard = ({ src, size, opacity, style }) => {
  return (
    <div
      className={`absolute rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${getSizeClasses(size)} ${getOpacityClasses(opacity)}`}
      style={style}
    >
      <img
        src={src}
        alt="Success story"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

const SuccessStories = ({tr}) => {
  // const tr = useTranslation();
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 900) {
        setScreenSize('tablet-small');
      } else if (width < 1024) {
        setScreenSize('tablet-medium');
      } else if (width < 1280) {
        setScreenSize('desktop-small');
      } else {
        setScreenSize('desktop');
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Select appropriate portrait arrays based on screen size
  const getLeftPortraits = () => {
    if (screenSize === 'tablet-small') return tabletSmallLeftPortraits;
    if (screenSize === 'tablet-medium') return tabletMediumLeftPortraits;
    if (screenSize === 'desktop-small') return desktopSmallLeftPortraits;
    return leftPortraits; // desktop
  };

  const getRightPortraits = () => {
    if (screenSize === 'tablet-small') return tabletSmallRightPortraits;
    if (screenSize === 'tablet-medium') return tabletMediumRightPortraits;
    if (screenSize === 'desktop-small') return desktopSmallRightPortraits;
    return rightPortraits; // desktop
  };
  
  return (
    <section className="relative w-full md:min-h-screen bg-background py-2 md:pb-24 md:pt-4 overflow-hidden">
      <div className="max-w-[1600px] mx-auto relative h-full md:min-h-screen">
        {/* Left floating portraits - Responsive set based on screen size */}
        <div className="hidden md:block absolute left-0 top-0 md:w-[450px] lg:w-[300px] xl:w-[450px] 2xl:w-[500px] h-full">
          {getLeftPortraits().map((portrait, index) => (
            <PortraitCard
              key={`left-${index}`}
              src={portrait.src}
              size={portrait.size}
              opacity={portrait.opacity}
              style={{
                top: portrait.top,
                left: portrait.left,
              }}
            />
          ))}
        </div>

        {/* Right floating portraits - Responsive set based on screen size */}
        <div className="hidden md:block absolute right-0 top-0 md:w-[450px] lg:w-[300px] xl:w-[450px] 2xl:w-[500px] h-full">
          {getRightPortraits().map((portrait, index) => (
            <PortraitCard
              key={`right-${index}`}
              src={portrait.src}
              size={portrait.size}
              opacity={portrait.opacity}
              style={{
                top: portrait.top,
                left: portrait.left,
              }}
            />
          ))}
        </div>

        {/* Center content - Tablet & Desktop */}
        <div className="hidden md:flex relative z-10 flex-col items-center justify-center min-h-screen px-4 md:px-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-3 md:mb-4 tracking-tight">
            {tr('success_count')}
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-4 md:mb-6">
            {tr('success_heading')}
          </h3>
          <p className="text-center text-sm md:text-base text-muted-foreground max-w-sm md:max-w-md mb-6 md:mb-8 leading-relaxed">
            {tr('success_description')}
          </p>
          <JoinWaitlist_Btn label={tr("btn_join_waitlist")} />
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center py-8 px-4">
          {/* Mobile image collage - Above content */}
          <div className="relative w-full max-w-md h-[400px] mb-8">
            {/* First row - top */}
            <div className="absolute top-0 left-[5%] w-24 h-28 rounded-2xl overflow-hidden shadow-lg">
              <img loading='lazy' src={portrait18} alt="Success story" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-0 left-[30%] w-32 h-36 rounded-2xl overflow-hidden shadow-lg">
              <img loading='lazy' src={portrait1} alt="Success story" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-8 right-[5%] w-28 h-32 rounded-2xl overflow-hidden shadow-lg">
              <img loading='lazy' src={portrait7} alt="Success story" className="w-full h-full object-cover" />
            </div>

            {/* Second row - middle */}
            <div className="absolute top-[35%] left-[2%] w-28 h-32 rounded-2xl overflow-hidden shadow-lg">
              <img loading='lazy' src={portrait3} alt="Success story" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-[32%] left-[32%] w-32 h-40 rounded-2xl overflow-hidden shadow-lg">
              <img loading='lazy' src={portrait15} alt="Success story" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-[38%] right-[8%] w-24 h-28 rounded-2xl overflow-hidden shadow-lg">
              <img loading='lazy' src={portrait8} alt="Success story" className="w-full h-full object-cover" />
            </div>

            {/* Third row - bottom */}
            <div className="absolute bottom-0 left-[8%] w-28 h-32 rounded-2xl overflow-hidden shadow-lg">
              <img loading='lazy' src={portrait14} alt="Success story" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-2 left-[38%] w-28 h-32 rounded-2xl overflow-hidden shadow-lg">
              <img loading='lazy' src={portrait6} alt="Success story" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-[2%] w-32 h-36 rounded-2xl overflow-hidden shadow-lg">
              <img loading='lazy' src={portrait13} alt="Success story" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Mobile text content - Below images */}
          <div className="text-center max-w-sm">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight">
              {tr('success_count')}
            </h2>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">
              {tr('success_heading')}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed px-2">
              {tr('success_description')}
            </p>
            <JoinWaitlist_Btn label={tr("btn_join_waitlist")} />
          </div>
        </div>
        </div>
      </section>
    );
  };

export default SuccessStories;