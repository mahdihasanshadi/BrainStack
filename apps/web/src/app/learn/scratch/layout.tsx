import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scratch Playground | BrainStack",
  description:
    "Practice Scratch coding in the BrainStack playground — drag blocks, run projects, and build games.",
};

export default function ScratchPlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
