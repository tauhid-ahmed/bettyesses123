import Intro from "./_components/Intro";

import BooksList from "./_components/BooksList";
import FAQ from "@/features/faq/components/FAQ";
import Testimonial from "@/features/testimonial/components/Testimonial";
import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import PrivacyFeatures from "@/features/privacy-features/components/PrivacyFeatures";

export default function page() {
  return (
    <>
      <Intro />
      <HowWeWorks />
      <BooksList />
      <PrivacyFeatures />
      <FAQ />
      <Testimonial />
    </>
  );
}
