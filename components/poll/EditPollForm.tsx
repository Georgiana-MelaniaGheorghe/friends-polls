"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePoll, deletePoll } from "@/lib/actions/poll";
import { addInvite, removeInvite } from "@/lib/actions/invite";

type OptionState = { id?: string; text: string; voteCount?: number };
type QuestionState = { id?: string; title: string; options: OptionState[] };
type InviteState = { id: string; email: string };

type EditPollFormProps = {
  pollId: string;
  initialTitle: string;
  initialDescription: string;
  initialExpiresAt: string;
  initialPublic: boolean;
  initialQuestions: QuestionState[];
  initialInvites: InviteState[];
};

export default function EditPollForm({
  pollId,
  initialTitle,
  initialDescription,
  initialExpiresAt,
  initialPublic,
  initialQuestions,
  initialInvites,
}: EditPollFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [expiresAt, setExpiresAt] = useState(initialExpiresAt);
  const [isPublic, setIsPublic] = useState(initialPublic);
  const [questions, setQuestions] = useState<QuestionState[]>(initialQuestions);
  const [invites, setInvites] = useState<InviteState[]>(initialInvites);
  const [newInviteEmail, setNewInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const totalPollVotes = questions.reduce(
    (sum, q) =>
      sum + q.options.reduce((s, o) => s + (o.voteCount ?? 0), 0),
    0
  );

  function addQuestion() {
    setQuestions([
      ...questions,
      { title: "", options: [{ text: "" }, { text: "" }] },
    ]);
  }

  function removeQuestion(qIndex: number) {
    const question = questions[qIndex];
    const votesOnQuestion = question.options.reduce(
      (s, o) => s + (o.voteCount ?? 0),
      0
    );

    if (votesOnQuestion > 0) {
      const confirmed = confirm(
        `Această întrebare are deja ${votesOnQuestion} voturi. Ștergerea ei va șterge definitiv și acele voturi. Continui?`
      );
      if (!confirmed) return;
    }

    setQuestions(questions.filter((_, i) => i !== qIndex));
  }

  function addOption(qIndex: number) {
    const updated = [...questions];
    updated[qIndex].options.push({ text: "" });
    setQuestions(updated);
  }

  function removeOption(qIndex: number, oIndex: number) {
    const option = questions[qIndex].options[oIndex];

    if ((option.voteCount ?? 0) > 0) {
      const confirmed = confirm(
        `Această opțiune are deja ${option.voteCount} voturi. Ștergerea ei va șterge definitiv acele voturi. Continui?`
      );
      if (!confirmed) return;
    }

    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.filter(
      (_, i) => i !== oIndex
    );
    setQuestions(updated);
  }

  function updateQuestionTitle(qIndex: number, value: string) {
    const updated = [...questions];
    updated[qIndex].title = value;
    setQuestions(updated);
  }

  function updateOptionText(qIndex: number, oIndex: number, value: string) {
    const updated = [...questions];
    updated[qIndex].options[oIndex].text = value;
    setQuestions(updated);
  }

  async function handleAddInvite() {
    const email = newInviteEmail.trim();

    if (!email) return;

    try {
      setInviteLoading(true);

      await addInvite(pollId, email);

      setInvites([...invites, { id: crypto.randomUUID(), email: email.toLowerCase() }]);
      setNewInviteEmail("");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Nu s-a putut adăuga invitația.");
    } finally {
      setInviteLoading(false);
    }
  }

  async function handleRemoveInvite(inviteId: string) {
    try {
      await removeInvite(pollId, inviteId);
      setInvites(invites.filter((i) => i.id !== inviteId));
    } catch (error) {
      console.error(error);
      alert("Nu s-a putut elimina invitația.");
    }
  }

  async function handleSave() {
    if (!title.trim()) {
      alert("Introdu titlul sondajului.");
      return;
    }

    try {
      setSubmitting(true);

      await updatePoll(pollId, {
        title,
        description,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
        public: isPublic,
        questions,
      });

      router.push(`/poll/${pollId}`);
    } catch (error) {
      console.error(error);
      alert("A apărut o eroare la salvarea modificărilor.");
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    const confirmed = confirm(
      "Ești sigur? Sondajul, toate întrebările, voturile și comentariile vor fi șterse definitiv. Această acțiune nu poate fi anulată."
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      await deletePoll(pollId);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("A apărut o eroare la ștergerea sondajului.");
      setDeleting(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-2 text-4xl font-bold">Editează sondajul</h1>

      {totalPollVotes > 0 && (
        <p className="mb-6 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
          ⚠️ Acest sondaj are deja {totalPollVotes} voturi. Ștergerea unei întrebări/opțiuni cu voturi le va elimina definitiv.
        </p>
      )}

      <div className="space-y-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titlul sondajului"
          className="w-full rounded-lg border p-3"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descriere"
          rows={4}
          className="w-full rounded-lg border p-3"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Data de expirare (opțional)
            </label>
            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Vizibilitate
            </label>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <button
                type="button"
                onClick={() => setIsPublic(true)}
                className={`flex-1 rounded-md py-2 text-sm font-medium ${
                  isPublic ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                🌍 Public
              </button>
              <button
                type="button"
                onClick={() => setIsPublic(false)}
                className={`flex-1 rounded-md py-2 text-sm font-medium ${
                  !isPublic ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                🔒 Privat
              </button>
            </div>
          </div>
        </div>

        {!isPublic && (
          <div className="rounded-lg border bg-gray-50 p-4">
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              Persoane invitate (după email)
            </h3>

            <div className="flex gap-2">
              <input
                type="email"
                value={newInviteEmail}
                onChange={(e) => setNewInviteEmail(e.target.value)}
                placeholder="email@exemplu.com"
                className="flex-1 rounded-lg border p-2"
              />
              <button
                type="button"
                onClick={handleAddInvite}
                disabled={inviteLoading}
                className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
              >
                Invită
              </button>
            </div>

            {invites.length > 0 && (
              <ul className="mt-3 space-y-2">
                {invites.map((invite) => (
                  <li
                    key={invite.id}
                    className="flex items-center justify-between rounded-md bg-white border px-3 py-2 text-sm"
                  >
                    {invite.email}
                    <button
                      type="button"
                      onClick={() => handleRemoveInvite(invite.id)}
                      className="text-red-600 hover:underline"
                    >
                      Elimină
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {questions.map((question, qIndex) => {
          const votesOnQuestion = question.options.reduce(
            (s, o) => s + (o.voteCount ?? 0),
            0
          );

          return (
            <div
              key={question.id ?? `new-${qIndex}`}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Întrebarea {qIndex + 1}
                  {votesOnQuestion > 0 && (
                    <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                      {votesOnQuestion} voturi
                    </span>
                  )}
                </h2>

                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Șterge întrebarea
                  </button>
                )}
              </div>

              <input
                value={question.title}
                onChange={(e) => updateQuestionTitle(qIndex, e.target.value)}
                placeholder="Scrie întrebarea..."
                className="mb-4 w-full rounded-lg border p-3"
              />

              <div className="space-y-3">
                {question.options.map((option, oIndex) => (
                  <div
                    key={option.id ?? `new-${oIndex}`}
                    className="flex items-center gap-2"
                  >
                    <input
                      value={option.text}
                      onChange={(e) =>
                        updateOptionText(qIndex, oIndex, e.target.value)
                      }
                      placeholder={`Opțiunea ${oIndex + 1}`}
                      className="w-full rounded-lg border p-3"
                    />

                    {(option.voteCount ?? 0) > 0 && (
                      <span className="whitespace-nowrap rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                        🗳️ {option.voteCount}
                      </span>
                    )}

                    {question.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(qIndex, oIndex)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addOption(qIndex)}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                + Adaugă opțiune
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={addQuestion}
          className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          + Adaugă întrebare
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={submitting || deleting}
          className="block w-full rounded-lg bg-black py-4 text-lg text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {submitting ? "Se salvează..." : "Salvează modificările"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={submitting || deleting}
          className="block w-full rounded-lg border border-red-600 py-4 text-lg text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          {deleting ? "Se șterge..." : "🗑️ Șterge sondajul definitiv"}
        </button>
      </div>
    </main>
  );
}