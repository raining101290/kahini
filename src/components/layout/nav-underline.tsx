"use client";

import { motion } from "motion/react";

export function NavUnderline() {
  return (
    <motion.span
      layoutId="nav-underline"
      className="bg-marigold absolute inset-x-0 -bottom-1 h-0.5"
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    />
  );
}
