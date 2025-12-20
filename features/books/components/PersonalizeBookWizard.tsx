"use client";

import {
  PersonalizeBookProvider,
  usePersonalizeBook,
} from "../context/PersonalizeBookContext";
import PersonalizeBookForm from "./PersonalizeBookForm";
import ImageUploadStep from "./ImageUploadStep";
import BookPreviewStep from "./BookPreviewStep";
import { motion, AnimatePresence } from "motion/react";
import Container from "@/components/Container";

function PersonalizeBook() {
  const { currentStep } = usePersonalizeBook();

  // const slideVariants = {
  //   enter: (direction: number) => ({
  //     x: direction > 0 ? 100 : -100,
  //     opacity: 0,
  //   }),
  //   center: {
  //     x: 0,
  //     opacity: 1,
  //   },
  //   exit: (direction: number) => ({
  //     x: direction < 0 ? 100 : -100,
  //     opacity: 0,
  //   }),
  // };

  const fadeVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="wait" custom={currentStep}>
      <Container size="xs" className="overflow">
        <motion.div
          key={currentStep}
          custom={currentStep}
          variants={fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          {currentStep === 1 && <PersonalizeBookForm />}
          {currentStep === 2 && <ImageUploadStep />}
          {currentStep === 3 && <BookPreviewStep />}
        </motion.div>
      </Container>
    </AnimatePresence>
  );
}

export default function PersonalizeBookWizard() {
  return (
    <PersonalizeBookProvider>
      <PersonalizeBook />
    </PersonalizeBookProvider>
  );
}
