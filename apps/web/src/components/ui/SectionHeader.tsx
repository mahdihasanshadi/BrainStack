import { Reveal } from "@/components/motion/Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  id?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${centered ? "mx-auto" : ""}`}>
        <span aria-hidden="true" className="inline-flex gap-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
        </span>
        {eyebrow}
      </p>
      <h2 id={id} className={`section-heading mt-5 ${centered ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {description ? (
        <p className={`section-lead ${centered ? "mx-auto" : ""}`}>{description}</p>
      ) : null}
    </Reveal>
  );
}
