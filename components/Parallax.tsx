"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  /** How fast the content drifts relative to scrolling. Negative values move the other way. */
  speed?: number;
  /** Classes for the outer box, which stays in place and is used for measuring. */
  className?: string;
  /** Classes for the inner layer that actually moves. */
  innerClassName?: string;
  /** Turn the effect off when the screen is narrower than this many pixels. */
  minWidth?: number;
  children: ReactNode;
};

export default function Parallax({ speed = 0.15, className, innerClassName, minWidth = 0, children }: ParallaxProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      if (window.innerWidth < minWidth) {
        inner.style.transform = "";
        return;
      }
      const rect = outer.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      // Distance between the box's center and the viewport's center
      const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
      let offset = -distance * speed;

      // When the inner layer is taller than its frame, never move it past the frame's edges
      const room = (inner.offsetHeight - outer.offsetHeight) / 2;
      if (room > 0) offset = Math.max(-room, Math.min(room, offset));

      inner.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [speed, minWidth]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className={innerClassName} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
