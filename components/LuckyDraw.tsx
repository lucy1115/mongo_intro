"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const WIN_RATE = 0.1; // 10% chance to win
const SPIN_MS = 1600;
const SYMBOLS = ["🥭", "🍋", "🍊", "🍍", "🍑", "🍌"];

type Status = "idle" | "spinning" | "win" | "lose";

function makeCouponCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return "MANGO90-" + Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

export default function LuckyDraw() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timers = useRef<number[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [symbol, setSymbol] = useState("🥭");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  // The floating button would cover the play area on the game page
  const hideButton = usePathname() === "/game";

  const clearTimers = () => {
    timers.current.forEach((id) => clearInterval(id));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const open = () => {
    setStatus("idle");
    setSymbol("🥭");
    setCopied(false);
    dialogRef.current?.showModal();
  };

  const close = () => {
    clearTimers();
    dialogRef.current?.close();
  };

  const draw = () => {
    clearTimers();
    setStatus("spinning");
    setCopied(false);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    if (!reduceMotion) {
      timers.current.push(window.setInterval(() => setSymbol(SYMBOLS[i++ % SYMBOLS.length]), 90));
    }

    timers.current.push(
      window.setTimeout(
        () => {
          clearTimers();
          if (Math.random() < WIN_RATE) {
            setSymbol("🎉");
            setCode(makeCouponCode());
            setStatus("win");
          } else {
            setSymbol("🥲");
            setStatus("lose");
          }
        },
        reduceMotion ? 300 : SPIN_MS,
      ),
    );
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      {!hideButton && (
        <button
          type="button"
          onClick={open}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-600 sm:bottom-8 sm:right-8"
        >
          <span aria-hidden className="text-xl motion-safe:animate-bounce">🎁</span>
          抽優惠券
        </button>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="lucky-draw-title"
        onClose={clearTimers}
        // Clicking the dimmed backdrop (outside the card) closes the modal
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl bg-transparent p-0 backdrop:bg-stone-900/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative rounded-3xl bg-gradient-to-b from-amber-100 to-white p-6 text-center sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="關閉"
            className="absolute right-3 top-3 rounded-full p-2 text-stone-500 hover:bg-amber-200/60 hover:text-stone-800"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <h2 id="lucky-draw-title" className="text-2xl font-extrabold text-stone-900">
            芒果幸運抽獎
          </h2>
          <p className="mt-1 text-sm text-stone-600">有機會抽中芒果 9 折優惠券！</p>

          <div
            className={`mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full border-4 text-6xl shadow-inner transition-colors ${
              status === "win" ? "border-orange-500 bg-orange-100" : "border-amber-300 bg-white"
            }`}
            aria-hidden
          >
            <span className={status === "win" ? "motion-safe:animate-bounce" : ""}>{symbol}</span>
          </div>

          <div aria-live="polite" className="mt-6 min-h-28">
            {status === "idle" && <p className="text-stone-600">按下按鈕，試試你的手氣！</p>}

            {status === "spinning" && <p className="font-semibold text-orange-600">抽獎中……</p>}

            {status === "win" && (
              <div>
                <p className="text-lg font-bold text-orange-600">恭喜中獎！獲得芒果 9 折優惠券</p>
                <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border-2 border-dashed border-orange-400 bg-white px-4 py-2">
                  <code className="font-mono text-lg font-bold tracking-wider text-stone-900">{code}</code>
                  <button
                    type="button"
                    onClick={copy}
                    className="shrink-0 rounded-lg bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700 hover:bg-orange-200"
                  >
                    {copied ? "已複製 ✓" : "複製"}
                  </button>
                </div>
                <p className="mt-2 text-xs text-stone-500">結帳時輸入此優惠碼即可享 9 折</p>
              </div>
            )}

            {status === "lose" && (
              <div>
                <p className="text-lg font-bold text-stone-800">差一點點！</p>
                <p className="mt-1 text-stone-600">這次沒有中獎，再試一次吧～</p>
              </div>
            )}
          </div>

          {status === "win" ? (
            <button
              type="button"
              onClick={close}
              className="mt-4 w-full rounded-full bg-orange-500 py-3 font-semibold text-white shadow transition hover:bg-orange-600"
            >
              太棒了，收下！
            </button>
          ) : (
            <button
              type="button"
              onClick={draw}
              disabled={status === "spinning"}
              className="mt-4 w-full rounded-full bg-orange-500 py-3 font-semibold text-white shadow transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "lose" ? "再抽一次" : status === "spinning" ? "抽獎中…" : "開始抽獎"}
            </button>
          )}
        </div>
      </dialog>
    </>
  );
}
