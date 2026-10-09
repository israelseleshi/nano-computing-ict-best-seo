"use client";

import { useReducedMotion } from "motion/react";
import { FlipWords } from "@/components/ui/flip-words";

export default function FlipTitle({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  return <FlipWords words={words} duration={duration} className={className} />;
}