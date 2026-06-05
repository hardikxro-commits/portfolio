import { Skills } from "@/components/sections/Skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technologies and tools I work with.",
};

export default function SkillsPage() {
  return <Skills />;
}
