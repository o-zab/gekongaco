const legalPages = {
    "terms-and-conditions": {
        title: "Terms and Conditions",
        eyebrow: "WEBSITE INFORMATION",
        description: "Terms for using the GEKONG'A & COMPANY website.",
        intro: "This website provides general information about the firm and its services. Accessing or using this website does not, by itself, create an advocate-client relationship. Any engagement is subject to the firm's agreement with the client and applicable law.",
        kind: "legal",
    },
    "privacy-policy": {
        title: "Privacy Information",
        eyebrow: "YOUR PRIVACY MATTERS",
        description: "Information about personal data submitted through this website.",
        intro: "This demonstration website form does not transmit or store submissions. Do not enter personal, sensitive or confidential information in it. This page is not a complete privacy notice for information provided through other channels. Before collecting personal data, the firm should provide a notice explaining its purposes, lawful basis, retention, recipients, data-subject rights and contact details, in accordance with the Data Protection Act, 2019 and applicable regulations.",
        kind: "legal",
    },
    "cookie-policy": {
        title: "Cookie Information",
        eyebrow: "WEBSITE PREFERENCES",
        description: "Information about cookies and similar technologies.",
        intro: "The current website scripts do not set cookies. If analytics or other tracking technologies are added, this notice should be updated and any required consent obtained before use.",
        kind: "legal",
    },
    disclaimer: {
        title: "Disclaimer",
        eyebrow: "IMPORTANT INFORMATION",
        description: "Important information about this website and the legal services described.",
        intro: "The information on this website is general information only and is not legal advice. The law and procedure depend on the facts of each matter. Viewing this website or sending an inquiry does not create an advocate-client relationship; that relationship begins only when the firm confirms it has accepted instructions. Do not send confidential or time-sensitive information before that confirmation. Time limits may apply, so obtain advice promptly.",
        kind: "legal",
    },
};
const sitePages = {
    "road-traffic-accidents": { title: "Road Traffic Accidents", eyebrow: "ROAD TRAFFIC ACCIDENTS", description: "General information about legal claims arising from road traffic accidents in Kenya.", intro: "A road traffic accident may raise questions about responsibility, injury, evidence and available legal remedies. The appropriate steps depend on the circumstances and applicable Kenyan law.", kind: "practice", bullets: ["Accident circumstances and evidence", "Injuries and medical records", "Potentially responsible parties", "Applicable time limits and procedure"] },
    "motorcycle-accidents": { title: "Motorcycle Accidents", eyebrow: "MOTORCYCLE ACCIDENTS", description: "General information about claims arising from motorcycle accidents in Kenya.", intro: "Claims arising from motorcycle accidents depend on the evidence, the injuries sustained and the applicable law. Obtain advice about your particular circumstances before taking action.", kind: "practice", bullets: ["Accident evidence and witness accounts", "Medical records and injury-related losses", "Insurance and liability questions", "Applicable time limits and procedure"] },
    "workplace-injuries": { title: "Workplace Injuries", eyebrow: "WORKPLACE INJURIES", description: "General information about legal issues arising from workplace injuries in Kenya.", intro: "A workplace injury may involve different legal duties and procedures. The appropriate route depends on the employment relationship, the circumstances of the injury and applicable Kenyan law.", kind: "practice", bullets: ["Accident reports and relevant records", "Medical evidence and treatment", "Potentially applicable legal procedures", "Time limits and next steps"] },
    "employment-and-labour": { title: "Employment and Labour", eyebrow: "EMPLOYMENT AND LABOUR", description: "General information about employment and labour matters in Kenya.", intro: "Employment and labour matters depend on the employment relationship, the circumstances and applicable Kenyan law. The appropriate advice depends on the facts of each matter.", kind: "practice", bullets: ["Employment terms and workplace policies", "Workplace rights and obligations", "Employment disputes and procedures", "Applicable time limits and next steps"] },
    "family-law-succession": { title: "Family Law and Succession", eyebrow: "FAMILY LAW AND SUCCESSION", description: "General information about family law and succession matters in Kenya.", intro: "Family law and succession matters are sensitive and depend on the circumstances, relevant documents and applicable Kenyan law. Obtain advice about your particular situation before taking action.", kind: "practice", bullets: ["Family-related legal matters", "Estate and succession questions", "Relevant documents and records", "Applicable procedures and time limits"] },
    "personal-injury": { title: "Personal Injury", eyebrow: "PERSONAL INJURY", description: "General information about personal injury matters in Kenya.", intro: "Personal injury matters are assessed on their individual facts and the law that applies. The firm can discuss whether it may be able to assist after learning more about the circumstances.", kind: "practice", bullets: ["Road traffic accidents", "Workplace injuries", "Medical negligence", "Other injury-related civil claims"] },
    "fatal-injury-claims": { title: "Fatal Injury Claims", eyebrow: "FATAL INJURY CLAIMS", description: "General information for families considering legal action after a fatal injury in Kenya.", intro: "A fatal injury may give rise to legal questions for a deceased person's estate or eligible dependants. The applicable rights and procedure depend on the facts and Kenyan law.", kind: "practice", bullets: ["Relevant records and evidence", "The estate and eligible dependants", "Potential claims and responsible parties", "Applicable time limits and procedure"] },
    "medical-negligence": { title: "Medical Negligence", eyebrow: "MEDICAL NEGLIGENCE", description: "General information about potential claims involving medical care in Kenya.", intro: "An adverse medical outcome does not, on its own, establish negligence. A legal assessment depends on the medical records, expert evidence, circumstances of care and applicable law.", kind: "practice", bullets: ["Medical records and treatment history", "The care provided and relevant standards", "Expert assessment where appropriate", "Applicable time limits and procedure"] },
    "practice-areas": { title: "Practice Areas", eyebrow: "AREAS OF PRACTICE", description: "Explore the firm's practice areas and general information about legal services in Kenya.", intro: "The appropriate advice depends on the facts of each matter and applicable Kenyan law.", kind: "practice-index", practiceSlugs: ["road-traffic-accidents", "workplace-injuries", "employment-and-labour", "family-law-succession"] },
    "case-results": { title: "Case Outcomes", eyebrow: "IMPORTANT INFORMATION", description: "Information about case outcomes and the factors that affect legal matters.", intro: "Every legal matter depends on its particular facts, evidence and applicable law.", kind: "results" },
    "about-us": { title: "About the Firm", eyebrow: "GEKONG'A & COMPANY", description: "Information about GEKONG'A & COMPANY and its approach to legal services in Kenya.", intro: "GEKONG'A & COMPANY provides legal services in Kenya. The firm aims to communicate clearly, assess each matter on its facts and applicable law, and explain whether it may be able to assist.", kind: "about", sections: [{ title: "Clear communication", body: "Clients should be kept informed about the process, material developments and available options." }, { title: "Careful preparation", body: "Each matter is considered on its facts, evidence and applicable law." }, { title: "Legal advice", body: "Advice depends on the facts provided and the law applicable to the specific circumstances." }, { title: "Professional obligations", body: "Legal services are provided subject to applicable Kenyan law and professional requirements." }] },
    "areas-we-serve": { title: "Areas of Service", eyebrow: "LEGAL SERVICES IN KENYA", description: "Information about the locations in which GEKONG'A & COMPANY may provide legal services.", intro: "The firm can confirm whether it is able to assist based on your location, the nature of your matter and applicable professional requirements.", kind: "areas" },
    "blog": { title: "Legal Information", eyebrow: "GENERAL INFORMATION", description: "General information about legal issues and the work of GEKONG'A & COMPANY.", intro: "Information published on this website is general and may not apply to your circumstances. It is not a substitute for advice from an advocate who has considered the facts of your matter.", kind: "blog", bullets: [] },
    "sponsorship-application": { title: "Community Enquiries", eyebrow: "GEKONG'A & COMPANY", description: "Contact the firm regarding community enquiries.", intro: "Contact the firm with details of your enquiry. The firm will consider it and respond if appropriate.", kind: "sponsorship" },
    "ai-info": { title: "AI Information", eyebrow: "TRANSPARENCY", description: "Information about technology and this website.", intro: "Automated tools, if used to support website operations or communications, do not provide legal advice and do not replace review by an advocate.", kind: "ai" },
    ...legalPages,
};

window.LEAH_SITE_DATA = { sitePages };
