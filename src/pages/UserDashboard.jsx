import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { IoMdCalendar, IoMdCheckmarkCircle, IoMdLock, IoMdMail, IoMdStar, IoMdVideocam } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { useLang } from '../context/LanguageContext';

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userData, setUserData] = useState({ name: "User" });
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const tr = useTranslation();
  const { lang } = useLang();

  const validateUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/userDashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === "success") {
        setIsAuthorized(true);
        setUserData(response.data.data || { name: response.data.data.username });
      } else {
        setIsAuthorized(false);
      }
    } catch (e) {
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) {
      navigate("/");
    } else {
      validateUser();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#94BD1C]"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <ExpiredMembershipView />;
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-sans p-4 md:p-10 lg:p-16">
      <div className="max-w-6xl mx-auto">
        {/* HEADER SECTION */}
        <header className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-2xl md:text-4xl font-bold text-[#111111] tracking-tight">
            {tr("dashboard_welcome").split("{{name}}")[0]}
            <span className="bg-gradient-to-r from-[#94BD1C] to-[#29C28C] bg-clip-text text-transparent">{userData.username || "User"}</span>
            {tr("dashboard_welcome").split("{{name}}")[1]}
          </h1>
          <p className="text-[#666666] text-lg mt-3 font-medium max-w-2xl">
            {tr("dashboard_subtitle")}
          </p>
        </header>

        {/* CONTEXT STRIP */}
        <div className={
  `bg-white/60 backdrop-blur-md rounded-2xl p-4 mb-10 border border-white 
   flex flex-wrap items-center gap-4 
   ${lang === 'ar' ? 'justify-start' : 'justify-between'}`
}>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2">
            <IoMdStar className="text-[#94BD1C]" /> {tr("dashboard_includes")}
          </span>
          <div className="flex flex-wrap items-center gap-4">
            {[tr("dashboard_video"), tr("dashboard_session"), tr("dashboard_discount"), tr("dashboard_recognition")].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold text-[#111111] whitespace-nowrap">
                <IoMdCheckmarkCircle className="text-[#94BD1C] shrink-0" /> <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT: VIDEO CARD */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#94BD1C]/10 flex items-center justify-center text-[#94BD1C]">
                    <IoMdVideocam size={24} />
                  </div>
                  <h3 className="font-bold text-xl text-[#111111]">{tr("dashboard_message_title")}</h3>
                </div>
                <span className="bg-[#94BD1C]/10 text-[#94BD1C] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {tr("dashboard_exclusive")}
                </span>
              </div>

              <div className="relative pt-[56.25%] bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/x2jgNgPdf2k"
                  title="YouTube video player"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-8">
                <h4 className="text-2xl font-Urbanist font-bold text-[#111111] mb-4">{tr("dashboard_message_subtitle")}</h4>
                <p className="text-[#666666] font-Urbanist leading-relaxed text-base">
                  {tr("dashboard_message_body")}
                </p>

                <div className="flex items-center gap-2 mt-8 py-3 px-4 bg-gray-50 rounded-xl w-fit">
                  <IoMdLock className="text-[#94BD1C]" size={16} />
                  <p className="font-Urbanist text-[11px] md:text-xs font-bold tracking-wide text-gray-500 uppercase">
                    {tr("dashboard_message_notice")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: 1:1 CALL CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center sticky top-10">
              <div className="w-16 h-16 bg-[#94BD1C]/10 rounded-2xl flex items-center justify-center mb-6 text-[#94BD1C]">
                <IoMdCalendar size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#111111] mb-3">{tr("dashboard_book_session")}</h3>
              <p className="text-gray-500 text-sm font-Urbanist mb-8 px-2">
                {tr("dashboard_book_description")}
              </p>

              <a
                href="https://calendly.com/mahmoud-meeting/nawaya-founder-circle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#94BD1C]/20"
                style={{ background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)' }}
              >
                {tr("dashboard_schedule")}
              </a>

              <div className="mt-6 flex flex-col gap-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {tr("dashboard_availability")}
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {tr("dashboard_one_session")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER TRUST LINE */}
        <footer className="mt-16 text-center border-t border-gray-200 pt-8">
          <p className="text-[#666666]/60 text-[11px] md:text-xs font-medium italic">
            {tr("dashboard_footer")}
          </p>
        </footer>
      </div>
    </div>
  );
};

// --- THE EXPIRED / ERROR COMPONENT ---
const ExpiredMembershipView = () => {

  const t = useTranslation();

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[50px] shadow-2xl p-10 text-center border border-gray-100 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#94BD1C]/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <IoMdLock size={40} />
          </div>
          <h2 className="text-3xl font-black text-[#111111] mb-4 tracking-tight">{t("expired_access_title")}</h2>
          <p className="text-[#666666] font-medium leading-relaxed mb-8">
            {t("expired_access_description")}
          </p>
          <NavLink to="/exclusive" className="cursor-pointer">
            <button
              className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-[#94BD1C]/20 transition-all hover:scale-[1.02] active:scale-95 mb-6"
              style={{ background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)' }}
            >
              {t("expired_access_button")}
            </button>
          </NavLink>
          <div className="pt-8 border-t border-gray-50 mt-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t("expired_access_support_label")}</p>
            <div className="flex items-center justify-center gap-2 text-[#111111] font-semibold">
              <IoMdMail className="text-[#94BD1C]" size={20} />
              <a href="mailto:support@nawaya.io" className="hover:text-[#94BD1C] transition-colors">
                {t("expired_access_support_email")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;