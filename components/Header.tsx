"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OPEN_WELCOME_EVENT, useVisitorName } from "@/lib/visitor-name";

// Section links point at the home page so they also work from /blog.
// The footer (#contact) is on every page, so it doesn't need the prefix.
const navLinks = [
  { href: "/#about", label: "認識芒果" },
  { href: "/#enjoy", label: "吃法" },
  { href: "/#gallery", label: "相簿" },
  { href: "/blog", label: "部落格" },
  { href: "/game", label: "小遊戲" },
  { href: "#contact", label: "聯絡我們" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Highlight page links (not section anchors) when we're on that page
  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);
  const name = useVisitorName();

  return (
    <header className="sticky top-0 z-50 border-b border-amber-200 bg-amber-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-xl font-bold text-orange-600"
        >
          <span aria-hidden>🥭</span>
          芒果樂園
        </Link>

        <div className="flex items-center gap-2 lg:gap-6">
          {/* Greeting; hidden on tablets where the nav needs the room. Click to change the name. */}
          {name && (
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_WELCOME_EVENT))}
              title="更改名稱"
              className="flex max-w-[9rem] items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm text-stone-700 transition hover:bg-amber-200 md:hidden lg:flex lg:max-w-[12rem]"
            >
              <span className="truncate">嗨，{name}</span>
              <span aria-hidden>👋</span>
            </button>
          )}

          {/* Tablet & desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex gap-6 font-medium text-stone-700 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-colors hover:text-orange-600 ${isActive(link.href) ? "text-orange-600" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "關閉選單" : "開啟選單"}
            className="rounded-lg p-2 text-stone-700 hover:bg-amber-100 md:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav id="mobile-menu" className="border-t border-amber-200 md:hidden">
          <ul className="px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 font-medium hover:bg-amber-100 hover:text-orange-600 ${
                    isActive(link.href) ? "text-orange-600" : "text-stone-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
