import bookCoverImage1 from "@/images/book-cover-1.webp";
import bookCoverImage2 from "@/images/book-cover-2.webp";
import bookCoverImage3 from "@/images/book-cover-3.webp";
import bookCoverImage4 from "@/images/book-cover-4.webp";
import bookCoverImage5 from "@/images/book-cover-5.webp";
import BookGallery from "./BookGallery";
import PublicBookInfo from "./PublicBookInfo";
import Container from "@/components/Container";
import Section from "@/components/Section";

const data = [
  bookCoverImage1,
  bookCoverImage2,
  bookCoverImage3,
  bookCoverImage4,
  bookCoverImage5,
];

const bookInfo = {
  title: "The Adventure of Leo the Lionheart",
  description:
    "Join Leo and his friendly dragon companion on a magical journey through the Land of Floating Books. A heartwarming tale about the power of imagination, bravery, and the magic found within the pages of a story. A fun and engaging read for all ages. A must-read for any book lover! A heartwarming tale about the power of imagination, bravery, and the magic found within the pages of a story. A fun and engaging read for all ages. A must-read for any book lover!",
  lessons:
    "Teaches courage, the joy of reading, and that friendship can be found in the most unexpected places.",
  ageRange: "4 - 8 Years",
  price: 14.99,
  discount: 25,
  originalPrice: 19.99,
};

export default function PublicBookDetails({ id }: { id: string }) {
  return (
    <Section padding="sm">
      <Container>
        <div className="grid md:grid-cols-[minmax(23rem,1fr)_2fr] gap-6">
          <BookGallery images={data} />
          <PublicBookInfo
            title={bookInfo.title}
            description={bookInfo.description}
            lessons={bookInfo.lessons}
            ageRange={bookInfo.ageRange}
            price={bookInfo.price}
            discount={bookInfo.discount}
            originalPrice={bookInfo.originalPrice}
            id={id}
            image={"/books.webp"}
          />
        </div>
      </Container>
    </Section>
  );
}
