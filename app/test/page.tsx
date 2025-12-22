"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ============================================================================
// TYPES & SCHEMAS
// ============================================================================

// Step identifiers
type StepId =
  | "child_details"
  | "story_idea"
  | "book_preview"
  | "book_details"
  | "pricing";

const STEP_ORDER: StepId[] = [
  "child_details",
  "story_idea",
  "book_preview",
  "book_details",
  "pricing",
];

// Language options
type Language = "English" | "Spanish" | "French";
const LANGUAGES: Language[] = ["English", "Spanish", "French"];

// Currency options
type Currency = "USD" | "EUR" | "GBP";
const CURRENCIES: Currency[] = ["USD", "EUR", "GBP"];

// Gender options
type Gender = "Male" | "Female" | "Other";
const GENDERS: Gender[] = ["Male", "Female", "Other"];

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

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: BookFormState = {
  currentStep: "child_details",
  visitedSteps: new Set(["child_details"]),
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

// ============================================================================
// REDUCER
// ============================================================================

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

// ============================================================================
// CONTEXT
// ============================================================================

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

function BookFormProvider({ children }: BookFormProviderProps) {
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

// ============================================================================
// CHILD DETAILS STEP COMPONENT (with React Hook Form example)
// ============================================================================

function ChildDetailsStep() {
  const { state, dispatch } = useBookForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChildDetails>({
    resolver: zodResolver(childDetailsSchema),
    defaultValues: state.childDetails,
  });

  const onSubmit = (data: ChildDetails) => {
    dispatch({ type: "UPDATE_CHILD_DETAILS", payload: data });
    dispatch({ type: "CLEAR_ERRORS" });
    dispatch({ type: "NEXT_STEP" });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        dispatch({ type: "UPLOAD_CHILD_IMAGE", payload: base64 });
        setValue("image", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Child Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter child's name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Age *</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gender *</label>
          <select
            {...register("gender")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Birth Month *
          </label>
          <input
            type="month"
            {...register("birthMonth")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.birthMonth && (
            <p className="text-red-500 text-sm mt-1">
              {errors.birthMonth.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Child's Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {state.childDetails.image && (
            <div className="mt-2 relative inline-block">
              <img
                src={state.childDetails.image}
                alt="Child"
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "REMOVE_CHILD_IMAGE" });
                  setValue("image", null);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Language *</label>
          <select
            {...register("language")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {errors.language && (
            <p className="text-red-500 text-sm mt-1">
              {errors.language.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Next Step
        </button>
      </form>
    </div>
  );
}

// ============================================================================
// STORY IDEA STEP
// ============================================================================

function StoryIdeaStep() {
  const { state, dispatch, canGoPrev } = useBookForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoryIdea>({
    resolver: zodResolver(storyIdeaSchema),
    defaultValues: state.storyIdea,
  });

  const onSubmit = (data: StoryIdea) => {
    dispatch({ type: "UPDATE_STORY_IDEA", payload: data });
    dispatch({ type: "NEXT_STEP" });
  };

  const addCharacter = () => {
    const newChar: Character = {
      id: Date.now().toString(),
      name: "",
      description: "",
    };
    dispatch({ type: "ADD_CHARACTER", payload: newChar });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Story Idea</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Story Idea *</label>
          <textarea
            {...register("idea")}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your story idea..."
          />
          {errors.idea && (
            <p className="text-red-500 text-sm mt-1">{errors.idea.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Characters *</label>
          {state.storyIdea.characters.map((char, idx) => (
            <div key={char.id} className="flex gap-2 mb-2">
              <input
                value={char.name}
                onChange={(e) => {
                  const updated = [...state.storyIdea.characters];
                  updated[idx] = { ...char, name: e.target.value };
                  dispatch({
                    type: "UPDATE_STORY_IDEA",
                    payload: { characters: updated },
                  });
                }}
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="Character name"
              />
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "REMOVE_CHARACTER", payload: char.id })
                }
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCharacter}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Character
          </button>
          {errors.characters && (
            <p className="text-red-500 text-sm mt-1">
              {errors.characters.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Setting *</label>
          <input
            {...register("setting")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Where does the story take place?"
          />
          {errors.setting && (
            <p className="text-red-500 text-sm mt-1">
              {errors.setting.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Moral Lesson (Optional)
          </label>
          <input
            {...register("moralLesson")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="What lesson should the story teach?"
          />
        </div>

        <div className="flex gap-2">
          {canGoPrev && (
            <button
              type="button"
              onClick={() => dispatch({ type: "PREV_STEP" })}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// BOOK PREVIEW STEP
// ============================================================================

function BookPreviewStep() {
  const { state, dispatch, canGoPrev } = useBookForm();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Book Preview</h2>
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Child Information</h3>
          <p>
            <strong>Name:</strong> {state.childDetails.name || "Not set"}
          </p>
          <p>
            <strong>Age:</strong> {state.childDetails.age}
          </p>
          <p>
            <strong>Gender:</strong> {state.childDetails.gender}
          </p>
          <p>
            <strong>Language:</strong> {state.childDetails.language}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Story Details</h3>
          <p>
            <strong>Idea:</strong> {state.storyIdea.idea || "Not set"}
          </p>
          <p>
            <strong>Setting:</strong> {state.storyIdea.setting || "Not set"}
          </p>
          <p>
            <strong>Characters:</strong>{" "}
            {state.storyIdea.characters.map((c) => c.name).join(", ") || "None"}
          </p>
          {state.storyIdea.moralLesson && (
            <p>
              <strong>Moral:</strong> {state.storyIdea.moralLesson}
            </p>
          )}
        </div>

        {state.childDetails.image && (
          <div>
            <h3 className="font-semibold text-lg mb-2">Child's Photo</h3>
            <img
              src={state.childDetails.image}
              alt="Child"
              className="w-48 h-48 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-6">
        {canGoPrev && (
          <button
            onClick={() => dispatch({ type: "PREV_STEP" })}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
          >
            Previous
          </button>
        )}
        <button
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// BOOK DETAILS STEP
// ============================================================================

function BookDetailsStepComponent() {
  const { state, dispatch, canGoPrev } = useBookForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookDetails>({
    resolver: zodResolver(bookDetailsSchema),
    defaultValues: state.bookDetails,
  });

  const onSubmit = (data: BookDetails) => {
    dispatch({ type: "UPDATE_BOOK_DETAILS", payload: data });
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Book Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Book Name *</label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your book..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Pages *
          </label>
          <input
            type="number"
            {...register("pages", { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.pages && (
            <p className="text-red-500 text-sm mt-1">{errors.pages.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Genre *</label>
          <input
            {...register("genre")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Adventure, Fantasy, Educational"
          />
          {errors.genre && (
            <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
          )}
        </div>

        <div className="flex gap-2">
          {canGoPrev && (
            <button
              type="button"
              onClick={() => dispatch({ type: "PREV_STEP" })}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// PRICING STEP
// ============================================================================

function PricingStep() {
  const { state, dispatch, canGoPrev } = useBookForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pricing>({
    resolver: zodResolver(pricingSchema),
    defaultValues: state.pricing,
  });

  const onSubmit = (data: Pricing) => {
    dispatch({ type: "UPDATE_PRICING", payload: data });
    alert("Book creation completed! All data saved.");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Pricing</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Currency *</label>
          <select
            {...register("currency")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price *</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Offer Price (Optional)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("offerPrice", {
              setValueAs: (v) =>
                v === "" || v === null ? null : parseFloat(v),
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Leave empty for no discount"
          />
          {errors.offerPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.offerPrice.message}
            </p>
          )}
          {state.pricing.offerPrice !== null && (
            <button
              type="button"
              onClick={() => dispatch({ type: "CLEAR_OFFER_PRICE" })}
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              Clear offer price
            </button>
          )}
        </div>

        <div className="flex gap-2">
          {canGoPrev && (
            <button
              type="button"
              onClick={() => dispatch({ type: "PREV_STEP" })}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Complete Book Creation
          </button>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// STEP NAVIGATION
// ============================================================================

function StepNavigation() {
  const { state, dispatch } = useBookForm();

  return (
    <div className="bg-white shadow-sm border-b p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          {STEP_ORDER.map((step, idx) => {
            const isActive = state.currentStep === step;
            const isVisited = state.visitedSteps.has(step);
            const isClickable = isVisited;

            return (
              <div key={step} className="flex items-center flex-1">
                <button
                  onClick={() =>
                    isClickable &&
                    dispatch({ type: "GO_TO_STEP", payload: step })
                  }
                  disabled={!isClickable}
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full font-semibold
                    ${isActive ? "bg-blue-500 text-white" : ""}
                    ${
                      isVisited && !isActive
                        ? "bg-green-500 text-white cursor-pointer"
                        : ""
                    }
                    ${
                      !isVisited
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : ""
                    }
                  `}
                >
                  {idx + 1}
                </button>
                <span
                  className={`ml-2 text-sm ${isActive ? "font-semibold" : ""}`}
                >
                  {step
                    .replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
                {idx < STEP_ORDER.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      isVisited ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================

function BookCreationForm() {
  const { state } = useBookForm();

  return (
    <div className="min-h-screen bg-gray-100">
      <StepNavigation />
      <div className="py-8">
        {state.currentStep === "child_details" && <ChildDetailsStep />}
        {state.currentStep === "story_idea" && <StoryIdeaStep />}
        {state.currentStep === "book_preview" && <BookPreviewStep />}
        {state.currentStep === "book_details" && <BookDetailsStepComponent />}
        {state.currentStep === "pricing" && <PricingStep />}
      </div>

      {/* Debug Panel (remove in production) */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md">
        <h3 className="font-bold mb-2">Debug Info</h3>
        <p className="text-sm">
          <strong>Current Step:</strong> {state.currentStep}
        </p>
        <p className="text-sm">
          <strong>Visited Steps:</strong>{" "}
          {Array.from(state.visitedSteps).join(", ")}
        </p>
        <button
          onClick={() => {
            const { dispatch } = useBookForm();
            dispatch({ type: "RESET_FORM" });
          }}
          className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          Reset Form
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// ROOT COMPONENT
// ============================================================================

export default function App() {
  return (
    <BookFormProvider>
      <BookCreationForm />
    </BookFormProvider>
  );
}
