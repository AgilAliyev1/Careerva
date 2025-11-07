export const DEMO_ACCOUNT_EMAIL = "member@gmail.com";

export interface DemoCourseProfile {
  full_name: string;
}

export interface DemoCourseModule {
  title: string;
  description: string;
}

export interface DemoCourseResource {
  title: string;
  description: string;
  url?: string;
}

export interface DemoCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor_id: string;
  scheduled_date: string;
  duration_minutes: number;
  meeting_link: string;
  profiles: DemoCourseProfile;
  longDescription?: string;
  keyTakeaways?: string[];
  audience?: string;
  prerequisites?: string[];
  modules?: DemoCourseModule[];
  resources?: DemoCourseResource[];
  tools?: string[];
  level?: "Beginner" | "Intermediate" | "Advanced";
}

export const demoCourses: DemoCourse[] = [
  {
    id: "demo-ai-product",
    title: "AI Product Strategy for Startups",
    description: "Build a product roadmap that integrates AI features responsibly and effectively.",
    category: "Business",
    instructor_id: "demo-instructor-1",
    scheduled_date: "2024-08-05T14:00:00.000Z",
    duration_minutes: 90,
    meeting_link: "https://meet.google.com/aiu-strt-gov",
    profiles: {
      full_name: "Leyla Mammadova",
    },
    level: "Advanced",
    audience: "Founders, product managers, and innovation leads preparing to launch AI-powered products.",
    longDescription:
      "Lay the strategic groundwork for AI-enabled products with a live walkthrough of positioning, differentiation, and ethical guardrails. We'll explore market fit, data strategy, and how to scope MVP experiments that investors take seriously.",
    keyTakeaways: [
      "Distinguish hype from viable AI use cases for your product",
      "Structure an MVP roadmap that balances data, UX, and compliance",
      "Pitch your AI product vision with measurable outcomes",
    ],
    prerequisites: [
      "Working knowledge of product discovery",
      "Familiarity with agile delivery rituals",
    ],
    modules: [
      {
        title: "Strategic Positioning Lab",
        description: "Define the customer and problem statement your AI product is uniquely positioned to solve.",
      },
      {
        title: "Responsible AI Canvas",
        description: "Map data sources, model choices, and risk mitigations with a guided template.",
      },
      {
        title: "Investor-Ready Narrative",
        description: "Translate your roadmap into a succinct pitch with traction metrics and KPIs.",
      },
    ],
    resources: [
      {
        title: "AI Product Strategy Canvas",
        description: "Downloadable worksheet for prioritising experiments and features.",
      },
      {
        title: "Responsible AI Checklist",
        description: "A step-by-step review to run through before shipping AI features.",
        url: "https://responsible.ai/checklist",
      },
    ],
    tools: ["Miro", "Figma", "Notion", "Looker"],
  },
  {
    id: "demo-frontend",
    title: "Design Systems for Frontend Engineers",
    description: "Create scalable component libraries with accessibility baked in from day one.",
    category: "Programming",
    instructor_id: "demo-instructor-2",
    scheduled_date: "2024-08-08T09:30:00.000Z",
    duration_minutes: 75,
    meeting_link: "https://meet.google.com/dsgn-sys-tem",
    profiles: {
      full_name: "Kamran Aliyev",
    },
    level: "Intermediate",
    audience: "Frontend engineers and tech leads scaling component libraries across squads.",
    longDescription:
      "Ship a resilient design system with guardrails for accessibility, theming, and rapid iteration. We'll dive into token architecture, component API design, and real-world rollout tactics from teams shipping weekly.",
    keyTakeaways: [
      "Define a design token strategy that scales across brands",
      "Build accessible, composable React components",
      "Roll out governance rituals that designers and engineers love",
    ],
    prerequisites: ["Comfortable with React and TypeScript", "Basic understanding of Storybook or similar tooling"],
    modules: [
      {
        title: "Token Foundations",
        description: "Map brand foundations to semantic tokens and establish naming conventions.",
      },
      {
        title: "Component API Patterns",
        description: "Design React component contracts that balance flexibility with guardrails.",
      },
      {
        title: "Adoption Playbook",
        description: "Plan release trains, documentation, and governance rituals for your org.",
      },
    ],
    resources: [
      {
        title: "Design System Starter Repository",
        description: "Baseline repository structure with linting, Storybook, and testing setup.",
      },
      {
        title: "Accessibility Audit Checklist",
        description: "A repeatable process for testing WCAG compliance in new components.",
      },
    ],
    tools: ["Storybook", "Figma", "Chromatic", "Ladle"],
  },
  {
    id: "demo-ux-research",
    title: "UX Research Sprints",
    description: "Learn to validate ideas quickly with stakeholder-ready insights in five days or less.",
    category: "Design",
    instructor_id: "demo-instructor-3",
    scheduled_date: "2024-08-12T16:00:00.000Z",
    duration_minutes: 60,
    meeting_link: "https://meet.google.com/uxrs-rnch-lab",
    profiles: {
      full_name: "Nigar Suleymanova",
    },
    level: "Intermediate",
    audience: "Product designers, UX researchers, and product managers running lean validation cycles.",
    longDescription:
      "Master a five-day research cadence that uncovers insight, aligns stakeholders, and de-risks launches. We'll rehearse planning, recruiting, synthesis, and executive storytelling so you can move ideas forward fast.",
    keyTakeaways: [
      "Design scrappy research plans tailored to tight timelines",
      "Facilitate interviews that surface actionable insight",
      "Synthesize findings into stakeholder-ready stories",
    ],
    prerequisites: ["Experience conducting user interviews", "Access to a customer panel or recruiting platform"],
    modules: [
      {
        title: "Sprint Planning",
        description: "Scope the research question, recruit participants, and define success criteria.",
      },
      {
        title: "Live Facilitation",
        description: "Role-play interviews and usability tests with structured note-taking templates.",
      },
      {
        title: "Insight Storytelling",
        description: "Translate raw data into a compelling share-out with recommendations.",
      },
    ],
    resources: [
      {
        title: "Research Sprint Toolkit",
        description: "Editable scripts, consent forms, and synthesis boards to reuse with your team.",
      },
      {
        title: "Stakeholder Readout Template",
        description: "Presentation deck outline for sharing sprint insights in under 10 minutes.",
      },
    ],
    tools: ["Miro", "Dovetail", "Zoom", "FigJam"],
  },
  {
    id: "demo-finance",
    title: "Financial Modeling with Excel & AI",
    description: "Blend spreadsheet mastery with AI copilots to ship board-ready models fast.",
    category: "Business",
    instructor_id: "demo-instructor-4",
    scheduled_date: "2024-08-15T11:00:00.000Z",
    duration_minutes: 80,
    meeting_link: "https://meet.google.com/fncl-mdls-ai1",
    profiles: {
      full_name: "Elvin Rahimov",
    },
    level: "Intermediate",
    audience: "Finance professionals and operators building investor-ready forecasts.",
    longDescription:
      "Upgrade your financial models with automation and AI-assisted checks. We'll build revenue, cost, and cash flow models together, layer on scenario planning, and pair AI copilots for faster what-if analysis.",
    keyTakeaways: [
      "Structure dynamic revenue and expense models",
      "Use AI copilots to stress test assumptions",
      "Deliver polished dashboards that investors trust",
    ],
    prerequisites: ["Solid Excel fundamentals", "Understanding of core financial statements"],
    modules: [
      {
        title: "Model Architecture",
        description: "Lay out tabs, driver trees, and assumptions in a scalable workbook.",
      },
      {
        title: "Scenario Planning",
        description: "Layer on dynamic scenarios with goal seek and solver walkthroughs.",
      },
      {
        title: "AI-Assisted QA",
        description: "Pair ChatGPT-like copilots with Excel to catch errors and generate commentary.",
      },
    ],
    resources: [
      {
        title: "Three Statement Model Template",
        description: "Pre-built Excel model ready for customisation.",
      },
      {
        title: "Scenario Planning Playbook",
        description: "Guide to building base, upside, and downside cases with AI copilots.",
      },
    ],
    tools: ["Microsoft Excel", "ChatGPT", "Power Query", "Looker"],
  },
  {
    id: "demo-brand-story",
    title: "Brand Storytelling in Azerbaijani",
    description: "Craft authentic narratives for local audiences across social platforms.",
    category: "Languages",
    instructor_id: "demo-instructor-5",
    scheduled_date: "2024-08-20T18:30:00.000Z",
    duration_minutes: 70,
    meeting_link: "https://meet.google.com/brnd-stor-az1",
    profiles: {
      full_name: "Aysel Guliyeva",
    },
    level: "Beginner",
    audience: "Creators, marketers, and founders crafting campaigns for Azerbaijani audiences.",
    longDescription:
      "Tell unforgettable stories in Azerbaijani that resonate on social, pitch stages, and community events. We'll explore cultural nuance, language rhythms, and multimedia storytelling techniques.",
    keyTakeaways: [
      "Structure stories that hook and hold attention",
      "Localise brand messages without losing global voice",
      "Build a repeatable storytelling practice",
    ],
    prerequisites: ["Basic Azerbaijani fluency", "Desire to experiment with multimedia formats"],
    modules: [
      {
        title: "Narrative Frameworks",
        description: "Practice three story arcs that resonate with regional audiences.",
      },
      {
        title: "Voice & Tone Lab",
        description: "Workshop scripts and captions to align brand voice with platform culture.",
      },
      {
        title: "Multimedia Story Studio",
        description: "Prototype visuals, audio hooks, and live moments for your next campaign.",
      },
    ],
    resources: [
      {
        title: "Story Arc Cheat Sheet",
        description: "Quick reference for choosing the right structure for your story.",
      },
      {
        title: "Voice & Tone Library",
        description: "Swipeable examples of high-performing Azerbaijani captions.",
      },
    ],
    tools: ["Canva", "CapCut", "Notion", "Adobe Express"],
  },
  {
    id: "demo-ielts",
    title: "IELTS Speaking Labs",
    description: "Weekly live labs with personalized feedback from certified IELTS coaches.",
    category: "Languages",
    instructor_id: "demo-instructor-6",
    scheduled_date: "2024-08-22T07:30:00.000Z",
    duration_minutes: 60,
    meeting_link: "https://meet.google.com/ielt-speak-lab",
    profiles: {
      full_name: "Rashad Huseynov",
    },
    level: "Intermediate",
    audience: "Learners targeting Band 7+ in the IELTS speaking exam.",
    longDescription:
      "Polish your IELTS speaking score with weekly drills, mock interviews, and targeted feedback. We'll rehearse real exam scenarios and build confidence across Parts 1-3.",
    keyTakeaways: [
      "Master examiner expectations for Band 7+",
      "Develop pacing, fluency, and pronunciation habits",
      "Receive personalised feedback from certified coaches",
    ],
    prerequisites: ["Intermediate English proficiency", "Commitment to weekly speaking practice"],
    modules: [
      {
        title: "Warm-Up & Fluency",
        description: "Rapid-fire prompts to boost spontaneity and coherence.",
      },
      {
        title: "Mock Interview",
        description: "Simulated Parts 2 and 3 with real-time scoring rubrics.",
      },
      {
        title: "Feedback Clinic",
        description: "Actionable drills tailored to each participant's weak points.",
      },
    ],
    resources: [
      {
        title: "IELTS Band Descriptor Guide",
        description: "Understand what examiners look for at each band score.",
      },
      {
        title: "Weekly Speaking Prompts",
        description: "Practice prompts organised by difficulty and topic.",
      },
    ],
    tools: ["Zoom", "Google Docs", "Voice Recorder", "Anki"],
  },
  {
    id: "demo-azure-ai-ops",
    title: "Azure AI Ops in Production",
    description: "Deploy and monitor AI workloads on Azure with confidence and control.",
    category: "Programming",
    instructor_id: "demo-instructor-ulvi",
    scheduled_date: "2024-08-25T10:00:00.000Z",
    duration_minutes: 90,
    meeting_link: "https://meet.google.com/ai-ops-azr",
    profiles: {
      full_name: "Ulvi Bayramov",
    },
    level: "Advanced",
    audience: "Cloud engineers and ML specialists deploying models to Azure at scale.",
    longDescription:
      "Roll out resilient AI workloads on Azure with observability, automation, and governance. Ulvi shares the exact playbooks used to keep enterprise inference humming.",
    keyTakeaways: [
      "Set up Azure Machine Learning for repeatable deployments",
      "Automate retraining and rollbacks with Azure Pipelines",
      "Wire up monitoring that blends telemetry with human-in-the-loop reviews",
    ],
    prerequisites: ["Experience with Azure fundamentals", "Exposure to machine learning lifecycles"],
    modules: [
      {
        title: "Deployment Factory",
        description: "Design a GitOps pipeline to promote models from staging to production.",
      },
      {
        title: "Observability Dashboards",
        description: "Instrument models with data drift, latency, and cost guardrails.",
      },
      {
        title: "Responsible AI Reviews",
        description: "Establish human checkpoints and escalation paths for high-risk releases.",
      },
    ],
    resources: [
      {
        title: "Azure ML Deployment Checklist",
        description: "Step-by-step launch guide with infrastructure as code templates.",
      },
      {
        title: "Model Monitoring Dashboard",
        description: "Power BI template tracking data drift, latency, and satisfaction.",
      },
    ],
    tools: ["Azure Machine Learning", "Azure Monitor", "Power BI", "GitHub Actions"],
  },
  {
    id: "demo-career-switch",
    title: "Career Switch Bootcamp",
    description: "Design a three-month roadmap to pivot into tech roles in Azerbaijan.",
    category: "Business",
    instructor_id: "demo-instructor-mentor",
    scheduled_date: "2024-08-27T17:00:00.000Z",
    duration_minutes: 80,
    meeting_link: "https://meet.google.com/career-switch",
    profiles: {
      full_name: "Turgut Piriyev",
    },
    level: "Beginner",
    audience: "Professionals planning a transition into product, design, or data roles.",
    longDescription:
      "Build momentum for your career change with a tactical plan, accountability, and local hiring insight. We'll map transferable skills, portfolio moves, and mentor touchpoints.",
    keyTakeaways: [
      "Clarify your target roles and value proposition",
      "Stand up a project portfolio that speaks to Azerbaijani employers",
      "Plan the next 90 days with measurable milestones",
    ],
    prerequisites: ["Motivation to transition into tech", "Willingness to show work weekly"],
    modules: [
      {
        title: "Skill Inventory & Story",
        description: "Audit your strengths and translate them into a tech narrative.",
      },
      {
        title: "Project Launchpad",
        description: "Scope 2-3 portfolio projects with mentor support.",
      },
      {
        title: "Job Search Systems",
        description: "Set up outreach cadences, community rituals, and accountability.",
      },
    ],
    resources: [
      {
        title: "Career Switch Notion Board",
        description: "Template to organise goals, mentors, and applications.",
      },
      {
        title: "Portfolio Story Bank",
        description: "Prompts for structuring compelling case studies.",
      },
    ],
    tools: ["Notion", "Canva", "LinkedIn", "Google Sheets"],
  },
  {
    id: "demo-creative-english",
    title: "Creative English for Presenters",
    description: "Unlock expressive English storytelling for pitches and stages.",
    category: "Languages",
    instructor_id: "demo-instructor-creative",
    scheduled_date: "2024-08-29T19:00:00.000Z",
    duration_minutes: 60,
    meeting_link: "https://meet.google.com/creative-english",
    profiles: {
      full_name: "Khadija Karimova",
    },
    level: "Intermediate",
    audience: "Presenters and students polishing English storytelling and delivery.",
    longDescription:
      "Bring colour and persuasion to your English presentations. Khadija helps you experiment with tone, cadence, and visuals tailored for Azerbaijani audiences.",
    keyTakeaways: [
      "Deliver vivid stories with advanced rhetorical devices",
      "Design visuals that reinforce your message",
      "Adopt rehearsal routines used by top presenters",
    ],
    prerequisites: ["Intermediate spoken English", "Comfort presenting in small groups"],
    modules: [
      {
        title: "Voice Warmups",
        description: "Drills to expand your vocal range and confidence.",
      },
      {
        title: "Story Sculpting",
        description: "Structure narratives with hooks, contrast, and emotion.",
      },
      {
        title: "Stagecraft Lab",
        description: "Practice delivery with live feedback from peers.",
      },
    ],
    resources: [
      {
        title: "Presentation Blueprint",
        description: "Google Slides template for high-impact presentations.",
      },
      {
        title: "Storytelling Prompts",
        description: "Creative prompts to unlock fresh angles for your talk.",
      },
    ],
    tools: ["Google Slides", "Zoom", "Canva", "Obsidian"],
  },
];

export const demoStudentProgress = {
  email: DEMO_ACCOUNT_EMAIL,
  stats: {
    completedCourses: 9,
    assessmentsAverage: 94,
    hoursWatched: 56,
    learningStreak: 21,
  },
  completedCourses: [
    {
      courseId: "demo-frontend",
      title: "Advanced Frontend Architecture",
      instructor: "Kamran Aliyev",
      completedOn: "2024-07-02",
      score: 96,
      skills: ["React", "TypeScript", "Design Systems"],
      instructorId: "demo-instructor-2",
      rating: 5,
    },
    {
      courseId: "demo-brand-story",
      title: "Storytelling for Product Pitches",
      instructor: "Aysel Guliyeva",
      completedOn: "2024-06-18",
      score: 92,
      skills: ["Narratives", "Pitch Design", "Copywriting"],
      instructorId: "demo-instructor-5",
      rating: 4,
    },
    {
      courseId: "demo-ux-research",
      title: "Leadership Communication Labs",
      instructor: "Rashad Huseynov",
      completedOn: "2024-06-04",
      score: 88,
      skills: ["Public Speaking", "Feedback", "Confidence"],
      instructorId: "demo-instructor-3",
      rating: 5,
    },
  ],
  assessments: [
    {
      title: "Live Product Strategy Simulation",
      score: 47,
      maxScore: 50,
      takenOn: "2024-07-05",
    },
    {
      title: "UX Research Case Study",
      score: 44,
      maxScore: 50,
      takenOn: "2024-06-21",
    },
    {
      title: "Leadership Presence Pitch",
      score: 45,
      maxScore: 50,
      takenOn: "2024-06-09",
    },
  ],
  achievements: [
    {
      title: "Pitch Day Champion",
      description: "Top score in the live product pitch simulation for July cohort.",
    },
    {
      title: "Course Completion Streak",
      description: "Completed 6 consecutive weeks of live learning without missing a session.",
    },
    {
      title: "Community Mentor",
      description: "Hosted 3 peer feedback circles for the Growth community.",
    },
  ],
  upcoming: [
    {
      title: "AI Product Strategy for Startups",
      date: "2024-08-05T14:00:00.000Z",
      action: "Join live to continue your startup MVP journey",
    },
    {
      title: "Mentor Check-in",
      date: "2024-08-07T15:30:00.000Z",
      action: "Share your revised pitch deck for review",
    },
  ],
  reputation: {
    rating: 4.9,
    totalReviews: 18,
    highlight: "Instructors praise your preparation and positive energy in every cohort.",
  },
};

export const demoSubscriptionAssignments: Record<
  string,
  {
    tier: "starter" | "growth" | "unlimited";
    price: number;
    coursesUsedThisMonth: number;
    lastReset: string;
  }
> = {
  "aqilliyev207@gmail.com": {
    tier: "unlimited",
    price: 100,
    coursesUsedThisMonth: 7,
    lastReset: "2024-07-01T00:00:00.000Z",
  },
  "aliyevagil21@gmail.com": {
    tier: "starter",
    price: 30,
    coursesUsedThisMonth: 1,
    lastReset: "2024-07-01T00:00:00.000Z",
  },
  "ulvibayramov1@gmail.com": {
    tier: "growth",
    price: 50,
    coursesUsedThisMonth: 2,
    lastReset: "2024-07-01T00:00:00.000Z",
  },
};

export const demoInstructorRatings: Record<
  string,
  {
    fullName: string;
    rating: number;
    totalReviews: number;
    strengths: string[];
    bio?: string;
  }
> = {
  "demo-instructor-1": {
    fullName: "Leyla Mammadova",
    rating: 4.8,
    totalReviews: 42,
    strengths: ["Strategic clarity", "Accountability", "Investor insight"],
  },
  "demo-instructor-2": {
    fullName: "Kamran Aliyev",
    rating: 4.9,
    totalReviews: 58,
    strengths: ["Code quality", "Mentorship", "Accessibility"],
  },
  "demo-instructor-3": {
    fullName: "Nigar Suleymanova",
    rating: 4.7,
    totalReviews: 31,
    strengths: ["Workshop energy", "Frameworks", "Practical templates"],
  },
  "demo-instructor-4": {
    fullName: "Elvin Rahimov",
    rating: 4.6,
    totalReviews: 24,
    strengths: ["Financial rigor", "Automation", "Scenario planning"],
  },
  "demo-instructor-5": {
    fullName: "Aysel Guliyeva",
    rating: 4.9,
    totalReviews: 65,
    strengths: ["Storytelling", "Community", "Voice coaching"],
  },
  "demo-instructor-6": {
    fullName: "Rashad Huseynov",
    rating: 4.8,
    totalReviews: 53,
    strengths: ["Confidence", "Structure", "Personalised feedback"],
  },
  "demo-instructor-ulvi": {
    fullName: "Ulvi Bayramov",
    rating: 4.95,
    totalReviews: 46,
    strengths: ["Azure architecture", "AI operations", "Team leadership"],
    bio: "Ulvi scales ML systems for energy and fintech teams, helping them deploy responsibly while shipping fast.",
  },
  "demo-instructor-mentor": {
    fullName: "Turgut Piriyev",
    rating: 4.85,
    totalReviews: 39,
    strengths: ["Career pivots", "Networking", "Hiring manager insight"],
  },
  "demo-instructor-creative": {
    fullName: "Khadija Karimova",
    rating: 4.92,
    totalReviews: 28,
    strengths: ["Stage presence", "Language coaching", "Confidence"],
  },
};

export const demoForumThreads = [
  {
    id: "thread-ai-hiring",
    title: "How do you position AI projects for conservative executives?",
    author: "Leyla Mammadova",
    role: "Mentor",
    postedAt: "2024-07-10T09:00:00.000Z",
    replies: 14,
    excerpt: "I'm sharing the deck template I use to get CFO buy-in without overpromising outcomes.",
    tags: ["Strategy", "Stakeholders"],
  },
  {
    id: "thread-design-system",
    title: "Design tokens for multi-brand systems",
    author: "Kamran Aliyev",
    role: "Instructor",
    postedAt: "2024-07-12T14:30:00.000Z",
    replies: 9,
    excerpt: "Attached is the spreadsheet we use to sync tokens between retail and B2B products.",
    tags: ["Frontend", "Design"],
  },
  {
    id: "thread-ielts-confidence",
    title: "IELTS Part 2 story structures",
    author: "Rashad Huseynov",
    role: "Instructor",
    postedAt: "2024-07-14T18:15:00.000Z",
    replies: 21,
    excerpt: "Try the SPRE method. Sharing sample recordings and a printable cheat sheet.",
    tags: ["IELTS", "Speaking"],
  },
];

export const demoMentorDirectory = [
  {
    id: "mentor-1",
    name: "Agil Aliyev",
    expertise: ["Product strategy", "Growth", "Early-stage ops"],
    bio: "Agil has launched three venture-backed startups and mentors founders on experimentation and fundraising.",
    focus: "100$ Unlimited cohort",
    officeHours: "Wednesdays 19:00-21:00",
    tiers: ["unlimited"],
  },
  {
    id: "mentor-2",
    name: "Sara Aysun",
    expertise: ["Finance", "Analytics", "Automation"],
    bio: "Sara leads finance transformation programs and helps operators ship board-ready reporting in weeks.",
    focus: "Growth tier accountability pods",
    officeHours: "Mondays 18:00-20:00",
    tiers: ["growth", "unlimited"],
  },
  {
    id: "mentor-3",
    name: "Leyla Tagizada",
    expertise: ["HR", "Leadership", "Culture"],
    bio: "Leyla has scaled HR teams across tech startups and guides students on interviewing and negotiation.",
    focus: "Starter tier career clinics",
    officeHours: "Fridays 17:30-19:00",
    tiers: ["starter", "growth"],
  },
];

export const demoInstructorSnapshots: Record<
  string,
  {
    fullName: string;
    specialties: string[];
    headline: string;
    upcomingCourseIds: string[];
    rating: number;
    totalReviews: number;
  }
> = {
  "ulvibayramov1@gmail.com": {
    fullName: "Ulvi Bayramov",
    specialties: ["Azure ML", "Ops automation", "Responsible AI"],
    headline: "Senior Cloud Architect guiding teams through reliable AI deployments.",
    upcomingCourseIds: ["demo-azure-ai-ops"],
    rating: 4.95,
    totalReviews: 46,
  },
};
