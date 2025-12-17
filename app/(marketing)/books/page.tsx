import BookList from "./_components/BookList";
import Intro from "./_components/Intro";
import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";

export default function BooksPage() {
  return (
    <>
      <Intro /> <BookList /> <HowWeWorks />
    </>
  );
}
