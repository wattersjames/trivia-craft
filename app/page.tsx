"use client";

import { useEffect, useState } from "react";
import { pickRandomQuestions, type Question } from "@/lib/questions";
import { HintChat } from "./components/HintChat";
import { useEndGameMusic } from "./hooks/useEndGameMusic";

const QUESTIONS_PER_GAME = 10;

function MinecraftBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-500 via-sky-300 to-sky-100" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 overflow-hidden">
        <div className="absolute top-[6%] left-[8%] h-5 w-32 bg-white opacity-95" />
        <div className="absolute top-[14%] left-[34%] h-4 w-24 bg-white opacity-90" />
        <div className="absolute top-[10%] right-[12%] h-5 w-40 bg-white opacity-95" />
        <div className="absolute top-[26%] right-[38%] h-4 w-20 bg-white opacity-85" />
        <div className="absolute top-[34%] left-[22%] h-4 w-28 bg-white opacity-90" />
        <div className="absolute top-[44%] right-[18%] h-4 w-24 bg-white opacity-85" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <div className="h-2 bg-green-400" />
        <div className="h-12 bg-green-600" />
        <div
          className="h-2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #16a34a 0 10px, #78350f 10px 20px)",
          }}
        />
        <div className="h-32 bg-amber-900" />
        <div
          className="h-24 bg-amber-950"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, transparent 0 24px, rgba(0,0,0,0.15) 24px 28px), repeating-linear-gradient(to bottom, transparent 0 16px, rgba(0,0,0,0.15) 16px 20px)",
          }}
        />
      </div>
    </>
  );
}

export default function Home() {
  const [game, setGame] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setGame(pickRandomQuestions(QUESTIONS_PER_GAME));
  }, []);

  useEndGameMusic(finished && !muted);

  if (!game) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-500 to-sky-200 text-stone-700">
        <span className="text-sm font-medium">Shuffling questions...</span>
      </div>
    );
  }

  const current = game[index];
  const isCorrect = selected !== null && selected === current.answerIndex;

  function handleSelect(choiceIndex: number) {
    if (selected !== null) return;
    setSelected(choiceIndex);
    if (choiceIndex === current.answerIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (index + 1 >= game!.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  }

  function handleRestart() {
    setGame(pickRandomQuestions(QUESTIONS_PER_GAME));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 font-sans">
      <MinecraftBackdrop />
      <main className="relative z-10 w-full max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-[3px_3px_0_rgba(0,0,0,0.7)]">
            TriviaCraft
          </h1>
          <p className="mt-2 text-stone-100 drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
            Minecraft trivia, one block at a time.
          </p>
        </header>

        {finished ? (
          <section className="relative border-4 border-t-stone-900 border-l-stone-900 border-r-stone-500 border-b-stone-500 bg-stone-700/95 p-8 text-center text-stone-100 backdrop-blur">
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute music" : "Mute music"}
              className="absolute top-3 right-3 border-2 border-t-stone-400 border-l-stone-400 border-r-stone-900 border-b-stone-900 bg-stone-600 px-2 py-1 text-sm hover:bg-stone-500"
            >
              {muted ? "🔇" : "🔊"}
            </button>
            <h2 className="text-2xl font-semibold drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
              Game Over
            </h2>
            <p className="mt-4 text-5xl font-bold text-emerald-300 drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
              {score} / {game.length}
            </p>
            <button
              onClick={handleRestart}
              className="mt-8 border-4 border-t-emerald-400 border-l-emerald-400 border-r-emerald-900 border-b-emerald-900 bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-500 active:translate-y-[2px]"
            >
              Play Again
            </button>
          </section>
        ) : (
          <section className="border-4 border-t-stone-900 border-l-stone-900 border-r-stone-500 border-b-stone-500 bg-stone-700/95 p-6 text-stone-100 backdrop-blur">
            <div className="mb-4 flex items-center justify-between text-sm text-stone-300">
              <span>
                Question {index + 1} of {game.length}
              </span>
              <span>Score: {score}</span>
            </div>
            <h2 className="mb-6 text-xl font-medium">
              <span className="mr-2" aria-hidden>
                {current.theme.emoji}
              </span>
              {current.prompt}
            </h2>
            <div className="grid gap-3">
              {current.choices.map((choice, i) => {
                const isAnswer = i === current.answerIndex;
                const isSelected = i === selected;
                let style =
                  "border-t-stone-400 border-l-stone-400 border-r-stone-900 border-b-stone-900 bg-stone-600 hover:bg-stone-500";
                if (selected !== null) {
                  if (isAnswer) {
                    style =
                      "border-t-emerald-400 border-l-emerald-400 border-r-emerald-900 border-b-emerald-900 bg-emerald-700";
                  } else if (isSelected) {
                    style =
                      "border-t-red-400 border-l-red-400 border-r-red-900 border-b-red-900 bg-red-700";
                  } else {
                    style =
                      "border-t-stone-700 border-l-stone-700 border-r-stone-900 border-b-stone-900 bg-stone-800 opacity-60";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                    className={`border-4 px-4 py-3 text-left text-stone-100 transition-colors ${style}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            {selected !== null && (
              <div className="mt-6 flex items-center justify-between">
                <p
                  className={
                    isCorrect
                      ? "text-emerald-300 drop-shadow-[1px_1px_0_rgba(0,0,0,0.6)]"
                      : "text-red-300 drop-shadow-[1px_1px_0_rgba(0,0,0,0.6)]"
                  }
                >
                  {isCorrect ? "Correct!" : "Not quite."}
                </p>
                <button
                  onClick={handleNext}
                  className="border-4 border-t-emerald-400 border-l-emerald-400 border-r-emerald-900 border-b-emerald-900 bg-emerald-600 px-5 py-2 font-medium text-white transition-colors hover:bg-emerald-500 active:translate-y-[2px]"
                >
                  {index + 1 >= game.length ? "See Results" : "Next"}
                </button>
              </div>
            )}
          </section>
        )}
      </main>
      {!finished && <HintChat questionId={current.id} />}
    </div>
  );
}
