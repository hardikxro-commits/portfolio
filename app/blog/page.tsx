import { Blog } from "@/components/sections/Blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and learnings from my journey into full-stack development and AI.",
};

export default function BlogPage() {
  return (
    <div className="pt-24">
      <Blog />
    </div>
  );
}
