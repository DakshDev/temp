// ✅ src/content/legal/cookie.de.js
// Copy-paste the whole file

const cookieDE = {
  meta: {
    backToHome: "ZUR STARTSEITE",
    lastUpdatedLabel: "Zuletzt aktualisiert",
  },

  title: "Cookie-Richtlinie",
  lastUpdated: "2. Januar 2026",

  sections: [
    {
      heading: "1. Was sind Cookies?",
      paragraphs: [
        "Cookies sind kleine Textdateien, die beim Besuch einer Website auf deinem Gerät gespeichert werden. Sie helfen, grundlegende Funktionen sicherzustellen, die Leistung zu verbessern und Einblicke zu gewinnen, wie Nutzer:innen mit Inhalten interagieren.",
        "Wir verwenden außerdem ähnliche Technologien wie Pixel, Tags, Skripte und APIs (in dieser Richtlinie zusammenfassend als „Cookies“ bezeichnet).",
      ],
    },
    {
      heading: "2. Welche Arten von Cookies verwenden wir?",
      blocks: [
        {
          subheading: "a) Unbedingt erforderliche Cookies",
          paragraphs: ["Diese Cookies sind notwendig, um die Website und Plattform sicher zu betreiben."],
          bullets: [
            "Nutzer-Authentifizierung und Login",
            "Sicherheit und Betrugsprävention",
            "Zentrale Plattform- und Sitzungsfunktionen",
          ],
          note: "Diese Cookies können nicht deaktiviert werden.",
        },
        {
          subheading: "b) Analyse- & Performance-Cookies",
          paragraphs: [
            "Diese Cookies helfen uns zu verstehen, wie Nutzer:innen mit der Website interagieren, damit wir Leistung und Bedienbarkeit verbessern können.",
          ],
          bullets: ["Seitenaufrufe und Navigationsverhalten", "Interaktions- und Nutzungsmuster", "Leistungskennzahlen der Plattform"],
          note: "Diese Cookies werden – sofern gesetzlich erforderlich – nur mit deiner Einwilligung eingesetzt.",
        },
        {
          subheading: "c) Marketing- & Drittanbieter-Cookies",
          paragraphs: [
            "Mit deiner Einwilligung können wir Technologien von Drittanbietern verwenden, um die Wirksamkeit unseres Marketings zu messen und unsere Services zu optimieren. Dazu können gehören:",
          ],
          bullets: [
            "Google Tag Manager",
            "Google Analytics und zugehörige Kennungen",
            "Meta (Facebook) Pixel und Conversion API",
            "Contentsquare zur Analyse der Nutzererfahrung",
          ],
          note:
            "Einige Anbieter verarbeiten Daten ggf. außerhalb der Europäischen Union unter Verwendung geeigneter Garantien (z. B. Standardvertragsklauseln).",
        },
      ],
    },
    {
      heading: "3. Cookies verwalten & Einwilligung",
      paragraphs: [
        "Beim ersten Besuch unserer Website kannst du über unser Cookie-Banner auswählen, welche Cookies du zulassen möchtest.",
      ],
      bullets: [
        "Nicht essenzielle Cookies sind standardmäßig deaktiviert",
        "Du kannst deine Einwilligung jederzeit ändern oder widerrufen",
        "Du kannst Cookies auch über die Einstellungen deines Browsers steuern",
      ],
      footer: "Bitte beachte: Das Deaktivieren bestimmter Cookies kann die Funktionalität der Website beeinträchtigen.",
    },
    {
      heading: "4. Änderungen dieser Richtlinie",
      paragraphs: [
        "Wir können diese Cookie-Richtlinie gelegentlich aktualisieren, um rechtliche, technische oder betriebliche Änderungen abzubilden. Wesentliche Änderungen teilen wir – sofern erforderlich – mit.",
      ],
    },
  ],

  contactCta: {
    question: "Fragen zu unserer Cookie-Nutzung?",
    email: "info@nawaya.io",
    button: "Kontakt aufnehmen",
  },
};

export default cookieDE;
