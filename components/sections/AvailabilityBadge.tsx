"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Badge } from "@/components/ui/Badge";

export function AvailabilityBadge() {
  return (
    <Badge variant="success">
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
          style={{ animationDuration: "2s" }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      Open to opportunities
    </Badge>
  );
}
