"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addComment } from "@/lib/actions/comment";

type CommentFormProps = {
  pollId: string;
};

export default function CommentForm({
  pollId,
}: CommentFormProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit() {
    if (!text.trim()) return;

    try {
      setLoading(true);

      await addComment(pollId, text);

      setText("");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Nu s-a putut adăuga comentariul.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Scrie un comentariu..."
        rows={3}
        className="w-full rounded-lg border p-3"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Se trimite..." : "Adaugă comentariu"}
      </button>
    </div>
  );
}