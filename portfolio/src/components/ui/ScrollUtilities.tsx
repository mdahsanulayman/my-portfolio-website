"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollUtilities() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number | null = null;
    let shouldMeasureRange = true;
    let scrollableHeight = 0;
    let lastBackToTopState = false;

    const updateScrollState = () => {
      if (shouldMeasureRange) {
        scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
        shouldMeasureRange = false;
      }

      const scrollTop = Math.min(Math.max(window.scrollY, 0), scrollableHeight);
      const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
      const progressTrack = progressTrackRef.current;
      const progressFill = progressFillRef.current;

      if (progressFill) progressFill.style.transform = `scaleX(${progress})`;
      if (progressTrack) progressTrack.setAttribute("aria-valuenow", String(Math.round(progress * 100)));

      const nextBackToTopState = scrollTop > 400;
      if (nextBackToTopState !== lastBackToTopState) {
        lastBackToTopState = nextBackToTopState;
        setShowBackToTop(nextBackToTopState);
      }
    };

    const scheduleUpdate = (measureRange = false) => {
      shouldMeasureRange ||= measureRange;
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        updateScrollState();
      });
    };
    const onScroll = () => scheduleUpdate();
    const onResize = () => scheduleUpdate(true);

    scheduleUpdate(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    const resizeObserver = new ResizeObserver(() => scheduleUpdate(true));
    resizeObserver.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <div
        ref={progressTrackRef}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-border/30"
      >
        <div
          ref={progressFillRef}
          className="h-full origin-left bg-gradient-to-r from-accent to-accent2 transition-transform duration-100 ease-out"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary fixed bottom-5 right-4 z-40 !h-12 !w-12 !p-0 shadow-xl shadow-accent/25 sm:bottom-8 sm:right-8"
          >
            <ArrowUp size={19} strokeWidth={2.5} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
