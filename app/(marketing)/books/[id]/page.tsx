import PublicBookDetails from "@/features/books/components/PublicBookDetails";
import FAQ from "@/features/faq/components/FAQ";
import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import Testimonial from "@/features/testimonial/components/Testimonial";

type Props = {
  searchParams: Promise<{
    id: string;
  }>;
};

export default async function BookDetails({ searchParams }: Props) {
  const { id } = await searchParams;
  return (
    <>
      <PublicBookDetails id={id} />
      <HowWeWorks />
      <FAQ />
      <Testimonial />
    </>
  );
}
