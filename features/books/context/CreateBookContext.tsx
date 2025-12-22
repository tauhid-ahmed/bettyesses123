"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { z } from "zod";
import { StepId } from "../types";
import { STEP_ORDER } from "../constant";

// Zod Schemas
const childDetailsSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  age: z
    .number()
    .min(1, "Age must be at least 1")
    .max(18, "Age must be at most 18"),
  gender: z.enum(["Male", "Female", "Other"] as const),
  birthMonth: z.string().min(1, "Birth month is required"),
  image: z.string().nullable(),
  language: z.enum(["English", "Spanish", "French"] as const),
});

const characterSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Character name is required"),
  description: z.string().optional(),
});

const storyIdeaSchema = z.object({
  idea: z.string().min(10, "Story idea must be at least 10 characters"),
  characters: z
    .array(characterSchema)
    .min(1, "At least one character is required"),
  setting: z.string().min(1, "Setting is required"),
  moralLesson: z.string().optional(),
});

const bookDetailsSchema = z.object({
  name: z
    .string()
    .min(1, "Book name is required")
    .max(100, "Book name must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  pages: z
    .number()
    .min(10, "Book must have at least 10 pages")
    .max(100, "Book cannot exceed 100 pages"),
  genre: z.string().min(1, "Genre is required"),
});

const pricingSchema = z
  .object({
    price: z.number().min(0.01, "Price must be greater than 0"),
    offerPrice: z.number().min(0).nullable(),
    currency: z.enum(["USD", "EUR", "GBP"] as const),
  })
  .refine(
    (data) => {
      if (data.offerPrice !== null && data.offerPrice >= data.price) {
        return false;
      }
      return true;
    },
    {
      message: "Offer price must be less than regular price",
      path: ["offerPrice"],
    }
  );

// Type inference from schemas
type ChildDetails = z.infer<typeof childDetailsSchema>;
type Character = z.infer<typeof characterSchema>;
type StoryIdea = z.infer<typeof storyIdeaSchema>;
type BookDetails = z.infer<typeof bookDetailsSchema>;
type Pricing = z.infer<typeof pricingSchema>;

// State type
interface BookFormState {
  currentStep: StepId;
  visitedSteps: Set<StepId>;
  childDetails: ChildDetails;
  storyIdea: StoryIdea;
  bookDetails: BookDetails;
  pricing: Pricing;
  isLoading: boolean;
  errors: Record<string, string>;
}

// Action types
type BookFormAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; payload: StepId }
  | { type: "UPDATE_CHILD_DETAILS"; payload: Partial<ChildDetails> }
  | { type: "UPLOAD_CHILD_IMAGE"; payload: string }
  | { type: "REMOVE_CHILD_IMAGE" }
  | { type: "UPDATE_STORY_IDEA"; payload: Partial<StoryIdea> }
  | { type: "ADD_CHARACTER"; payload: Character }
  | { type: "REMOVE_CHARACTER"; payload: string }
  | { type: "UPDATE_BOOK_DETAILS"; payload: Partial<BookDetails> }
  | { type: "UPDATE_PRICING"; payload: Partial<Pricing> }
  | { type: "CLEAR_OFFER_PRICE" }
  | { type: "SET_ERRORS"; payload: Record<string, string> }
  | { type: "CLEAR_ERRORS" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOAD_DRAFT"; payload: Partial<BookFormState> }
  | { type: "RESET_FORM" };

const initialState: BookFormState = {
  currentStep: "welcome",
  visitedSteps: new Set(["welcome"]),
  childDetails: {
    name: "",
    age: 5,
    gender: "Male",
    birthMonth: "",
    image: null,
    language: "English",
  },
  storyIdea: {
    idea: "",
    characters: [],
    setting: "",
    moralLesson: "",
  },
  bookDetails: {
    name: "",
    description: "",
    pages: 20,
    genre: "",
  },
  pricing: {
    price: 29.99,
    offerPrice: null,
    currency: "USD",
  },
  isLoading: false,
  errors: {},
};

function bookFormReducer(
  state: BookFormState,
  action: BookFormAction
): BookFormState {
  switch (action.type) {
    case "NEXT_STEP": {
      const currentIndex = STEP_ORDER.indexOf(state.currentStep);
      if (currentIndex < STEP_ORDER.length - 1) {
        const nextStep = STEP_ORDER[currentIndex + 1];
        return {
          ...state,
          currentStep: nextStep,
          visitedSteps: new Set([...state.visitedSteps, nextStep]),
        };
      }
      return state;
    }

    case "PREV_STEP": {
      const currentIndex = STEP_ORDER.indexOf(state.currentStep);
      if (currentIndex > 0) {
        return {
          ...state,
          currentStep: STEP_ORDER[currentIndex - 1],
        };
      }
      return state;
    }

    case "GO_TO_STEP": {
      if (state.visitedSteps.has(action.payload)) {
        return {
          ...state,
          currentStep: action.payload,
        };
      }
      return state;
    }

    case "UPDATE_CHILD_DETAILS":
      return {
        ...state,
        childDetails: { ...state.childDetails, ...action.payload },
      };

    case "UPLOAD_CHILD_IMAGE":
      return {
        ...state,
        childDetails: { ...state.childDetails, image: action.payload },
      };

    case "REMOVE_CHILD_IMAGE":
      return {
        ...state,
        childDetails: { ...state.childDetails, image: null },
      };

    case "UPDATE_STORY_IDEA":
      return {
        ...state,
        storyIdea: { ...state.storyIdea, ...action.payload },
      };

    case "ADD_CHARACTER":
      return {
        ...state,
        storyIdea: {
          ...state.storyIdea,
          characters: [...state.storyIdea.characters, action.payload],
        },
      };

    case "REMOVE_CHARACTER":
      return {
        ...state,
        storyIdea: {
          ...state.storyIdea,
          characters: state.storyIdea.characters.filter(
            (c) => c.id !== action.payload
          ),
        },
      };

    case "UPDATE_BOOK_DETAILS":
      return {
        ...state,
        bookDetails: { ...state.bookDetails, ...action.payload },
      };

    case "UPDATE_PRICING":
      return {
        ...state,
        pricing: { ...state.pricing, ...action.payload },
      };

    case "CLEAR_OFFER_PRICE":
      return {
        ...state,
        pricing: { ...state.pricing, offerPrice: null },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {},
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "LOAD_DRAFT":
      return {
        ...state,
        ...action.payload,
        visitedSteps: action.payload.visitedSteps
          ? new Set(action.payload.visitedSteps)
          : state.visitedSteps,
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

interface BookFormContextType {
  state: BookFormState;
  dispatch: React.Dispatch<BookFormAction>;
  canGoNext: boolean;
  canGoPrev: boolean;
}

const BookFormContext = createContext<BookFormContextType | undefined>(
  undefined
);

export function useBookForm() {
  const context = useContext(BookFormContext);
  if (!context) {
    throw new Error("useBookForm must be used within BookFormProvider");
  }
  return context;
}

interface BookFormProviderProps {
  children: ReactNode;
}

export default function BookFormProvider({ children }: BookFormProviderProps) {
  const [state, dispatch] = useReducer(bookFormReducer, initialState);

  const currentIndex = STEP_ORDER.indexOf(state.currentStep);
  const canGoNext = currentIndex < STEP_ORDER.length - 1;
  const canGoPrev = currentIndex > 0;

  return (
    <BookFormContext.Provider value={{ state, dispatch, canGoNext, canGoPrev }}>
      {children}
    </BookFormContext.Provider>
  );
}
