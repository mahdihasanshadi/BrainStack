import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BrainStack",
  description: "BrainStack privacy policy — how we collect and protect parent and student data.",
};

export default function PrivacyPage() {
  return (
    <main className="py-20 sm:py-28">
      <div className="site-container max-w-3xl">
        <h1 className="font-display text-section-sm font-extrabold text-content sm:text-section">
          Privacy Policy
        </h1>
        <p className="mt-4 text-content-muted">Last updated: June 2026</p>

        <div className="prose prose-green mt-10 max-w-none space-y-6 text-content-muted">
          <p>
            BrainStack (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy
            explains how we collect, use, and protect information when you register
            for parent meetings, trial classes, assessments, or purchase courses.
          </p>
          <h2 className="font-display text-xl font-bold text-content">Information we collect</h2>
          <p>
            Parent name, email, phone number, child age, and optional child name when
            you register for meetings or courses. Assessment responses and course
            progress are stored to personalize learning.
          </p>
          <h2 className="font-display text-xl font-bold text-content">How we use it</h2>
          <p>
            To send meeting invitations, course access, support communications, and
            improve our educational platform. We do not sell personal data.
          </p>
          <h2 className="font-display text-xl font-bold text-content">Contact</h2>
          <p>
            Questions? Email{" "}
            <a href="mailto:hello@brainstack.studio" className="text-brand-green">
              hello@brainstack.studio
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
