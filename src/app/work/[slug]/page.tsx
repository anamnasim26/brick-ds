import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectProcess from "@/components/project/ProjectProcess";
import NextProject from "@/components/project/NextProject";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} · Anam Nasim`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectProcess project={project} />
      <NextProject slug={project.nextProject} />
    </>
  );
}
