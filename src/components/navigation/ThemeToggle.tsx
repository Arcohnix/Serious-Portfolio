"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const isClient = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const shouldReduceMotion = useReducedMotion();

  if (!isClient) {
    // Provide visually balanced SSR placeholder
    return (
      <div
        className={`w-9 h-9 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-transparent ${className ?? ""}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 
        border-black/[0.08] dark:border-white/[0.08] 
        bg-black/[0.03] dark:bg-white/[0.04] 
        hover:border-black/[0.16] dark:hover:border-white/[0.18]
        hover:bg-black/[0.06] dark:hover:bg-white/[0.08]
        text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white
        touch-manipulation before:absolute before:-inset-1.5 before:content-['']
        focus-visible:ring-1 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 focus-visible:outline-none ${className ?? ""}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -25, scale: 0.85 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 25, scale: 0.85 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
          >
            <Moon className="w-4 h-4 stroke-[1.6]" aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 25, scale: 0.85 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -25, scale: 0.85 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
          >
            <Sun className="w-4 h-4 stroke-[1.6]" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
