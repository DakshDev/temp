import { useEffect, useState } from 'react';
// import '../index.css';
import { lazy, Suspense } from 'react';
const SurveyModal = lazy(() => import('./SurveyModal'));
import { useLang } from '../context/LanguageContext';



export function JoinWaitlistLoader(){
  return (
      <div className="fixed z-[100] inset-0 h-[100dvh] w-screen flex items-center justify-center p-2 sm:p-4">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
  
        {/* FIX 2: Adjusted max-h to 85dvh for mobile to ensure the entire modal + shadow is visible */}
        <div className="relative w-full max-w-2xl bg-white rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col min-h-[85dvh] md:max-h-[92vh] animate-in zoom-in-95 duration-300">
  
          {/* Header - Fixed */}
          <div className="w-full mt-0 py-4 md:py-6 shrink-0 relative" style={{ background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)' }}>
            
            <div className='bg-black/20 animate-pulse min-h-9 rounded-md max-w-40 mx-auto'></div>
          </div>
  
          {/* Form Body - Scrollable */}
          <div className='p-10'>
            <div className="grid gap-2 mb-8 px-20">
              <div className='bg-black/20 animate-pulse min-h-9 rounded-md'></div>
              <div className='bg-black/20 animate-pulse min-h-9 rounded-md'></div>
            </div>
  
            <div className='grid gap-4'>
            <div className='bg-black/20 animate-pulse min-h-12 rounded-md'></div>
            <div className='bg-black/20 animate-pulse min-h-12 rounded-md'></div>
            <div className='bg-black/20 animate-pulse min-h-12 rounded-md'></div>
            <div className='bg-black/20 animate-pulse min-h-12 rounded-md'></div>
            <div className='bg-black/20 animate-pulse min-h-12 rounded-md'></div>
            </div>
          </div>
        </div>
      </div>
)};


export default function JoinWaitlist_Btn({label, compactArabic = false}){
  
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
      {isModalOpen && (
        <Suspense fallback={<JoinWaitlistLoader />}>
          <SurveyModal onClose={() => setIsModalOpen(false)} />
        </Suspense>
      )}
    </>
  );
};