"use client";

import { useBookForm } from "../context/CreateBookContext";
import ChildDetailsStep from "./ChildDetailsStep";
import StoryIdeaStep from "./StoryIdeaStep";
import AdminBookPreviewStep from "./AdminBookPreviewStep";
import BookDetailsStepComponent from "./BookDetailsStepComponent";
import PricingStep from "./PricingStep";
import BookCreationWelcome from "./BookCreationWelcome";

export default function BookCreationForm() {
  const { state } = useBookForm();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8">
        {state.currentStep === "welcome" && <BookCreationWelcome />}

        {state.currentStep === "child_details" && <ChildDetailsStep />}
        {state.currentStep === "story_idea" && <StoryIdeaStep />}
        {state.currentStep === "book_preview" && <AdminBookPreviewStep />}
        {state.currentStep === "book_details" && <BookDetailsStepComponent />}
        {state.currentStep === "pricing" && <PricingStep />}
      </div>
    </div>
  );
}
