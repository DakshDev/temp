const privacyEN = {
  meta: {
    backToHome: "BACK TO HOME",
    title: "Privacy Policy",
    lastUpdated: "Last Updated: January 25, 2026",
  },

  highlights: [
    { icon: "shield", title: "Data Protection", description: "We protect your data and ensure privacy." },
    { icon: "lock", title: "Safe Access", description: "Your login and identity are kept secure." },
    { icon: "userShield", title: "User Control", description: "You control visibility and data requests." },
  ],

  sections: [
    {
      title: "1. Who We Are",
      paragraphs: [
        "Nawaya, Inc. (“Nawaya”, “we”, “us”, or “our”) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect personal information when you use our website, platform, and services.",
      ],
      fields: [
        { label: "Company name:", value: "Nawaya, Inc." },
        { label: "Legal form:", value: "Delaware C Corporation" },
        {
          label: "Address:",
          value:
            "c/o Legalinc Corporate Services Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, United States",
        },
        { label: "Contact email:", value: "info@nawaya.io" },
      ],
      note:
        "Although Nawaya is incorporated in the United States, we offer our services internationally and comply with the EU General Data Protection Regulation (GDPR) and other applicable data-protection laws where required.",
    },

    {
      title: "2. Data We Collect",
      paragraphs: ["We collect the following categories of personal data:"],
      subsections: [
        {
          heading: "a) Account & Profile Data",
          items: ["Name", "Email address", "Username", "Profile information", "Preferences and settings"],
        },
        {
          heading: "b) User-Generated Content",
          items: ["Journals & reflections", "Uploads", "Comments & interactions within the platform"],
        },
        {
          heading: "c) Usage & Technical Data",
          items: ["IP address", "Device and browser information", "Log files", "Usage patterns and interaction data"],
        },
        {
          heading: "d) Payment & Transaction Data",
          text:
            "Payments are processed by third-party payment providers (e.g. Stripe). We do not store full payment card details. Transaction-related metadata (e.g. payment status, timestamps) may be stored for accounting and legal purposes.",
        },
      ],
    },

    {
      title: "3. How We Use Your Data",
      bullets: [
        "To operate and provide the platform and its features",
        "To create and manage user accounts",
        "To enable journaling, content creation, and participation in sessions or programs",
        "To improve our services, functionality, and user experience",
        "To communicate service-related updates and important information",
        "To process payments and manage subscriptions or access rights",
        "To ensure platform security, prevent misuse, and detect fraud",
        "To comply with legal and regulatory obligations",
      ],
    },

    {
      title: "4. Legal Basis for Processing (GDPR)",
      paragraphs: [
        "We process personal data only where permitted by law. Depending on the context, processing is based on one or more of the following legal grounds under Article 6 GDPR:",
      ],
      bullets: [
        "Contractual necessity – where processing is required to provide our services",
        "User consent – particularly for analytics, marketing, and optional features",
        "Legitimate interests – such as platform security, service improvement, and operational efficiency",
        "Legal obligations – where processing is required to comply with applicable laws",
      ],
      note: "You may withdraw your consent at any time with future effect.",
    },

    {
      title: "5. Cookies & Analytics",
      paragraphs: [
        "We use cookies and similar technologies to operate our website, analyze usage, and improve performance. Non-essential cookies and tracking technologies are only used with your explicit consent.",
        "Depending on your consent choices, we may use the following tools:",
      ],
      tools: [
        { name: "Google Tag Manager:", desc: "used to manage and deploy website tags." },
        { name: "Google Analytics / Google identifiers:", desc: "to analyze website usage and performance." },
        { name: "Meta (Facebook) Pixel & Conversion API:", desc: "to measure advertising effectiveness and conversions." },
        { name: "Contentsquare:", desc: "to analyze user behavior and improve usability and user experience." },
      ],
      note:
        "These tools may collect information such as IP address, device data, pages visited, interaction patterns, and event data. Detailed information about cookies, providers, purposes, and retention periods is available in our Cookie Policy. You may adjust or withdraw your consent at any time via the cookie settings on our website.",
    },

    {
      title: "6. Data Sharing",
      paragraphs: ["We only share personal data where necessary and in accordance with applicable laws, including with:"],
      bullets: [
        "Infrastructure & hosting providers",
        "Payment processors (e.g. Stripe)",
        "Analytics and optimization providers (e.g. Google, Meta, Contentsquare)",
        "Legal authorities where disclosure is legally required",
      ],
      note: "All service providers process data on our behalf under appropriate data-processing agreements where required.",
    },

    {
      title: "7. International Data Transfers",
      paragraphs: [
        "Your personal data may be processed outside your country of residence, including in the United States. Where required under GDPR, we rely on appropriate safeguards such as Standard Contractual Clauses (SCCs) or other approved transfer mechanisms to ensure an adequate level of data protection.",
      ],
    },

    {
      title: "8. Data Retention",
      paragraphs: [
        "We retain personal data only for as long as necessary to fulfill the purposes described in this Privacy Policy, including providing our services, complying with legal obligations, and resolving disputes.",
        "Account-related data is generally retained for the duration of your account. Certain data may be retained longer where legally required (e.g. accounting or compliance obligations).",
        "Users may request deletion of their data at any time, subject to legal retention requirements.",
      ],
    },

    {
      title: "9. Your Rights",
      paragraphs: ["Under the GDPR, you have the following rights:"],
      bullets: [
        "Access personal data",
        "Rectify inaccurate or incomplete data",
        "Request deletion of your data",
        "Restrict processing",
        "Request data portability",
        "Object to processing",
        "Withdraw consent at any time",
      ],
      note:
        "To exercise your rights, contact us at info@nawaya.io. You also have the right to lodge a complaint with a supervisory data-protection authority, in particular in your country of residence or place of alleged infringement.",
    },

    {
      title: "10. Security",
      paragraphs: [
        "We implement appropriate organizational and technical measures to protect personal data against unauthorized access, loss, or misuse. However, no system is completely secure, and we cannot guarantee absolute security.",
      ],
    },

    {
      title: "11. Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. Material changes will be communicated through the platform or via other appropriate means.",
      ],
    },
  ],
};

export default privacyEN;
