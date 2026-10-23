"use client";

import * as React from "react";
import { Mail, Copy, Check, ArrowUpRight, MapPin, Download } from "lucide-react";
import { SiDocker } from "react-icons/si";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { links } from "@/data/links";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = React.useState(false);
  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email address:", err);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Availability"
      className="scroll-mt-24 py-24 sm:py-32 lg:py-36 relative border-t border-black/[0.06] dark:border-white/[0.06]"
    >
      <Container size="default">
        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Philosophical Closing Statement */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" aria-hidden="true" />
              <h2 className="font-mono text-xs sm:text-[13px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-medium">
                Contact / Availability
              </h2>
            </div>

            {/* Large Editorial Headline */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.08] text-balance">
              Let&apos;s build something useful.
            </h3>

            {/* Supporting Copy */}
            <div className="space-y-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed font-normal">
              <p>
                I&apos;m currently open to software engineering opportunities &mdash; particularly
                work involving backend systems, AI applications, infrastructure, and reliable software.
              </p>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-500">
                Whether you have an engineering role to fill, a complex system challenge to discuss,
                or an interesting technical problem, my inbox is open.
              </p>
            </div>

            {/* Location & Metadata Note */}
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400 pt-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
              <span>{links.location} &middot; Open to remote &amp; on-site roles</span>
            </div>
          </motion.div>

          {/* Right Column: Compact Contact Panel */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.55,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] space-y-6 backdrop-blur-sm">
              {/* Availability Indicator */}
              <div className="flex items-center justify-between pb-5 border-b border-black/[0.06] dark:border-white/[0.06]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
                  Current Status
                </span>
                <div
                  className="flex items-center gap-2"
                  aria-label="Availability status: Open to opportunities"
                >
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                    Open to Opportunities
                  </span>
                </div>

              </div>

              {/* Primary Email CTA Button */}
              <div className="space-y-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Direct Channel
                </span>

                <a
                  href={`mailto:${links.email}`}
                  aria-label={`Send email to ${links.email}`}
                  className="group flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-zinc-950 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-4 h-4 text-zinc-400 dark:text-zinc-600 shrink-0" aria-hidden="true" />
                    <span className="font-mono text-xs sm:text-sm font-semibold truncate">
                      {links.email}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" aria-hidden="true" />
                </a>

                {/* Copy Email Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-black/[0.18] dark:hover:border-white/[0.18] font-mono text-xs transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none touch-manipulation"
                  aria-label={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                      <span className="text-emerald-500 font-medium">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                      <span>Copy email address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Professional Profiles */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] space-y-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Professional Profiles
                </span>

                <div className="space-y-2">
                  {links.github && (
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub profile (opens in new tab)"
                      className="group flex items-center justify-between p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.02] hover:border-black/[0.16] dark:hover:border-white/[0.16] transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <GithubIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                        <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-200 font-medium">
                          {links.githubLabel || "GitHub"}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </a>
                  )}

                  {links.dockerHub && (
                    <a
                      href={links.dockerHub}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Docker Hub profile (opens in new tab)"
                      className="group flex items-center justify-between p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.02] hover:border-black/[0.16] dark:hover:border-white/[0.16] transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <SiDocker className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                        <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-200 font-medium">
                          hub.docker.com/u/arcohnixx
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </a>
                  )}

                  {links.linkedin && (
                    <a
                      href={links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn profile (opens in new tab)"
                      className="group flex items-center justify-between p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.02] hover:border-black/[0.16] dark:hover:border-white/[0.16] transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <LinkedinIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                        <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-200 font-medium">
                          {links.linkedinLabel || "LinkedIn"}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <a
                href={links.resume}
                download
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] px-4 py-3 font-mono text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-black/[0.18] dark:hover:border-white/[0.18] hover:text-zinc-950 dark:hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
