"use client";

import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

interface DescriptionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

// Fade + Blur (Smooth & Professional)
export function Description({
  children,
  delay = 0,
  className = "",
  once = true,
}: DescriptionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
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
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Word by Word Reveal (Elegant & Premium)
export function DescriptionWords({
  text,
  delay = 0,
  className = "",
  once = true,
}: { text: string } & Omit<DescriptionProps, "children">) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
    amount: 0.3,
  });

  const words = text.split(" ");

  return (
    <motion.p
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              filter: "blur(8px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            },
          }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

// Line by Line Reveal (Cinematic)
export function DescriptionLines({
  children,
  delay = 0,
  className = "",
  once = true,
  lineDelay = 0.15,
}: DescriptionProps & { lineDelay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
    amount: 0.3,
  });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: lineDelay,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function DescriptionLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 30,
            filter: "blur(8px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Character by Character (Typewriter effect)
export function DescriptionChars({
  text,
  delay = 0,
  className = "",
  once = true,
  charDelay = 0.01,
}: { text: string; charDelay?: number } & Omit<DescriptionProps, "children">) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
    amount: 0.3,
  });

  const characters = text.split("");

  return (
    <motion.p
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
            },
          }}
          transition={{
            duration: 0.01,
            delay: delay + index * charDelay,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.p>
  );
}

// Clip Path Reveal (Modern & Bold)
export function DescriptionClip({
  children,
  delay = 0,
  className = "",
  once = true,
}: DescriptionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
      }}
      animate={
        isInView
          ? {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
            }
          : {}
      }
      transition={{
        duration: 1,
        delay: delay,
        ease: [0.76, 0, 0.24, 1],
        opacity: { duration: 0.5, delay: delay + 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
}

// Scale + Fade (Punchy)
export function DescriptionScale({
  children,
  delay = 0,
  className = "",
  once = true,
}: DescriptionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
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
        duration: 0.7,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
