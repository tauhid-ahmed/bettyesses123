import Acc from "@/components/accordion/components/Accordion";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import BookCardHorizontal from "@/features/books/components/BookCardHorizontal";
import BookCardVertical from "@/features/books/components/BookCardVertical";

export default function page() {
  return (
    <div className="h-[600vh] relative  overflow-hidden">
      <div className="relative">
        <h1 className="primary-gradient-text text-3xl inline-block">
          Give a thoughtful Gift <br /> to a child you love 🎁
        </h1>

        <Acc />

        <TestimonialCard
          icon={"gift"}
          title={"Aarav"}
          age={"3"}
          description={
            "“This is the most amazing thing ever! I can’t believe how perfect it turned out!”"
          }
        />

        <FeatureCard
          icon={"camera"}
          title={"100% Photo Privacy Guaranteed"}
          description={
            "Your photos are safe. We use them only to create your story, then delete them."
          }
        />

        <BookCardVertical
          description="A fun, interactive journey through the alphabet starring
your little learner."
          image="/images/books/book-1.webp"
          title="Dream book"
          ageRange="3 to 5"
          lessons="Early Learning, Alphabet"
        />
        <BookCardHorizontal
          description="A fun, interactive journey through the alphabet starring
your little learner."
          image="/images/books/book-1.webp"
          title="Dream book"
          ageRange="3 to 5"
          lessons="Early Learning, Alphabet"
        />
      </div>
    </div>
  );
}
