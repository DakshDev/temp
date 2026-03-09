import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { GrMenu } from "react-icons/gr";
import { FaThLarge, FaSignOutAlt, FaUserAlt, FaPen, FaBook } from "react-icons/fa";
import { Instagram, Linkedin } from 'lucide-react';
import { FaTiktok, FaYoutube, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import RoleToggle from "../components/RoleToggle";
import LangToggle from "../components/LangToggle";
import { useTranslation } from "../hooks/useTranslation";
import { t } from "../i18n";

export default function SideBar({ onClose, visible, menus, role, setRole, isLoggedIn, showSignup, showLogin, onLogout, token, adminToken, user, hideLangToggle = false }) {
  const navRef = useRef(null);
  const ulRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isBlogArea = location.pathname.startsWith('/blog') || location.pathname.startsWith('/blog') || location.pathname.startsWith('/author');
  const tr = useTranslation();
  const trEffective = isBlogArea ? (key) => t(key, 'en') : tr;

  // Function to handle the "Close" button specifically (with animation)
  const handleManualClose = () => {
    gsap.to(navRef.current, {
      y: "100%",
      opacity: 0,
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => onClose(),
    });
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      // Opening Animation
      tl.fromTo(
        navRef.current,
        { y: "100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
      );

      if (ulRef.current) {
        tl.fromTo(
          ulRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.2"
        );
      }

      return () => {
        document.body.style.overflow = "auto";
        tl.kill();
      };
    }
  }, [visible]);

  if (!visible) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex flex-col pointer-events-none">
      {/* Clicking the overlay closes the menu */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[1px] pointer-events-auto"
        onClick={handleManualClose}
      />

      <nav
        ref={navRef}
        dir={isBlogArea ? 'ltr' : undefined}
        className="relative w-full h-full bg-GrayBg text-black flex flex-col overflow-hidden pointer-events-auto"
      >
        {/* Header */}
        <div className="w-full pt-10 pb-2 px-6 flex justify-between items-center shrink-0">
          <div
            onClick={handleManualClose}
            className="bg-Primarybg w-12 h-12 rounded-full flex justify-center items-center cursor-pointer shadow-md"
          >
            <GrMenu className="text-Heading8 rotate-90" />
          </div>
        </div>

        {/* Menu Area */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start pt-8 px-6">
          <ul ref={ulRef} className="w-full flex flex-col items-center space-y-6">
            {menus.map((navMenu) => (
              <li key={navMenu.id}>
                <a
                  href={navMenu.url}
                  onClick={() => onClose()}
                  className="font-Urbanist text-xl font-semibold text-center block hover:text-[#94BD1C] transition-colors"
                >
                  {trEffective(navMenu.key)}
                </a>
              </li>
            ))}

            {/* Blogs Link */}
            {/* <li>
              <NavLink
                to="/blog"
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `font-Urbanist text-xl font-semibold text-center block transition-colors ${isActive ? 'text-[#94BD1C]' : 'hover:text-[#94BD1C]'
                  }`
                }
              >
                {trEffective("nav_blogs")}
              </NavLink>
            </li> */}

            {/* Auth Buttons Section */}
            {token ? (
              <li className="py-4 w-full flex flex-col items-center space-y-3">
                {/* Blog Navigation Buttons */}
                {user?.canPostBlog && (
                  <>
                    <button
                      onClick={() => { navigate("/author/write"); onClose(); }}
                      className="w-full max-w-[240px] px-8 py-3 rounded-full bg-white text-gray-700 border-2 border-gray-200 font-bold font-Urbanist shadow-md hover:border-[#94BD1C] hover:text-[#94BD1C] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FaPen size={16} /> {trEffective("nav_write_post")}
                    </button>
                    <button
                      onClick={() => { navigate("/author/blog-articles"); onClose(); }}
                      className="w-full max-w-[240px] px-8 py-3 rounded-full bg-white text-gray-700 border-2 border-gray-200 font-bold font-Urbanist shadow-md hover:border-[#94BD1C] hover:text-[#94BD1C] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FaBook size={16} /> {trEffective("nav_my_posts")}
                    </button>
                  </>
                )}
                <NavLink to="/user" onClick={() => onClose()} className="w-full max-w-[240px]">
                  <button className="w-full px-8 py-3 rounded-full bg-white text-gray-700 border-2 border-gray-200 font-bold font-Urbanist shadow-md hover:border-[#94BD1C] hover:text-[#94BD1C] transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <FaThLarge size={16} /> {trEffective("nav_dashboard")}
                  </button>
                </NavLink>
                <button
                  onClick={() => { onLogout(); onClose(); }}
                  className="w-full max-w-[240px] px-8 py-3 rounded-full bg-red-50 text-red-600 border-2 border-red-200 font-bold font-Urbanist shadow-md hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaSignOutAlt size={16} /> {trEffective("nav_logout")}
                </button>
              </li>
            ) : adminToken ? (
              <li className="pt-4 w-full flex flex-col items-center">
                <button
                  onClick={() => { onLogout(); onClose(); }}
                  className="w-full max-w-[240px] px-8 py-3 rounded-full bg-red-50 text-red-600 border-2 border-red-200 font-bold font-Urbanist shadow-md hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaSignOutAlt size={16} /> {tr("nav_logout")}
                </button>
              </li>
            ) : (
              <>
                {showLogin && (
                  <li className="pt-4 w-full flex flex-col items-center">
                    <NavLink to="/login" onClick={() => onClose()} className="w-full max-w-[240px]">
                      <button className="w-full px-10 py-3 rounded-full bg-gradient-to-r from-[#AABD05] to-[#0CBF95] text-white font-bold font-Urbanist shadow-lg hover:opacity-90 transition-all active:scale-95 cursor-pointer">
                        {trEffective("nav_login")}
                      </button>
                    </NavLink>
                  </li>
                )}
                {showSignup && (
                  <li className={`${showLogin ? '' : 'pt-4'} w-full flex flex-col items-center`}>
                    <NavLink to="/signup" onClick={() => onClose()} className="w-full max-w-[240px]">
                      <button className="w-full px-10 py-3 rounded-full bg-gradient-to-r from-[#AABD05] to-[#0CBF95] text-white font-bold font-Urbanist shadow-lg hover:opacity-90 transition-all active:scale-95 cursor-pointer">
                        {trEffective("nav_sign_up")}
                      </button>
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>

        {/* Bottom Section: Social Media + Role Toggle + Language Toggle */}
        <section className="shrink-0 w-full flex flex-col items-center justify-center pb-8 pt-6 bg-GrayBg border-t border-gray-100/50 space-y-5 px-6">
          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <a href="https://www.tiktok.com/@nawaya.io" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#94BD1C] transition-colors">
              <FaTiktok size={20} />
            </a>
            <a href="https://www.instagram.com/nawaya.growth" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#94BD1C] transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/nawaya-app" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#94BD1C] transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://x.com/nawaya_growth" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#94BD1C] transition-colors">
              <FaXTwitter size={20} />
            </a>
            <a href="https://www.youtube.com/@nawaya-growth" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#94BD1C] transition-colors">
              <FaYoutube size={20} />
            </a>
            <a href="https://chat.whatsapp.com/EjShBNZDlcAKFjqOIZURRC" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#94BD1C] transition-colors">
              <FaWhatsapp size={20} />
            </a>
          </div>

          {/* Role Toggle */}
          {role !== undefined && setRole && (
            <div className="w-full flex justify-center">
              <RoleToggle role={role} setRole={setRole} onClose={() => onClose()} openUpward={true} />
            </div>
          )}

          {/* Language Toggle */}
          {!hideLangToggle && (
            <div className={`w-full flex justify-center ${role !== undefined && setRole ? '-mt-[25px]' : ''}`}>
              <LangToggle openUpward={true} />
            </div>
          )}
        </section>
      </nav>
    </div>,
    document.body
  );
}