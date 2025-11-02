export const DEMO_ACCOUNT_EMAIL = "aqilliyev207@gmail.com";

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
      title: "Advanced Frontend Architecture",
      instructor: "Kamran Aliyev",
      completedOn: "2024-07-02",
      score: 96,
      skills: ["React", "TypeScript", "Design Systems"],
    },
    {
      title: "Storytelling for Product Pitches",
      instructor: "Aysel Guliyeva",
      completedOn: "2024-06-18",
      score: 92,
      skills: ["Narratives", "Pitch Design", "Copywriting"],
    },
    {
      title: "Leadership Communication Labs",
      instructor: "Rashad Huseynov",
      completedOn: "2024-06-04",
      score: 88,
      skills: ["Public Speaking", "Feedback", "Confidence"],
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
};
