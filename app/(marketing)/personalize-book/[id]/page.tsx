import PersonalizeBookForm from "@/features/books/components/personalization/BookInfoForm";
import FAQ from "@/features/faq/components/FAQ";
import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import Testimonial from "@/features/testimonial/components/Testimonial";

export default function PersonalizeBook() {
  return (
    <>
      <PersonalizeBookForm />
      <HowWeWorks />
      <FAQ />
      <Testimonial />
    </>
  );
}
