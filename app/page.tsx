"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const isCorrect = selected !== null && selected === current.answerIndex;

  function handleSelect(choiceIndex: number) {
    if (selected !== null) return;
    setSelected(choiceIndex);
    if (choiceIndex === current.answerIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  }

  function handleRestart() {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-900 p-6 text-stone-100 font-sans">
      <main className="w-full max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-emerald-400">
            TriviaCraft
          </h1>
          <p className="mt-2 text-stone-400">Minecraft trivia, one block at a time.</p>
        </header>

        {finished ? (
          <section className="rounded-lg border border-stone-700 bg-stone-800 p-8 text-center">
            <h2 className="text-2xl font-semibold">Game Over</h2>
            <p className="mt-4 text-5xl font-bold text-emerald-400">
              {score} / {questions.length}
            </p>
            <button
              onClick={handleRestart}
              className="mt-8 rounded-md bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-500"
            >
              Play Again
            </button>
          </section>
        ) : (
          <section className="rounded-lg border border-stone-700 bg-stone-800 p-6">
            <div className="mb-4 flex items-center justify-between text-sm text-stone-400">
              <span>
                Question {index + 1} of {questions.length}
              </span>
              <span>Score: {score}</span>
            </div>
            <h2 className="mb-6 text-xl font-medium">{current.prompt}</h2>
            <div className="grid gap-3">
              {current.choices.map((choice, i) => {
                const isAnswer = i === current.answerIndex;
                const isSelected = i === selected;
                let style =
                  "border-stone-600 bg-stone-700 hover:border-emerald-500 hover:bg-stone-600";
                if (selected !== null) {
                  if (isAnswer) {
                    style = "border-emerald-500 bg-emerald-900/40";
                  } else if (isSelected) {
                    style = "border-red-500 bg-red-900/40";
                  } else {
                    style = "border-stone-700 bg-stone-800 opacity-60";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                    className={`rounded-md border-2 px-4 py-3 text-left transition-colors ${style}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            {selected !== null && (
              <div className="mt-6 flex items-center justify-between">
                <p className={isCorrect ? "text-emerald-400" : "text-red-400"}>
                  {isCorrect ? "Correct!" : "Not quite."}
                </p>
                <button
                  onClick={handleNext}
                  className="rounded-md bg-emerald-600 px-5 py-2 font-medium text-white transition-colors hover:bg-emerald-500"
                >
                  {index + 1 >= questions.length ? "See Results" : "Next"}
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
