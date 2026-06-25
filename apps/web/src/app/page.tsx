import { CoursesSection } from "@/components/home/CoursesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaBanner } from "@/components/home/FinalCtaBanner";
import { HeroSection } from "@/components/home/HeroSection";
import { PricingSection } from "@/components/home/PricingSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { StatsBar } from "@/components/home/StatsBar";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <StatsBar />
      <SkillsSection />
      <WhyChooseSection />
      <CoursesSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaBanner />
    </main>
  );
}
