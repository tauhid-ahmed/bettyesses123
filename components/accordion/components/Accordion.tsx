"use client";

import { motion } from "motion/react";
import useAccordion from "../hooks";
import { useState } from "react";
import React from "react";
import { LucideArrowDown } from "lucide-react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function Accordion({
  title,
  children,
  defaultOpen = true,
  className = "",
}: AccordionProps) {
  const { isOpen, toggle, contentRef, height } = useAccordion(defaultOpen);

  return (
    <div
      className={`border border-gray-100 rounded-lg overflow-hidden ${className}`}
    >
      <button
        onClick={toggle}
        className="w-full px-6 py-4 transition-colors flex items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-gray-600">{title}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? height : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1], // Custom easing for smooth animation
        }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-6 py-4 bg-gray-850 text-gray-600">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Accordion Group Component (only one open at a time)
type AccordionGroupProps = {
  children: React.ReactElement<AccordionItemProps>[];
  allowMultiple?: boolean;
};

export function AccordionGroup({
  children,
  allowMultiple = false,
}: AccordionGroupProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2 lg:space-y-4">
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child, {
          isOpen: allowMultiple ? child.props.isOpen : openIndex === index,
          onToggle: () => {
            if (allowMultiple && child.props.onToggle) {
              child.props.onToggle();
            } else {
              setOpenIndex(openIndex === index ? null : index);
            }
          },
        });
      })}
    </div>
  );
}

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
};

export function AccordionItem({
  title,
  children,
  isOpen: controlledIsOpen,
  onToggle,
}: AccordionItemProps) {
  const {
    isOpen: internalIsOpen,
    toggle: internalToggle,
    contentRef,
  } = useAccordion(false);

  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = onToggle || internalToggle;

  return (
    <div className="rounded-lg overflow-hidden bg-primary-100  shadow">
      <button
        onClick={toggle}
        className="w-full px-6 py-4 hover:bg-primary-200/50 transition-colors flex items-center justify-between text-left"
      >
        <span className="lg:text-lg font-semibold text-gray-800">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-5 h-5 text-primary-500"
        >
          {/* <LucideArrowDown /> */}
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-6 pb-4 bg-gray-850 text-gray-600">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function Acc() {
  return (
    <div className="max-w-2xl mx-auto">
      <AccordionGroup>
        <AccordionItem defaultOpen={true} isOpen={true} title="Getting Started">
          <p>
            To get started, install the required dependencies and import the
            accordion hook into your component.
          </p>
        </AccordionItem>
        <AccordionItem title="API Reference">
          <p>The useAccordion hook returns the following properties:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>isOpen: boolean</li>
            <li>toggle: () =&gt; void</li>
            <li>open: () =&gt; void</li>
            <li>close: () =&gt; void</li>
          </ul>
        </AccordionItem>
        <AccordionItem title="Advanced Usage">
          <p>
            You can customize the animation duration, easing, and control the
            accordion state programmatically for advanced use cases.
          </p>
        </AccordionItem>
      </AccordionGroup>
    </div>
  );
}
