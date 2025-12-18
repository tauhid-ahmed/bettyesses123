"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FormData = {
  childName: string;
  age: string;
  gender: string;
  birthMonth: string;
  image?: File | string;
};

type PersonalizeBookContextType = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const PersonalizeBookContext = createContext<
  PersonalizeBookContextType | undefined
>(undefined);

export function PersonalizeBookProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    childName: "",
    age: "",
    gender: "",
    birthMonth: "",
    image: undefined,
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <PersonalizeBookContext.Provider
      value={{
        formData,
        updateFormData,
        uploadedImage,
        setUploadedImage,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </PersonalizeBookContext.Provider>
  );
}

export function usePersonalizeBook() {
  const context = useContext(PersonalizeBookContext);
  if (!context) {
    throw new Error(
      "usePersonalizeBook must be used within PersonalizeBookProvider"
    );
  }
  return context;
}
