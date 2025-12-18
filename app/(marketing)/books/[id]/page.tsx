import PublicBookDetails from "@/features/books/components/PublicBookDetails";
import FAQ from "@/features/faq/components/FAQ";
import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import Testimonial from "@/features/testimonial/components/Testimonial";

export default function BookDetails() {
  return (
    <>
      <PublicBookDetails />
      <HowWeWorks />
      <FAQ />
      <Testimonial />
    </>
  );
}
