import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const SUPPORTED_LANGS = ["en", "ar", "de"];

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    const isRTL = lang === "ar";

    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    document.documentElement.classList.toggle("rtl", isRTL);
    document.documentElement.classList.toggle("ltr", !isRTL);
    document.documentElement.classList.toggle("lang-ar", isRTL);
  }, [lang]);

  const changeLang = (next) => {
    if (SUPPORTED_LANGS.includes(next)) {
      setLang(next);
      localStorage.setItem("lang", next);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);