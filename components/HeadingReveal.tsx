"use client";

import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

interface HeadingRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function HeadingReveal({
  children,
  delay = 0,
  className = "",
  once = true,
}: HeadingRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-50px",
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.95,
        filter: "blur(8px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6 },
        filter: { duration: 0.5 },
      }}
    >
      {children}
    </motion.div>
  );
}

// Usage example:
// <HeadingReveal>
//   <h1>Your Heading Here</h1>
// </HeadingReveal>
//
// With delay:
// <HeadingReveal delay={0.2}>
//   <h2>Second Heading</h2>
// </HeadingReveal>
