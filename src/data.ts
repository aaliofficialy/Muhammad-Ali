import { Service, Project, Skill, Testimonial, Article } from "./types";

export const PERSONAL_INFO = {
  name: "Muhammad Ali",
  title: "IT, Crypto & Social Growth Expert",
  tagline: "Bridging the gap between cutting-edge enterprise infrastructure, sovereign decentralized finance, and viral audience growth engines.",
  location: "Available Globally",
  experienceYears: 8,
  completedProjects: 140,
  clientRetention: "96%",
  consultationHours: "1,200+",
  email: "mohammad.ali.official@hotmail.com",
  whatsapp: "+923344556563", // placeholder or real, user specified "WhatsApp button"
  whatsappLink: "https://wa.me/923344556563?text=Hi%20Muhammad%20Ali,%20I'd%20like%20to%20book%20a%20consultation%20with%20you.",
  linkedin: "https://www.linkedin.com/in/muhammadaliqasim/",
  twitter: "https://x.com/MrAliofficiali/",
  github: "",
  bioShort: "Muhammad Ali is a multi-dimensional digital strategist and technical architect. He resolves complex infrastructure challenges, designs secure system architectures, advises on sovereign blockchain architectures, and scales digital brands into viral B2B lead generation engines.",
  itExpertiseDescription: "Over 8 years building, securing, and scaling high-performance networks, cloud clusters, and hybrid data platforms. Specialist in translating complex business requirements into resilient, fault-tolerant, and secure digital landscapes.",
  cryptoExpertiseDescription: "Deeply entrenched in the blockchain ecosystem since 2017. Experienced in sophisticated Web3 research, deep tokenomics modeling, and designing viral community flywheels that turn initial audience attention into loyal network participants."
};

export const SERVICES: Service[] = [
  {
    id: "web-solutions",
    title: "Enterprise Web Solutions",
    subtitle: "High-Performance Modern Deployments",
    description: "Design and implementation of full-stack responsive applications using cutting-edge frameworks. Optimised for sub-second page loads, SEO friendliness, and resilient scale.",
    icon: "Globe",
    category: "IT",
    features: [
      "Custom React, Next.js & Vite SPAs/MPAs",
      "Robust API integration and headless CMS setups",
      "Dynamic data-driven dashboards and CRM tools",
      "Sub-second load times & Core Web Vitals compliance"
    ]
  },
  {
    id: "system-architecture",
    title: "System Architecture & Security",
    subtitle: "Bulletproof Enterprise Foundations",
    description: "Architecting cloud-native and hybrid environments following zero-trust principles. Custom intrusion detection systems, rigorous threat vector analysis, and bulletproof networks.",
    icon: "ShieldAlert",
    category: "IT",
    features: [
      "AWS & Google Cloud landing zone configuration",
      "Zero-Trust cybersecurity posture & IAM security audit",
      "CI/CD automation pipelines with GitHub Actions/Docker",
      "Database clustering, indexing & load balancer setups"
    ]
  },
  {
    id: "ai-automations",
    title: "AI Automations & Workflows",
    subtitle: "Leverage Intelligent System Pipelines",
    description: "Custom AI integrations that automate repetitive operations. Save thousands of business hours weekly by linking generative models with your internal CRM, email, and task management systems.",
    icon: "Cpu",
    category: "IT",
    features: [
      "Generative LLM agent pipeline deployments",
      "Custom web-scraping & intelligent automated database entry",
      "Automated social scheduling & conversational support bots",
      "Multi-step Zapier/Make.com integration logic"
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & Growth Focus",
    subtitle: "High ROI Laser-Targeted Campaigns",
    description: "Data-driven advertising campaigns focused on converting high-intent leads into paying clients. Continuous A/B split-testing, smart retargeting vectors, and optimized acquisition workflows.",
    icon: "TrendingUp",
    category: "Digital",
    features: [
      "High-converting paid search & social campaign setups",
      "Pixel/CAPI integration for precise attribution scoring",
      "Full design and copywriting of conversion-optimized landing pages",
      "Analytical split-testing of hooks, offers, and flows"
    ]
  },
  {
    id: "social-media-growth",
    title: "Viral Social Media Growth",
    subtitle: "Turn Professional Attention into Capital",
    description: "Dominate high-trust social channels such as LinkedIn, X, and YouTube. Craft a distinct public persona, author highly magnetic threads, and design post schedules that stimulate massive network effects.",
    icon: "UsersShared",
    category: "Digital",
    features: [
      "Formulating complete brand & visual voice standards",
      "High-engagement writing templates & visual asset frameworks",
      "LinkedIn profile optimization for inbound B2B pipeline",
      "Strategic distribution mechanics to boost initial post algorithmic signals"
    ]
  },
  {
    id: "content-strategy",
    title: "SEO, Strategy & Storytelling",
    subtitle: "Authentic Copywriting that Educates and Converts",
    description: "Creating highly searched evergreen resources and authoritative industry insights. We fuse modern semantic SEO keyword structuring with compelling industry narratives that win people over.",
    icon: "BookOpen",
    category: "Digital",
    features: [
      "Rigorous semantic SEO content clustering",
      "Conversion-focused long-form copywriting & whitepapers",
      "Scriptwriting & visual editing for high-retention short videos",
      "Engaging newsletter sequences that build warm trust list-wide"
    ]
  },
  {
    id: "growth-consulting",
    title: "Business Growth Consulting",
    subtitle: "Elite Tactical Digital Advisory",
    description: "Direct executive consulting to streamline your business model, scale operational systems, design web sales funnels, optimize technical frameworks, and identify high-leverage growth opportunities.",
    icon: "Briefcase",
    category: "Consulting",
    features: [
      "One-on-one technology evaluation and tech stack audits",
      "Actionable market launch & growth roadmap creation",
      "Fractional CTO support for structural scaling",
      "Crypto tokenomics & decentralized asset distribution design"
    ]
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "How AI is Changing Modern Businesses",
    slug: "how-ai-is-changing-modern-businesses",
    excerpt: "Explore the transformative impact of Artificial Intelligence on corporate operations, decision-making, and customer experience.",
    content: "# How AI is Changing Modern Businesses\n\nArtificial Intelligence (AI) is no longer a futuristic concept; it's a present-day reality that is reshaping how businesses operate across the globe. From automating mundane tasks to providing deep insights through data analysis, AI is the engine driving the next industrial revolution.\n\n## The Automation Revolution\n\nOne of the most immediate impacts of AI is in process automation. Robotic Process Automation (RPA) allows companies to handle repetitive tasks with unprecedented speed and accuracy. This doesn't just save time; it frees up human workers to focus on higher-value activities that require creativity and emotional intelligence.\n\n## Data-Driven Decision Making\n\nModern businesses generate mountains of data. AI's ability to sift through this data and identify patterns is revolutionary. Predictive analytics can forecast market trends, while machine learning algorithms can optimize supply chains in real-time.\n\n### Key Benefits:\n- **Efficiency:** Streamlined operations.\n- **Insight:** Better understanding of customer behavior.\n- **Scale:** Ability to handle complex tasks at volume.",
    category: "AI & Automation",
    tags: ["Artificial Intelligence", "Business Strategy", "Future Tech"],
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    publishDate: "2026-05-15T09:00:00Z",
    author: {
      name: "Muhammad Ali",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      title: "IT & AI Expert"
    },
    featured: true,
    status: "published"
  },
  {
    id: "art-2",
    title: "Beginner Guide to Cryptocurrency Investment",
    slug: "beginner-guide-to-cryptocurrency-investment",
    excerpt: "A comprehensive introduction to the world of digital assets, blockchain technology, and safe investment strategies.",
    content: "# Beginner Guide to Cryptocurrency Investment\n\nVenturing into the world of cryptocurrency can feel like stepping onto another planet. With its own language and volatile markets, it's essential to have a solid foundation before diving in.\n\n## Understanding Blockchain\n\nAt its core, cryptocurrency is powered by blockchain technology—a decentralized, distributed ledger that records all transactions across a network of computers. This architecture ensures transparency and security without the need for a central authority.\n\n## Investment Strategies\n\n1. **Dollar-Cost Averaging (DCA):** Investing a fixed amount regularly, regardless of the price.\n2. **HODLing:** Holding onto assets for the long term.\n3. **Diversification:** Never putting all your eggs in one basket.",
    category: "Crypto",
    tags: ["Blockchain", "Finance", "Investment"],
    thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=80",
    publishDate: "2026-05-20T10:30:00Z",
    author: {
      name: "Muhammad Ali",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      title: "Crypto Analyst"
    },
    featured: true,
    status: "published"
  },
  {
    id: "art-3",
    title: "Best Practices for Website Security in 2026",
    slug: "best-practices-website-security-2026",
    excerpt: "As cyber threats evolve, learn how to fortify your digital infrastructure against the sophisticated attack vectors of 2026.",
    content: "# Best Practices for Website Security in 2026\n\n## The Evolving Landscape\nIn 2026, the digital landscape has shifted toward quantum-resistant cryptography and AI-driven automated attacks. Protecting your website is no longer just about basic firewalls; it is a holistic strategy.\n\n## Zero-Trust Architecture\nImplementing a Zero-Trust framework is mandatory. Never trust, always verify, regardless of whether the traffic originates from inside or outside your perimeter.\n\n## AI-Driven Threat Detection\nWe are now leveraging neural networks to monitor traffic patterns in real-time. By identifying anomalies before they manifest as breaches, you stay ahead of malicious actors.\n\n## The Role of Decentralized Identity\nMove away from traditional password systems. Biometric authentication combined with decentralized identity protocols ensures that user data remains inherently secure.\n\n### Conclusion\nSecurity is a process, not a destination. By prioritizing encryption, AI monitoring, and rigorous access controls, you can shield your business from the risks of tomorrow.",
    category: "Cybersecurity",
    tags: ["security", "cybersecurity", "2026", "web-dev"],
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    publishDate: "2026-03-15T09:00:00Z",
    author: {
      name: "Muhammad Ali",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      title: "Expert"
    },
    featured: false,
    status: "published"
  },
  {
    id: "art-4",
    title: "How to Build a Professional Online Presence",
    slug: "build-professional-online-presence",
    excerpt: "Establishing credibility in the digital age requires more than just a website; it requires a cohesive brand narrative.",
    content: "# Building a Professional Online Presence\n\n## Defining Your Brand Identity\nYour online presence is the sum total of every touchpoint. In 2026, authenticity is the primary currency of influence.\n\n## The Multi-Channel Approach\nIt is not enough to be present; you must be consistent. Your tone, visual identity, and values should align across LinkedIn, your personal website, and professional communities.\n\n## Content as Authority\nPublishing high-quality, long-form content positions you as a thought leader. It demonstrates expertise rather than just claiming it.\n\n### Practical Steps\n1. Audit your current digital footprint.\n2. Optimize your platforms for search and discoverability.\n3. Engage with your community through meaningful discussions.\n\nBy carefully curating your digital identity, you open doors to new partnerships and professional opportunities.",
    category: "Professional Development",
    tags: ["branding", "career", "professionalism", "networking"],
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    publishDate: "2026-04-10T10:30:00Z",
    author: {
      name: "Muhammad Ali",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      title: "Expert"
    },
    featured: false,
    status: "published"
  },
  {
    id: "art-5",
    title: "AI Automation for Small Businesses",
    slug: "ai-automation-small-businesses",
    excerpt: "Small businesses can now leverage AI to compete with industry giants. Discover how to automate operations efficiently.",
    content: "# AI Automation for Small Businesses\n\n## The Automation Revolution\nAutomation has reached a point of accessibility where small teams can perform like large enterprises. From automated CRM workflows to generative AI customer support, the barrier to entry has vanished.\n\n## Streamlining Operations\n- **Client Onboarding:** Use AI chatbots to handle documentation and FAQs.\n- **Marketing Workflow:** Automated content repurposing saves hours of manual work.\n- **Data Analytics:** Real-time dashboards keep you informed on KPIs.\n\n## The ROI of AI\nInvesting in automation tools pays for itself within months. It frees up your team to focus on high-level strategy and creative problem solving.\n\n### Getting Started\nIdentify your most repetitive tasks. Pick one and automate it this week. The key is iterative improvement.",
    category: "AI & Automation",
    tags: ["AI", "automation", "small-business", "productivity"],
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    publishDate: "2026-05-02T11:00:00Z",
    author: {
      name: "Muhammad Ali",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      title: "Expert"
    },
    featured: true,
    status: "published"
  },
  {
    id: "art-6",
    title: "Future of Digital Marketing and SEO",
    slug: "future-digital-marketing-seo",
    excerpt: "As search engines integrate generative AI, the future of SEO is changing. Prepare your strategy for the next phase.",
    content: "# Future of Digital Marketing and SEO\n\n## Beyond Keywords\nIn 2026, SEO is no longer about keyword stuffing. It is about semantic understanding and intent-based content discovery.\n\n## Generative Search Experience (GSE)\nUsers are increasingly asking questions to AI engines rather than clicking through traditional link results. You must position your content to be the definitive source for AI summarization tools.\n\n## The Rise of Conversational Marketing\nMarketing is becoming a two-way street. Personalized AI agents help guide consumers through the funnel, providing custom answers in real-time.\n\n## Data Privacy and Marketing\nWith stricter regulations, first-party data is more valuable than ever. Build direct relationships with your audience through owned channels like newsletters and private communities.\n\n### Conclusion\nAdaptability is the only constant. Focus on building high-value content that serves human needs, and the algorithms will follow.",
    category: "Marketing",
    tags: ["marketing", "SEO", "future", "trends"],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    publishDate: "2026-06-20T08:00:00Z",
    author: {
      name: "Muhammad Ali",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      title: "Expert"
    },
    featured: false,
    status: "published"
  },
  {
    id: "art-7",
    title: "System Infrastructure Essentials for Businesses",
    slug: "system-infrastructure-essentials-for-businesses",
    excerpt: "A deep dive into building a robust, scalable digital foundation for modern enterprises.",
    content: "# System Infrastructure Essentials for Businesses\n\nIn the digital age, your IT infrastructure is the backbone of your organization. Whether you are a startup or a growing enterprise, a solid technical foundation determines your speed, reliability, and security.\n\n## The Cloud Strategy\nCloud computing is no longer optional. Moving to platforms like AWS, Azure, or GCP allows businesses to shift from CapEx to OpEx. However, the move requires careful planning regarding data sovereignty and vendor lock-in.\n\n## Network Reliability and Redundancy\nFor any business, downtime is revenue lost. Implementing load balancing, content delivery networks (CDNs), and multi-region backups ensures that your services remain accessible even during hardware failures.\n\n## Scalability and Monitoring\nInfrastructure must be elastic. Use tools like Kubernetes or serverless architectures to handle spikes in traffic. Furthermore, comprehensive monitoring via Prometheus or Datadog is non-negotiable for identifying bottlenecks before they impact the user experience.\n\n## Security Integration\nInfrastructure security, or 'Infrastructure as Code' (IaC), allows you to define your environments securely. By using tools like Terraform, you ensure that configurations are version-controlled and auditable.",
    category: "IT Infrastructure",
    tags: ["Cloud", "IT Strategy", "Infrastructure"],
    thumbnail: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=1200&q=80",
    publishDate: "2026-06-22T09:00:00Z",
    author: {
      name: "Muhammad Ali",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      title: "Expert"
    },
    featured: true,
    status: "published"
  },
  {
    id: "art-8",
    title: "Common Cybersecurity Mistakes to Avoid",
    slug: "common-cybersecurity-mistakes-to-avoid",
    excerpt: "Is your business vulnerable? Learn about the most common security oversights and how to fix them.",
    content: "# Common Cybersecurity Mistakes to Avoid\n\nCybersecurity is a process, not a destination. Even large corporations fall victim to simple oversights that lead to catastrophic breaches.\n\n## Weak Password Policies\nDespite warnings, many organizations still rely on simple passwords or fail to implement Multi-Factor Authentication (MFA). MFA should be the standard for every employee, regardless of their role.\n\n## Neglecting Patch Management\nSoftware vulnerabilities are discovered daily. Failing to update your OS, CMS, or server-side libraries leaves a wide door open for automated exploits.\n\n## Lack of Employee Training\nPhishing remains the #1 entry point for attackers. Your team is your first line of defense; if they cannot spot a malicious email, your firewall is irrelevant.\n\n## Data Backup Overconfidence\nHaving a backup is not enough. You must test your restoration process regularly. If your data is encrypted by ransomware, a backup that isn't isolated from the network is useless.",
    category: "Cybersecurity",
    tags: ["Security", "Privacy", "Risk Management"],
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    publishDate: "2026-06-25T09:00:00Z",
    author: {
      name: "Muhammad Ali",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      title: "Expert"
    },
    featured: false,
    status: "published"
  },
  {
    id: "art-9",
    title: "How to Scale Freelance Services Online",
    slug: "how-to-scale-freelance-services-online",
    excerpt: "Shift from trading time for money to building a scalable service business.",
    content: "# How to Scale Freelance Services Online\n\nMany freelancers hit a 'revenue ceiling' because they rely solely on their own billable hours. Scaling requires a shift in mindset from individual contributor to business owner.\n\n## Productizing Your Services\nStop selling bespoke hours and start selling defined packages. A package with a fixed price and clear deliverable is easier to sell, scale, and outsource.\n\n## Building Systems for Outreach\nStop relying on referrals alone. Use content marketing, SEO, and targeted LinkedIn outreach to build a predictable lead generation pipeline.\n\n## Hiring and Outsourcing\nOnce your processes are documented (SOPs), hire virtual assistants or junior contractors to handle routine tasks. This frees up your time to focus on high-value client strategy and business development.\n\n## Scaling Through Automation\nImplement CRM tools, automated invoicing, and project management platforms like Asana or Notion to handle the administrative load that comes with managing more clients.",
    category: "Professional Development",
    tags: ["Freelancing", "Entrepreneurship", "Scaling"],
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    publishDate: "2026-06-28T09:00:00Z",
    author: {
      name: "Muhammad Ali",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      title: "Expert"
    },
    featured: true,
    status: "published"
  },
  {
    id: "art-10",
    title: "Crypto Risk Management for Beginners",
    slug: "crypto-risk-management-for-beginners",
    excerpt: "Essential strategies to protect your digital assets in the volatile crypto landscape.",
    content: "# Crypto Risk Management for Beginners\n\nThe cryptocurrency market is notorious for its volatility. If you are exploring digital assets, your priority should be preservation of capital rather than rapid gains.\n\n## Understanding Volatility\nMarket swings of 20% in a day are common. Never invest money you cannot afford to lose entirely. Use a dollar-cost averaging (DCA) strategy to mitigate the risk of buying at market peaks.\n\n## The Importance of Self-Custody\n'Not your keys, not your coins.' Keeping large amounts of crypto on centralized exchanges exposes you to counterparty risk. Learn how to use hardware wallets (like Ledger or Trezor) to maintain full control over your assets.\n\n## Diversification\nDo not put all your capital into a single asset, regardless of the hype. A portfolio should include blue-chip assets (BTC, ETH) alongside lower-risk stablecoin yields.\n\n## Security Hygiene\nUse unique, strong passwords for every exchange account. Enable 2FA using authentication apps rather than SMS, which is susceptible to SIM-swapping attacks.",
    category: "Crypto",
    tags: ["Crypto", "Finance", "Investment"],
    thumbnail: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=1200&q=80",
    publishDate: "2026-06-30T09:00:00Z",
    author: {
      name: "Muhammad Ali",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      title: "Expert"
    },
    featured: false,
    status: "published"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Enterprise Cloud Migration & Threat Hardening",
    description: "Architected and executed a zero-downtime microservices cloud migration for an international fintech platform, adding high-grade encryption and network segregation.",
    category: "IT / Dev",
    metrics: [
      { label: "Downtime during switchover", value: "0.0s" },
      { label: "Infrastructure Cost savings", value: "32% YoY" },
      { label: "Vulnerability Score Reduced", value: "98.5%" }
    ],
    technologies: ["Google Cloud PLATFORM", "Kubernetes", "Terraform", "Nginx", "Docker", "Wireshark"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/muhammad-ali-expert/cloud-hardening",
    featured: true
  },
  {
    id: "project-2",
    title: "Decentralized Liquidity & Tokenomics Modeling",
    description: "Designed a comprehensive token emission schedule, liquidity provision strategy, and on-chain intelligence monitor dashboard for a high-performance Web3 asset protocol.",
    category: "Crypto",
    metrics: [
      { label: "Total Asset Under Advisory", value: "$18.5M" },
      { label: "On-chain Tracking Latency", value: "<15s" },
      { label: "Liquidity Efficiency Lift", value: "4.2x" }
    ],
    technologies: ["Solidity", "Python", "Ethers.js", "Grafana", "Web3.js", "Excel Strategy Modeling"],
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/muhammad-ali-expert/defi-modeling",
    featured: true
  },
  {
    id: "project-3",
    title: "LinkedIn Viral Growth & B2B Funnel Engine",
    description: "Formulated and launched a strategic content engine for a notable technology consultancy executive, catapulting visibility, generating inbound inquiries, and optimizing conversions.",
    category: "Social Growth",
    metrics: [
      { label: "Impressions Generated", value: "12.4M" },
      { label: "B2B Followers Gained", value: "34,200+" },
      { label: "Direct Inbound Pipeline", value: "$410k" }
    ],
    technologies: ["LinkedIn Algorithmic Engine", "Type-form", "Zapier", "Figma Brandboard", "SEO Copywriting"],
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80",
    link: "https://muhammad-ali-expert.com/social-engine",
    featured: true
  },
  {
    id: "project-4",
    title: "AI CRM Automation Suite for Real Estate",
    description: "Integrated custom large language models with a property group CRM to automatically parse web inquiries, scrape public listings, and compose customized emails in real-time.",
    category: "IT / Dev",
    metrics: [
      { label: "Lead Response Latency", value: "45 sec" },
      { label: "Administrative Time Saved", value: "28 hr/wk" },
      { label: "Inquiry-to-call conversion", value: "+44%" }
    ],
    technologies: ["Node.js/Express", "Gemini API", "Make.com", "HubSpot CRM", "Puppeteer Client"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/muhammad-ali-expert/ai-crm-automation",
    featured: false
  },
  {
    id: "project-5",
    title: "On-Chain Crypto Intelligence Platform",
    description: "Developed a private on-chain analytics dashboard that triggers alerts on sudden large institutional volume flows, whale activity, and smart money token accumulation patterns.",
    category: "Crypto",
    metrics: [
      { label: "Active Whale Monitored", value: "2,200+" },
      { label: "Signal Accuracy Ratio", value: "81%" },
      { label: "User Influx Growth", value: "240% MoM" }
    ],
    technologies: ["React SPA", "Node.js API", "D3.js Data Engine", "The Graph GraphQL API", "Pocket Network Nodes"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/muhammad-ali-expert/crypto-intel",
    featured: false
  }
];

export const SKILLS: Skill[] = [
  // IT
  { name: "System & Cloud Architecture", level: 95, category: "IT & Architecture", yearsOfExp: 8 },
  { name: "Cybersecurity & Zero-Trust Auditing", level: 90, category: "IT & Architecture", yearsOfExp: 6 },
  { name: "Network Infrastructure Engineering", level: 92, category: "IT & Architecture", yearsOfExp: 8 },
  { name: "Database & Backend Engineering", level: 88, category: "IT & Architecture", yearsOfExp: 7 },
  
  // Crypto
  { name: "On-Chain Analytics & Research", level: 94, category: "Crypto & Finance", yearsOfExp: 6 },
  { name: "Tokenomics Modeling & Design", level: 86, category: "Crypto & Finance", yearsOfExp: 4 },
  { name: "DeFi Liquidity Optimization Strategy", level: 89, category: "Crypto & Finance", yearsOfExp: 5 },
  
  // Growth
  { name: "LinkedIn Algorithm & Influence Growth", level: 96, category: "Growth & Creation", yearsOfExp: 5 },
  { name: "Content Strategy & Copywriting", level: 94, category: "Growth & Creation", yearsOfExp: 6 },
  { name: "Dynamic Web Development (React/Vite)", level: 85, category: "Growth & Creation", yearsOfExp: 5 },
  
  // AI & Tools
  { name: "LLM, RAG & Gemini Integrations", level: 91, category: "AI & Tools", yearsOfExp: 3 },
  { name: "Workflow Automations (Zapier / Make)", level: 95, category: "AI & Tools", yearsOfExp: 4 },
  { name: "SEO & Storytelling frameworks", level: 92, category: "AI & Tools", yearsOfExp: 6 }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Alex Thorne",
    role: "CEO & Founder",
    company: "Apex Tech Capital",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "Muhammad Ali completely transformed our technical architecture. He migrated our entire pipeline to Google Cloud with zero downtime. His understanding of security protocols and cloud scalability is elite. Our digital environment has never felt more secure."
  },
  {
    id: "t-2",
    name: "Soraya Vane",
    role: "Marketing Director",
    company: "Nexa Finance Group",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "We hired Ali to scale our brand presence on LinkedIn. Our primary profiles went from quiet resumes to active lead funnels in weeks, pulling in high-tier corporate partners and generating over 40 million views. His viral content hooks are backed by actual data science."
  },
  {
    id: "t-3",
    name: "Marcus Vance",
    role: "Core Contributor",
    company: "DeFi Prism Labs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "Ali's crypto macro insights and on-chain flow analysis have been an invaluable asset. When auditing our protocol's initial tokenomics and community launch schedule, his feedback saved us from critical design pitfalls. An absolute genius."
  },
  {
    id: "t-4",
    name: "Nadir Shah",
    role: "Operations VP",
    company: "Omni Logistics Co.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "The AI automations Muhammad implemented saved our back-office team more than 30 hours a week. From automatic invoice matching to parsing driver files, the precision and execution speed were outstanding. Outstanding ROI."
  }
];

export const FAQS = [
  {
    q: "How do we collaborate on projects?",
    a: "We begin with a granular 45-minute technical and strategic consultation call. We discuss your current technical hurdles, target branding audience, or financial objectives. From there, I draft a detailed action roadmap, cost structures, and milestone estimates."
  },
  {
    q: "Do you specialize in IT infrastructure or digital growth?",
    a: "Both, which is my strongest competitive advantage. In modern business, technology and growth are inseparable. A high-performance product cannot convert without a smart growth loop, and high-volume viral traffic will crash a poorly designed database structure. I unify both domains."
  },
  {
    q: "What types of crypto services or consulting do you provide?",
    a: "I provide institutional and private crypto services including on-chain data tracking, security reviews of protocol smart contracts, comprehensive tokenomics architecture modeling, and community seed strategies. I do not provide financial advice."
  },
  {
    q: "Can you train our in-house teams?",
    a: "Yes. I offer custom intensive team workshops on Cloud Architecture protocols, zero-trust network setups, LinkedIn content creation frameworks, and adopting custom AI automation flows within standard corporate environments."
  }
];
