import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FAQ_ITEMS = [
  {
    question: "What age groups does BrainStack serve?",
    answer:
      "BrainStack offers three age-based tracks: ages 6–8, 9–11, and 12–14. Each track has its own curriculum pace and project complexity, so your child always learns at the right level.",
  },
  {
    question: "Is the trial class really free?",
    answer:
      "Yes — completely free with no payment required. Your child attends one live 45-minute session, tries Scratch, and you get to see exactly how we teach before making any commitment.",
  },
  {
    question: "Can my child learn in Bangla?",
    answer:
      "Absolutely. You can choose Bangla or English instruction when registering. We want every child to understand and enjoy each session in the language they're most comfortable with.",
  },
  {
    question: "What does my child need for class?",
    answer:
      "A laptop or tablet with internet access is all that's needed. Scratch runs in the browser — no special software installation required. We'll confirm device requirements during registration.",
  },
  {
    question: "How big are the class groups?",
    answer:
      "We keep groups small so every child gets individual attention. Instructors can see when someone is stuck and adapt the pace — unlike large pre-recorded courses.",
  },
  {
    question: "What happens after the trial?",
    answer:
      "After the trial, you decide together if BrainStack is the right fit. If yes, choose a monthly plan or full level enrollment. There's no pressure — we're here to help you make the best choice for your family.",
  },
];

export function FaqSection() {
  return (
    <section
      className="relative bg-surface-muted/30 py-24 sm:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="site-container">
        <SectionHeader
          id="faq-heading"
          eyebrow="FAQ"
          title={
            <>
              Questions?{" "}
              <span className="gradient-text">We&apos;ve got answers</span>
            </>
          }
          description="Everything parents ask before booking their child's first BrainStack class."
          align="center"
        />
        <div className="mx-auto mt-16 max-w-3xl">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </div>
    </section>
  );
}
