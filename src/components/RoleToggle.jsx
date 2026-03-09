import { useEffect, useState, useRef } from 'react'
import { FaRegCompass, FaChevronDown } from "react-icons/fa"
import { LuGraduationCap } from "react-icons/lu"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'

const RoleToggle = ({ onClose, openUpward = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("grower");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const tr = useTranslation();
  const { lang } = useLang();

  useEffect(() => {
    if (location.pathname === "/guide") {
      setRole('guide');
    } else if (location.pathname === "/") {
      setRole('grower');
    }
  }, [location.pathname, setRole]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value, path) => {
    setRole(value);
    setIsOpen(false);
    navigate(path);
    if (onClose) onClose(); // Close sidebar if open
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 font-Urbanist text-textPrimary hover:text-[#94BD1C] transition-colors font-medium text-base cursor-pointer"
      >
        {role === 'grower' ? tr("nav_grower") : tr("nav_guide")}
        <FaChevronDown className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className={`absolute ${openUpward ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50 min-w-[160px] animate-fadeIn`}>
          <button
            onClick={() => handleSelect('grower', '/')}
            className={`w-full text-left px-5 py-3.5 text-sm font-Urbanist font-semibold transition-all duration-200 cursor-pointer flex items-center gap-3 ${
              role === 'grower' 
                ? 'bg-gradient-to-r from-[#94BD1C] to-[#29C28C] text-white shadow-sm' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#94BD1C]/10 hover:to-[#29C28C]/10 hover:text-[#94BD1C]'
            }`}
          >
            <LuGraduationCap size={18} />
            {tr("nav_grower")}
          </button>
          <button
            onClick={() => handleSelect('guide', '/guide')}
            className={`w-full text-left px-5 py-3.5 text-sm font-Urbanist font-semibold transition-all duration-200 cursor-pointer flex items-center gap-3 ${
              role === 'guide' 
                ? 'bg-gradient-to-r from-[#94BD1C] to-[#29C28C] text-white shadow-sm' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#94BD1C]/10 hover:to-[#29C28C]/10 hover:text-[#94BD1C]'
            }`}
          >
            <FaRegCompass size={18} />
            {tr("nav_guide")}
          </button>
        </div>
      )}
    </div>
  )
}

export default RoleToggle