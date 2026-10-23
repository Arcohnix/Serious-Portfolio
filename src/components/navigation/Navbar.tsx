"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu } from "lucide-react";
import { SiDocker } from "react-icons/si";
import { motion, useReducedMotion } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { links } from "@/data/links";
import {
  navigationItems,
  HOMEPAGE_SECTION_IDS,
  NavItemConfig,
} from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

const EMPTY_SECTION_IDS: string[] = [];

export function Navbar() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const menuTriggerRef = React.useRef<HTMLButtonElement>(null);

  // Active section management via IntersectionObserver & programmatic locks
  const { activeSection, scrollToSection } = useActiveSection(
    pathname === "/" ? HOMEPAGE_SECTION_IDS : EMPTY_SECTION_IDS,
  );

  React.useEffect(() => {
    const handleScroll = () => {
      const isOver = window.scrollY > 16;
      setIsScrolled((prev) => (prev !== isOver ? isOver : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getIsActive = (item: NavItemConfig) => {
    if (pathname === "/") {
      if (
        item.sectionId === "about" &&
        (activeSection === "about" ||
          activeSection === "stack" ||
          activeSection === "engineering" ||
          activeSection === "experience")
      ) {
        return true;
      }
      return activeSection === item.sectionId;
    }
    if (item.routeMatch) {
      return item.routeMatch(pathname);
    }
    return pathname === item.href || pathname.startsWith(item.href + "/");
  };

  const navItemsWithActive = navigationItems.map((item) => ({
    ...item,
    isActive: getIsActive(item),
  }));

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItemConfig,
  ) => {
    if (pathname === "/" && item.href.startsWith("/#")) {
      e.preventDefault();
      scrollToSection(item.sectionId);
    }
  };

  return (
    <>
      <header className="sticky top-3 sm:top-4 z-50 w-full px-4 sm:px-6 pointer-events-none">
        <div
          className={`mx-auto max-w-5xl rounded-full transition-all duration-300 pointer-events-auto flex items-center justify-between px-4 sm:px-5 h-13 sm:h-14 border ${
            isScrolled
              ? "bg-[#fafafa]/80 dark:bg-[#050507]/72 backdrop-blur-xl border-black/[0.08] dark:border-white/[0.08] shadow-lg shadow-black/[0.04] dark:shadow-black/40"
              : "bg-[#fafafa]/45 dark:bg-[#050507]/40 backdrop-blur-md border-black/[0.04] dark:border-white/[0.06]"
          }`}
        >
          {/* Brand Identity / Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollToSection("hero");
              }
            }}
            className="flex items-center gap-2 group focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none rounded-full px-1 py-0.5"
            aria-label="Sanket Desai — Home"
          >
            <div
              className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-200 transition-colors"
              aria-hidden="true"
            />
            <span className="font-mono text-xs sm:text-[13px] font-semibold tracking-wider uppercase text-zinc-900 dark:text-zinc-100">
              Sanket Desai
            </span>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-1"
          >
            {navItemsWithActive.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={
                  item.isActive
                    ? pathname === "/"
                      ? "location"
                      : "page"
                    : undefined
                }
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-3.5 py-1.5 text-[13px] tracking-tight font-medium rounded-full transition-colors duration-150 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none ${
                  item.isActive
                    ? "text-zinc-950 dark:text-zinc-50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {item.label}
                {item.isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-black/[0.05] dark:bg-white/[0.07] -z-10"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 32 }
                    }
                  />
                )}
                {item.isActive && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zinc-700 dark:bg-zinc-300"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Items (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <GithubIcon className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={links.dockerHub}
              target="_blank"
              rel="noreferrer"
              aria-label="Docker Hub profile"
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <SiDocker className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href={links.resume}
              download
              className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.03] dark:bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Resume
            </a>

            <div
              className="w-px h-4 bg-black/[0.08] dark:border-white/[0.08] mx-1"
              aria-hidden="true"
            />

            <ThemeToggle />
          </div>

          {/* Mobile Right Bar: Theme Toggle + Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <a
              href={links.resume}
              download
              aria-label="Download resume"
              className="flex h-10 items-center gap-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.04] px-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Resume
            </a>
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none transition-colors touch-manipulation"
            >
              <Menu className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Menu Sheet */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navItemsWithActive}
        triggerRef={menuTriggerRef}
        onItemClick={(item) => {
          if (pathname === "/") {
            scrollToSection(item.sectionId);
          }
        }}
      />
    </>
  );
}
