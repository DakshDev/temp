import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronLeft } from "react-icons/fa";
import { useLang } from "../context/LanguageContext";

import cookieEN from "../content/legal/cookie.en";
import cookieDE from "../content/legal/cookie.de";
import cookieAR from "../content/legal/cookie.ar";

const CookiePolicy = () => {
  const { lang } = useLang();

  const cookieMap = { en: cookieEN, de: cookieDE, ar: cookieAR };
  const content = cookieMap[lang] || cookieEN;

  const isRTL = lang === "ar";

  const backToHome = content?.meta?.backToHome || "BACK TO HOME";
  const lastUpdatedLabel = content?.meta?.lastUpdatedLabel || "Last updated";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`${isRTL ? "rtl" : "ltr"} min-h-screen bg-GrayBg font-Urbanist text-[#444]`}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-10 lg:py-16 text-center">
        <div className="w-[90vw] max-w-[1000px] mx-auto">
          {/* Back to Home (translated + RTL-safe) */}
          <NavLink
            to="/"
            className={`inline-flex items-center cursor-pointer gap-2 text-[#94BD1C] font-bold text-sm mb-6 transition-all ${
              isRTL ? "flex-row-reverse hover:gap-3" : "hover:gap-3"
            }`}
          >
            <FaChevronLeft className={isRTL ? "rotate-180" : ""} />
            {backToHome}
          </NavLink>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] pb-1 bg-gradient-to-r from-[#AABD05] to-[#0CBF95] bg-clip-text text-transparent mb-4">
              {content.title}
            </h1>

            <p className="text-gray-500 font-medium italic">
              {lastUpdatedLabel}: {content.lastUpdated}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main */}
      <main className="w-[90vw] max-w-[900px] mx-auto py-12 md:py-20">
        <article className="space-y-12 text-sm md:text-base leading-relaxed text-gray-700">
          {(content.sections || []).map((s, idx) => (
            <section key={idx}>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#94BD1C] pl-4 rtl:pl-0 rtl:pr-4">
                {s.heading}
              </h2>

              {s.paragraphs?.map((p, i) => (
                <p key={i} className={i === 0 ? "" : "mt-4"}>
                  {p}
                </p>
              ))}

              {/* Special layout for Section 2: a/b cards + c card */}
              {idx === 1 && s.blocks?.length ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {/* a) */}
                    {s.blocks[0] ? (
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-[#94BD1C] mb-2">{s.blocks[0].subheading}</h3>
                        {s.blocks[0].paragraphs?.[0] ? (
                          <p className="text-sm text-gray-600">{s.blocks[0].paragraphs[0]}</p>
                        ) : null}
                        {s.blocks[0].bullets?.length ? (
                          <ul className="list-disc pl-6 space-y-1 text-sm mt-3 text-gray-700">
                            {s.blocks[0].bullets.map((item, j) => (
                              <li key={j}>{item}</li>
                            ))}
                          </ul>
                        ) : null}
                        {s.blocks[0].note ? <p className="text-xs text-gray-500 mt-3">{s.blocks[0].note}</p> : null}
                      </div>
                    ) : null}

                    {/* b) */}
                    {s.blocks[1] ? (
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-[#29C28C] mb-2">{s.blocks[1].subheading}</h3>
                        {s.blocks[1].paragraphs?.[0] ? (
                          <p className="text-sm text-gray-600">{s.blocks[1].paragraphs[0]}</p>
                        ) : null}
                        {s.blocks[1].bullets?.length ? (
                          <ul className="list-disc pl-6 space-y-1 text-sm mt-3 text-gray-700">
                            {s.blocks[1].bullets.map((item, j) => (
                              <li key={j}>{item}</li>
                            ))}
                          </ul>
                        ) : null}
                        {s.blocks[1].note ? <p className="text-xs text-gray-500 mt-3">{s.blocks[1].note}</p> : null}
                      </div>
                    ) : null}
                  </div>

                  {/* c) */}
                  {s.blocks[2] ? (
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mt-6">
                      <h3 className="font-bold text-gray-900 mb-2">{s.blocks[2].subheading}</h3>
                      {s.blocks[2].paragraphs?.[0] ? (
                        <p className="text-sm text-gray-600">{s.blocks[2].paragraphs[0]}</p>
                      ) : null}
                      {s.blocks[2].bullets?.length ? (
                        <ul className="list-disc pl-6 space-y-1 text-sm mt-3 text-gray-700">
                          {s.blocks[2].bullets.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                      {s.blocks[2].note ? <p className="text-xs text-gray-500 mt-3">{s.blocks[2].note}</p> : null}
                    </div>
                  ) : null}
                </>
              ) : null}

              {/* Generic blocks for other sections */}
              {idx !== 1 &&
                s.blocks?.map((b, bi) => (
                  <div key={bi} className={bi === 0 ? "mt-6" : "mt-6"}>
                    {b.subheading ? <h3 className="font-bold text-gray-900 mb-2">{b.subheading}</h3> : null}

                    {b.paragraphs?.map((pp, pi) => (
                      <p
                        key={pi}
                        className={pi === 0 ? "text-sm text-gray-600" : "text-sm text-gray-600 mt-3"}
                      >
                        {pp}
                      </p>
                    ))}

                    {b.bullets?.length ? (
                      <ul className="list-disc pl-6 space-y-1 text-sm mt-3 text-gray-700">
                        {b.bullets.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    ) : null}

                    {b.note ? <p className="text-xs text-gray-500 mt-3">{b.note}</p> : null}
                  </div>
                ))}

              {s.bullets?.length ? (
                <ul className="list-disc pl-6 space-y-1 text-sm mt-3 text-gray-700">
                  {s.bullets.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {s.footer ? <p className="text-sm mt-3 text-gray-600">{s.footer}</p> : null}
            </section>
          ))}

          {/* Contact */}
          <section className="text-center pt-8 border-t border-gray-200">
            <p className="mb-6 text-gray-700">{content.contactCta.question}</p>
            <a
              href={`mailto:${content.contactCta.email}`}
              className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#AABD05] to-[#0CBF95] text-white font-bold shadow-lg active:scale-95 transition-transform"
            >
              {content.contactCta.button}
            </a>
          </section>
        </article>
      </main>
    </div>
  );
};

export default CookiePolicy;
