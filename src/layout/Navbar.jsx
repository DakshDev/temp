import { useContext, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { GrMenu } from "react-icons/gr";
import { FaChevronDown, FaThLarge, FaSignOutAlt, FaUserAlt, FaPen, FaBook } from "react-icons/fa";
import Logo from "/n-logo.png";
import RoleToggle from "../components/RoleToggle";
import SideBar from "./SideBar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Cookies from 'universal-cookie';
import { useTranslation } from "../hooks/useTranslation";
import { t } from "../i18n";
import LangToggle from "../components/LangToggle";

const Navbar = ({ role, setRole, hideLangToggle = false }) => {
  const [showOpt, setShowOpt] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const tr = useTranslation();

  const desktopRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const mobileRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { token, setToken, setTempToken, setAdminToken, adminToken, user } = useContext(AppContext);

  // Check if current page is an admin page
  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    const handleClickOutside = (event) => {
      const outsideDesktop = !desktopRef.current || !desktopRef.current.contains(event.target);
      const outsideDesktopDropdown = !desktopDropdownRef.current || !desktopDropdownRef.current.contains(event.target);
      const outsideMobile = !mobileRef.current || !mobileRef.current.contains(event.target);
      if (outsideDesktop && outsideDesktopDropdown && outsideMobile) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setShowOpt(location.pathname === "/" || location.pathname === "/guide");
  }, [location]);

  // Check if we should show navigation menu (features, how it works, faq)
  const showNavMenu = location.pathname === "/" || location.pathname === "/guide";

  const handleLogout = (e) => {
    if (e) e.stopPropagation();
    cookies.remove('user_token', { path: '/' });
    cookies.remove('temp_token', { path: '/' });
    cookies.remove('admin_token', { path: '/' });
    cookies.remove('admin_token', { path: '/admin' });
    setToken(false);
    setTempToken(false);
    setAdminToken(false);
    setProfileOpen(false);
    navigate('/');
  };

  // detect if current area is a blog-related route
  const isBlogArea = location.pathname.startsWith('/blog') || location.pathname.startsWith('/blog') || location.pathname.startsWith('/author');

  const menu = [
    { id: 1, key: "nav_features", url: "#features" },
    { id: 2, key: "nav_how_it_works", url: "#how_it_works" },
    { id: 3, key: "nav_faq", url: "#faq" },
    { id: 4, key: "nav_blogs", url: "/blog" },
  ];

  // when in blog area, force English translations for navbar labels
  const trEffective = isBlogArea ? (key) => t(key, 'en') : tr;

  return (
    <nav dir={isBlogArea ? 'ltr' : undefined} className="bg-GrayBg w-full top-0 z-50 flex justify-center border-b border-gray-100/80 backdrop-blur-md">
      <section className="w-[95vw] 2xl:w-[1400px] flex items-center justify-between py-2.5 md:py-4">

        {/* --- DESKTOP VIEW --- */}
        {/* Logo and Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/" className="hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src={Logo}
              alt="Nawaya Logo"
              className="w-14 h-auto rounded-full bg-white object-contain shadow-sm"
            />
          </NavLink>
          {showNavMenu && (
            <ul className={`flex items-center gap-6 rtl:flex-row-reverse`}>
              {menu.map((item) => (
                <li key={item.id}>
                  {item.url && item.url.startsWith('/') ? (
                    <NavLink to={item.url} className={({ isActive }) => `font-Urbanist text-textPrimary hover:text-[#94BD1C] transition-colors font-medium text-base cursor-pointer whitespace-nowrap ${isActive ? 'text-[#94BD1C]' : ''}`}>
                      {trEffective(item.key)}
                    </NavLink>
                  ) : (
                    <a href={item.url} className="font-Urbanist text-textPrimary hover:text-[#94BD1C] transition-colors font-medium text-base cursor-pointer whitespace-nowrap">
                      {trEffective(item.key)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side: Language, Role, Auth Buttons */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Language Toggle as Dropdown */}
          {!hideLangToggle && (
            <div className={showOpt ? "ltr:-mr-8 rtl:-ml-8" : ""}>
              <LangToggle />
            </div>
          )}

          {/* Role Toggle as Dropdown */}
          {showOpt && <RoleToggle role={role} setRole={setRole} />}

          {/* Blog Navigation Buttons */}
          {token && user?.canPostBlog && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/author/write")}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold font-Urbanist text-sm shadow-sm hover:border-[#94BD1C] hover:text-[#94BD1C] transition-all flex items-center gap-2 cursor-pointer"
              >
                <FaPen size={12} /> {trEffective("nav_write_post")}
              </button>
              <button
                onClick={() => navigate("/author/blog-articles")}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold font-Urbanist text-sm shadow-sm hover:border-[#94BD1C] hover:text-[#94BD1C] transition-all flex items-center gap-2 cursor-pointer"
              >
                <FaBook size={12} /> {trEffective("nav_my_posts")}
              </button>
            </div>
          )}

          {/* Auth Buttons or Account */}
          {token ? (
            <div className="relative" ref={desktopRef}>
              <button
                onClick={(e) => { e.stopPropagation(); setProfileOpen(!profileOpen); }}
                className={`flex items-center gap-2 bg-white p-1.5 pr-3 rounded-full border transition-all shadow-sm cursor-pointer ${profileOpen ? 'border-[#94BD1C]' : 'border-gray-200 hover:border-[#94BD1C]'}`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)' }}>
                  <FaUserAlt size={14} />
                </div>
                <span className="font-Urbanist cursor-pointer font-bold text-xs tracking-wider text-gray-700">{trEffective("nav_account")}</span>
                <FaChevronDown className={`text-[10px] text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              {profileOpen && createPortal(
                <div
                  ref={desktopDropdownRef}
                  dir={isBlogArea ? 'ltr' : undefined}
                  className="fixed bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2 z-[9999]"
                  style={{
                    top: (desktopRef.current?.getBoundingClientRect().bottom || 0) + window.scrollY + 12,
                    right: window.innerWidth - (desktopRef.current?.getBoundingClientRect().right || 0),
                    width: '13rem'
                  }}
                >
                  <button onClick={() => { navigate("/user"); setProfileOpen(false); }} className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-sm font-Urbanist font-bold text-gray-700 hover:bg-gray-50 hover:text-[#94BD1C] transition-colors">
                    <FaThLarge className="text-xs" /> {trEffective("nav_dashboard")}
                  </button>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer text-sm font-Urbanist font-bold text-red-500 hover:bg-red-50 transition-colors">
                    <FaSignOutAlt className="text-xs" /> {trEffective("nav_logout")}
                  </button>
                </div>,
                document.body
              )}
            </div>
          ) : adminToken ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full bg-red-50 text-red-600 border border-red-200 font-bold font-Urbanist text-sm shadow-sm hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <FaSignOutAlt size={14} /> {trEffective("nav_logout")}
            </button>
          ) : (
            !isAdminPage && (
              <div className="flex items-center gap-3">
                <NavLink to="/login">
                    <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#AABD05] to-[#0CBF95] text-white font-bold font-Urbanist shadow-lg hover:opacity-90 transition-opacity cursor-pointer">
                    {trEffective("nav_login")}
                  </button>
                </NavLink>
                <NavLink to="/signup" className="cursor-pointer">
                  <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#AABD05] to-[#0CBF95] text-white font-bold font-Urbanist shadow-lg hover:opacity-90 transition-opacity cursor-pointer">
                    {trEffective("nav_sign_up")}
                  </button>
                </NavLink>
              </div>
            )
          )}
        </div>

        {/* --- COMPACT MOBILE VIEW --- */}
        <div className="lg:hidden w-full flex items-center justify-between gap-3">
          <NavLink to="/" className="cursor-pointer">
            <img
              src={Logo}
              alt="Logo"
              className="w-10 h-auto bg-white rounded-full object-contain"
            />
          </NavLink>

          {/* Mobile Toggles */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            {!hideLangToggle && (
              <div className={showOpt ? "scale-90 ltr:-mr-10 rtl:-ml-10" : "scale-90"}>
                <LangToggle />
              </div>
            )}

            {/* Role Toggle */}
            {showOpt && (
              <div className="scale-90">
                <RoleToggle role={role} setRole={setRole} />
              </div>
            )}

            {/* Menu Button */}
            <button onClick={() => setSidebarOpen(true)} className="bg-white w-9 h-9 rounded-full flex justify-center items-center shadow-sm border border-gray-100 cursor-pointer">
              <GrMenu className="text-sm" />
            </button>
          </div>
        </div>
      </section>

      {sidebarOpen && (
        <div className="relative z-[200]">
          <SideBar
            menus={menu}
            visible={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            role={showOpt ? role : undefined}
            setRole={showOpt ? setRole : undefined}
            isLoggedIn={!!token || !!adminToken}
            showSignup={!token && !adminToken && !isAdminPage}
            showLogin={!token && !adminToken && !isAdminPage}
            onLogout={handleLogout}
            token={token}
            adminToken={adminToken}
            user={user}
            hideLangToggle={hideLangToggle}
          />
        </div>
      )}

    </nav>
  );
};

export default Navbar;