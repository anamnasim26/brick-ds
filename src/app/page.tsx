import Hero from "@/components/home/Hero";
import WorkShowcase from "@/components/home/WorkShowcase";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkShowcase />
      <FeaturedProjects />
      <Testimonials />
    </>
  );
}
