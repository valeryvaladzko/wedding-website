import { wedding } from "../config";
import { Card } from "../components/Card";
import { Countdown } from "../components/Countdown";
import { SectionDivider } from "../components/SectionDivider";
import { HeroSection } from "./home/HeroSection";
import { StorySection } from "./home/StorySection";
import { AboutSection } from "./home/AboutSection";
import { DressCodeSection } from "./home/DressCodeSection";
import { VenueSection } from "./home/VenueSection";

export function Home() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <HeroSection />
      <SectionDivider label="&" />
      <Card>
        <Countdown target={wedding.date} />
      </Card>
      <StorySection />
      <AboutSection />
      <DressCodeSection />
      <VenueSection />
    </div>
  );
}
