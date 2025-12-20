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

// Single horizontal book
export type HorizontalBook = {
  id: string;
  title: string;
  image: string;
  ageRange: string;
  description: string;
  lessons: string;
  href?: string;
};

// Array of horizontal books
export type HorizontalBooks = HorizontalBook[];

// Props for the BookCardHorizontal component
export type BookCardHorizontalProps = {
  image: string;
  title: string;
  ageRange: string;
  description: string;
  lessons: string;
  href: string;
};
