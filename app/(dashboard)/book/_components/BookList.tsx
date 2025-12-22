import Container from "@/components/Container";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { verticalBooks } from "@/features/books/data";
import Link from "next/link";
import { booksIdPath } from "@/paths";
import AdminBookCard from "@/features/books/components/AdminBookCard";

export default function BooksList() {
  return (
    <Section
      title="Turn your imagination into a masterpiece."
      titleAlign="left"
      padding="sm"
    >
      <Container>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {verticalBooks.map((book) => (
            <AdminBookCard
              key={book.id}
              image={book.image}
              title={book.title}
              ageRange={book.ageRange}
              description={book.description}
              lessons={book.lessons}
              href={booksIdPath(book.id)}
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
