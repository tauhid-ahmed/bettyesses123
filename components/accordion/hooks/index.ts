import { useState, useRef, useEffect } from "react";

export default function useAccordion(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | "auto">(
    defaultOpen ? "auto" : 0
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const toggle = () => setIsOpen((prev) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    toggle,
    open,
    close,
    contentRef,
    height,
  };
}
