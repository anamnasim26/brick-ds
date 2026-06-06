export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  year: string;
  role: string;
  duration: string;
  tools: string[];
  coverImage: string;
  accentColor: string;
  featured: boolean;
  overview: string;
  challenge: string;
  process: ProcessStep[];
  outcome: Outcome;
  nextProject?: string;
}

export type ProjectCategory =
  | "Product Design"
  | "UX Research"
  | "AI"
  | "Interaction Design";

export interface ProcessStep {
  phase: string;
  title: string;
  description: string;
  image?: string;
}

export interface Outcome {
  summary: string;
  metrics: { label: string; value: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  tags: ExperimentTag[];
  tools: string[];
  image?: string;
  link?: string;
  status: "live" | "prototype" | "concept";
}

export type ExperimentTag =
  | "Generative UI"
  | "Prompt Design"
  | "AI-assisted Research"
  | "Multimodal"
  | "Automation";
