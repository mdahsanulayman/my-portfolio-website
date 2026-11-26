"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

/** Animated sun/moon toggle. Preference is saved in localStorage (see hooks/useTheme.ts). */
export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="glass relative flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center overflow-hidden rounded-full p-0"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            {isDark ? <Sun size={18} className="text-accent" /> : <Moon size={18} className="text-accent2" />}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
