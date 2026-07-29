"use client";

import { useState } from "react";

type CopyLinkButtonProps = {
  pollId: string;
};

export default function CopyLinkButton({ pollId }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/poll/${pollId}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
      alert("Nu s-a putut copia linkul.");
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100"
    >
      {copied ? "✅ Copiat!" : "🔗 Copiază link"}
    </button>
  );
}