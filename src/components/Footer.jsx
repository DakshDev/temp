import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import { FaTiktok, FaYoutube, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import footerIcon from "../assets/General/footer-icon.png"
import JoinWaitlist_Btn from "./JoinWaitlist_Btn";
import { Link, useLocation } from 'react-router-dom'; // Added useLocation
import { useTranslation } from '../hooks/useTranslation';
import { useLang } from '../context/LanguageContext';
import { t } from '../i18n';

// --- DESIGN CONSTANTS ---
const BG_DARK = '#131416';
const TEXT_GRAY = '#9FA7B1';
const TEXT_WHITE = '#FFFFFF';
const PRIMARY_GREEN = '#00C29F';

const Footer = () => {
  const location = useLocation();
  const isGuidePage = location.pathname === '/guide';
  const isBlogArea = location.pathname.startsWith('/blog') || location.pathname.startsWith('/blog') || location.pathname.startsWith('/author');

  const tr = useTranslation()
  const { lang } = useLang()

  const trEffective = isBlogArea ? (key) => t(key, 'en') : tr;

  const linkColumns = [
  {
    title: trEffective("footer_links_title"),
    // Note: link key modified to only hold the ID
    links: [
      { text: trEffective("footer_links_how"), id: "how_it_works" },
      { text: trEffective("footer_links_features"), id: "features" },
      { text: trEffective("footer_links_faq"), id: "faq" }
    ],
  },
  {
    title: trEffective("footer_legal_title"),
    links: [
      { text: trEffective("footer_legal_privacy"), link: "/privacy-policy" },
      { text: trEffective("footer_legal_terms"), link: "/terms-of-use" },
      { text: trEffective("footer_legal_cookie"), link: "/cookie-policy" },
      { text: trEffective("footer_legal_imprint"), link: "/imprint" }
    ],
  },
  {
    title: trEffective("footer_social_title"),
    email: "hello@nawaya.io",
    links: [
      { Icon: FaTiktok, name: 'Tik Tok', link: "https://www.tiktok.com/@nawaya.io" },
      { Icon: Instagram, name: 'Instagram', link: "https://www.instagram.com/nawaya.growth" },
      { Icon: Linkedin, name: 'LinkedIn', link: "https://www.linkedin.com/company/nawaya-app" },
      { Icon: FaXTwitter, name: 'X', link: "https://x.com/nawaya_growth" },
      { Icon: FaYoutube, name: 'YouTube', link: "https://www.youtube.com/@nawaya-growth" },
      { Icon: FaWhatsapp, name: 'WhatsApp', link: "https://chat.whatsapp.com/EjShBNZDlcAKFjqOIZURRC" },
    ]
  },
];

  return (
    <footer dir={isBlogArea ? 'ltr' : undefined} className="font-sans pt-16 pb-8" style={{ backgroundColor: BG_DARK, color: TEXT_WHITE }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">

          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={footerIcon} alt="Nawaya Logo" />
              <p className="text-md text-white font-Urbanist leading-relaxed">{trEffective("footer_tagline")}</p>
            </div>
            <p style={{ color: TEXT_GRAY }} className="text-sm rtl:text-lg font-Urbanist leading-relaxed mb-6 max-w-sm">
              {trEffective("footer_description")}
            </p>

            <div className="w-fit mt-6 relative z-10">
              <JoinWaitlist_Btn label={trEffective("btn_join_waitlist")} />
            </div>
          </div>

          {/* Columns 2 & 3: Link Sections */}
          {linkColumns.slice(0, 2).map((column, idx) => (
            <div key={idx} className="lg:col-span-1">
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, i) => {
                  // DYNAMIC LINK LOGIC:
                  // If it's the "Links" column (idx 0), apply the # vs /# logic
                  const isScrollLink = idx === 0;
                  const finalHref = isScrollLink
                    ? (isGuidePage ? `#${link.id}` : `/#${link.id}`)
                    : link.link;

                  return (
                    <li key={i}>
                      <a
                        href={finalHref}
                        className="text-sm text-white hover:text-[#00C29F] transition-colors"
                      >
                        {link.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Social Section */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">
              {linkColumns[2].title}
            </h4>
            <a href={`mailto:${linkColumns[2].email}`} className="hover:text-[#00C29F] transition-colors">
              <p className="text-sm">{linkColumns[2].email}</p>
            </a>
            <div className="flex gap-3 md:gap-4 pt-4">
              {linkColumns[2].links.map((item, idx) => {
                const IconComponent = item.Icon;
                return (
                  <a key={idx} href={item.link} target='_blank' rel="noopener noreferrer" className="text-white hover:text-[#00C29F] transition-colors">
                    <IconComponent size={20} className="md:w-6 md:h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT SECTION */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-center">
          <p className="text-sm font-Urbanist" style={{ color: TEXT_GRAY }}>
            {trEffective("footer_copy")}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
