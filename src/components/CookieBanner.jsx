import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import { useLang } from "../context/LanguageContext";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const tr = useTranslation();
  const { lang } = useLang();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted_all");
    setVisible(false);
  };

  const rejectNonEssential = () => {
    localStorage.setItem("cookie-consent", "rejected_non_essential");
    setVisible(false);
  };

  const closePrefs = () => setShowPrefs(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pt-6"
          style={{ pointerEvents: "auto" }}
        >
          <div
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="bg-white border-t border-gray-200 shadow-xl rounded-t-3xl
                       max-w-[1400px] mx-auto p-6 md:p-8 lg:p-6
                       flex flex-auto flex-col lg:flex-row gap-6"
          >
            {/* TEXT BLOCK */}
            <div className="flex flex-col gap-2 md:gap-3 lg:flex-1 lg:max-w-full">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍪</span>
                <p className="font-semibold text-gray-800 text-base md:text-lg">
                  {tr("cookie_banner_title")}
                </p>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed md:text-[15px]">
                {tr("cookie_banner_description")}
              </p>

              <Link
                to="/cookie-policy"
                className="text-sm text-[#29C28C] underline font-medium hover:opacity-80"
              >
                {tr("cookie_banner_learn_more")}
              </Link>
            </div>

            {/* BUTTON BLOCK */}
            <div className="
              flex flex-col gap-3
              md:flex-row md:flex-wrap
              lg:flex-row lg:justify-start lg:items-center
              lg:gap-3
            ">
              <button
                onClick={rejectNonEssential}
                className="px-4 py-2 rounded-full cursor-pointer border border-gray-300 text-gray-700
                           text-sm font-medium hover:bg-gray-100 transition shrink-0"
              >
                {tr("cookie_banner_reject")}
              </button>

              <button
                onClick={() => setShowPrefs(true)}
                className="px-4 py-2 rounded-full cursor-pointer border border-[#94BD1C]
                           text-[#94BD1C] text-sm font-medium hover:bg-[#94BD1C]/10 transition shrink-0"
              >
                {tr("cookie_banner_manage")}
              </button>

              <button
                onClick={acceptAll}
                className="px-4 py-2 rounded-full cursor-pointer bg-gradient-to-r from-[#94BD1C] to-[#29C28C]
                           text-white text-sm font-semibold shadow-md hover:opacity-90 transition shrink-0"
              >
                {tr("cookie_banner_accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {showPrefs && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] backdrop-blur-sm bg-black/40 flex justify-center items-center p-4"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-900">{tr("cookie_prefs_title")}</h3>

            <p className="text-sm text-gray-600">
              {tr("cookie_prefs_description")}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>{tr("cookie_prefs_essential")}</span>
                <span className="text-gray-400 text-xs">{tr("cookie_prefs_always_on")}</span>
              </div>
              <div className="flex justify-between">
                <span>{tr("cookie_prefs_analytics")}</span>
                <input type="checkbox" className="cursor-pointer" defaultChecked />
              </div>
              <div className="flex justify-between">
                <span>{tr("cookie_prefs_advertising")}</span>
                <input type="checkbox" className="cursor-pointer" defaultChecked />
              </div>
              <div className="flex justify-between">
                <span>{tr("cookie_prefs_marketing")}</span>
                <input type="checkbox" className="cursor-pointer" defaultChecked />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={closePrefs} className="px-4 py-2 rounded-full border border-gray-300 text-sm">
                {tr("cookie_prefs_cancel")}
              </button>
              <button
                onClick={() => {
                  localStorage.setItem("cookie-consent", "custom_prefs");
                  closePrefs();
                  setVisible(false);
                }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#94BD1C] to-[#29C28C] text-white text-sm font-semibold shadow-md"
              >
                {tr("cookie_prefs_save")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;