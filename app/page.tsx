import Image from "next/image";
import Parallax from "@/components/Parallax";
import HeroGreeting from "@/components/HeroGreeting";

const facts = [
  { icon: "🌞", title: "熱帶之王", text: "芒果原產於南亞，喜歡溫暖陽光，台灣的產季集中在 5 到 8 月。" },
  { icon: "💪", title: "營養豐富", text: "富含維生素 A、C 與膳食纖維，香甜又有飽足感。" },
  { icon: "🍋", title: "品種多樣", text: "愛文、金煌、土芒果……每一種都有獨特的香氣與口感。" },
];

const ways = [
  {
    src: "/images/mango-sliced.jpg",
    alt: "白色盤子上切好的新鮮芒果片",
    title: "新鮮切片",
    text: "最簡單也最美味，冰過之後直接吃，甜度滿分。",
  },
  {
    src: "/images/mango-juice.jpg",
    alt: "加了冰塊和檸檬片的芒果汁",
    title: "芒果冰沙",
    text: "加入冰塊與一點檸檬汁打成冰沙，是夏天的消暑首選。",
  },
  {
    src: "/images/mango-tray.jpg",
    alt: "一整盤黃澄澄的芒果",
    title: "整顆收藏",
    text: "買回家的芒果放在室溫熟成，散發香氣後再放進冰箱。",
  },
];

const gallery = [
  { src: "/images/mango-hero.jpg", alt: "堆在一起的紅黃色新鮮芒果" },
  { src: "/images/mango-tree.jpg", alt: "樹上掛著帶露珠的芒果" },
  { src: "/images/mango-tray.jpg", alt: "盤子裡堆滿的芒果" },
  { src: "/images/mango-sliced.jpg", alt: "切好的芒果片" },
  { src: "/images/mango-juice.jpg", alt: "一杯芒果汁與切花芒果" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-amber-100 to-amber-50">
        {/* Decorative blurred shapes drifting at different speeds */}
        <Parallax speed={0.45} className="pointer-events-none absolute -left-24 top-10 -z-10" innerClassName="h-64 w-64 rounded-full bg-orange-300/50 blur-3xl sm:h-80 sm:w-80">
          <span />
        </Parallax>
        <Parallax speed={-0.25} className="pointer-events-none absolute -right-20 bottom-0 -z-10" innerClassName="h-72 w-72 rounded-full bg-yellow-300/60 blur-3xl sm:h-96 sm:w-96">
          <span />
        </Parallax>

        <div className="mx-auto grid max-w-6xl items-center gap-[52px] px-4 py-10 sm:py-14 md:grid-cols-2 md:gap-10 lg:py-24">
          {/* Text sits above the image on phones, so only let it drift when they're side by side (768px+) */}
          <Parallax speed={0.2} minWidth={768} className="text-center md:text-left">
            <HeroGreeting />
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-stone-900 sm:text-4xl lg:text-5xl">
              香甜多汁的<span className="text-orange-500">芒果</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-stone-600 sm:mt-5 sm:text-lg">
              從枝頭到餐桌，一起認識這顆金黃色的熱帶水果，找到你最喜歡的吃法。
            </p>
            <a
              href="#about"
              className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow transition hover:bg-orange-600 sm:mt-8"
            >
              開始探索
            </a>
          </Parallax>
          <Parallax
            speed={0.12}
            className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl shadow-xl md:aspect-[3/4] md:max-w-sm"
            innerClassName="absolute inset-x-0 -inset-y-[15%]"
          >
            <Image
              src="/images/mango-hero.jpg"
              alt="堆在一起的紅黃色新鮮芒果"
              fill
              loading="eager"
              sizes="(min-width: 768px) 384px, (min-width: 640px) 576px, 100vw"
              className="object-cover"
            />
          </Parallax>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-stone-900 sm:text-3xl">認識芒果</h2>
          <div className="mt-8 grid items-center gap-8 md:mt-10 md:grid-cols-2 md:gap-10">
            <Parallax
              speed={0.15}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg"
              innerClassName="absolute inset-x-0 -inset-y-[20%]"
            >
              <Image
                src="/images/mango-tree.jpg"
                alt="樹上掛著帶露珠的芒果"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </Parallax>
            <ul className="space-y-6">
              {facts.map((fact) => (
                <li key={fact.title} className="flex gap-4">
                  <span className="text-3xl" aria-hidden>
                    {fact.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">{fact.title}</h3>
                    <p className="mt-1 text-stone-600">{fact.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Parallax banner */}
      <section className="relative isolate overflow-hidden">
        <Parallax
          speed={0.3}
          className="absolute inset-0 -z-10"
          innerClassName="absolute inset-x-0 -inset-y-[35%]"
        >
          <Image
            src="/images/mango-orchard.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/60" />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center text-white sm:py-32 lg:py-40">
          <p className="text-sm font-semibold tracking-[0.3em] text-amber-300">FROM TREE TO TABLE</p>
          <p className="mt-4 text-2xl font-bold leading-snug sm:text-4xl lg:text-5xl">
            每一口，都是陽光的味道
          </p>
          <p className="mt-4 text-base text-stone-200 sm:text-lg">在果園裡慢慢熟成，只為了最甜的那一刻。</p>
        </div>
      </section>

      {/* Ways to enjoy */}
      <section id="enjoy" className="scroll-mt-20 bg-amber-100/60 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-stone-900 sm:text-3xl">芒果怎麼吃</h2>
          <div className="mx-auto mt-8 grid max-w-md gap-6 md:mt-10 md:max-w-none md:grid-cols-3 lg:gap-8">
            {ways.map((way) => (
              <article key={way.title} className="overflow-hidden rounded-2xl bg-white shadow-md">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={way.src}
                    alt={way.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 448px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 lg:p-5">
                  <h3 className="text-xl font-semibold text-stone-900">{way.title}</h3>
                  <p className="mt-2 text-stone-600">{way.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-20 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-stone-900 sm:text-3xl">芒果相簿</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:mt-10 md:grid-cols-5">
            {gallery.map((photo, i) => (
              <div
                key={photo.src}
                // On phones the first photo spans both columns so the 5 photos fill the grid evenly
                className={`relative overflow-hidden rounded-xl shadow ${
                  i === 0 ? "col-span-2 aspect-[2/1] md:col-span-1 md:aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 768px) 20vw, 100vw" : "(min-width: 768px) 20vw, 50vw"}
                  className="object-cover transition duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
