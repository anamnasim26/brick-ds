import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "fintech-redesign",
    title: "Fintech App Redesign",
    tagline: "Simplifying complex finance for everyday users",
    description:
      "A complete overhaul of a fintech application's UX — reducing cognitive load and increasing task completion by 42%.",
    category: "Product Design",
    tags: ["Product Design", "User Research", "Prototyping"],
    year: "2025",
    role: "Lead UX Designer",
    duration: "4 months",
    tools: ["Figma", "Maze", "Notion"],
    coverImage: "/images/projects/fintech-cover.jpg",
    accentColor: "#6366f1",
    featured: true,
    overview:
      "The existing product had a steep learning curve that was driving churn among new users. Our goal was to rethink the core flows without disrupting power users.",
    challenge:
      "Balancing simplicity for newcomers while preserving the depth power users depended on — all within a tight 4-month timeline.",
    process: [
      {
        phase: "01 Research",
        title: "Understanding the problem space",
        description:
          "Ran 18 user interviews, heuristic audits, and competitive analysis. Identified 5 critical friction points in onboarding and core task flows.",
      },
      {
        phase: "02 Ideation",
        title: "Exploring the solution space",
        description:
          "Led 3 design sprints with the product team. Generated 40+ concepts, narrowed to 6 testable directions.",
      },
      {
        phase: "03 Design",
        title: "Building the new experience",
        description:
          "Designed a progressive disclosure system — simple by default, powerful on demand. Built a new component library from scratch.",
      },
      {
        phase: "04 Testing",
        title: "Validating with real users",
        description:
          "Ran moderated usability tests with 24 participants. Iterated through 3 rounds until task success rates hit target.",
      },
    ],
    outcome: {
      summary:
        "The redesign shipped to 100% of users 2 weeks ahead of schedule.",
      metrics: [
        { label: "Task Completion", value: "+42%" },
        { label: "Onboarding Drop-off", value: "-60%" },
        { label: "NPS Score", value: "71 → 84" },
      ],
    },
    nextProject: "health-app-ux",
  },
  {
    slug: "health-app-ux",
    title: "Health Companion App",
    tagline: "Designing for behavior change, not just data tracking",
    description:
      "UX strategy and design for a chronic illness management app, shifting from data-dump to motivational companion.",
    category: "UX Research",
    tags: ["UX Research", "Systems Design", "Accessibility"],
    year: "2025",
    role: "UX Researcher & Designer",
    duration: "6 months",
    tools: ["Figma", "Dovetail", "Miro"],
    coverImage: "/images/projects/health-cover.jpg",
    accentColor: "#10b981",
    featured: true,
    overview:
      "Chronic illness patients were abandoning the app within 2 weeks. The data existed, but it wasn't meaningful to users in the moments that mattered.",
    challenge:
      "Designing for high-stress, low-energy moments while ensuring clinical accuracy and HIPAA compliance.",
    process: [
      {
        phase: "01 Research",
        title: "Diary studies & contextual inquiry",
        description:
          "Ran 3-week diary studies with 12 chronic illness patients. Mapped emotional journeys alongside functional needs.",
      },
      {
        phase: "02 Ideation",
        title: "Designing for moments, not features",
        description:
          "Reframed the product around 4 key life moments. Moved from feature-led to context-led design.",
      },
      {
        phase: "03 Design",
        title: "The companion system",
        description:
          "Built adaptive UI that changes tone and density based on how the user is feeling. Introduced streak mechanics and gentle nudges.",
      },
      {
        phase: "04 Testing",
        title: "Longitudinal testing",
        description:
          "4-week beta with 30 users. Tracked engagement, emotional response, and clinical adherence.",
      },
    ],
    outcome: {
      summary:
        "30-day retention increased dramatically. Clinical partners reported improved patient engagement.",
      metrics: [
        { label: "30-day Retention", value: "+78%" },
        { label: "Daily Active Use", value: "+55%" },
        { label: "Medication Adherence", value: "+33%" },
      ],
    },
    nextProject: "ai-design-system",
  },
  {
    slug: "ai-design-system",
    title: "AI-Powered Design System",
    tagline: "Building the foundation for AI-native product experiences",
    description:
      "Designed a design system from the ground up for an AI product, introducing patterns for uncertainty, streaming, and generative content.",
    category: "AI",
    tags: ["AI", "Design Systems", "Interaction Design"],
    year: "2024",
    role: "Design Systems Lead",
    duration: "5 months",
    tools: ["Figma", "Storybook", "Linear"],
    coverImage: "/images/projects/design-system-cover.jpg",
    accentColor: "#f59e0b",
    featured: true,
    overview:
      "Traditional design systems assume deterministic UI. AI products need patterns for loading states, uncertainty, streaming text, and error correction.",
    challenge:
      "Inventing new design patterns where no established convention exists, while keeping the system consistent and developer-friendly.",
    process: [
      {
        phase: "01 Audit",
        title: "Cataloguing AI-specific UX patterns",
        description:
          "Analyzed 30+ AI products. Identified 12 unique interaction patterns that traditional systems don't cover.",
      },
      {
        phase: "02 Define",
        title: "Setting principles",
        description:
          "Established core principles: transparency over magic, progressive trust, graceful uncertainty.",
      },
      {
        phase: "03 Build",
        title: "150+ components, AI-ready",
        description:
          "Built every component with AI states: loading, streaming, error, hallucination-warning. Documented in Storybook.",
      },
      {
        phase: "04 Ship",
        title: "Adoption across 6 teams",
        description:
          "Rolled out with office hours, Slack support, and a monthly changelog. Tracked adoption metrics via Mixpanel.",
      },
    ],
    outcome: {
      summary: "The system became the foundation for all 6 product teams.",
      metrics: [
        { label: "Design Velocity", value: "+65%" },
        { label: "Dev Handoff Time", value: "-50%" },
        { label: "Component Adoption", value: "94%" },
      ],
    },
    nextProject: "fintech-redesign",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 3);
}
