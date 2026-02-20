"use client";

import { useBookForm } from "../context/CreateBookContext";
import ChildDetailsStep from "./ChildDetailsStep";
import AdminBookPreviewStep from "./AdminBookPreviewStep";
import BookDetailsStepComponent from "./BookDetailsStepComponent";



export default function BookCreationForm() {
  const { state } = useBookForm();

  return (
    <div className="py-8">
      {state.currentStep === "child_details" && <ChildDetailsStep />}
      {state.currentStep === "book_preview" && <AdminBookPreviewStep />}
      {state.currentStep === "book_details" && <BookDetailsStepComponent />}

    </div>
  );
}
