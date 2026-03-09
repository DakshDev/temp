// ✅ src/pages/ImprintPage.jsx
// Copy-paste the whole file (same structure/behavior as Privacy + Terms)

import React from "react";
import { NavLink } from "react-router-dom";
import { FaChevronLeft, FaBuilding, FaEnvelope, FaGavel, FaIdCard } from "react-icons/fa";
import { useLang } from "../context/LanguageContext";

import imprintEN from "../content/legal/imprint.en";
import imprintDE from "../content/legal/imprint.de";
import imprintAR from "../content/legal/imprint.ar";

const iconStyleMap = {
  building: { wrap: "bg-green-50 text-[#29C28C]", Icon: FaBuilding },
  idcard: { wrap: "bg-blue-50 text-blue-600", Icon: FaIdCard },
  gavel: { wrap: "bg-orange-50 text-orange-500", Icon: FaGavel },
};

const ImprintPage = () => {
  const { lang } = useLang();

  const imprintMap = { en: imprintEN, de: imprintDE, ar: imprintAR };
  const content = imprintMap[lang] || imprintEN;

  const isRTL = lang === "ar";

  const backToHome = content?.meta?.backToHome || "BACK TO HOME";
  const lastUpdatedLabel = content?.meta?.lastUpdatedLabel || "Last updated";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`${isRTL ? "rtl" : "ltr"} min-h-screen bg-GrayBg font-Urbanist text-textPrimary`}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-10 lg:py-16 text-center">
        <div className="w-[90vw] max-w-[1000px] mx-auto">
          <NavLink
            to="/"
            className={`inline-flex items-center cursor-pointer gap-2 text-[#94BD1C] font-bold text-sm mb-6 transition-all ${
              isRTL ? "flex-row-reverse hover:gap-3" : "hover:gap-3"
            }`}
          >
            <FaChevronLeft className={isRTL ? "rotate-180" : ""} />
            {backToHome}
          </NavLink>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-[1.2] pb-2 bg-gradient-to-r from-[#94BD1C] to-[#29C28C] bg-clip-text text-transparent">
            {content.title}
          </h1>

          <p className="text-gray-500 font-medium italic">
            {lastUpdatedLabel}: {content.lastUpdated}
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="w-[90vw] max-w-[900px] mx-auto py-12 md:py-20">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {(content.infoCards || []).map((card, idx) => {
            const preset = iconStyleMap[card.icon] || iconStyleMap.building;
            const Icon = preset.Icon;

            return (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto ${preset.wrap}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-center mb-2">{card.title}</h3>
                <p className="text-xs text-center text-gray-500 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* Sections */}
        <article className="space-y-12 text-sm md:text-base leading-relaxed text-gray-700">
          {(content.sections || []).map((sec, idx) => (
            <section key={idx}>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#94BD1C] pl-4 rtl:pl-0 rtl:pr-4">
                {sec.heading}
              </h2>

              {sec.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className={pIdx === 0 ? "" : "mt-4"}>
                  {p}
                </p>
              ))}

              {/* Key/Value fields (e.g., company details) */}
              {sec.fields?.length ? (
                <div className="space-y-2 mt-4">
                  {sec.fields.map((f, fIdx) => {
                    const lines = String(f.value || "").split("\n");
                    const showBuilding =
                      (f.type && f.type === "address") ||
                      (f.label || "").toLowerCase().includes("registered office") ||
                      (f.label || "").toLowerCase().includes("registered agent");

                    return (
                      <div key={fIdx} className={showBuilding ? "flex items-start gap-3" : ""}>
                        {showBuilding ? (
                          <>
                            <span className="mt-1 text-[#29C28C]">
                              <FaBuilding />
                            </span>
                            <div>
                              <div className="font-semibold">{f.label}</div>
                              <div className="mt-1">
                                {lines.map((line, i) => (
                                  <div key={i}>{line}</div>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <p>
                            <span className="font-semibold">{f.label}:</span> {f.value}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {/* Contact */}
              {sec.contact?.email ? (
  <p
    className={`flex items-center gap-3 mt-4 ${
      isRTL ? "flex-row-reverse justify-end text-right" : ""
    }`}
  >
    <span className="text-[#29C28C]">
      <FaEnvelope />
    </span>

    {/* Email must stay LTR */}
    <a
      dir="ltr"
      className="font-semibold underline"
      href={`mailto:${sec.contact.email}`}
    >
      {sec.contact.email}
    </a>
  </p>
) : null}

            </section>
          ))}
        </article>
      </main>
    </div>
  );
};

export default ImprintPage;
