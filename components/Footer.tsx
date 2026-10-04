export default function Footer() {
  return (
    <footer id="contact" className="bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3 md:py-12">
        <div className="sm:col-span-2 md:col-span-1">
          <p className="flex items-center gap-2 text-lg font-bold text-amber-400">
            <span aria-hidden>🥭</span>
            芒果樂園
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            分享芒果的美味、知識與吃法，讓每個夏天都甜甜的。
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">聯絡我們</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>Email：hello@mango.example</li>
            <li>電話：(06) 123-4567</li>
            <li>地址：台南市玉井區芒果路 1 號</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">圖片來源</p>
          <p className="mt-3 text-sm">
            本站照片來自{" "}
            <a
              href="https://unsplash.com/s/photos/mango"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 underline hover:text-amber-300"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-stone-700 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} 芒果樂園. All rights reserved.
      </div>
    </footer>
  );
}
