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
import { ChevronLeft, ChevronRight } from "lucide-react";

// =============== TYPES ===============
export type Variant = {
  id: string;
  image: string;
  title?: string;
};

export type BookPage = {
  pageId: string;
  title: string;
  variants: Variant[];
};

export type SelectionState = {
  [pageId: string]: string; // selectedVariantId
};

// =============== MOCK DATA ===============
const MOCK_PAGES: BookPage[] = [
  {
    pageId: "page_1",
    title: "Cover Page",
    variants: [
      { id: "v1", image: "/api/placeholder/400/500?text=Cover+1" },
      { id: "v2", image: "/api/placeholder/400/500?text=Cover+2" },
      { id: "v3", image: "/api/placeholder/400/500?text=Cover+3" },
    ],
  },
  {
    pageId: "page_2",
    title: "Story Page",
    variants: [
      { id: "v1", image: "/api/placeholder/400/500?text=Story+1" },
      { id: "v2", image: "/api/placeholder/400/500?text=Story+2" },
      { id: "v3", image: "/api/placeholder/400/500?text=Story+3" },
      { id: "v4", image: "/api/placeholder/400/500?text=Story+4" },
    ],
  },
  {
    pageId: "page_3",
    title: "Character Introduction",
    variants: [
      { id: "v1", image: "/api/placeholder/400/500?text=Character+1" },
      { id: "v2", image: "/api/placeholder/400/500?text=Character+2" },
    ],
  },
];

// =============== CONTEXT ===============
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

// =============== COMPONENT: VariantSlider ===============
interface VariantSliderProps {
  page: BookPage;
}

function VariantSlider({ page }: VariantSliderProps) {
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
      {/* Animated Variant Display */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-lg mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVariant.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${currentVariant.image})` }}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              {currentVariant.id} • {page.title}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-2">
        <button
          onClick={goToPrev}
          disabled={isAnimating || page.variants.length <= 1}
          className="p-3 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-all active:scale-95"
          aria-label="Previous variant"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3">
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

        <button
          onClick={goToNext}
          disabled={isAnimating || page.variants.length <= 1}
          className="p-3 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-all active:scale-95"
          aria-label="Next variant"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center mt-4 text-sm text-gray-600">
        <span className="font-medium">{currentIndex + 1}</span> of{" "}
        {page.variants.length} variants
      </div>
    </div>
  );
}

// =============== COMPONENT: PageSection ===============
function PageSection({ page, index }: { page: BookPage; index: number }) {
  const { getSelectedVariant } = useSelection();
  const selectedId = getSelectedVariant(page.pageId);

  return (
    <section className="py-10 border-b border-gray-200 last:border-b-0">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg shadow-lg">
              {index + 1}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{page.title}</h2>
              <p className="text-gray-600 mt-1">
                Selected:{" "}
                <span className="font-semibold text-blue-600">
                  {selectedId}
                </span>
              </p>
            </div>
          </div>
          <p className="text-gray-700 max-w-2xl">
            Choose your preferred version for this page. Swipe, click dots, or
            use arrow keys to preview alternatives.
          </p>
        </div>

        <VariantSlider page={page} />
      </div>
    </section>
  );
}

// =============== COMPONENT: SelectionSummary ===============
function SelectionSummary() {
  const { getAllSelections, resetSelections } = useSelection();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selections = getAllSelections();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Submitting selections:", selections);
    alert(`Selections submitted!\n${JSON.stringify(selections, null, 2)}`);
    setIsSubmitting(false);
  };

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Your Selections
            </h3>
            <p className="text-gray-600 text-sm">
              {Object.keys(selections).length} pages customized
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={resetSelections}
              className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors active:scale-95"
            >
              Reset All
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all active:scale-95 shadow-md"
            >
              {isSubmitting ? "Submitting..." : "Preview & Confirm"}
            </button>
          </div>
        </div>

        {/* Selected variants list */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MOCK_PAGES.map((page) => (
            <div
              key={page.pageId}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm font-medium text-gray-700">
                {page.title}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                {selections[page.pageId] || "Not selected"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============== COMPONENT: PreviewContent (Fixed) ===============
function PreviewContent() {
  const { getAllSelections } = useSelection();
  const [showInstructions, setShowInstructions] = useState(true);

  const handleExportSelections = () => {
    const selections = getAllSelections();
    console.log("Current selections for backend:", selections);
    return selections;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Book Personalization Preview
              </h1>
              <p className="text-gray-600 mt-2">
                Customize each page of your book. Your selections are saved
                automatically.
              </p>
            </div>
            <button
              onClick={() => handleExportSelections()}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 self-start md:self-auto"
            >
              Export Selections (Check Console)
            </button>
          </div>
        </div>
      </header>

      {/* Instructions */}
      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 mx-4 mt-4 rounded-xl"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-blue-900">
                  How to customize:
                </h3>
                <ul className="text-blue-800 text-sm mt-2 space-y-1">
                  <li>• Click on dots below each image to select variant</li>
                  <li>• Use left/right arrow keys or buttons to navigate</li>
                  <li>• Selections are saved automatically</li>
                  <li>• Finalize with "Preview & Confirm" button</li>
                </ul>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-blue-600 hover:text-blue-800"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Pages */}
      <main className="container mx-auto px-4 py-8">
        {MOCK_PAGES.map((page, index) => (
          <PageSection key={page.pageId} page={page} index={index} />
        ))}
      </main>

      {/* Summary & Actions */}
      <SelectionSummary />
    </div>
  );
}

// =============== MAIN COMPONENT: BookPersonalizationPreview ===============
export default function BookPersonalizationPreview() {
  return (
    <SelectionProvider>
      <PreviewContent />
    </SelectionProvider>
  );
}
