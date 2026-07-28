"use client";

import { useState } from "react";

export default function NewPollPage() {
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

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Creează un sondaj
      </h1>

      <div className="space-y-6">
        <input
          placeholder="Titlul sondajului"
          className="w-full rounded-lg border p-3"
        />

        <textarea
          placeholder="Descriere"
          rows={4}
          className="w-full rounded-lg border p-3"
        />

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
              onClick={() => addOption(qIndex)}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              + Adaugă opțiune
            </button>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="rounded bg-green-600 px-5 py-3 text-white"
        >
          + Adaugă întrebare
        </button>

        <button className="block w-full rounded bg-black py-4 text-lg text-white">
          Creează sondaj
        </button>
      </div>
    </main>
  );
}