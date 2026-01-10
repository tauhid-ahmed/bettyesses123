import { getBookTemplates } from "@/features/books/actions/get-book-templates";
import BookList from "./_components/BookList";
import Intro from "./_components/Intro";
import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";

export default async function BooksPage() {
  const { data: books } = await getBookTemplates();

  return (
    <>
      <Intro /> <BookList books={books} /> <HowWeWorks />
    </>
  );
}
