import React from "react";
import { NavLink } from "react-router-dom";
import { FaGavel, FaBan, FaCheckCircle, FaChevronLeft } from "react-icons/fa";

import { useLang } from "../context/LanguageContext";

import termsEN from "../content/legal/terms.en";
import termsDE from "../content/legal/terms.de";
import termsAR from "../content/legal/terms.ar";

const principleIconMap = {
  check: FaCheckCircle,
  ban: FaBan,
  gavel: FaGavel,
};

const TermPage = () => {
  const { lang } = useLang();

  const termsMap = { en: termsEN, de: termsDE, ar: termsAR };
  const content = termsMap[lang] || termsEN;

  const isRTL = lang === "ar";

  const backLabel = content?.meta?.backToHome || "BACK TO HOME";
  const title = content?.meta?.title || "Terms and Conditions";
  const lastUpdated = content?.meta?.lastUpdated || "Last updated: January 2, 2026";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`${isRTL ? "rtl" : "ltr"} min-h-screen bg-GrayBg font-Urbanist text-textPrimary`}
    >
      {/* Header Section */}
      <header className="bg-white border-b border-gray-100 py-10 lg:py-16 text-center">
        <div className="w-[90vw] max-w-[1000px] mx-auto">
          <NavLink
            to="/"
            className={`inline-flex items-center cursor-pointer gap-2 text-[#94BD1C] font-bold text-sm mb-6 transition-all ${
              isRTL ? "flex-row-reverse hover:gap-3" : "hover:gap-3"
            }`}
          >
            <FaChevronLeft className={isRTL ? "rotate-180" : ""} />
            {backLabel}
          </NavLink>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#94BD1C] to-[#29C28C] bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-gray-500 font-medium italic">{lastUpdated}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-[90vw] max-w-[900px] mx-auto py-12 md:py-20">
        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {(content?.principles || []).map((p, idx) => {
            const Icon = principleIconMap[p.icon] || FaCheckCircle;

            // Optional per-card accent
            const wrapClass =
              p.accent === "red"
                ? "bg-red-50 text-red-500"
                : p.accent === "orange"
                ? "bg-orange-50 text-orange-500"
                : "bg-blue-50 text-[#29C28C]";

            return (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto ${wrapClass}`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-center mb-2">{p.title}</h3>
                <p className="text-xs text-center text-gray-500 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>

        {/* Legal Sections */}
        <article className="space-y-12 text-sm md:text-base leading-relaxed text-gray-700">
          {(content?.sections || []).map((sec, idx) => (
            <section key={idx}>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#94BD1C] pl-4 rtl:pl-0 rtl:pr-4">
                {sec.title}
              </h2>

              {/* Paragraphs */}
              {(sec.paragraphs || []).map((p, pIdx) => (
                <p key={pIdx} className={pIdx === 0 ? "mb-3" : "mb-2"}>
                  {p}
                </p>
              ))}

              {/* Bullets */}
              {Array.isArray(sec.bullets) && sec.bullets.length > 0 && (
                <ul className="list-disc pl-6 space-y-2">
                  {sec.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}

              {/* Note */}
              {sec.note && <p className="mt-3">{sec.note}</p>}
            </section>
          ))}
        </article>
      </main>
    </div>
  );
};

export default TermPage;
