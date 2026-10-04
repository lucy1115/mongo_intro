import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts } from "@/lib/posts";

// Only the slugs listed in generateStaticParams exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} | 芒果樂園`, description: post.excerpt };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <article>
      <header className="relative isolate overflow-hidden">
        <Image src={post.cover.src} alt={post.cover.alt} fill loading="eager" sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-stone-900/50 to-stone-900/70" />
        <div className="mx-auto max-w-3xl px-4 py-16 text-white sm:py-24">
          <Link href="/blog" className="text-sm font-semibold text-amber-300 hover:text-amber-200">
            ← 返回部落格
          </Link>
          <h1 className="mt-4 text-2xl font-extrabold leading-snug sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-stone-200">
            {formatDate(post.date)} · 閱讀 {post.readMinutes} 分鐘
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <div className="space-y-5 text-base leading-loose text-stone-700 sm:text-lg">
          {post.content.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2 key={i} className="pt-4 text-xl font-bold text-stone-900 sm:text-2xl">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="space-y-2 rounded-2xl bg-amber-100/70 p-5 sm:p-6">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden>🥭</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block.text}</p>;
          })}
        </div>
      </div>

      <aside className="bg-amber-100/60 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-bold text-stone-900">你可能也喜歡</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="group flex gap-4 rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={other.cover.src} alt={other.cover.alt} fill sizes="96px" className="object-cover" />
                </div>
                <p className="self-center font-semibold leading-snug text-stone-900 group-hover:text-orange-600">
                  {other.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </article>
  );
}
