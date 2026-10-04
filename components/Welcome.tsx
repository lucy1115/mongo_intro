"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { getVisitorName, OPEN_WELCOME_EVENT, setVisitorName, useVisitorName } from "@/lib/visitor-name";

export default function Welcome() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const name = useVisitorName();
  const [step, setStep] = useState<"ask" | "welcome">("ask");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const open = () => {
      setStep("ask");
      setDraft(getVisitorName() ?? "");
      dialogRef.current?.showModal();
    };

    // Ask first-time visitors for their name as soon as they arrive
    if (!getVisitorName()) open();

    window.addEventListener(OPEN_WELCOME_EVENT, open);
    return () => window.removeEventListener(OPEN_WELCOME_EVENT, open);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    setVisitorName(trimmed);
    setStep("welcome");
  };

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="welcome-title"
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl bg-transparent p-0 backdrop:bg-stone-900/60 backdrop:backdrop-blur-sm"
    >
      <div className="rounded-3xl bg-gradient-to-b from-amber-100 to-white p-6 text-center sm:p-8">
        {step === "ask" ? (
          <form onSubmit={submit}>
            <p className="text-5xl" aria-hidden>
              🥭
            </p>
            <h2 id="welcome-title" className="mt-3 text-2xl font-extrabold text-stone-900">
              歡迎來到芒果樂園
            </h2>
            <p className="mt-1 text-sm text-stone-600">請問該怎麼稱呼你呢？</p>

            <label htmlFor="visitor-name" className="sr-only">
              你的名稱
            </label>
            <input
              id="visitor-name"
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="輸入你的名稱"
              maxLength={20}
              required
              autoFocus
              autoComplete="nickname"
              className="mt-6 w-full rounded-xl border-2 border-amber-200 bg-white px-4 py-3 text-center text-lg text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-200"
            />

            <button
              type="submit"
              disabled={!draft.trim()}
              className="mt-4 w-full rounded-full bg-orange-500 py-3 font-semibold text-white shadow transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              確定
            </button>
            <button
              type="button"
              onClick={close}
              className="mt-2 w-full py-2 text-sm text-stone-500 hover:text-stone-700"
            >
              先略過
            </button>
          </form>
        ) : (
          <div>
            <p className="text-5xl motion-safe:animate-bounce" aria-hidden>
              👋
            </p>
            <h2 id="welcome-title" className="mt-3 text-2xl font-extrabold text-stone-900">
              歡迎你，<span className="break-all text-orange-600">{name}</span>！
            </h2>
            <p className="mt-2 text-stone-600">很高興見到你，一起來認識香甜的芒果吧！</p>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="mt-6 w-full rounded-full bg-orange-500 py-3 font-semibold text-white shadow transition hover:bg-orange-600"
            >
              開始逛逛
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
