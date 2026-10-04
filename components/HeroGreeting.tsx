"use client";

import { useVisitorName } from "@/lib/visitor-name";

export default function HeroGreeting() {
  const name = useVisitorName();
  return <p className="font-semibold text-orange-600">{name ? `嗨，${name}！這是屬於你的夏天滋味` : "夏天的滋味"}</p>;
}
