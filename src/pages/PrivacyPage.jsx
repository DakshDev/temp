import React from "react";
import { NavLink } from "react-router-dom";
import { FaShieldAlt, FaLock, FaUserShield, FaChevronLeft } from "react-icons/fa";

import { useLang } from "../context/LanguageContext";

import privacyEN from "../content/legal/privacy.en";
import privacyDE from "../content/legal/privacy.de";
import privacyAR from "../content/legal/privacy.ar";

const highlightIconMap = {
  shield: FaShieldAlt,
  lock: FaLock,
  userShield: FaUserShield,
};

const PrivacyPage = () => {
  const { lang } = useLang();

  const privacyMap = { en: privacyEN, de: privacyDE, ar: privacyAR };
  const content = privacyMap[lang] || privacyEN;

  const isRTL = lang === "ar";

  const backLabel = content?.meta?.backToHome || "BACK TO HOME";
  const title = content?.meta?.title || "Privacy Policy";
  const lastUpdated = content?.meta?.lastUpdated || "Last Updated: January 25, 2026";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`${isRTL ? "rtl" : "ltr"} min-h-screen bg-GrayBg font-Urbanist text-textPrimary`}
    >
      {/* Header Section */}
      <header className="bg-white border-b border-gray-100 py-10 lg:py-16">
        <div className="w-[90vw] max-w-[1000px] mx-auto text-center">
          <NavLink
            to="/"
            className={`inline-flex cursor-pointer items-center gap-2 text-[#94BD1C] font-bold text-sm mb-6 transition-all ${
              isRTL ? "flex-row-reverse hover:gap-3" : "hover:gap-3"
            }`}
          >
            <FaChevronLeft className={isRTL ? "rotate-180" : ""} />
            {backLabel}
          </NavLink>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#94BD1C] to-[#29C28C] bg-clip-text text-transparent">
            {title}
          </h1>

          <p className="text-gray-500 font-medium">{lastUpdated}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-[90vw] max-w-[900px] mx-auto py-12 md:py-20">
        {/* Quick Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {(content?.highlights || []).map((h, idx) => {
            const Icon = highlightIconMap[h.icon] || FaShieldAlt;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#94BD1C] mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold mb-2">{h.title}</h3>
                <p className="text-xs text-gray-500">{h.description}</p>
              </div>
            );
          })}
        </div>

        {/* Policy Article */}
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

              {/* Fields (label/value list) */}
              {Array.isArray(sec.fields) && sec.fields.length > 0 && (
                <ul className="list-disc pl-6 space-y-1 mt-3">
                  {sec.fields.map((f, fIdx) => (
                    <li key={fIdx}>
                      <strong>{f.label}</strong> {f.value}
                    </li>
                  ))}
                </ul>
              )}

              {/* Subsections (a/b/c/...) */}
              {Array.isArray(sec.subsections) && sec.subsections.length > 0 && (
                <div className="mt-4 space-y-5">
                  {sec.subsections.map((sub, sIdx) => (
                    <div key={sIdx}>
                      <p className="font-semibold mb-1">{sub.heading}</p>

                      {Array.isArray(sub.items) && sub.items.length > 0 && (
                        <ul className="list-disc pl-6 space-y-1">
                          {sub.items.map((it, itIdx) => (
                            <li key={itIdx}>{it}</li>
                          ))}
                        </ul>
                      )}

                      {sub.text && <p className="mt-2">{sub.text}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Tools list (name + desc) */}
              {Array.isArray(sec.tools) && sec.tools.length > 0 && (
                <div className="mt-3">
                  {sec.toolsIntro && <p className="mb-2">{sec.toolsIntro}</p>}
                  <ul className="list-disc pl-6 space-y-1">
                    {sec.tools.map((t, tIdx) => (
                      <li key={tIdx}>
                        <strong>{t.name}</strong> {t.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bullets (simple list) */}
              {Array.isArray(sec.bullets) && sec.bullets.length > 0 && (
                <ul className="list-disc pl-6 space-y-2 mt-3">
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

export default PrivacyPage;
