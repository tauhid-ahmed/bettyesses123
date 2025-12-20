"use client";

import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

interface WipeRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  direction?: "left" | "right" | "top" | "bottom";
  overlayColor?: string;
  duration?: number;
}

export function WipeReveal({
  children,
  delay = 0,
  className = "",
  once = true,
  direction = "left",
  overlayColor = "bg-primary-/100",
  duration = 0.8,
}: WipeRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
    amount: 0.3,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: "-100%" };
      case "right":
        return { x: "100%" };
      case "top":
        return { y: "-100%" };
      case "bottom":
        return { y: "100%" };
    }
  };

  const getExitPosition = () => {
    switch (direction) {
      case "left":
        return { x: "100%" };
      case "right":
        return { x: "-100%" };
      case "top":
        return { y: "100%" };
      case "bottom":
        return { y: "-100%" };
    }
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{
          duration: 0.01,
          delay: delay + duration * 0.4,
        }}
      >
        {children}
      </motion.div>

      {/* Overlay that wipes across */}
      <motion.div
        className={`absolute inset-0 ${overlayColor} z-10`}
        initial={getInitialPosition()}
        animate={isInView ? getExitPosition() : getInitialPosition()}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </div>
  );
}

// Double Wipe (Two overlays for smooth reveal)
export function DoubleWipeReveal({
  children,
  delay = 0,
  className = "",
  once = true,
  direction = "left",
  firstColor = "bg-primary-200",
  secondColor = "bg-primary-100",
  duration = 1,
}: WipeRevealProps & { firstColor?: string; secondColor?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
    amount: 0.3,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: "-100%" };
      case "right":
        return { x: "100%" };
      case "top":
        return { y: "-100%" };
      case "bottom":
        return { y: "100%" };
    }
  };

  const getExitPosition = () => {
    switch (direction) {
      case "left":
        return { x: "100%" };
      case "right":
        return { x: "-100%" };
      case "top":
        return { y: "100%" };
      case "bottom":
        return { y: "-100%" };
    }
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Content */}
      <div>{children}</div>

      {/* First overlay */}
      <motion.div
        className={`absolute inset-0 ${firstColor} z-20`}
        initial={getInitialPosition()}
        animate={isInView ? getExitPosition() : getInitialPosition()}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.76, 0, 0.24, 1],
        }}
      />

      {/* Second overlay (slightly delayed) */}
      <motion.div
        className={`absolute inset-0 ${secondColor} z-10`}
        initial={getInitialPosition()}
        animate={isInView ? getExitPosition() : getInitialPosition()}
        transition={{
          duration: duration,
          delay: delay + 0.15,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </div>
  );
}

// Diagonal Wipe (More dynamic)
export function DiagonalWipeReveal({
  children,
  delay = 0,
  className = "",
  once = true,
  overlayColor = "bg-primary-100/50",
  duration = 1,
}: Omit<WipeRevealProps, "direction">) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
    amount: 0.3,
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{
          duration: 0.01,
          delay: delay + duration * 0.3,
        }}
      >
        {children}
      </motion.div>

      {/* Diagonal overlay */}
      <motion.div
        className={`absolute -inset-2 ${overlayColor} z-10 origin-top-left`}
        style={{ transformOrigin: "top left" }}
        initial={{
          scaleX: 1,
          x: "-100%",
          skewX: "-15deg",
        }}
        animate={
          isInView
            ? {
                scaleX: 1,
                x: "100%",
                skewX: "-15deg",
              }
            : {}
        }
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </div>
  );
}
