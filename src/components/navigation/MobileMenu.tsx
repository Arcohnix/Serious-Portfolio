"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Mail, ArrowUpRight } from "lucide-react";
import { SiDocker } from "react-icons/si";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { links } from "@/data/links";
import { NavItemConfig } from "@/data/navigation";

export interface MobileNavItem extends NavItemConfig {
  isActive: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MobileNavItem[];
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  onItemClick?: (item: NavItemConfig) => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  items,
  triggerRef,
  onItemClick,
}: MobileMenuProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const menuRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleClose = React.useCallback(() => {
    onClose();
    // Return focus to trigger button
    triggerRef?.current?.focus();
  }, [onClose, triggerRef]);

  // Lock body scroll, focus trap, and Escape key handling
  React.useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    // Auto-focus the close button when opened
    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[100] md:hidden flex flex-col bg-[#fafafa]/96 dark:bg-[#09090b]/96 backdrop-blur-2xl"
        >
          {/* Subtle atmospheric ambient glow in mobile backdrop */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,28,52,0.25)_0%,transparent_70%)] blur-[90px]" />
            <div className="absolute bottom-[10%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(22,34,58,0.25)_0%,transparent_70%)] blur-[90px]" />
          </div>

          {/* Top Bar inside menu */}
          <div className="relative z-10 flex items-center justify-between px-6 h-18 border-b border-black/[0.06] dark:border-white/[0.06]">
            <Link
              href="/"
              onClick={(e) => {
                handleClose();
                if (pathname === "/") {
                  e.preventDefault();
                  if (onItemClick) {
                    onItemClick({ label: "Home", href: "/", sectionId: "hero" });
                  }
                }
              }}
              className="font-mono text-sm tracking-wider uppercase text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none rounded"
            >
              <span className="font-semibold">Sanket</span>
              <span className="text-zinc-400 dark:text-zinc-500 text-xs">/ dev</span>
            </Link>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label="Close navigation menu"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none transition-colors touch-manipulation"
              >
                <X className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav
            aria-label="Mobile navigation links"
            className="relative z-10 flex-1 px-6 py-10 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-2">
                Navigation
              </span>
              {items.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.18,
                    delay: shouldReduceMotion ? 0 : 0.03 * idx,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={
                      item.isActive
                        ? pathname === "/"
                          ? "location"
                          : "page"
                        : undefined
                    }
                    onClick={(e) => {
                      handleClose();
                      if (onItemClick) {
                        onItemClick(item);
                      }
                      if (pathname === "/" && item.href.startsWith("/#")) {
                        e.preventDefault();
                      }
                    }}
                    className={`flex items-center justify-between py-3.5 px-3 -mx-3 rounded-lg text-lg font-medium tracking-tight transition-colors duration-150 group focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none ${
                      item.isActive
                        ? "text-zinc-950 dark:text-white bg-black/[0.04] dark:bg-white/[0.04]"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className="text-xs font-mono text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors"
                    >
                      0{idx + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Section: Social Presence */}
            <div className="pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4 block">
                Connect
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile (opens in new tab)"
                  className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors touch-manipulation focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                >
                  <GithubIcon className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" aria-hidden="true" />
                </a>
                <a
                  href={links.dockerHub}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Docker Hub profile (opens in new tab)"
                  className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors touch-manipulation focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                >
                  <SiDocker className="w-4 h-4" aria-hidden="true" />
                  <span>Docker Hub</span>
                  <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" aria-hidden="true" />
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile (opens in new tab)"
                  className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors touch-manipulation focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                >
                  <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${links.email}`}
                  aria-label={`Send email to ${links.email}`}
                  className="col-span-2 flex items-center gap-2.5 px-3.5 py-3 rounded-lg border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors touch-manipulation focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                >
                  <Mail className="w-4 h-4 stroke-[1.7]" aria-hidden="true" />
                  <span>{links.email}</span>
                </a>
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
