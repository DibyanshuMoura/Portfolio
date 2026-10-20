"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const SPIN_TICKS = 14;
const TICK_MS = 42;
const STAGGER_TICKS = 2;
const HANDLE = site.handle;
const LAST_TICK = SPIN_TICKS + (HANDLE.length - 1) * STAGGER_TICKS;

function frame(tick: number): string {
  return HANDLE.split("")
    .map((letter, index) =>
      tick >= SPIN_TICKS + index * STAGGER_TICKS
        ? letter
        : ALPHABET[(tick + index) % ALPHABET.length],
    )
    .join("");
}

export function AnimatedName() {
  const [tick, setTick] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let step = 0;
    const timer = setInterval(() => {
      setTick(step);
      step += 1;
      if (step > LAST_TICK) clearInterval(timer);
    }, TICK_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <span className="sr-only">{site.displayName}</span>
      <span aria-hidden>{tick === null ? HANDLE : frame(tick)}</span>
    </>
  );
}
