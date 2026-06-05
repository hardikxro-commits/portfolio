import { Testimonials } from "@/components/sections/Testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What people say about working with me.",
};

export default function TestimonialsPage() {
  return <Testimonials />;
}
