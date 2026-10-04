import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDate, posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "部落格 | 芒果樂園",
  description: "芒果品種、挑選保存與營養吃法的文章",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-amber-100 to-amber-50 px-4 py-12 text-center md:py-16">
        <p className="font-semibold text-orange-600">芒果部落格</p>
        <h1 className="mt-2 text-3xl font-extrabold text-stone-900 sm:text-4xl">關於芒果的大小事</h1>
        <p className="mx-auto mt-4 max-w-xl text-stone-600 sm:text-lg">
          從品種、挑選保存到營養吃法，帶你更認識這顆夏天的金黃色水果。
        </p>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-md gap-6 md:max-w-6xl md:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  fill
                  loading="eager"
                  sizes="(min-width: 768px) 33vw, 448px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <article className="flex flex-1 flex-col p-5">
                <p className="text-sm text-stone-500">
                  {formatDate(post.date)} · 閱讀 {post.readMinutes} 分鐘
                </p>
                <h2 className="mt-2 text-lg font-bold leading-snug text-stone-900 group-hover:text-orange-600">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-stone-600">{post.excerpt}</p>
                <span className="mt-4 font-semibold text-orange-600">閱讀全文 →</span>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
