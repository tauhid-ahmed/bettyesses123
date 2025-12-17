import Intro from "./_components/Intro";
import HowItWorks from "./_components/HowItWorks";
import BooksList from "./_components/BooksList";
import Privacy from "./_components/Privacy";
import FAQ from "@/features/faq/components/FAQ";
import CarouselDemo from "@/components/X";

export default function page() {
  return (
    <>
      <Intro />
      <HowItWorks />
      <BooksList />
      <Privacy />
      <FAQ />
      <CarouselDemo />
    </>
  );
}
