export type VerticalBook = {
  id: string;
  title: string;
  image: string;
  ageRange: string;
  description: string;
  lessons: string;
};

export type VerticalBooks = VerticalBook[];

export type BooksCardVerticalProps = {
  image: string;
  title: string;
  ageRange: string;
  description: string;
  lessons: string;
  href: string;
};

export type HorizontalBook = {
  id: string;
  title: string;
  image: string;
  ageRange: string;
  description: string;
  lessons: string;
  href?: string;
};

export type HorizontalBooks = HorizontalBook[];

export type BookCardHorizontalProps = {
  image: string;
  title: string;
  ageRange: string;
  description: string;
  lessons: string;
  href: string;
};

export type StepId =
  | "child_details"
  | "story_idea"
  | "book_preview"
  | "book_details"


export type Language = "English" | "Spanish" | "French";
export type Currency = "USD" | "EUR" | "GBP";
export type Gender = "Male" | "Female" | "Other";
