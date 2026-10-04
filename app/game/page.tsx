import type { Metadata } from "next";
import MangoCatchGame from "@/components/MangoCatchGame";

export const metadata: Metadata = {
  title: "接芒果小遊戲 | 芒果樂園",
  description: "移動籃子接住掉落的芒果，挑戰你的最高分！",
};

export default function GamePage() {
  return (
    <section className="bg-gradient-to-b from-amber-100 to-amber-50 px-4 py-6 md:py-12">
      <div className="mb-4 text-center md:mb-6">
        <p className="font-semibold text-orange-600">休息一下</p>
        <h1 className="mt-1 text-3xl font-extrabold text-stone-900 sm:text-4xl">接芒果小遊戲</h1>
        <p className="mt-2 text-stone-600">接住掉下來的芒果，小心毛毛蟲！</p>
      </div>
      <MangoCatchGame />
    </section>
  );
}
