import Intro from "./_components/Intro";

import BooksList from "./_components/BooksList";
import Privacy from "./_components/Privacy";
import FAQ from "@/features/faq/components/FAQ";
import Testimonial from "@/features/testimonial/components/Testimonial";
import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";

export default function page() {
  return (
    <>
      <Intro />
      <HowWeWorks />
      <BooksList />
      <Privacy />
      <FAQ />
      <Testimonial />
    </>
  );
}
