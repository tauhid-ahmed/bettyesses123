"use client";

import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

interface CardRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

// Fade + Slide Up (Subtle & Professional)
export function CardReveal({
  children,
  delay = 0,
  className = "",
  once = true,
}: CardRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-80px",
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: 50,
        filter: "blur(6px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}

// Scale + Fade (Punchy & Modern)
export function CardScale({
  children,
  delay = 0,
  className = "",
  once = true,
}: CardRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-80px",
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        scale: 0.85,
        filter: "blur(8px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Slide from Side (Dynamic)
export function CardSlide({
  children,
  delay = 0,
  className = "",
  once = true,
  direction = "left" as "left" | "right",
}: CardRevealProps & { direction?: "left" | "right" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-80px",
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: direction === "left" ? -60 : 60,
        filter: "blur(6px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger Container (For Grid/List of Cards)
export function CardStagger({
  children,
  className = "",
  once = true,
  staggerDelay = 0.1,
}: CardRevealProps & { staggerDelay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-50px",
    amount: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Child component for CardStagger
export function CardStaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: 40,
          filter: "blur(6px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Tilt Effect (Interactive & Playful)
export function CardTilt({
  children,
  delay = 0,
  className = "",
  once = true,
}: CardRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-80px",
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        rotateX: 15,
        y: 40,
        filter: "blur(2px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              rotateX: 0,
              y: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
