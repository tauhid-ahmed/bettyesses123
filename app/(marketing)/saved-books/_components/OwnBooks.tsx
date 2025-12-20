import Container from "@/components/Container";
import Section from "@/components/Section";
import BookCardVertical from "@/features/books/components/BookCardVertical";
import { verticalBooks } from "@/features/books/data";
import { personalizeBookPath } from "@/paths";

export default function OwnBooksList() {
  return (
    <Section eyebrow="All Books" title=" All Your Books You Purchased & Edited">
      <Container>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {verticalBooks.slice(0, 3).map((book) => (
            <BookCardVertical
              key={book.id}
              image={book.image}
              title={book.title}
              ageRange={book.ageRange}
              description={book.description}
              lessons={book.lessons}
              href={personalizeBookPath(book.id)}
            />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
