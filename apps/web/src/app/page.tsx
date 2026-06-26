import { CoursesSection } from "@/components/home/CoursesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturesStrip } from "@/components/home/FeaturesStrip";
import { FinalCtaBanner } from "@/components/home/FinalCtaBanner";
import { GlobalReachSection } from "@/components/home/GlobalReachSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { MissionSection } from "@/components/home/MissionSection";
import { ParentMeetingBanner } from "@/components/home/ParentMeetingBanner";
import { EnrollCtaSection } from "@/components/home/EnrollCtaSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { StatsBar } from "@/components/home/StatsBar";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ToolsSection } from "@/components/home/ToolsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { AccreditationSection } from "@/components/home/AccreditationSection";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <ParentMeetingBanner />
      <StatsBar />
      <FeaturesStrip />
      <SkillsSection />
      <HowItWorksSection />
      <AccreditationSection />
      <CoursesSection />
      <WhyChooseSection />
      <ToolsSection />
      <GlobalReachSection />
      <EnrollCtaSection />
      <TestimonialsSection />
      <MissionSection />
      <FaqSection />
      <FinalCtaBanner />
    </main>
  );
}
