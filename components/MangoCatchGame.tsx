"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from "react";
import { useVisitorName } from "@/lib/visitor-name";

type ItemType = "mango" | "golden" | "bug";
type Item = { x: number; y: number; vy: number; type: ItemType; size: number; rot: number; spin: number };
type Pop = { x: number; y: number; text: string; color: string; life: number };
type Status = "ready" | "playing" | "paused" | "over";

type Game = {
  w: number;
  h: number;
  items: Item[];
  pops: Pop[];
  basketX: number;
  targetX: number;
  score: number;
  lives: number;
  elapsed: number;
  spawnIn: number;
};

const LIVES = 3;
const POINTS: Record<ItemType, number> = { mango: 1, golden: 5, bug: 0 };

// ---- Best score, saved in the browser ----
const BEST_KEY = "mango-game-best";
const BEST_EVENT = "mango-game-best-change";

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(score: number) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    // Storage unavailable; the record just won't persist
  }
  window.dispatchEvent(new Event(BEST_EVENT));
}

function subscribeBest(callback: () => void) {
  window.addEventListener(BEST_EVENT, callback);
  return () => window.removeEventListener(BEST_EVENT, callback);
}

// ---- Game logic (plain functions so the animation loop has no React dependencies) ----
const basketWidth = (g: Game) => Math.min(110, Math.max(64, g.w * 0.16));
const itemSize = (g: Game) => Math.min(52, Math.max(34, g.w * 0.09));

function newGame(w: number, h: number): Game {
  return { w, h, items: [], pops: [], basketX: w / 2, targetX: w / 2, score: 0, lives: LIVES, elapsed: 0, spawnIn: 0.6 };
}

function step(g: Game, dt: number, keys: Set<string>) {
  g.elapsed += dt;
  // Difficulty ramps up over the first 60 seconds
  const difficulty = Math.min(g.elapsed / 60, 1);
  const scale = g.h / 600;
  const bw = basketWidth(g);

  // Keyboard movement
  const keySpeed = 650 * dt * Math.max(scale, 0.8);
  if (keys.has("ArrowLeft") || keys.has("a")) g.targetX -= keySpeed;
  if (keys.has("ArrowRight") || keys.has("d")) g.targetX += keySpeed;
  g.targetX = Math.max(bw / 2, Math.min(g.w - bw / 2, g.targetX));
  g.basketX += (g.targetX - g.basketX) * Math.min(1, dt * 18);

  // Spawn new items
  g.spawnIn -= dt;
  if (g.spawnIn <= 0) {
    g.spawnIn = 0.9 - 0.55 * difficulty;
    const size = itemSize(g);
    const r = Math.random();
    const type: ItemType = r < 0.07 ? "golden" : r < 0.22 ? "bug" : "mango";
    g.items.push({
      x: size / 2 + Math.random() * (g.w - size),
      y: -size,
      vy: (160 + 260 * difficulty) * (0.85 + Math.random() * 0.3) * scale,
      type,
      size,
      rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 3,
    });
  }

  // Move items, check catches and misses
  const catchTop = g.h - bw * 0.85;
  g.items = g.items.filter((item) => {
    item.y += item.vy * dt;
    item.rot += item.spin * dt;

    const inBasket = item.y + item.size / 2 >= catchTop && item.y <= g.h && Math.abs(item.x - g.basketX) < bw / 2;
    if (inBasket) {
      if (item.type === "bug") {
        g.lives -= 1;
        g.pops.push({ x: item.x, y: catchTop, text: "-❤️", color: "#dc2626", life: 0.9 });
      } else {
        g.score += POINTS[item.type];
        g.pops.push({
          x: item.x,
          y: catchTop,
          text: `+${POINTS[item.type]}`,
          color: item.type === "golden" ? "#ca8a04" : "#ea580c",
          life: 0.9,
        });
      }
      return false;
    }

    if (item.y - item.size / 2 > g.h) {
      if (item.type !== "bug") {
        g.lives -= 1;
        g.pops.push({ x: item.x, y: g.h - 30, text: "掉了！", color: "#dc2626", life: 0.9 });
      }
      return false;
    }
    return true;
  });

  g.pops = g.pops.filter((p) => {
    p.life -= dt;
    p.y -= 50 * dt;
    return p.life > 0;
  });
}

function draw(ctx: CanvasRenderingContext2D, g: Game) {
  const { w, h } = g;
  ctx.clearRect(0, 0, w, h);

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#fde68a");
  sky.addColorStop(1, "#fff7ed");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#bbf7d0";
  ctx.fillRect(0, h - 12, w, 12);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (const item of g.items) {
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.rot);
    if (item.type === "golden") {
      ctx.shadowColor = "#facc15";
      ctx.shadowBlur = 24;
    }
    ctx.font = `${item.size}px serif`;
    ctx.fillText(item.type === "bug" ? "🐛" : "🥭", 0, 0);
    if (item.type === "golden") {
      ctx.font = `${item.size * 0.45}px serif`;
      ctx.fillText("✨", item.size * 0.4, -item.size * 0.4);
    }
    ctx.restore();
  }

  const bw = basketWidth(g);
  ctx.font = `${bw * 0.9}px serif`;
  ctx.fillText("🧺", g.basketX, h - bw * 0.45 - 6);

  for (const p of g.pops) {
    ctx.globalAlpha = Math.max(0, p.life / 0.9);
    ctx.fillStyle = p.color;
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(p.text, p.x, p.y);
  }
  ctx.globalAlpha = 1;
}

// ---- Component ----
export default function MangoCatchGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(newGame(0, 0));
  const keysRef = useRef(new Set<string>());

  const [status, setStatus] = useState<Status>("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [newRecord, setNewRecord] = useState(false);
  const best = useSyncExternalStore(subscribeBest, readBest, () => 0);
  const name = useVisitorName();

  // Keep the canvas sharp and sized to its container
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const g = gameRef.current;
      const ratio = g.w ? g.basketX / g.w : 0.5;
      g.w = width;
      g.h = height;
      g.basketX = g.targetX = width * ratio;
      draw(ctx, g);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  // Animation loop, only while playing
  useEffect(() => {
    if (status !== "playing") return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const g = gameRef.current;
      const before = { score: g.score, lives: g.lives };
      step(g, dt, keysRef.current);
      draw(ctx, g);
      if (g.score !== before.score) setScore(g.score);
      if (g.lives !== before.lives) setLives(Math.max(0, g.lives));

      if (g.lives <= 0) {
        const record = g.score > readBest();
        if (record) saveBest(g.score);
        setNewRecord(record);
        setStatus("over");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status]);

  // Keyboard controls, and auto-pause when the tab is hidden
  useEffect(() => {
    const keys = keysRef.current;
    const gameKeys = ["ArrowLeft", "ArrowRight", "a", "d"];
    const down = (e: KeyboardEvent) => {
      if (status === "playing" && gameKeys.includes(e.key)) {
        e.preventDefault();
        keys.add(e.key);
      }
    };
    const up = (e: KeyboardEvent) => keys.delete(e.key);
    const hidden = () => {
      if (document.hidden && status === "playing") setStatus("paused");
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      document.removeEventListener("visibilitychange", hidden);
      keys.clear();
    };
  }, [status]);

  const start = () => {
    const g = gameRef.current;
    gameRef.current = newGame(g.w, g.h);
    setScore(0);
    setLives(LIVES);
    setNewRecord(false);
    setStatus("playing");
  };

  const moveBasket = (e: PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    gameRef.current.targetX = e.clientX - rect.left;
  };

  const overlayButton =
    "rounded-full bg-orange-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-orange-600";

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Scoreboard */}
      <div className="mb-3 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm sm:px-6">
        <p className="text-stone-600">
          得分 <span className="ml-1 text-2xl font-extrabold text-orange-600 tabular-nums">{score}</span>
        </p>
        <p className="text-xl tracking-wider" aria-label={`剩下 ${lives} 條命`}>
          {Array.from({ length: LIVES }, (_, i) => (i < lives ? "❤️" : "🤍")).join("")}
        </p>
        <p className="text-stone-600">
          最高 <span className="ml-1 text-lg font-bold text-stone-900 tabular-nums">{best}</span>
        </p>
      </div>

      <div
        ref={wrapRef}
        // Fill the screen below the title and scoreboard so the basket is always visible without scrolling
        className="relative h-[clamp(320px,calc(100svh-20rem),600px)] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-amber-200"
      >
        <canvas
          ref={canvasRef}
          onPointerMove={moveBasket}
          onPointerDown={moveBasket}
          className="block h-full w-full touch-none select-none"
          aria-label="接芒果遊戲畫面"
        />

        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-50/85 px-6 text-center backdrop-blur-sm">
            {status === "ready" && (
              <>
                <p className="text-6xl" aria-hidden>
                  🧺
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-stone-900 sm:text-3xl">準備好接芒果了嗎？</h2>
                <ul className="mt-4 space-y-1 text-stone-600">
                  <li>🥭 芒果 +1 分，✨ 金芒果 +5 分</li>
                  <li>🐛 接到毛毛蟲或漏接芒果會扣一條命</li>
                  <li>滑鼠、手指拖曳或 ← → 鍵移動籃子</li>
                </ul>
                <button type="button" onClick={start} className={`mt-6 ${overlayButton}`}>
                  開始遊戲
                </button>
              </>
            )}

            {status === "paused" && (
              <>
                <h2 className="text-2xl font-extrabold text-stone-900">遊戲暫停</h2>
                <button type="button" onClick={() => setStatus("playing")} className={`mt-6 ${overlayButton}`}>
                  繼續
                </button>
              </>
            )}

            {status === "over" && (
              <>
                <p className="text-6xl" aria-hidden>
                  {newRecord ? "🏆" : "🥭"}
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-stone-900 sm:text-3xl">
                  {newRecord ? "新紀錄！" : "遊戲結束"}
                </h2>
                <p className="mt-2 text-lg text-stone-700">
                  {name ? `${name}，` : ""}你接到了 <span className="font-extrabold text-orange-600">{score}</span> 分
                </p>
                <p className="mt-1 text-sm text-stone-500">最高紀錄：{best} 分</p>
                <button type="button" onClick={start} className={`mt-6 ${overlayButton}`}>
                  再玩一次
                </button>
              </>
            )}
          </div>
        )}

        {status === "playing" && (
          <button
            type="button"
            onClick={() => setStatus("paused")}
            aria-label="暫停"
            className="absolute right-3 top-3 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-stone-700 shadow hover:bg-white"
          >
            ⏸ 暫停
          </button>
        )}
      </div>
    </div>
  );
}
