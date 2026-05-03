"use client";

import { useEffect, useState } from "react";
import { pickRandomQuestions, type Question } from "@/lib/questions";
import { HintChat } from "./components/HintChat";

const QUESTIONS_PER_GAME = 10;

type ImageState =
  | { status: "loading" }
  | { status: "ready"; dataUrl: string; caption: string }
  | { status: "error" };

function AnswerImage({ state }: { state: ImageState | undefined }) {
  if (!state || state.status === "loading") {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-stone-700 bg-stone-900/60">
        <span className="animate-pulse text-sm text-stone-400">
          Generating image of the answer...
        </span>
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <div className="rounded-lg bg-red-900/30 px-4 py-3 text-center text-sm text-red-300">
        Couldn&apos;t generate the answer image. Carrying on without it.
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={state.dataUrl}
        alt={state.caption}
        className="h-64 w-64 rounded-lg border border-stone-600 object-cover shadow-lg"
      />
      <p className="text-sm text-stone-300">
        <span className="font-medium text-emerald-400">{state.caption}</span>
      </p>
    </div>
  );
}

export default function Home() {
  const [game, setGame] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [imageCache, setImageCache] = useState<Record<number, ImageState>>({});

  useEffect(() => {
    setGame(pickRandomQuestions(QUESTIONS_PER_GAME));
  }, []);

  useEffect(() => {
    if (selected === null || !game) return;
    const id = game[index].id;
    if (imageCache[id]) return;

    setImageCache((c) => ({ ...c, [id]: { status: "loading" } }));
    fetch("/api/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: id }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json() as Promise<{ dataUrl: string; caption: string }>;
      })
      .then((data) => {
        setImageCache((c) => ({
          ...c,
          [id]: { status: "ready", dataUrl: data.dataUrl, caption: data.caption },
        }));
      })
      .catch(() => {
        setImageCache((c) => ({ ...c, [id]: { status: "error" } }));
      });
  }, [selected, index, game, imageCache]);

  if (!game) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-stone-500">
        <span className="text-sm">Shuffling questions...</span>
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

  const bgGradient = finished
    ? "from-stone-900 via-stone-900 to-stone-950"
    : current.theme.gradient;

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br ${bgGradient} p-6 text-stone-100 font-sans transition-colors duration-700`}
    >
      {!finished && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        >
          <span className="text-[20rem] leading-none opacity-10 blur-[1px] drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {current.theme.emoji}
          </span>
        </div>
      )}
      <main className="relative z-10 w-full max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-emerald-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            TriviaCraft
          </h1>
          <p className="mt-2 text-stone-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            Minecraft trivia, one block at a time.
          </p>
        </header>

        {finished ? (
          <section className="rounded-lg border border-stone-700 bg-stone-800/90 p-8 text-center backdrop-blur">
            <h2 className="text-2xl font-semibold">Game Over</h2>
            <p className="mt-4 text-5xl font-bold text-emerald-400">
              {score} / {game.length}
            </p>
            <button
              onClick={handleRestart}
              className="mt-8 rounded-md bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-500"
            >
              Play Again
            </button>
          </section>
        ) : (
          <section className="rounded-lg border border-stone-700 bg-stone-800/90 p-6 backdrop-blur">
            <div className="mb-4 flex items-center justify-between text-sm text-stone-400">
              <span>
                Question {index + 1} of {game.length}
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
              <div className="mt-6 space-y-4">
                <AnswerImage state={imageCache[current.id]} />
                <div className="flex items-center justify-between">
                  <p className={isCorrect ? "text-emerald-400" : "text-red-400"}>
                    {isCorrect ? "Correct!" : "Not quite."}
                  </p>
                  <button
                    onClick={handleNext}
                    className="rounded-md bg-emerald-600 px-5 py-2 font-medium text-white transition-colors hover:bg-emerald-500"
                  >
                    {index + 1 >= game.length ? "See Results" : "Next"}
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
      {!finished && <HintChat questionId={current.id} />}
    </div>
  );
}
