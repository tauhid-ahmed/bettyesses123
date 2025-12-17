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
};
