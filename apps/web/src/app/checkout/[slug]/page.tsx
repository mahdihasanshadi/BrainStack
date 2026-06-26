import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import {
  ApiError,
  getCourseBySlug,
  type CourseDetail,
} from "@/lib/api";
import {
  COURSE_ORIGINAL_PRICE_BDT,
  COURSE_SALE_PRICE_BDT,
} from "@/lib/course-pricing";

interface CheckoutPageProps {
  params: { slug: string };
}

const STATIC_COURSE: CourseDetail = {
  id: "1",
  slug: "logical-reasoning-scratch",
  title: "Junior Game Dev: Scratch & Logic",
  shortDescription:
    "Build 4 real Bangladeshi games in 4 months using Scratch.",
  longDescription: null,
  ageMin: 8,
  ageMax: 14,
  durationMonths: 4,
  displayOrder: 1,
  priceBdt: COURSE_SALE_PRICE_BDT,
  originalPriceBdt: COURSE_ORIGINAL_PRICE_BDT,
  isPurchasable: true,
  levels: [],
};

async function loadCourse(slug: string): Promise<CourseDetail> {
  try {
    return await getCourseBySlug(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    return STATIC_COURSE;
  }
}

export async function generateMetadata({
  params,
}: CheckoutPageProps): Promise<Metadata> {
  try {
    const course = await getCourseBySlug(params.slug);
    return {
      title: `Purchase ${course.title} | BrainStack`,
      description: `Enroll in ${course.title} — pay with bKash, Nagad, or card.`,
    };
  } catch {
    return { title: "Checkout | BrainStack" };
  }
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const course = await loadCourse(params.slug);

  if (!course.isPurchasable || course.priceBdt <= 0) {
    notFound();
  }

  return (
    <main className="relative">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AnimatedBackground variant="minimal" />

        <div className="site-container relative">
          <div className="mx-auto max-w-lg">
            <p className="eyebrow">Secure checkout</p>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-content sm:text-3xl">
              Complete your enrollment
            </h1>
            <p className="mt-3 text-content-muted">
              One simple course fee — full access to all 20 classes, recordings,
              and gamification.
            </p>
            <div className="mt-8 glass-card p-6 sm:p-8">
              <CheckoutForm
                courseSlug={course.slug}
                courseTitle={course.title}
                priceBdt={course.priceBdt}
                originalPriceBdt={course.originalPriceBdt}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
