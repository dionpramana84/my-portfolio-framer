"use client";

import { motion } from "framer-motion";

/**
 * A component that fades in its children with a delay.
 * Delayed Fading needed to aboid bug animation in header
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children to fade in.
 * @param {string} [props.className] - The class name for the div.
 * @return {React.ReactElement} The rendered component.
 */
export default function DelayedFading({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn", delay: 0.2, duration: 1 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
