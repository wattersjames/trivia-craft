"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  questionIndex: number;
};

export function HintChat({ questionIndex }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const questionIndexRef = useRef(questionIndex);

  useEffect(() => {
    questionIndexRef.current = questionIndex;
  }, [questionIndex]);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest({ messages, body }) {
          return {
            body: {
              ...body,
              messages,
              questionIndex: questionIndexRef.current,
            },
          };
        },
      }),
    [],
  );

  const { messages, sendMessage, setMessages, stop, status, error } = useChat({
    transport,
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  useEffect(() => {
    stop();
    setMessages([]);
  }, [questionIndex, stop, setMessages]);

  const isStreaming = status === "submitted" || status === "streaming";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");
    sendMessage({ text });
  }

  function handleHintClick() {
    if (isStreaming) return;
    const hasPriorHints = messages.some((m) => m.role === "assistant");
    sendMessage({
      text: hasPriorHints ? "Another hint, please." : "Give me a hint.",
    });
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-xl border border-stone-700 bg-stone-900/95 shadow-2xl backdrop-blur">
          <header className="flex items-center justify-between border-b border-stone-700 bg-stone-800 px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold text-emerald-400">
                Creeper Coach
              </h3>
              <p className="text-xs text-stone-400">Hints, never answers.</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close hints"
              className="rounded p-1 text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-100"
            >
              ✕
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm"
          >
            {messages.length === 0 && (
              <p className="text-stone-400">
                Stuck? Ask me for a hint about the current question.
              </p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "ml-6 rounded-lg bg-emerald-700/30 px-3 py-2 text-stone-100"
                    : "mr-6 rounded-lg bg-stone-800 px-3 py-2 text-stone-100"
                }
              >
                {m.parts.map((part, i) =>
                  part.type === "text" ? (
                    <span key={i} className="whitespace-pre-wrap">
                      {part.text}
                    </span>
                  ) : null,
                )}
              </div>
            ))}
            {error && (
              <p className="rounded-lg bg-red-900/40 px-3 py-2 text-red-300">
                Something went wrong: {error.message}
              </p>
            )}
          </div>

          <div className="border-t border-stone-700 bg-stone-800 px-3 pt-3">
            <button
              type="button"
              onClick={handleHintClick}
              disabled={isStreaming}
              className="w-full rounded-md border border-emerald-600 bg-emerald-600/20 px-3 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-600/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              💡 Hint, please
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 bg-stone-800 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a hint..."
              disabled={isStreaming}
              className="flex-1 rounded-md border border-stone-600 bg-stone-900 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:border-emerald-500 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isStreaming ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close hints" : "Open hint assistant"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl shadow-lg transition-all hover:bg-emerald-500 hover:scale-105"
      >
        {open ? "✕" : "💡"}
      </button>
    </div>
  );
}
