"use client";

import { useState, type FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Nothing is saved yet; just let the visitor know sales haven't started
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-12 text-white md:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-extrabold sm:text-3xl">芒果開賣搶先知</h2>
        <p className="mt-2 text-orange-50">留下你的 Email，加入興趣名單</p>

        <form onSubmit={submit} className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSubmitted(false);
            }}
            placeholder="請輸入你的 Email"
            required
            autoComplete="email"
            className="min-w-0 flex-1 rounded-full border-2 border-transparent bg-white px-5 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-200 focus:ring-4 focus:ring-white/40"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-stone-900 px-6 py-3 font-semibold text-white shadow transition hover:bg-stone-700"
          >
            加入興趣名單
          </button>
        </form>

        <p aria-live="polite" className="mt-4 min-h-6 font-semibold">
          {submitted && "🥭 謝謝你的支持！目前尚未開賣，請等待開賣通知～"}
        </p>
      </div>
    </section>
  );
}
