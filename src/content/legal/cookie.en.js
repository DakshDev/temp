// ✅ src/content/legal/cookie.en.js
// Copy-paste the whole file

const cookieEN = {
  meta: {
    backToHome: "BACK TO HOME",
    lastUpdatedLabel: "Last updated",
  },

  title: "Cookie Policy",
  lastUpdated: "January 2, 2026",

  sections: [
    {
      heading: "1. What Are Cookies?",
      paragraphs: [
        "Cookies are small text files that are stored on your device when you visit a website. They help ensure basic functionality, improve performance, and provide insights into how users interact with content.",
        "We also use similar technologies such as pixels, tags, scripts, and APIs (collectively referred to as “cookies” in this policy).",
      ],
    },
    {
      heading: "2. Types of Cookies We Use",
      blocks: [
        {
          subheading: "a) Strictly Necessary Cookies",
          paragraphs: ["These cookies are required to operate the website and platform securely."],
          bullets: [
            "User authentication and login",
            "Security and fraud prevention",
            "Core platform and session functionality",
          ],
          note: "These cookies cannot be disabled.",
        },
        {
          subheading: "b) Analytics & Performance Cookies",
          paragraphs: [
            "Used to understand how users interact with the website so we can improve performance and usability.",
          ],
          bullets: ["Page views and navigation behavior", "Interaction and usage patterns", "Platform performance metrics"],
          note: "These cookies are only used with your consent where required by law.",
        },
        {
          subheading: "c) Marketing & Third-Party Cookies",
          paragraphs: [
            "With your consent, we may use third-party technologies to measure marketing effectiveness and optimize our services. These may include:",
          ],
          bullets: [
            "Google Tag Manager",
            "Google Analytics and related identifiers",
            "Meta (Facebook) Pixel and Conversion API",
            "Contentsquare for user experience analysis",
          ],
          note:
            "Some providers may process data outside the European Union using approved safeguards such as Standard Contractual Clauses.",
        },
      ],
    },
    {
      heading: "3. Managing Cookies & Consent",
      paragraphs: [
        "When you first visit our website, you can choose which cookies you allow via our cookie consent banner.",
      ],
      bullets: [
        "Non-essential cookies are disabled by default",
        "You can change or withdraw consent at any time",
        "You can also control cookies via your browser settings",
      ],
      footer: "Please note that disabling certain cookies may impact website functionality.",
    },
    {
      heading: "4. Changes to This Policy",
      paragraphs: [
        "We may update this Cookie Policy from time to time to reflect legal, technical, or operational changes. Material updates will be communicated where required.",
      ],
    },
  ],

  contactCta: {
    question: "Questions about our cookie usage?",
    email: "info@nawaya.io",
    button: "Contact Us",
  },
};

export default cookieEN;
