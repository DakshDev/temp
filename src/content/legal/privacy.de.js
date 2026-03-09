const privacyDE = {
  meta: {
    backToHome: "ZURÜCK ZUR STARTSEITE",
    title: "Datenschutzerklärung",
    lastUpdated: "Zuletzt aktualisiert: 25. Januar 2026",
  },

  highlights: [
    { icon: "shield", title: "Datenschutz", description: "Wir schützen deine Daten und respektieren deine Privatsphäre." },
    { icon: "lock", title: "Sicherer Zugriff", description: "Dein Login und deine Identität bleiben geschützt." },
    { icon: "userShield", title: "Deine Kontrolle", description: "Du kontrollierst Sichtbarkeit und Datenanfragen." },
  ],

  sections: [
    {
      title: "1. Wer wir sind",
      paragraphs: [
        "Nawaya, Inc. („Nawaya“, „wir“, „uns“ oder „unser“) respektiert deine Privatsphäre und verpflichtet sich zum Schutz deiner personenbezogenen Daten. Diese Datenschutzerklärung erläutert, wie wir personenbezogene Informationen erheben, verwenden, speichern und schützen, wenn du unsere Website, Plattform und Services nutzt.",
      ],
      fields: [
        { label: "Unternehmensname:", value: "Nawaya, Inc." },
        { label: "Rechtsform:", value: "Delaware C Corporation" },
        {
          label: "Adresse:",
          value:
            "c/o Legalinc Corporate Services Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, United States",
        },
        { label: "Kontakt-E-Mail:", value: "info@nawaya.io" },
      ],
      note:
        "Obwohl Nawaya in den USA gegründet ist, bieten wir unsere Services international an und erfüllen – soweit erforderlich – die Vorgaben der EU-Datenschutz-Grundverordnung (DSGVO) sowie anderer anwendbarer Datenschutzgesetze.",
    },

    {
      title: "2. Welche Daten wir erheben",
      paragraphs: ["Wir erheben folgende Kategorien personenbezogener Daten:"],
      subsections: [
        {
          heading: "a) Konto- & Profildaten",
          items: ["Name", "E-Mail-Adresse", "Benutzername", "Profilinformationen", "Einstellungen und Präferenzen"],
        },
        {
          heading: "b) Nutzergenerierte Inhalte",
          items: ["Journale & Reflexionen", "Uploads", "Kommentare & Interaktionen innerhalb der Plattform"],
        },
        {
          heading: "c) Nutzungs- & technische Daten",
          items: ["IP-Adresse", "Geräte- und Browserdaten", "Logfiles", "Nutzungsmuster und Interaktionsdaten"],
        },
        {
          heading: "d) Zahlungs- & Transaktionsdaten",
          text:
            "Zahlungen werden über Drittanbieter (z. B. Stripe) abgewickelt. Wir speichern keine vollständigen Kreditkartendaten. Transaktionsbezogene Metadaten (z. B. Zahlungsstatus, Zeitstempel) können zu Buchhaltungs- und rechtlichen Zwecken gespeichert werden.",
        },
      ],
    },

    {
      title: "3. Wie wir deine Daten nutzen",
      bullets: [
        "Zur Bereitstellung und zum Betrieb der Plattform und ihrer Funktionen",
        "Zur Erstellung und Verwaltung von Nutzerkonten",
        "Zur Ermöglichung von Journaling, Content-Erstellung sowie Teilnahme an Sessions oder Programmen",
        "Zur Verbesserung unserer Services, Funktionen und Nutzererfahrung",
        "Zur Kommunikation von servicebezogenen Updates und wichtigen Informationen",
        "Zur Zahlungsabwicklung und Verwaltung von Abos oder Zugriffsrechten",
        "Zur Sicherstellung der Plattform-Sicherheit, Missbrauchsprävention und Betrugserkennung",
        "Zur Erfüllung gesetzlicher und regulatorischer Pflichten",
      ],
    },

    {
      title: "4. Rechtsgrundlagen der Verarbeitung (DSGVO)",
      paragraphs: [
        "Wir verarbeiten personenbezogene Daten nur, wenn dies gesetzlich erlaubt ist. Je nach Kontext stützt sich die Verarbeitung auf eine oder mehrere der folgenden Rechtsgrundlagen nach Art. 6 DSGVO:",
      ],
      bullets: [
        "Vertragserfüllung – wenn die Verarbeitung zur Bereitstellung unserer Services erforderlich ist",
        "Einwilligung – insbesondere für Analytics, Marketing und optionale Features",
        "Berechtigte Interessen – z. B. Plattform-Sicherheit, Service-Verbesserung und effiziente Abläufe",
        "Rechtliche Verpflichtungen – wenn die Verarbeitung zur Einhaltung von Gesetzen erforderlich ist",
      ],
      note: "Du kannst eine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.",
    },

    {
      title: "5. Cookies & Analysen",
      paragraphs: [
        "Wir verwenden Cookies und ähnliche Technologien, um unsere Website zu betreiben, die Nutzung zu analysieren und die Performance zu verbessern. Nicht notwendige Cookies und Tracking-Technologien setzen wir nur mit deiner ausdrücklichen Einwilligung ein.",
        "Abhängig von deinen Einwilligungs-Einstellungen können wir folgende Tools nutzen:",
      ],
      tools: [
        { name: "Google Tag Manager:", desc: "zur Verwaltung und Ausspielung von Website-Tags." },
        { name: "Google Analytics / Google-Identifikatoren:", desc: "zur Analyse von Nutzung und Performance." },
        { name: "Meta (Facebook) Pixel & Conversion API:", desc: "zur Messung von Werbewirkung und Conversions." },
        { name: "Contentsquare:", desc: "zur Analyse des Nutzerverhaltens und Verbesserung der Usability." },
      ],
      note:
        "Diese Tools können Informationen wie IP-Adresse, Gerätedaten, besuchte Seiten, Interaktionsmuster und Event-Daten erfassen. Details zu Cookies, Anbietern, Zwecken und Speicherdauern findest du in unserer Cookie-Richtlinie. Du kannst deine Einwilligung jederzeit über die Cookie-Einstellungen auf unserer Website anpassen oder widerrufen.",
    },

    {
      title: "6. Weitergabe von Daten",
      paragraphs: ["Wir geben personenbezogene Daten nur weiter, wenn dies erforderlich und rechtlich zulässig ist, z. B. an:"],
      bullets: [
        "Infrastruktur- und Hosting-Anbieter",
        "Zahlungsdienstleister (z. B. Stripe)",
        "Analyse- und Optimierungsanbieter (z. B. Google, Meta, Contentsquare)",
        "Behörden, sofern eine gesetzliche Verpflichtung zur Offenlegung besteht",
      ],
      note:
        "Alle Dienstleister verarbeiten Daten in unserem Auftrag und – soweit erforderlich – auf Grundlage geeigneter Auftragsverarbeitungsverträge.",
    },

    {
      title: "7. Internationale Datenübermittlungen",
      paragraphs: [
        "Deine personenbezogenen Daten können auch außerhalb deines Wohnsitzlandes verarbeitet werden, einschließlich in den USA. Soweit nach DSGVO erforderlich, nutzen wir geeignete Garantien wie Standardvertragsklauseln (SCCs) oder andere anerkannte Übermittlungsmechanismen, um ein angemessenes Datenschutzniveau sicherzustellen.",
      ],
    },

    {
      title: "8. Speicherdauer",
      paragraphs: [
        "Wir speichern personenbezogene Daten nur so lange, wie es für die in dieser Datenschutzerklärung beschriebenen Zwecke erforderlich ist – einschließlich Leistungserbringung, gesetzlicher Pflichten und Streitbeilegung.",
        "Kontodaten werden in der Regel für die Dauer deines Kontos gespeichert. Bestimmte Daten können länger gespeichert werden, wenn dies gesetzlich vorgeschrieben ist (z. B. buchhalterische oder Compliance-Pflichten).",
        "Du kannst jederzeit die Löschung deiner Daten verlangen – vorbehaltlich gesetzlicher Aufbewahrungspflichten.",
      ],
    },

    {
      title: "9. Deine Rechte",
      paragraphs: ["Unter der DSGVO hast du folgende Rechte:"],
      bullets: [
        "Auskunft über personenbezogene Daten",
        "Berichtigung unrichtiger oder unvollständiger Daten",
        "Löschung deiner Daten",
        "Einschränkung der Verarbeitung",
        "Datenübertragbarkeit",
        "Widerspruch gegen die Verarbeitung",
        "Widerruf einer Einwilligung jederzeit",
      ],
      note:
        "Zur Ausübung deiner Rechte kontaktiere uns unter info@nawaya.io. Du hast außerdem das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren – insbesondere in deinem Wohnsitzland oder am Ort des mutmaßlichen Verstoßes.",
    },

    {
      title: "10. Sicherheit",
      paragraphs: [
        "Wir setzen angemessene organisatorische und technische Maßnahmen ein, um personenbezogene Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen. Dennoch ist kein System vollständig sicher, und wir können keine absolute Sicherheit garantieren.",
      ],
    },

    {
      title: "11. Änderungen dieser Richtlinie",
      paragraphs: [
        "Wir können diese Datenschutzerklärung gelegentlich aktualisieren. Wesentliche Änderungen teilen wir über die Plattform oder auf anderem geeigneten Weg mit.",
      ],
    },
  ],
};

export default privacyDE;
