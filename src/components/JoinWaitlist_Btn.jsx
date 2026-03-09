import { useEffect, useState } from 'react';
import '../index.css';
import SurveyModal from './SurveyModal';
import { useLang } from '../context/LanguageContext';

const JoinWaitlist_Btn = ({label, compactArabic = false}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lang } = useLang();

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      // window.scrollTo(0,0)
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  return (


    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="group relative inline-flex items-center justify-center px-6 py-2.5 rounded-full font-semibold font-Urbanist transition-all duration-300 cursor-pointer overflow-hidden shadow-[0_8px_22px_rgba(11,191,149,0.12)] active:scale-95"
      >
        {/* 1. NORMAL STATE BACKGROUND: The solid gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#AABD05] to-[#0CBF95] transition-opacity duration-300 group-hover:opacity-0"></div>

        {/* 2. HOVER STATE BACKGROUND: The white interior with gradient border */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[2px] bg-gradient-to-r from-[#AABD05] to-[#0CBF95]">
          <div className="w-full h-full bg-white rounded-full"></div>
        </div>

        {/* 3. BUTTON TEXT */}
        <span className={`relative z-10 transition-all duration-300 font-bold text-white 
      group-hover:bg-gradient-to-r group-hover:from-[#AABD05] group-hover:to-[#0CBF95] group-hover:bg-clip-text group-hover:text-transparent
      ${compactArabic && lang === 'ar' ? 'text-xs md:text-sm' : 'xs:text-Paragraph7 2xl:text-Paragraph4'}`}>
          {label}
        </span>
      </button>

      {isModalOpen && <SurveyModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default JoinWaitlist_Btn;