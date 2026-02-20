import { Currency, Gender, Language, StepId } from "./types";

export const STEP_ORDER: StepId[] = [
  "child_details",
  "book_preview",
  "book_details",
];

export const LANGUAGES: Language[] = ["English", "Spanish", "French"];

export const CURRENCIES: Currency[] = ["USD", "EUR", "GBP"];

export const GENDERS: Gender[] = ["Male", "Female", "Other"];
