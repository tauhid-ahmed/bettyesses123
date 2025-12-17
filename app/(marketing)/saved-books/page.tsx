import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import Intro from "./_components/Intro";
import OwnBooksList from "./_components/OwnBooks";
import AllBooksList from "./_components/AllBookList";
import PrivacyFeatures from "@/features/privacy-features/components/PrivacyFeatures";

export default function SavedBooksPage() {
  return (
    <>
      <Intro />
      <OwnBooksList />
      <HowWeWorks />
      <AllBooksList />
      <PrivacyFeatures />
    </>
  );
}
