"use client";

import { useState } from "react";
import { createPoll } from "@/lib/actions/poll";

export default function NewPollPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [questions, setQuestions] = useState([
    {
      title: "",
      options: ["", ""],
    },
  ]);

  function addQuestion() {
    setQuestions([
      ...questions,
      {
        title: "",
        options: ["", ""],
      },
    ]);
  }

  function addOption(questionIndex: number) {
    const updated = [...questions];
    updated[questionIndex].options.push("");
    setQuestions(updated);
  }

  function updateQuestion(questionIndex: number, value: string) {
    const updated = [...questions];
    updated[questionIndex].title = value;
    setQuestions(updated);
  }

  function updateOption(
    questionIndex: number,
    optionIndex: number,
    value: string
  ) {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  }

  async function handleCreatePoll() {
    if (!title.trim()) {
      alert("Introdu titlul sondajului.");
      return;
    }

    try {
      const poll = await createPoll({
        title,
        description,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
        public: isPublic,
        questions,
      });

      console.log("Sondaj creat:", poll);

      alert("Sondaj creat cu succes!");

      setTitle("");
      setDescription("");
      setExpiresAt("");
      setIsPublic(true);

      setQuestions([
        {
          title: "",
          options: ["", ""],
        },
      ]);
    } catch (error) {
      console.error(error);
      alert("A apărut o eroare la salvarea sondajului.");
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Creează un sondaj
      </h1>

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
                  isPublic
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                🌍 Public
              </button>
              <button
                type="button"
                onClick={() => setIsPublic(false)}
                className={`flex-1 rounded-md py-2 text-sm font-medium ${
                  !isPublic
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                🔒 Privat
              </button>
            </div>
          </div>
        </div>

        {questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 text-xl font-semibold">
              Întrebarea {qIndex + 1}
            </h2>

            <input
              value={question.title}
              onChange={(e) =>
                updateQuestion(qIndex, e.target.value)
              }
              placeholder="Scrie întrebarea..."
              className="mb-4 w-full rounded-lg border p-3"
            />

            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  value={option}
                  onChange={(e) =>
                    updateOption(
                      qIndex,
                      optionIndex,
                      e.target.value
                    )
                  }
                  placeholder={`Opțiunea ${optionIndex + 1}`}
                  className="w-full rounded-lg border p-3"
                />
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
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          + Adaugă întrebare
        </button>

        <button
          type="button"
          onClick={handleCreatePoll}
          className="block w-full rounded-lg bg-black py-4 text-lg text-white hover:bg-gray-800"
        >
          Creează sondaj
        </button>
      </div>
    </main>
  );
}