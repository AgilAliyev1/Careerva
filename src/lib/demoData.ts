export const DEMO_ACCOUNT_EMAIL = "aqilliyev207@gmail.com";

export interface DemoCourseProfile {
  full_name: string;
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
    meeting_link: "https://careerva.live/demo/ai-product-strategy",
    profiles: {
      full_name: "Leyla Mammadova",
    },
  },
  {
    id: "demo-frontend",
    title: "Design Systems for Frontend Engineers",
    description: "Create scalable component libraries with accessibility baked in from day one.",
    category: "Programming",
    instructor_id: "demo-instructor-2",
    scheduled_date: "2024-08-08T09:30:00.000Z",
    duration_minutes: 75,
    meeting_link: "https://careerva.live/demo/design-systems",
    profiles: {
      full_name: "Kamran Aliyev",
    },
  },
  {
    id: "demo-ux-research",
    title: "UX Research Sprints",
    description: "Learn to validate ideas quickly with stakeholder-ready insights in five days or less.",
    category: "Design",
    instructor_id: "demo-instructor-3",
    scheduled_date: "2024-08-12T16:00:00.000Z",
    duration_minutes: 60,
    meeting_link: "https://careerva.live/demo/ux-research",
    profiles: {
      full_name: "Nigar Suleymanova",
    },
  },
  {
    id: "demo-finance",
    title: "Financial Modeling with Excel & AI",
    description: "Blend spreadsheet mastery with AI copilots to ship board-ready models fast.",
    category: "Business",
    instructor_id: "demo-instructor-4",
    scheduled_date: "2024-08-15T11:00:00.000Z",
    duration_minutes: 80,
    meeting_link: "https://careerva.live/demo/financial-modeling",
    profiles: {
      full_name: "Elvin Rahimov",
    },
  },
  {
    id: "demo-brand-story",
    title: "Brand Storytelling in Azerbaijani",
    description: "Craft authentic narratives for local audiences across social platforms.",
    category: "Languages",
    instructor_id: "demo-instructor-5",
    scheduled_date: "2024-08-20T18:30:00.000Z",
    duration_minutes: 70,
    meeting_link: "https://careerva.live/demo/brand-story",
    profiles: {
      full_name: "Aysel Guliyeva",
    },
  },
  {
    id: "demo-ielts",
    title: "IELTS Speaking Labs",
    description: "Weekly live labs with personalized feedback from certified IELTS coaches.",
    category: "Languages",
    instructor_id: "demo-instructor-6",
    scheduled_date: "2024-08-22T07:30:00.000Z",
    duration_minutes: 60,
    meeting_link: "https://careerva.live/demo/ielts-labs",
    profiles: {
      full_name: "Rashad Huseynov",
    },
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
