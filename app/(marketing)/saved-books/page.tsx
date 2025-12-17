import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import Intro from "./_components/Intro";
import OwnBooksList from "./_components/OwnBooks";
import AllBooksList from "./_components/AllBookList";

export default function SavedBooksPage() {
  return (
    <>
      <Intro />
      <OwnBooksList />
      <HowWeWorks />
      <AllBooksList />
    </>
  );
}
