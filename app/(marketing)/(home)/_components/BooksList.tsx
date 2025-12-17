import Container from "@/components/Container";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import BookCardVertical from "@/features/books/components/BookCardVertical";
import { verticalBooks } from "@/features/books/data";
import Link from "next/link";

export default function BooksList() {
  return (
    <Section
      eyebrow="Book List"
      title="Turn your imagination into a masterpiece."
    >
      <Container>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {verticalBooks.map((book) => (
            <BookCardVertical
              key={book.id}
              image={book.image}
              title={book.title}
              ageRange={book.ageRange}
              description={book.description}
              lessons={book.lessons}
            />
          ))}
        </ul>
        <div className="max-w-sm mx-auto mt-8">
          <Button className="w-full" size="lg" asChild>
            <Link href="/books">See all books</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
