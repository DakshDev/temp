import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../context/LanguageContext";
import { FaChevronDown, FaGlobe } from "react-icons/fa";

export default function LangToggle({ openUpward = false }) {
  const { lang, setLang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const handleSelect = (selectedLang) => {
    if (selectedLang !== lang) setLang(selectedLang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 font-Urbanist text-textPrimary hover:text-[#94BD1C] transition-colors font-medium text-base cursor-pointer"
      >
        <FaGlobe className="text-base" />
        {lang.toUpperCase()}
        <FaChevronDown className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed bg-white rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-10001 min-w-[140px] animate-fadeIn"
          style={{
            top: openUpward 
              ? (buttonRef.current?.getBoundingClientRect().top || 0) + window.scrollY - 100
              : (buttonRef.current?.getBoundingClientRect().bottom || 0) + window.scrollY + 8,
            left: (buttonRef.current?.getBoundingClientRect().left || 0) + (buttonRef.current?.offsetWidth || 0) / 2 - 70,
          }}
        >
        {["en", "ar", "de"].map(l => (
            <button
              key={l}
              onClick={() => handleSelect(l)}
              className={`w-full text-left px-5 py-3.5 text-sm font-Urbanist font-semibold transition-all duration-200 cursor-pointer ${
                lang === l
                  ? "bg-linear-to-r from-[#94BD1C] to-[#29C28C] text-white shadow-sm"
                  : "text-gray-700 hover:bg-linear-to-r hover:from-[#94BD1C]/10 hover:to-[#29C28C]/10 hover:text-[#94BD1C]"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}