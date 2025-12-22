"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import Image from "next/image";

import bookCoverImage1 from "@/images/book-cover-1.webp";
import bookCoverImage2 from "@/images/book-cover-2.webp";
import bookCoverImage3 from "@/images/book-cover-3.webp";
import bookCoverImage4 from "@/images/book-cover-4.webp";
import bookCoverImage5 from "@/images/book-cover-5.webp";
import { StaticImageData } from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cartPath } from "@/paths";

// =============== TYPES ===============
export type Variant = {
  id: string;
  image: StaticImageData;
  title?: string;
};

export type BookPage = {
  pageId: string;
  title: string;
  variants: Variant[];
};

export type SelectionState = {
  [pageId: string]: string;
};

// =============== MOCK DATA ===============
const MOCK_PAGES: BookPage[] = [
  {
    pageId: "page_1",
    title: "Cover Page",
    variants: [
      { id: "v1", image: bookCoverImage5 },
      { id: "v2", image: bookCoverImage2 },
      { id: "v3", image: bookCoverImage3 },
    ],
  },
  {
    pageId: "page_2",
    title: "Story Page",
    variants: [
      { id: "v1", image: bookCoverImage3 },
      { id: "v2", image: bookCoverImage4 },
      { id: "v3", image: bookCoverImage1 },
      { id: "v4", image: bookCoverImage5 },
    ],
  },
  {
    pageId: "page_3",
    title: "Character Introduction",
    variants: [
      { id: "v1", image: bookCoverImage2 },
      { id: "v2", image: bookCoverImage1 },
    ],
  },
];

type SelectionContextType = {
  selections: SelectionState;
  setSelection: (pageId: string, variantId: string) => void;
  setSelections: (selections: SelectionState) => void;
  getSelectedVariant: (pageId: string) => string | undefined;
  getAllSelections: () => SelectionState;
  resetSelections: () => void;
};

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
);

function useSelection() {
  const context = useContext(SelectionContext);
  if (!context)
    throw new Error("useSelection must be used within SelectionProvider");
  return context;
}

function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selections, setSelections] = useState<SelectionState>(() => {
    // Initialize with first variant of each page
    const initial: SelectionState = {};
    MOCK_PAGES.forEach((page) => {
      if (page.variants.length > 0) {
        initial[page.pageId] = page.variants[0].id;
      }
    });
    return initial;
  });

  const setSelection = useCallback((pageId: string, variantId: string) => {
    setSelections((prev) => ({
      ...prev,
      [pageId]: variantId,
    }));
  }, []);

  const resetSelections = useCallback(() => {
    const reset: SelectionState = {};
    MOCK_PAGES.forEach((page) => {
      if (page.variants.length > 0) {
        reset[page.pageId] = page.variants[0].id;
      }
    });
    setSelections(reset);
  }, []);

  const getSelectedVariant = useCallback(
    (pageId: string) => {
      return selections[pageId];
    },
    [selections]
  );

  const getAllSelections = useCallback(() => selections, [selections]);

  const value = useMemo(
    () => ({
      selections,
      setSelection,
      setSelections,
      getSelectedVariant,
      getAllSelections,
      resetSelections,
    }),
    [
      selections,
      setSelection,
      setSelections,
      getSelectedVariant,
      getAllSelections,
      resetSelections,
    ]
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

interface VariantSliderProps {
  page: BookPage;
  index: number;
}

function VariantSlider({ page, index }: VariantSliderProps) {
  const { getSelectedVariant, setSelection } = useSelection();
  const [isAnimating, setIsAnimating] = useState(false);

  const selectedVariantId = getSelectedVariant(page.pageId);
  const currentIndex = page.variants.findIndex(
    (v) => v.id === selectedVariantId
  );
  const currentVariant =
    currentIndex >= 0 ? page.variants[currentIndex] : page.variants[0];

  const handleVariantSelect = useCallback(
    (variantId: string) => {
      if (isAnimating || variantId === selectedVariantId) return;

      setIsAnimating(true);
      setSelection(page.pageId, variantId);
      setTimeout(() => setIsAnimating(false), 300);
    },
    [isAnimating, selectedVariantId, page.pageId, setSelection]
  );

  const goToNext = useCallback(() => {
    if (isAnimating || page.variants.length <= 1) return;
    const nextIndex = (currentIndex + 1) % page.variants.length;
    handleVariantSelect(page.variants[nextIndex].id);
  }, [currentIndex, handleVariantSelect, isAnimating, page.variants]);

  const goToPrev = useCallback(() => {
    if (isAnimating || page.variants.length <= 1) return;
    const prevIndex =
      currentIndex <= 0 ? page.variants.length - 1 : currentIndex - 1;
    handleVariantSelect(page.variants[prevIndex].id);
  }, [currentIndex, handleVariantSelect, isAnimating, page.variants]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== document.body) return;
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Heading className="text-gray-800" align={"center"} as="h3" size="h6">
        Page {index + 1}
      </Heading>
      <div className="relative aspect-2/2 rounded-xl overflow-hidden shadow-lg mb-6 mt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVariant.id}
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentVariant.image}
              className="w-full h-full bg-cover bg-center"
              alt={page.title}
            />
          </motion.div>
        </AnimatePresence>
        {/* Controls */}
        <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full">
          <Button
            onClick={goToPrev}
            size="icon-lg"
            variant="ghost"
            className="rounded-full primary-gradient p-px group"
          >
            <div
              className="size-full rounded-full bg-transparent grid place-items-center 
                        bg-linear-to-r from-primary-500 hover:to-secondary-500 text-white
                        "
            >
              <LucideArrowLeft className="size-5 text-white" />
            </div>
          </Button>

          <Button
            onClick={goToPrev}
            size="icon-lg"
            variant="ghost"
            className="rounded-full primary-gradient p-px group"
          >
            <div
              className="size-full rounded-full bg-transparent grid place-items-center 
                        hover:bg-linear-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white
                        active:bg-linear-to-r active:from-primary-500 active:to-secondary-500 active:text-white"
            >
              <LucideArrowRight className="size-5 text-white" />
            </div>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        {page.variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => handleVariantSelect(variant.id)}
            disabled={isAnimating}
            className="relative group"
            aria-label={`Select variant ${variant.id}`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all ${
                variant.id === selectedVariantId
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-300 group-hover:bg-gray-400"
              }`}
            />
            {variant.id === selectedVariantId && (
              <motion.div
                layoutId={`active-${page.pageId}`}
                className="absolute inset-0 border-2 border-blue-500 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function PageSection({ page, index }: { page: BookPage; index: number }) {
  return (
    <section className="py-6 lg:py-10">
      <VariantSlider page={page} index={index} />
    </section>
  );
}

function PreviewContent() {
  return (
    <Section title="Add new book" padding="none" titleAlign="left">
      <Container size="xs" className="max-w-xl">
        {MOCK_PAGES.map((page, index) => (
          <PageSection key={page.pageId} page={page} index={index} />
        ))}
      </Container>
    </Section>
  );
}

export default function AdminBookCreatePreview() {
  return (
    <SelectionProvider>
      <PreviewContent />
    </SelectionProvider>
  );
}
