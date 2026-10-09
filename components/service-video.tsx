"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export default function ServiceVideo({
  src,
  playbackRate = 1,
  className,
  label,
}: {
  src: string;
  playbackRate?: number;
  className?: string;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      video.controls = true;
      return;
    }

    video.playbackRate = playbackRate;
    const holdRate = () => {
      if (video.playbackRate !== playbackRate) {
        video.playbackRate = playbackRate;
      }
    };
    video.addEventListener("ratechange", holdRate);
    return () => video.removeEventListener("ratechange", holdRate);
  }, [playbackRate, reduceMotion]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay={!reduceMotion}
      muted
      loop={!reduceMotion}
      playsInline
      preload="metadata"
      aria-label={label}
      className={className}
    />
  );
}