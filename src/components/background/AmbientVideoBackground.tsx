"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface AmbientVideoBackgroundProps {
  /** Optional video source override */
  videoSrc?: string;
  /** Controls overlay darkness level when sections require higher contrast */
  overlayIntensity?: "normal" | "deep" | "maximum";
}

export function AmbientVideoBackground({
  videoSrc = "/videos/ambient-atmosphere.webm",
  overlayIntensity = "normal",
}: AmbientVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { resolvedTheme } = useTheme();
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const prefersReducedMotion = React.useSyncExternalStore(
    (callback) => {
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      motionQuery.addEventListener("change", callback);
      return () => motionQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  const isMobile = React.useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia("(max-width: 767px)");
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false
  );

  const shouldPlayVideo =
    isClient &&
    !prefersReducedMotion &&
    !isMobile &&
    !hasError &&
    resolvedTheme !== "light";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlayVideo) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setHasError(true);
        });
      }
    } else {
      video.pause();
    }
  }, [shouldPlayVideo]);

  // Readability scrim variations (focused primarily behind central text)
  const scrimOpacities = {
    normal: "opacity-40",
    deep: "opacity-60",
    maximum: "opacity-80",
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-[-1] overflow-hidden"
    >
      {/* 1. LAYER: Fundamental Base - Pure Deep Black (#050507) */}
      <div className="absolute inset-0 bg-[#fafafa] dark:bg-[#050507] transition-colors duration-500" />

      {/* 2. LAYER: Ambient Video (low opacity for subtle organic texture, no grey wash) */}
      {!prefersReducedMotion && !isMobile && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          tabIndex={-1}
          preload="metadata"
          onCanPlayThrough={() => setVideoLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
            videoLoaded && shouldVideoBeVisible(isClient, resolvedTheme, hasError)
              ? "opacity-20 dark:opacity-25"
              : "opacity-0"
          }`}
          style={{
            filter: "blur(40px) brightness(0.85)",
            transform: "translate3d(0, 0, 0) scale(1.10)",
            willChange: "transform, opacity",
          }}
        />
      )}

      {/* 3. MULTI-LAYER ATMOSPHERE: Distinct, Rich, Moving Color Regions Surrounded by Pure Black */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* DARK MODE: Pure Black Base + Purple, Blue, Deep Red, Soft White */}
        <div className="hidden dark:block absolute inset-0">
          {/* Layer 1: Major Purple Atmosphere (#6B3FA0 / #7C4DB5) — Upper-Left → Center → Upper-Right */}
          <div
            className={`absolute -top-[12%] -left-[12%] w-[72vw] h-[72vw] sm:w-[56vw] sm:h-[56vw] max-w-[850px] max-h-[850px] rounded-full blur-[90px] sm:blur-[150px] md:blur-[180px] pointer-events-none ${
              !prefersReducedMotion ? "animate-drift-purple" : ""
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(124, 77, 181, 0.72) 0%, rgba(107, 63, 160, 0.45) 38%, rgba(68, 36, 110, 0.15) 62%, transparent 80%)",
            }}
          />

          {/* Layer 2: Major Blue Atmosphere (#315C9B / #416FAF) — Right → Center → Lower-Left */}
          <div
            className={`absolute top-[8%] -right-[14%] w-[70vw] h-[70vw] sm:w-[54vw] sm:h-[54vw] max-w-[820px] max-h-[820px] rounded-full blur-[95px] sm:blur-[155px] md:blur-[185px] pointer-events-none ${
              !prefersReducedMotion ? "animate-drift-blue" : ""
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(65, 111, 175, 0.72) 0%, rgba(49, 92, 155, 0.45) 40%, rgba(28, 58, 105, 0.15) 64%, transparent 80%)",
            }}
          />

          {/* Layer 3: Major Deep Red Atmosphere (#8F2635 / #A83246) — Bottom-Right → Center → Bottom-Left */}
          <div
            className={`absolute -bottom-[10%] left-[6%] w-[74vw] h-[74vw] sm:w-[58vw] sm:h-[58vw] max-w-[880px] max-h-[880px] rounded-full blur-[100px] sm:blur-[160px] md:blur-[190px] pointer-events-none ${
              !prefersReducedMotion ? "animate-drift-red" : ""
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(168, 50, 70, 0.70) 0%, rgba(143, 38, 53, 0.44) 38%, rgba(100, 24, 36, 0.14) 62%, transparent 80%)",
            }}
          />

          {/* Layer 4: Secondary Purple Atmosphere (#6B3FA0) — Fluid counter-drift */}
          <div
            className={`absolute top-[28%] left-[8%] w-[55vw] h-[55vw] sm:w-[42vw] sm:h-[42vw] max-w-[620px] max-h-[620px] rounded-full blur-[80px] sm:blur-[140px] pointer-events-none ${
              !prefersReducedMotion ? "animate-drift-purple-sec" : ""
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(107, 63, 160, 0.58) 0%, rgba(76, 40, 120, 0.30) 42%, transparent 75%)",
            }}
          />

          {/* Layer 5: Secondary Blue Atmosphere (#315C9B) — Fluid lower accent */}
          <div
            className={`absolute bottom-[16%] right-[12%] w-[54vw] h-[54vw] sm:w-[40vw] sm:h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-[85px] sm:blur-[145px] pointer-events-none ${
              !prefersReducedMotion ? "animate-drift-blue-sec" : ""
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(49, 92, 155, 0.55) 0%, rgba(32, 65, 115, 0.28) 42%, transparent 75%)",
            }}
          />

          {/* Layer 6: Soft White Highlight (#D9D9E0) — Subtle occasional center breathing */}
          <div
            className={`absolute top-[26%] left-[28%] w-[45vw] h-[45vw] sm:w-[34vw] sm:h-[34vw] max-w-[480px] max-h-[480px] rounded-full blur-[70px] sm:blur-[120px] pointer-events-none ${
              !prefersReducedMotion ? "animate-drift-white" : ""
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(217, 217, 224, 0.24) 0%, rgba(217, 217, 224, 0.06) 45%, transparent 70%)",
            }}
          />
        </div>

        {/* LIGHT MODE: Intact soft daylight through colored glass */}
        <div className="block dark:hidden absolute inset-0 opacity-80">
          <div
            className={`absolute -top-[10%] -left-[10%] w-[58vw] h-[58vw] rounded-full blur-[100px] pointer-events-none ${
              !prefersReducedMotion ? "animate-drift-purple" : ""
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(168, 130, 204, 0.16) 0%, rgba(250, 250, 250, 0) 70%)",
            }}
          />
          <div
            className={`absolute top-[20%] -right-[10%] w-[56vw] h-[56vw] rounded-full blur-[110px] pointer-events-none ${
              !prefersReducedMotion ? "animate-drift-blue" : ""
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(120, 160, 220, 0.16) 0%, rgba(250, 250, 250, 0) 70%)",
            }}
          />
          <div
            className={`absolute -bottom-[12%] left-[15%] w-[60vw] h-[60vw] rounded-full blur-[115px] pointer-events-none ${
              !prefersReducedMotion ? "animate-drift-red" : ""
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(224, 86, 96, 0.13) 0%, rgba(250, 250, 250, 0) 70%)",
            }}
          />
        </div>
      </div>

      {/* 4. LAYER: Localized Content Legibility Scrim (Preserves outer colors while guaranteeing text contrast) */}
      <div
        className={`hidden dark:block absolute inset-0 pointer-events-none transition-opacity duration-300 ${scrimOpacities[overlayIntensity]}`}
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 40%, rgba(5, 5, 7, 0.50) 0%, transparent 85%)",
        }}
      />

      {/* 5. LAYER: Smooth Peripheral Near-Black Vignette (Frames page in pure #050507 black) */}
      <div
        className="hidden dark:block absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 50%, transparent 58%, rgba(5, 5, 7, 0.85) 100%)",
        }}
      />
    </div>
  );
}

function shouldVideoBeVisible(
  mounted: boolean,
  resolvedTheme: string | undefined,
  hasError: boolean
): boolean {
  if (!mounted) return false;
  if (hasError) return false;
  return resolvedTheme === "dark";
}
