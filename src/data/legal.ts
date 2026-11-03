import { CONTACT } from "./site";

/**
 * Privacy Policy and Terms. Written to describe what the site actually does, so
 * any change to what it collects or who it shares with must be reflected here:
 * analytics, a live newsletter, a new form or a new provider. The build also
 * reads this file for page metadata, so keep it free of browser imports.
 */

export type LegalBlock = string | { list: string[] };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalPageContent = {
  path: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  updated: string;
  summaryHeading: string;
  summary: string[];
  sections: LegalSection[];
};

const COMPANY = "Duowork Software Solutions LTD";
const REGISTRATION = "RC 7500885";
const UPDATED = "3 November 2026";

export const PRIVACY: LegalPageContent = {
  path: "/privacy",
  metaTitle: "Privacy Policy | Duowork",
  metaDescription:
    "What Duowork collects, why, who it's shared with and your rights. No tracking cookies, and what you type into Duowork Tools stays in your browser.",
  title: "Privacy Policy",
  updated: UPDATED,
  summaryHeading: "The short version",
  summary: [
    "What you type into Duowork Tools stays in your browser. It isn't sent to us.",
    "We use no analytics, advertising or tracking cookies.",
    "If you contact us, we use your details to reply and to work with you. We don't sell them.",
    "You can ask us to show, correct or delete what we hold about you.",
  ],
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      blocks: [
        `This website is run by ${COMPANY} (${REGISTRATION}), a company registered in Nigeria and based in Abuja. In this policy, "Duowork", "we" and "us" mean that company.`,
        `We are responsible for the personal data described here. For anything about this policy, email ${CONTACT.email}.`,
      ],
    },
    {
      id: "tools",
      heading: "Duowork Tools",
      blocks: [
        "Our tools run inside your browser. The details you enter, including business, customer and payment details and any logo you add, are not sent to us or stored on our servers. PDFs are created on your own device.",
        "So that a reload doesn't lose your work, a draft is kept in your browser's session storage. It stays on your device, ends when you close the tab, and can be removed at any time with the Clear button. We can't see it, and we can't recover it for you.",
        "A few actions pass information on, but only when you choose them. Sending a receipt confirmation on WhatsApp opens WhatsApp with the message filled in, and WhatsApp's own terms and privacy policy apply from that point. Copying a summary places it on your device's clipboard.",
      ],
    },
    {
      id: "what-we-collect",
      heading: "What we collect, and why",
      blocks: [
        "We only collect personal data in these situations:",
        {
          list: [
            "Contact form: your name, email address, company if you give it, the kind of help you need and your message. We use these to reply, because you asked us to and because responding to enquiries is a legitimate part of running our business.",
            "Direct messages: if you email us or message us on WhatsApp, we receive your contact details and whatever you send, and use them in the same way.",
            "Client work: if you become a client, we keep the contact, project and billing details needed to carry out our agreement and meet our legal and accounting duties.",
            "Technical data: the services that host this site and deliver its fonts automatically process technical information such as your IP address and browser type, in order to deliver pages and keep them secure. We don't use this to identify you.",
          ],
        },
        "We don't send marketing emails unless you've asked for them.",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and tracking",
      blocks: [
        "We don't set cookies, and we don't use analytics, advertising pixels or tracking tools. The only thing we store on your device is the temporary tool draft described above. If this changes, we'll update this policy first.",
      ],
    },
    {
      id: "sharing",
      heading: "Who we share data with",
      blocks: [
        "We don't sell personal data. We share it only with the service providers we rely on, and only as far as they need it:",
        {
          list: [
            "Netlify, which processes contact form submissions.",
            "Our email provider, which delivers and stores messages sent to us.",
            "GitHub, which hosts this website through GitHub Pages.",
            "Google, which delivers this site's fonts through Google Fonts.",
            "WhatsApp, if you choose to contact us there.",
          ],
        },
        "We may also disclose information where the law requires it, or where it's needed to protect our legal rights.",
      ],
    },
    {
      id: "transfers",
      heading: "Data outside Nigeria",
      blocks: [
        "Some of these providers operate outside Nigeria, including in the United States, so your data may be processed there. We use established providers and rely on the safeguards that Nigerian data protection law allows for these transfers.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep it",
      blocks: [
        {
          list: [
            "Enquiries: up to 24 months after the conversation ends, unless you become a client.",
            "Client records: for as long as the work continues, and afterwards for as long as our legal, tax and accounting duties require.",
            "Tool drafts: until you close the tab or clear them. They never reach us.",
          ],
        },
      ],
    },
    {
      id: "security",
      heading: "Keeping it safe",
      blocks: [
        "We limit who can access personal data and use reputable providers. No system is perfectly secure, however. If a breach puts your rights at risk, we'll respond and notify those affected as the law requires.",
      ],
    },
    {
      id: "rights",
      heading: "Your rights",
      blocks: [
        "Under the Nigeria Data Protection Act 2023, you can ask us to:",
        {
          list: [
            "Tell you whether we hold your personal data, and give you a copy.",
            "Correct anything that's wrong or incomplete.",
            "Delete your data, or restrict how we use it.",
            "Stop using your data, where you object to how it's being used.",
            "Give your data to you in a portable format, where that applies.",
            "Stop any use that relies on your consent, if you withdraw it.",
          ],
        },
        `To make a request, email ${CONTACT.email}. We may need to confirm who you are first, and we aim to respond within 30 days. Some requests may be limited where we must keep information by law.`,
        "If you're unhappy with how we've handled your data, please tell us so we can try to put it right. You can also complain to the Nigeria Data Protection Commission at ndpc.gov.ng.",
      ],
    },
    {
      id: "children",
      heading: "Children",
      blocks: [
        `Our site and tools are meant for businesses and working adults, not for anyone under 18. If you believe a child has sent us personal data, email ${CONTACT.email} and we'll delete it.`,
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        "We'll post any changes on this page and update the date at the top.",
      ],
    },
  ],
};

export const TERMS: LegalPageContent = {
  path: "/terms",
  metaTitle: "Terms | Duowork",
  metaDescription:
    "The terms for using the Duowork website and Duowork Tools, and the general terms for client work with Duowork Software Solutions LTD.",
  title: "Terms",
  updated: UPDATED,
  summaryHeading: "The short version",
  summary: [
    "Our tools are free and provided as they are. You're responsible for checking what they produce before you rely on it.",
    "They aren't accounting, tax, payroll or legal advice.",
    "Don't use them to create false or misleading documents.",
    "For client work, your signed proposal comes first, and these terms fill any gaps.",
  ],
  sections: [
    {
      id: "about",
      heading: "About these terms",
      blocks: [
        `These terms are between you and ${COMPANY} (${REGISTRATION}), a company registered in Nigeria and based in Abuja ("Duowork", "we" or "us"). By using this website or our tools, you agree to sections 2 to 5 and sections 15 to 17. If we do work for you, sections 6 to 14 apply as well.`,
      ],
    },
    {
      id: "website",
      heading: "Using the website and tools",
      blocks: [
        "You may use this website and Duowork Tools for free, for your own business or personal purposes, without an account. Please don't:",
        {
          list: [
            "Create false, forged or misleading documents, such as a receipt for a payment that never happened, or use the tools for fraud or anything else unlawful.",
            "Attempt to disrupt the site, or get around its security.",
            "Present the site or tools as your own, or resell them.",
          ],
        },
      ],
    },
    {
      id: "your-responsibility",
      heading: "Checking what the tools produce",
      blocks: [
        "The tools work from what you enter and do the arithmetic for you. You remain responsible for the accuracy of your documents and figures, and for checking them before you send or rely on them.",
        "Nothing the tools produce is accounting, tax, payroll, financial or legal advice. Rates you enter, including tax rates, are your own choice. It's up to you to make sure your documents meet the rules that apply to your business, and to take professional advice where you need it.",
      ],
    },
    {
      id: "content",
      heading: "Your content and ours",
      blocks: [
        "What you enter and the documents you create are yours. We don't receive them or claim any rights in them.",
        "The website, the tools and Duowork's name, logo, design and content belong to us or our licensors. Links to other sites are for convenience, and we aren't responsible for those sites.",
      ],
    },
    {
      id: "as-is",
      heading: "No guarantees for the free tools",
      blocks: [
        "The website and tools are free and provided \"as is\". We may change or withdraw them at any time, and we don't promise they'll always be available, error-free or suited to your purpose.",
        "As far as the law allows, we aren't liable for any loss arising from your use of the website or tools, including losses caused by an error in a document or a calculation. Nothing in these terms limits any liability that can't legally be limited.",
      ],
    },
    {
      id: "client-work",
      heading: "Client work: how these terms apply",
      blocks: [
        "Sections 6 to 14 apply when you engage us for software, consulting or other services. Your signed proposal or contract sets out the scope, price and timing. If it conflicts with these terms, the signed document wins.",
      ],
    },
    {
      id: "working-together",
      heading: "Working together",
      blocks: [
        "We'll carry out the work with reasonable skill and care. You'll give us the information, access, content and decisions we need in good time, and you're responsible for having the rights to anything you give us to use. Delays on either side can move agreed dates.",
        "Changes to the agreed scope should be agreed in writing, including any effect on price and timing.",
      ],
    },
    {
      id: "payment",
      heading: "Payment",
      blocks: [
        "Your signed proposal sets out the fees and payment schedule. If a payment is late, we may give you written notice and pause the work until it's paid, and agreed dates will move accordingly.",
      ],
    },
    {
      id: "ownership",
      heading: "Who owns the work",
      blocks: [
        "Once you've paid in full, you own the custom work we created for you under the agreement.",
        "We keep ownership of our pre-existing tools, code, methods and know-how, and of general improvements to them. Where any of these form part of what we deliver, you receive a continuing licence to use them as part of that work. Third-party and open-source components remain under their own licences.",
        "We may show the work in our portfolio and marketing unless we've agreed otherwise in writing. We won't reveal your confidential information in doing so.",
      ],
    },
    {
      id: "confidentiality",
      heading: "Confidentiality",
      blocks: [
        "Each of us will keep the other's confidential information private, and use it only for the work. This doesn't cover information that is already public, that was lawfully obtained elsewhere, or that must be disclosed by law.",
        "Where we handle personal data on your behalf, we'll do so only on your instructions and with appropriate safeguards. Our Privacy Policy explains how we handle personal data for our own purposes.",
      ],
    },
    {
      id: "fixes",
      heading: "Fixing defects",
      blocks: [
        "If you report a defect within 30 days of delivery, meaning the work doesn't do what we agreed it would, we'll fix it at no charge. This doesn't cover new features, changes made by anyone else, misuse, or problems caused by third-party services or your own systems. Other support or maintenance needs its own agreement.",
      ],
    },
    {
      id: "liability",
      heading: "Limit on liability",
      blocks: [
        "For client work, our total liability for any project is limited to the fees you've paid for that project. We aren't liable for indirect or consequential losses, such as lost profits, lost business or lost data.",
        "Nothing here limits any liability that can't legally be limited.",
      ],
    },
    {
      id: "ending",
      heading: "Ending a project",
      blocks: [
        "Unless your signed proposal says otherwise, either of us may end a project with 14 days' written notice. You'll pay for all work done up to the end date. Upfront payments that cover work already done aren't refunded, and we'll return any amount you've paid beyond that.",
        "Ownership of completed work passes as described above once it has been paid for.",
      ],
    },
    {
      id: "beyond-control",
      heading: "Events beyond our control",
      blocks: [
        "Neither of us is responsible for a delay or failure caused by events beyond reasonable control, such as power or network outages, or government action. This doesn't excuse a payment that's due.",
      ],
    },
    {
      id: "disputes",
      heading: "Governing law and disputes",
      blocks: [
        "These terms are governed by the laws of the Federal Republic of Nigeria.",
        "If a dispute arises, we'll first try to resolve it through good-faith discussion. If that fails, we'll attempt mediation in Abuja. If it still isn't resolved, the courts of the Federal Capital Territory, Abuja, will decide it. Either of us may still seek urgent relief from those courts at any time.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      blocks: [
        "We may update these terms by posting them here and changing the date at the top. Changes don't affect a signed client agreement unless we both agree. If any part of these terms can't be enforced, the rest still applies.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      blocks: [
        `Write to ${CONTACT.email}. Duowork Software Solutions LTD, Abuja, Nigeria.`,
      ],
    },
  ],
};

export const LEGAL_PAGES = [PRIVACY, TERMS];

export const CONTACT_FORM_NOTICE = {
  before: "We use your details to reply to you. See our ",
  link: "Privacy Policy",
  to: "/privacy",
};
