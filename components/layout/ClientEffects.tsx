"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/shared/CustomCursor").then((m) => ({ default: m.CustomCursor })), { ssr: false });
const FloatingParticles = dynamic(() => import("@/components/shared/FloatingParticles").then((m) => ({ default: m.FloatingParticles })), { ssr: false });

export function ClientEffects() {
  return (
    <>
      <FloatingParticles />
      <CustomCursor />
    </>
  );
}
