import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // Added for z-index priority
import PayButton from './PayButton';
import { FaPlay } from "react-icons/fa"; // For the placeholder icon
import { useTranslation } from '../hooks/useTranslation';

const WatchAVideo = ({ text = "Watch a short preview" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const tr = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Restoring your exact original layout inside the Portal logic
  const modalContent = (
    <div className="fixed w-[100vw] h-[100vh] inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal Content - Your original structure */}
      <div className="relative w-full max-w-4xl bg-white rounded-[30px] md:rounded-[50px] shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] animate-in zoom-in-95 duration-300">
        
        <div className="overflow-y-auto p-5 md:p-10 custom-scrollbar">
          
          {/* Header */}
          <h2 className="text-[#94BD1C] font-serif text-lg md:text-3xl font-bold mb-2 text-left rtl:text-right leading-tight">
            {tr("deeper_title")}
          </h2>
          <p className="text-[#666666] text-xs md:text-base font-Urbanist mb-5 md:mb-6 text-left rtl:text-right opacity-90 italic">
            {tr("deeper_subtitle")}
          </p>

          {/* Video Section */}
          <div className="relative h-[250px] md:h-[350px] w-full aspect-video rounded-xl md:rounded-3xl overflow-hidden bg-[#111] border-[3px] md:border-[8px] border-[#555555] shadow-lg">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/x2jgNgPdf2k"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Text Content */}
          <div className="mt-6 md:mt-8">
            <h3 className="text-[#111111] font-Urbanist text-base md:text-xl font-bold mb-3 text-left rtl:text-right">
              {tr("deeper_header_intention")}
            </h3>
            <div className="text-[#555555] text-[11px] md:text-[15px] leading-relaxed max-w-3xl font-Urbanist text-left rtl:text-right space-y-3">
              <p>{tr("deeper_body_1")}</p>
              
              <p>{tr("deeper_body_2")}</p>
              
              <p className="bg-[#F7FAF3] p-3 md:p-4 rounded-xl border-l-4 border-[#94BD1C] text-[#2D3A1A] font-medium">
                {tr("deeper_body_highlight")}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row rtl:sm:flex-row-reverse justify-end items-center gap-4">
            <button 
              onClick={() => setIsOpen(false)}
              className="px-6 md:px-8 py-2 md:py-2.5 rounded-full border border-gray-200 text-gray-500 font-bold text-[10px] md:text-sm hover:bg-gray-50 transition-colors order-2 sm:order-1"
            >
              {tr("deeper_close_btn")}
            </button>

            <div className="flex flex-col items-center sm:items-end gap-1.5 w-full sm:w-auto order-1 sm:order-2">
                <PayButton text={tr("deeper_unlock_btn")} />
                <span className="text-[9px] md:text-[10px] text-gray-400 font-Urbanist px-2">
                   {tr("deeper_unlock_note")}
                </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <>
      <button 
        type="button" 
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center justify-center px-10 py-3 rounded-full font-semibold font-Urbanist transition-all duration-300 cursor-pointer overflow-hidden  active:scale-95 hover:scale-105"
      >
        {/* 1. THE GRADIENT BORDER LAYER */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#94BD1C] to-[#29C28C]"></div>

        {/* 2. NORMAL STATE: White background that disappears on hover (preserved original design) */}
        <div className="absolute inset-[2px] bg-white rounded-full transition-opacity duration-300 group-hover:opacity-0"></div>

        {/* 3. BUTTON TEXT */}
        <span className="relative z-10 transition-all duration-300 text-md font-bold
          /* Default: Gradient Text */
          bg-gradient-to-r from-[#94BD1C] to-[#29C28C] bg-clip-text text-transparent
          /* Hover: Solid White */
          group-hover:text-white group-hover:bg-none
        ">
          {text}
        </span>
      </button>

      {/* Portaling the original design to the top of the body for z-score priority */}
      {isOpen && createPortal(modalContent, document.body)}
    </>
  );
};

export default WatchAVideo;