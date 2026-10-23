"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export interface UseActiveSectionOptions {
  rootMargin?: string;
  defaultSection?: string;
}

export function useActiveSection(
  sectionIds: string[],
  options: UseActiveSectionOptions = {}
) {
  const { rootMargin = "-20% 0px -50% 0px", defaultSection = "hero" } = options;
  const [activeSection, setActiveSection] = useState<string>(defaultSection);

  // Lock to prevent IntersectionObserver from overriding active state during programmatic smooth scrolls
  const isManualScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleEntriesRef = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  // Programmatic scroll to a specific section with immediate active state update
  const scrollToSection = useCallback((id: string) => {
    if (typeof window === "undefined") return;

    // 1. Immediately update active state
    setActiveSection(id);
    isManualScrollRef.current = true;

    // 2. Clear any pending unlock timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 3. Update URL hash without causing full re-render
    const targetHash = id === "hero" ? "" : `#${id}`;
    const newUrl = id === "hero" ? window.location.pathname : targetHash;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, "", newUrl);
    }

    // 4. Smooth scroll to target
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

    // 5. Release manual scroll lock once scroll finishes
    const unlock = () => {
      isManualScrollRef.current = false;
      window.removeEventListener("scrollend", unlock);
    };

    window.addEventListener("scrollend", unlock, { once: true });
    scrollTimeoutRef.current = setTimeout(() => {
      unlock();
    }, 900);
  }, []);

  // Listen for user wheel or touch gestures to immediately yield manual scroll lock
  useEffect(() => {
    const handleUserInterrupt = () => {
      if (isManualScrollRef.current) {
        isManualScrollRef.current = false;
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      }
    };

    window.addEventListener("wheel", handleUserInterrupt, { passive: true });
    window.addEventListener("touchmove", handleUserInterrupt, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleUserInterrupt);
      window.removeEventListener("touchmove", handleUserInterrupt);
    };
  }, []);

  // Edge-boundary detection (top of document and bottom of document)
  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const handleBoundaryScroll = () => {
      if (isManualScrollRef.current) return;
      if (window.scrollY < 80) {
        setActiveSection("hero");
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 30
      ) {
        const lastId = sectionIds[sectionIds.length - 1];
        if (lastId) {
          setActiveSection(lastId);
        }
      }
    };

    window.addEventListener("scroll", handleBoundaryScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleBoundaryScroll);
    };
  }, [sectionIds]);

  // Handle initial page load hash, refresh, and browser Back/Forward (popstate/hashchange)
  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const syncWithHash = (smooth: boolean = false) => {
      const hash = window.location.hash.replace("#", "");
      if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash);
        const el = document.getElementById(hash);
        if (el) {
          if (smooth) {
            isManualScrollRef.current = true;
            el.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
              isManualScrollRef.current = false;
            }, 800);
          } else {
            // Immediate positioning on initial mount without layout flash
            requestAnimationFrame(() => {
              el.scrollIntoView();
            });
          }
        }
      } else if (!hash && window.scrollY < 120) {
        setActiveSection("hero");
      }
    };

    // Run on initial mount
    syncWithHash(false);

    const handlePopState = () => {
      syncWithHash(true);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, [sectionIds]);

  // Set up IntersectionObserver to track dominant section in the reading viewport band
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined" ||
      sectionIds.length === 0
    ) {
      return;
    }

    visibleEntriesRef.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        // Update tracking map of visible sections
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleEntriesRef.current.set(entry.target.id, entry);
          } else {
            visibleEntriesRef.current.delete(entry.target.id);
          }
        });

        // If manual scroll is in progress, do not override
        if (isManualScrollRef.current) {
          return;
        }

        // Boundary cases: absolute top or bottom of page
        if (window.scrollY < 80) {
          setActiveSection("hero");
          return;
        }

        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 30
        ) {
          const lastId = sectionIds[sectionIds.length - 1];
          if (lastId) {
            setActiveSection(lastId);
          }
          return;
        }

        const visible = Array.from(visibleEntriesRef.current.values());
        if (visible.length === 0) {
          return;
        }

        // Single intersecting section
        if (visible.length === 1) {
          setActiveSection(visible[0].target.id);
          return;
        }

        // Multiple sections intersecting the reading band: determine dominant one
        let dominant = visible[0];
        for (let i = 1; i < visible.length; i++) {
          if (visible[i].intersectionRect.height > dominant.intersectionRect.height) {
            dominant = visible[i];
          }
        }

        setActiveSection(dominant.target.id);
      },
      {
        root: null,
        rootMargin,
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      }
    );

    // Observe all matching DOM elements
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, rootMargin]);

  return {
    activeSection,
    setActiveSection,
    scrollToSection,
  };
}
