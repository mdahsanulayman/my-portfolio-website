"use client";

import { motion } from "framer-motion";

/** Fixed, subtle floating gradient orbs + grid behind the whole page. */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <motion.div
        className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent2/20 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
