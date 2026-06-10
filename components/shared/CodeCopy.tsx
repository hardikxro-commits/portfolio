"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeCopy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 rounded-md border border-border-subtle bg-bg-secondary px-2 py-1 text-xs text-text-muted opacity-0 transition-all hover:text-text-primary group-hover:opacity-100"
      aria-label="Copy code"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
