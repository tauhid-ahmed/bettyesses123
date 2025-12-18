"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

type BookGalleryProps = {
  images: StaticImageData[];
};

export default function BookGallery({ images }: BookGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const scrollToImage = (index: number) => {
    setSelectedIndex(index);
    const thumbnail = document.getElementById(`thumb-${index}`);
    if (thumbnail) {
      thumbnail.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handlePrevious = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1;
    scrollToImage(newIndex);
  };

  const handleNext = () => {
    const newIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0;
    scrollToImage(newIndex);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrevious();
  };

  return (
    <div className="group w-full">
      <div className="max-w-md mx-auto overflow-hidden">
        <div
          className="relative bg-primary-100 rounded-lg overflow-hidden aspect-4/3"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Image
                src={images[selectedIndex]}
                alt={`Product ${selectedIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <Button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full primary-gradient opacity-0 group-hover:opacity-100 size-6"
            aria-label="Previous image"
            size="icon"
          >
            <ChevronLeft />
          </Button>

          <Button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full primary-gradient opacity-0 group-hover:opacity-100 size-6"
            aria-label="Next image"
            size="icon"
          >
            <ChevronRight />
          </Button>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex gap-4 overflow-x-auto pt-6 pb-1 w-0 min-w-full scrollbar-hide">
            {images.map((img, index) => (
              <motion.button
                key={index}
                id={`thumb-${index}`}
                onClick={() => scrollToImage(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all cursor-pointer ${
                  selectedIndex === index
                    ? "ring-2 ring-primary-500 ring-offset-1 scale-105"
                    : "ring-1 ring-gray-300 hover:ring-gray-400 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
