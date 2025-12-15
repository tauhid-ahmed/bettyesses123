import { motion } from "motion/react";
import useAccordion from "../hooks";
import { useState } from "react";
import React from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function Accordion({
  title,
  children,
  defaultOpen = false,
  className = "",
}: AccordionProps) {
  const { isOpen, toggle, contentRef, height } = useAccordion(defaultOpen);

  return (
    <div
      className={`border border-gray-700 rounded-lg overflow-hidden ${className}`}
    >
      <button
        onClick={toggle}
        className="w-full px-6 py-4 bg-gray-800 hover:bg-gray-750 transition-colors flex items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-white">{title}</span>
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
        <div ref={contentRef} className="px-6 py-4 bg-gray-850 text-gray-300">
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
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
    height,
  } = useAccordion(false);

  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = onToggle || internalToggle;

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={toggle}
        className="w-full px-6 py-4 bg-gray-800 hover:bg-gray-750 transition-colors flex items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-white">{title}</span>
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
          height: isOpen ? "auto" : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-6 py-4 bg-gray-850 text-gray-300">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Demo
export default function App() {
  const accordion = useAccordion(false);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">
            Accordion Hook Demo
          </h1>
          <p className="text-gray-400 mb-6">
            Production-ready accordion with smooth height animations
          </p>
        </div>

        {/* Basic Standalone Accordions */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">
            Standalone Accordions
          </h2>
          <div className="space-y-3">
            <Accordion title="What is React?" defaultOpen={true}>
              <p>
                React is a JavaScript library for building user interfaces. It's
                maintained by Meta and a community of individual developers and
                companies.
              </p>
            </Accordion>

            <Accordion title="What is Framer Motion?">
              <p>
                Framer Motion is a production-ready motion library for React. It
                provides powerful animations with a simple, declarative API.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Smooth spring animations</li>
                <li>Gesture recognition</li>
                <li>Layout animations</li>
                <li>Variants for complex sequences</li>
              </ul>
            </Accordion>

            <Accordion title="Why use hooks?">
              <p>
                Hooks let you use state and other React features without writing
                a class. They make it easier to reuse stateful logic between
                components.
              </p>
            </Accordion>
          </div>
        </div>

        {/* Accordion Group (only one open) */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">
            Accordion Group (One Open at a Time)
          </h2>
          <AccordionGroup>
            <AccordionItem title="Getting Started">
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
                You can customize the animation duration, easing, and control
                the accordion state programmatically for advanced use cases.
              </p>
            </AccordionItem>
          </AccordionGroup>
        </div>

        {/* Custom Hook Usage */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">
            Custom Hook Usage
          </h2>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={accordion.toggle}
              className="w-full px-6 py-4 bg-gray-800 hover:bg-gray-750 transition-colors flex items-center justify-between text-left"
            >
              <span className="text-lg font-semibold text-white">
                Custom Controlled Accordion
              </span>
              <motion.svg
                animate={{ rotate: accordion.isOpen ? 180 : 0 }}
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
                height: accordion.isOpen ? accordion.height : 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="overflow-hidden"
            >
              <div
                ref={accordion.contentRef}
                className="px-6 py-4 bg-gray-850 text-gray-300"
              >
                <p>
                  This accordion is built using the raw hook, giving you full
                  control over the rendering and behavior.
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={accordion.close}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-white transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={accordion.open}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm text-white transition-colors"
                  >
                    Open
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
