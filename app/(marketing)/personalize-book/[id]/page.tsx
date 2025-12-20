import PersonalizeBookWizard from "@/features/books/components/PersonalizeBookWizard";
import FAQ from "@/features/faq/components/FAQ";
import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import Testimonial from "@/features/testimonial/components/Testimonial";

export default function PersonalizeBook() {
  return (
    <>
      <PersonalizeBookWizard />
      <HowWeWorks />
      <FAQ />
      <Testimonial />
    </>
  );
}
