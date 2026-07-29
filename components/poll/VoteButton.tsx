"use client";

import { vote } from "@/lib/actions/vote";
import { useRouter } from "next/navigation";
import { useState } from "react";

type VoteButtonProps = {
  optionId: string;
  text: string;
};

export default function VoteButton({
  optionId,
  text,
}: VoteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleVote() {
    try {
      setLoading(true);

      await vote(optionId);

      alert("Vot înregistrat!");

      router.refresh();
    } catch (error) {
      console.error(error);

      const message =
        error instanceof Error
          ? error.message
          : "Nu s-a putut înregistra votul.";

      alert(message);

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleVote}
      disabled={loading}
      className="block w-full rounded-lg border p-4 text-left transition hover:bg-gray-100 disabled:opacity-50"
    >
      {loading ? "Se votează..." : text}
    </button>
  );
}