"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
};

export default function PollForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "",
      options: ["", ""],
    },
  ]);

  return (
    <div className="space-y-6 rounded-2xl border border-line bg-white p-8 shadow-sm">

      <div>
        <label className="mb-2 block font-medium">
          Titlul sondajului
        </label>

        <input
          className="w-full rounded-xl border border-line p-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Unde iesim sambata?"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Descriere
        </label>

        <textarea
          className="w-full rounded-xl border border-line p-3"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalii despre sondaj..."
        />
      </div>

      <hr />

      {questions.map((question, index) => (
        <div
          key={index}
          className="rounded-xl border border-line p-5"
        >
          <h2 className="mb-4 text-lg font-bold">
            Intrebarea {index + 1}
          </h2>

          <input
            className="w-full rounded-xl border border-line p-3"
            placeholder="Scrie intrebarea..."
            value={question.question}
            readOnly
          />

          <div className="mt-5 space-y-3">
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                className="w-full rounded-xl border border-line p-3"
                placeholder={`Optiunea ${optionIndex + 1}`}
                value={option}
                readOnly
              />
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}