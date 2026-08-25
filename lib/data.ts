import type { Product } from './types';

const AUTH = 'Testing is performed only with explicit authorization from the system owner. Unauthorized access or testing is not permitted.';

const cyberImages = [
  'https://images.pexels.com/photos/5380603/pexels-photo-5380603.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5380669/pexels-photo-5380669.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/2061168/pexels-photo-2061168.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/9951077/pexels-photo-9951077.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/193350/pexels-photo-193350.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1933900/pexels-photo-1933900.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/8108728/pexels-photo-8108728.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/8108726/pexels-photo-8108726.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/8108715/pexels-photo-8108715.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/17489163/pexels-photo-17489163.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/17489151/pexels-photo-17489151.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/7325498/pexels-photo-7325498.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/37709121/pexels-photo-37709121.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5380682/pexels-photo-5380682.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

const img = (i: number) => cyberImages[i % cyberImages.length];

type Seed = Omit<Product, 'authorization'>;

const seeds: Seed[] = [
  {
    id: 'p1',
    slug: 'pubg-security-assessment',
    name: 'PUBG Security Assessment',
    category: 'Penetration Testing',
    price: 300,
    description:
      'Authorized security assessment for a PUBG-related application, website, or infrastructure. Identify vulnerabilities, authentication weaknesses, insecure APIs, and configuration issues with written findings and remediation recommendations.',
    scope:
      'Web and API surfaces associated with a PUBG-related application or platform, including authentication flows, game-integration endpoints, and backend configuration.',
    included: [
      'External penetration testing of web assets',
      'API security review of game-integration endpoints',
      'Authentication and session management testing',
      'Configuration and deployment hardening review',
      'OWASP Top 10 vulnerability coverage',
    ],
    deliverables: [
      'Detailed technical report with CVSS-scored findings',
      'Step-by-step reproduction for each vulnerability',
      'Prioritized remediation recommendations',
      'Executive summary for stakeholders',
      'Post-remediation re-test (one round)',
    ],
    estimatedTime: '7–10 business days',
    requirements: [
      'Written authorization from the system owner',
      'List of in-scope IP addresses and domains',
      'Test accounts with representative permissions',
    ],
    image: img(0),
    featured: true,
  },
  {
    id: 'p2',
    slug: 'pubg-account-security-audit',
    name: 'PUBG Account Security Audit',
    category: 'Vulnerability Assessment',
    price: 200,
    description:
      'Authorized security audit focused on account-protection mechanisms for PUBG-related systems. Reviews authentication, session handling, account-recovery flows, and access controls to identify weaknesses that could lead to unauthorized account access.',
    scope:
      'Account lifecycle: registration, login, password reset, MFA enrollment, session tokens, and recovery flows for an authorized PUBG-related platform.',
    included: [
      'Authentication mechanism review',
      'Session management and token analysis',
      'Account-recovery flow security testing',
      'MFA implementation assessment',
      'Rate-limiting and brute-force protection review',
    ],
    deliverables: [
      'Account-security findings report',
      'Risk-rated weaknesses with attack scenarios',
      'Remediation guidance per finding',
      'Best-practice hardening checklist',
    ],
    estimatedTime: '5–7 business days',
    requirements: [
      'Written authorization from the system owner',
      'Access to test accounts at different privilege levels',
      'Documentation of current authentication architecture',
    ],
    image: img(1),
    featured: true,
  },
  {
    id: 'p3',
    slug: 'tiktok-security-assessment',
    name: 'TikTok Security Assessment',
    category: 'Web Application Security Audit',
    price: 580,
    description:
      'Authorized security testing for TikTok-related applications or integrations. Review authentication, API security, session handling, access controls, and common web/mobile vulnerabilities.',
    scope:
      'Web and mobile surfaces for an authorized TikTok-related application, integration, or business system, including OAuth integrations and content-delivery APIs.',
    included: [
      'Web application penetration test',
      'API security assessment (REST/GraphQL)',
      'OAuth integration security review',
      'Access-control and privilege-escalation testing',
      'Input validation and injection testing',
    ],
    deliverables: [
      'Comprehensive vulnerability report',
      'Attack-chain analysis where applicable',
      'Remediation roadmap with effort estimates',
      'Technical appendix with raw findings data',
    ],
    estimatedTime: '8–12 business days',
    requirements: [
      'Written authorization from the system owner',
      'API documentation or endpoint list',
      'Test credentials for each user role',
    ],
    image: img(2),
    featured: true,
  },
  {
    id: 'p4',
    slug: 'snapchat-security-audit',
    name: 'Snapchat Security Audit',
    category: 'Mobile App Security Testing',
    price: 520,
    description:
      'Professional security assessment focused on an authorized Snapchat-related application or integration. Includes vulnerability identification and remediation guidance.',
    scope:
      'Mobile application (iOS/Android) and associated backend APIs for an authorized Snapchat-related integration or companion app.',
    included: [
      'Mobile app static and dynamic analysis',
      'API traffic interception and testing',
      'Local storage and credential handling review',
      'Deep-link and intent security testing',
      'Certificate pinning and TLS verification',
    ],
    deliverables: [
      'Mobile security assessment report',
      'OWASP MASVS compliance mapping',
      'Vulnerability details with proof-of-concept',
      'Remediation recommendations',
    ],
    estimatedTime: '6–9 business days',
    requirements: [
      'Written authorization from the system owner',
      'Application binary or build access',
      'Test account credentials',
    ],
    image: img(3),
    featured: true,
  },
  {
    id: 'p5',
    slug: 'instagram-security-assessment',
    name: 'Instagram Security Assessment',
    category: 'Web Application Security Audit',
    price: 650,
    description:
      'Authorized security assessment for an Instagram-related application, integration, or business system. Test API security, authentication, authorization, and configuration weaknesses.',
    scope:
      'Web assets, APIs, and integrations related to an authorized Instagram-connected application, including content-management interfaces and third-party plugin entry points.',
    included: [
      'Full web application penetration test',
      'API authorization and access-control testing',
      'Third-party integration and plugin review',
      'Business-logic vulnerability assessment',
      'Security configuration hardening review',
    ],
    deliverables: [
      'Detailed findings report with CVSS scores',
      'Exploitation walkthroughs for each finding',
      'Prioritized fix recommendations',
      'Executive and technical summaries',
    ],
    estimatedTime: '8–12 business days',
    requirements: [
      'Written authorization from the system owner',
      'In-scope URL list and API endpoints',
      'Test accounts for each role level',
    ],
    image: img(4),
    featured: true,
  },
  {
    id: 'p6',
    slug: 'facebook-security-testing',
    name: 'Facebook Security Testing',
    category: 'Penetration Testing',
    price: 700,
    description:
      'Authorized security testing of Facebook-related applications, integrations, or business systems. Includes security review and recommendations for fixing discovered vulnerabilities.',
    scope:
      'Authorized Facebook-integrated applications, business tools, and connected infrastructure, including Graph API integrations and login flows.',
    included: [
      'Facebook Login / OAuth flow security review',
      'Graph API permission and token testing',
      'Webhook and callback security assessment',
      'Data-handling and privacy control review',
      'Cross-site scripting and injection testing',
    ],
    deliverables: [
      'Integration security report',
      'Token and permission abuse analysis',
      'Remediation guidance with code examples',
      'Re-test of fixed issues',
    ],
    estimatedTime: '7–10 business days',
    requirements: [
      'Written authorization from the system owner',
      'App ID and test credentials',
      'List of Graph API permissions in use',
    ],
    image: img(5),
    featured: true,
  },
  {
    id: 'p7',
    slug: 'supercell-security-assessment',
    name: 'Supercell Security Assessment',
    category: 'API Security Audit',
    price: 680,
    description:
      'Authorized security assessment for a Supercell-related application, integration, or infrastructure. Focus on application security, API security, authentication, authorization, and vulnerability discovery.',
    scope:
      'Game-backend APIs, player-data services, and integration endpoints for an authorized Supercell-related system or companion application.',
    included: [
      'API authentication and authorization testing',
      'Player data access-control review',
      'In-game purchase and economy logic testing',
      'Rate-limiting and abuse-prevention assessment',
      'Backend infrastructure configuration review',
    ],
    deliverables: [
      'API security assessment report',
      'Access-control matrix with findings',
      'Abuse-scenario documentation',
      'Remediation roadmap',
    ],
    estimatedTime: '8–12 business days',
    requirements: [
      'Written authorization from the system owner',
      'API endpoint documentation',
      'Test accounts with varied privilege levels',
    ],
    image: img(6),
    featured: true,
  },
  {
    id: 'p8',
    slug: 'enterprise-network-security-assessment',
    name: 'Enterprise Network Security Assessment',
    category: 'Network Security Assessment',
    price: 1850,
    description:
      'Comprehensive network-layer security assessment for enterprise environments. Identifies exposed services, misconfigurations, and lateral-movement paths across authorized infrastructure.',
    scope:
      'Internal and external network surfaces, including segmented zones, VPN gateways, and inter-VLAN trust boundaries within the authorized scope.',
    included: [
      'External network enumeration and service mapping',
      'Internal vulnerability scanning and validation',
      'Lateral-movement and privilege-escalation path analysis',
      'Firewall and segmentation effectiveness review',
      'Wireless network security assessment',
    ],
    deliverables: [
      'Network security assessment report',
      'Attack-path diagrams and risk ratings',
      'Configuration hardening recommendations',
      'Remediation priority matrix',
    ],
    estimatedTime: '12–18 business days',
    requirements: [
      'Written authorization from the system owner',
      'Network architecture diagram',
      'VPN or on-site access for internal testing',
    ],
    image: img(11),
  },
  {
    id: 'p9',
    slug: 'cloud-infrastructure-security-assessment',
    name: 'Cloud Infrastructure Security Assessment',
    category: 'Cloud Security Assessment',
    price: 2200,
    description:
      'Full security assessment of cloud infrastructure across AWS, Azure, or GCP. Reviews IAM policies, storage permissions, network exposure, and workload configurations.',
    scope:
      'Cloud accounts, IAM configurations, storage buckets, compute workloads, and network security groups within the authorized cloud environment.',
    included: [
      'IAM policy and permission analysis',
      'Storage and data-exposure review',
      'Network security group and firewall audit',
      'Container and serverless workload assessment',
      'Cloud logging and monitoring gap analysis',
    ],
    deliverables: [
      'Cloud security posture report',
      'Misconfiguration inventory with risk levels',
      'IAM hardening recommendations',
      'Compliance mapping (CIS Benchmarks)',
    ],
    estimatedTime: '10–15 business days',
    requirements: [
      'Written authorization from the system owner',
      'Read-only cloud access (IAM role or service account)',
      'Inventory of cloud accounts and services in scope',
    ],
    image: img(12),
  },
  {
    id: 'p10',
    slug: 'web-application-penetration-test',
    name: 'Web Application Penetration Test',
    category: 'Penetration Testing',
    price: 1500,
    description:
      'In-depth penetration test of a single web application. Covers the full OWASP Top 10 and beyond, with manual exploitation and business-logic testing.',
    scope:
      'One authorized web application, including all user-facing pages, administrative interfaces, and associated APIs.',
    included: [
      'Manual penetration testing (not just scanning)',
      'OWASP Top 10 and ASVS coverage',
      'Business-logic and workflow abuse testing',
      'Authentication and session exploitation',
      'Injection, XSS, and access-control testing',
    ],
    deliverables: [
      'Full penetration test report',
      'Proof-of-concept exploits per finding',
      'Risk-scored remediation plan',
      'One re-test after fixes',
    ],
    estimatedTime: '7–12 business days',
    requirements: [
      'Written authorization from the system owner',
      'Application URL and test accounts',
      'API documentation if applicable',
    ],
    image: img(7),
  },
  {
    id: 'p11',
    slug: 'api-penetration-testing',
    name: 'API Penetration Testing',
    category: 'API Security Audit',
    price: 1200,
    description:
      'Dedicated API security assessment covering REST, GraphQL, and gRPC endpoints. Tests authentication, authorization, rate limiting, data exposure, and injection vectors.',
    scope:
      'All authorized API endpoints, including public, partner, and internal-facing services, with focus on BOLA, injection, and excessive data exposure.',
    included: [
      'REST and GraphQL endpoint testing',
      'Broken object-level authorization (BOLA) testing',
      'Authentication and token security review',
      'Rate-limiting and abuse-prevention testing',
      'Data exposure and mass-assignment testing',
    ],
    deliverables: [
      'API security report with OWASP API Top 10 mapping',
      'Per-endpoint vulnerability details',
      'Exploitation proof-of-concepts',
      'Remediation guidance',
    ],
    estimatedTime: '6–10 business days',
    requirements: [
      'Written authorization from the system owner',
      'API documentation (OpenAPI/Swagger preferred)',
      'Test tokens or credentials',
    ],
    image: img(8),
  },
  {
    id: 'p12',
    slug: 'mobile-app-security-testing',
    name: 'Mobile App Security Testing',
    category: 'Mobile App Security Testing',
    price: 1400,
    description:
      'Comprehensive security testing of iOS and Android applications. Covers storage, transport, authentication, and platform-specific attack surfaces.',
    scope:
      'One authorized mobile application on iOS and/or Android, including backend APIs and third-party SDKs.',
    included: [
      'Static analysis of application binary',
      'Dynamic analysis with runtime instrumentation',
      'Local storage and keychain/keystore review',
      'Certificate pinning and TLS validation testing',
      'Deep-link, intent, and WebView security testing',
    ],
    deliverables: [
      'Mobile security report (OWASP MASVS mapped)',
      'Vulnerability details with PoC',
      'Platform-specific hardening guide',
      'Re-test of remediated issues',
    ],
    estimatedTime: '7–10 business days',
    requirements: [
      'Written authorization from the system owner',
      'Application build or store link',
      'Test account credentials',
    ],
    image: img(9),
  },
  {
    id: 'p13',
    slug: 'security-code-review',
    name: 'Security Code Review',
    category: 'Security Code Review',
    price: 1600,
    description:
      'Manual and automated source-code review to identify security flaws before they reach production. Covers authentication, crypto usage, input handling, and framework-specific risks.',
    scope:
      'Authorized source code for one application or service, up to 50,000 lines of code across primary languages.',
    included: [
      'Manual secure-code review by senior engineers',
      'SAST integration and triage',
      'Authentication and authorization logic review',
      'Cryptographic implementation audit',
      'Dependency and known-CVE analysis',
    ],
    deliverables: [
      'Code-level security findings report',
      'File/line references for each issue',
      'Secure-coding recommendations per finding',
      'Architecture-level risk summary',
    ],
    estimatedTime: '8–14 business days',
    requirements: [
      'Written authorization from the system owner',
      'Source-code repository access',
      'Brief on critical business logic',
    ],
    image: img(15),
  },
  {
    id: 'p14',
    slug: 'malware-analysis-service',
    name: 'Malware Analysis Service',
    category: 'Malware Analysis',
    price: 950,
    description:
      'Static and dynamic analysis of suspected malware samples in an isolated lab environment. Provides behavior report, IOCs, and detection guidance.',
    scope:
      'Up to three suspected malware samples submitted by the client, analyzed in a sandboxed environment with full telemetry.',
    included: [
      'Static analysis (disassembly, string extraction, hashing)',
      'Dynamic analysis in isolated sandbox',
      'Network behavior and C2 extraction',
      'Persistence mechanism identification',
      'Indicator-of-compromise (IOC) generation',
    ],
    deliverables: [
      'Malware analysis report with behavior timeline',
      'IOC list for detection and response',
      'YARA rules for sample detection',
      'Mitigation and containment recommendations',
    ],
    estimatedTime: '3–6 business days',
    requirements: [
      'Written authorization from the system owner',
      'Sample files in password-protected archive',
      'Context on how the sample was discovered',
    ],
    image: img(16),
  },
  {
    id: 'p15',
    slug: 'incident-response-retainer',
    name: 'Incident Response Retainer',
    category: 'Incident Response',
    price: 2500,
    description:
      'Pre-negotiated incident response retainer ensuring rapid engagement when a security incident occurs. Includes triage, containment, and post-incident review.',
    scope:
      'Annual retainer covering up to 40 hours of incident response support, available 24/7 with a 1-hour response SLA.',
    included: [
      '24/7 incident hotline with 1-hour response',
      'Remote triage and initial containment',
      'Forensic preservation and evidence collection',
      'Root-cause analysis and attack-timeline reconstruction',
      'Post-incident remediation plan',
    ],
    deliverables: [
      'Incident response report per engagement',
      'Containment and eradication timeline',
      'Root-cause analysis with evidence',
      'Remediation and hardening roadmap',
    ],
    estimatedTime: 'On-call (annual retainer)',
    requirements: [
      'Signed retainer agreement',
      'Emergency contact list',
      'Access to logs and SIEM (when incident occurs)',
    ],
    image: img(17),
  },
  {
    id: 'p16',
    slug: 'security-monitoring-setup',
    name: 'Security Monitoring Setup',
    category: 'Security Monitoring',
    price: 1800,
    description:
      'Design and deployment of a security monitoring stack tailored to your environment. Includes SIEM configuration, alert tuning, and detection-rule development.',
    scope:
      'One authorized environment, including log-source identification, SIEM onboarding, and custom detection-rule creation for up to 15 log sources.',
    included: [
      'Log-source inventory and onboarding',
      'SIEM configuration and parsing rules',
      'Custom detection rules (15 included)',
      'Alert-tuning and false-positive reduction',
      'Dashboard and reporting setup',
    ],
    deliverables: [
      'Monitoring architecture documentation',
      'Configured SIEM with dashboards',
      'Detection-rule library with documentation',
      'Operational runbook for alert response',
    ],
    estimatedTime: '10–15 business days',
    requirements: [
      'Written authorization from the system owner',
      'Access to SIEM platform',
      'List of critical assets and log sources',
    ],
    image: img(13),
  },
  {
    id: 'p17',
    slug: 'osint-investigation',
    name: 'OSINT Investigation',
    category: 'OSINT Investigation',
    price: 750,
    description:
      'Open-source intelligence investigation service. Gathers and analyzes publicly available information for authorized threat assessments, due diligence, or security research.',
    scope:
      'One authorized investigation target (domain, entity, or threat actor profile) using publicly available sources only.',
    included: [
      'Passive reconnaissance of public sources',
      'Domain and infrastructure mapping',
      'Social-media presence analysis (public data only)',
      'Threat-actor or group profiling where applicable',
      'Exposure and leak-risk assessment',
    ],
    deliverables: [
      'OSINT investigation report',
      'Source-linked evidence appendix',
      'Risk assessment and exposure summary',
      'Recommendations for reducing public footprint',
    ],
    estimatedTime: '5–8 business days',
    requirements: [
      'Written authorization and lawful purpose',
      'Target scope definition',
      'Any known context or prior intelligence',
    ],
    image: img(14),
  },
  {
    id: 'p18',
    slug: 'security-awareness-training',
    name: 'Security Awareness Training',
    category: 'Security Awareness Training',
    price: 800,
    description:
      'Interactive security awareness training program for teams. Covers phishing, social engineering, password hygiene, and incident reporting in an engaging format.',
    scope:
      'Up to 50 employees, delivered as a live remote session with materials and a phishing-simulation exercise.',
    included: [
      'Live remote training session (2 hours)',
      'Phishing simulation campaign (one round)',
      'Password and MFA best-practices module',
      'Social-engineering recognition training',
      'Incident reporting workflow guidance',
    ],
    deliverables: [
      'Training completion report with participation stats',
      'Phishing-simulation results and risk scoring',
      'Employee knowledge-check summary',
      'Recommendations for ongoing awareness',
    ],
    estimatedTime: '1–2 weeks (scheduling dependent)',
    requirements: [
      'Signed engagement agreement',
      'Employee email list for phishing simulation',
      'Preferred training date and time',
    ],
    image: img(10),
  },
  {
    id: 'p19',
    slug: 'ctf-cybersecurity-training',
    name: 'CTF / Cybersecurity Training',
    category: 'CTF / Cybersecurity Training',
    price: 450,
    description:
      'Hands-on capture-the-flag training program for security teams. Builds practical skills in web exploitation, reverse engineering, cryptography, and forensics.',
    scope:
      'One team (up to 10 participants), delivered as a custom CTF platform with 15 challenges across four categories.',
    included: [
      'Custom CTF platform deployment (24-hour access)',
      '15 challenges: web, crypto, reverse, forensics',
      'Live walkthrough and debrief session',
      'Solution write-ups for all challenges',
      'Skill-gap analysis per participant',
    ],
    deliverables: [
      'CTF performance report and scoreboard',
      'Detailed solution write-ups',
      'Individual skill-gap analysis',
      'Recommended learning path per participant',
    ],
    estimatedTime: '2–3 days (platform live for 24 hours)',
    requirements: [
      'Signed engagement agreement',
      'Participant list and skill levels',
      'Preferred schedule',
    ],
    image: img(0),
  },
  {
    id: 'p20',
    slug: 'security-consultation',
    name: 'Security Consultation',
    category: 'Security Consultation',
    price: 350,
    description:
      'One-on-one consultation with a senior security engineer. Get expert guidance on architecture, compliance, tooling, or a specific security challenge.',
    scope:
      'One 90-minute remote consultation session with a senior security engineer, plus a written follow-up summary.',
    included: [
      'Pre-call questionnaire to scope the discussion',
      '90-minute live remote consultation',
      'Architecture or challenge review',
      'Prioritized recommendations',
      'Written follow-up summary within 48 hours',
    ],
    deliverables: [
      'Consultation summary document',
      'Prioritized action items',
      'Recommended tools and resources',
    ],
    estimatedTime: 'Scheduled within 5 business days',
    requirements: [
      'Completed pre-call questionnaire',
      'Relevant documentation shared in advance',
    ],
    image: img(1),
  },
];

export const products: Product[] = seeds.map((s) => ({
  ...s,
  authorization: AUTH,
}));

export const categories = [
  'Penetration Testing',
  'Web Application Security Audit',
  'API Security Audit',
  'Mobile App Security Testing',
  'Network Security Assessment',
  'Cloud Security Assessment',
  'Vulnerability Assessment',
  'Security Code Review',
  'Malware Analysis',
  'Incident Response',
  'Security Monitoring',
  'OSINT Investigation',
  'Security Awareness Training',
  'CTF / Cybersecurity Training',
  'Security Consultation',
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  );
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
