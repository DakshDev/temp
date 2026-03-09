// ✅ src/content/legal/imprint.de.js
// Copy-paste the whole file

const imprintDE = {
  meta: {
    backToHome: "ZUR STARTSEITE",
    lastUpdatedLabel: "Zuletzt aktualisiert",
  },

  title: "Impressum",
  lastUpdated: "25. Januar 2026",

  infoCards: [
    {
      icon: "building",
      title: "Unternehmen",
      description: "Anbieterinformationen und Kontaktdaten.",
    },
    {
      icon: "idcard",
      title: "Sitz / Registered Office",
      description: "Adresse des Registered Agents (Delaware).",
    },
    {
      icon: "gavel",
      title: "Rechtliches",
      description: "Verantwortlichkeit und Hinweis zu Streitfällen.",
    },
  ],

  sections: [
    {
      heading: "1. Anbieterkennzeichnung",
      paragraphs: ["Nawaya, Inc. ist der Anbieter für diese Website und die Nawaya-Plattform."],
      fields: [
        { label: "Firmenname", value: "Nawaya, Inc." },
        { label: "Rechtsform", value: "Delaware C Corporation" },
        {
          label: "Sitz (über Registered Agent)",
          type: "address",
          value:
            "c/o Legalinc Corporate Services Inc.\n131 Continental Dr, Suite 305\nNewark, DE 19713\nVereinigte Staaten",
        },
      ],
    },
    {
      heading: "2. Kontakt",
      paragraphs: ["Bei Fragen zu dieser Website oder unseren rechtlichen Seiten erreichst du uns unter:"],
      contact: { email: "info@nawaya.io" },
    },
    {
      heading: "3. Verantwortlich für Inhalte",
      paragraphs: [
        "Nawaya, Inc. ist für Inhalte und Betrieb dieser Website verantwortlich, sofern für bestimmte Inhalte nicht ausdrücklich ein Drittanbieter genannt wird.",
        "Wenn wir Gastbeiträge oder Inhalte anderer Autor:innen veröffentlichen, können deren Namen auf den jeweiligen Seiten erscheinen.",
      ],
    },
    {
      heading: "4. Haftung für Inhalte",
      paragraphs: [
        "Wir bemühen uns, die Inhalte dieser Website korrekt und aktuell zu halten. Eine Gewähr für Vollständigkeit und Richtigkeit übernehmen wir jedoch nicht. Inhalte können jederzeit geändert, aktualisiert oder entfernt werden.",
      ],
    },
    {
      heading: "5. Haftung für Links",
      paragraphs: [
        "Unsere Website kann Links zu externen Websites Dritter enthalten. Auf deren Inhalte haben wir keinen Einfluss und übernehmen dafür keine Verantwortung. Wenn du einen rechtswidrigen Link bemerkst, kontaktiere uns bitte – wir prüfen den Hinweis.",
      ],
    },
    {
      heading: "6. Urheberrecht & Geistiges Eigentum",
      paragraphs: [
        "Inhalte, Design, Branding und Software dieser Website/Plattform sind durch Gesetze zum geistigen Eigentum geschützt. Jede Nutzung über die gesetzlich erlaubte hinaus bedarf der vorherigen schriftlichen Zustimmung von Nawaya, Inc. bzw. der jeweiligen Rechteinhaber.",
      ],
    },
    {
      heading: "7. Streitbeilegung",
      paragraphs: [
        "Wenn du ein Anliegen hast, kontaktiere uns bitte zuerst unter info@nawaya.io – wir versuchen, es schnell zu lösen. Soweit nicht zwingendes Recht etwas anderes vorsieht, werden Streitigkeiten zur Anbieterinformation gemäß den Nutzungsbedingungen behandelt.",
      ],
    },
  ],
};

export default imprintDE;
