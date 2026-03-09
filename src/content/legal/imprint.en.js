// ✅ src/content/legal/imprint.en.js
// Copy-paste the whole file

const imprintEN = {
  meta: {
    backToHome: "BACK TO HOME",
    lastUpdatedLabel: "Last updated",
  },

  title: "Imprint (Legal Notice)",
  lastUpdated: "January 2, 2026",

  infoCards: [
    {
      icon: "building",
      title: "Company",
      description: "Provider identification and contact details.",
    },
    {
      icon: "idcard",
      title: "Registered Office",
      description: "Official registered agent address (Delaware).",
    },
    {
      icon: "gavel",
      title: "Legal",
      description: "Responsible party and dispute information.",
    },
  ],

  sections: [
    {
      heading: "1. Service Provider",
      paragraphs: ["Nawaya, Inc. is the service provider for this website and the Nawaya platform."],
      fields: [
        { label: "Company name", value: "Nawaya, Inc." },
        { label: "Legal form", value: "Delaware C Corporation" },
        {
          label: "Registered office (via registered agent)",
          type: "address",
          value:
            "c/o Legalinc Corporate Services Inc.\n131 Continental Dr, Suite 305\nNewark, DE 19713\nUnited States",
        },
      ],
    },
    {
      heading: "2. Contact",
      paragraphs: ["If you have questions regarding this website or our legal pages, you can reach us at:"],
      contact: { email: "info@nawaya.io" },
    },
    {
      heading: "3. Responsible for Content",
      paragraphs: [
        "Nawaya, Inc. is responsible for the content and operation of this website, unless otherwise stated for specific third-party content.",
        "If we publish guest articles or content from other authors, their names may appear on the respective article pages.",
      ],
    },
    {
      heading: "4. Liability for Content",
      paragraphs: [
        "We make reasonable efforts to keep information on this website accurate and up to date. However, we do not guarantee completeness or accuracy. We reserve the right to change, update, or remove content at any time.",
      ],
    },
    {
      heading: "5. Liability for Links",
      paragraphs: [
        "Our website may contain links to external websites operated by third parties. We do not control those websites and are not responsible for their content. If you notice an unlawful link, please contact us and we will review it.",
      ],
    },
    {
      heading: "6. Copyright & Intellectual Property",
      paragraphs: [
        "The content, design, branding, and software on this website and platform are protected by intellectual property laws. Any use beyond what is permitted by law requires prior written consent from Nawaya, Inc. or the respective rights holder.",
      ],
    },
    {
      heading: "7. Dispute Resolution",
      paragraphs: [
        "If you have a concern, please contact us first at info@nawaya.io and we will try to resolve it quickly. Unless otherwise required by applicable law, disputes relating to the service provider information are handled under the Terms of Use.",
      ],
    },
  ],
};

export default imprintEN;
