import { Experiment } from "@/lib/types";

export const experiments: Experiment[] = [
  {
    id: "1",
    title: "AI UX Critique Bot",
    description:
      "A Claude-powered assistant that gives structured UX feedback on design screenshots — covering heuristics, accessibility, and visual hierarchy.",
    tags: ["Prompt Design", "AI-assisted Research"],
    tools: ["Claude API", "Next.js", "Figma API"],
    status: "live",
  },
  {
    id: "2",
    title: "Generative Onboarding Flows",
    description:
      "Experimenting with LLMs to generate context-aware onboarding copy and step sequences based on user persona inputs.",
    tags: ["Generative UI", "Prompt Design"],
    tools: ["Claude API", "Framer", "Vercel"],
    status: "prototype",
  },
  {
    id: "3",
    title: "Multimodal Research Synthesis",
    description:
      "Using AI to process hours of user interview recordings and synthesize affinity diagrams automatically — cutting synthesis time from days to hours.",
    tags: ["AI-assisted Research", "Multimodal"],
    tools: ["Whisper API", "Claude API", "Notion"],
    status: "prototype",
  },
  {
    id: "4",
    title: "Emotion-Adaptive UI",
    description:
      "A proof-of-concept that adjusts UI density, tone of copy, and color temperature based on inferred user emotional state from interaction patterns.",
    tags: ["Generative UI", "Automation"],
    tools: ["TensorFlow.js", "Framer", "Claude API"],
    status: "concept",
  },
  {
    id: "5",
    title: "Design Token Generator",
    description:
      "Prompt Claude with a brand description in plain English, get back a complete design token set — colors, typography, spacing — ready for Figma.",
    tags: ["Automation", "Prompt Design"],
    tools: ["Claude API", "Figma API", "Python"],
    status: "live",
  },
  {
    id: "6",
    title: "Accessibility Audit Copilot",
    description:
      "AI-assisted WCAG audit tool that reads component code and design specs, flags violations, and suggests remediation in plain language.",
    tags: ["AI-assisted Research", "Automation"],
    tools: ["Claude API", "axe-core", "Storybook"],
    status: "prototype",
  },
];
