import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Mission from "@/components/home/Mission";
import Roots from "@/components/home/Roots";
import EventsPreview from "@/components/home/EventsPreview";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Board from "@/components/home/Board";
import Join from "@/components/home/Join";
import Donate from "@/components/home/Donate";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Mission />
      <Roots />
      <EventsPreview />
      <ProjectsPreview />
      <Board />
      <Join />
      <Donate />
    </>
  );
}
