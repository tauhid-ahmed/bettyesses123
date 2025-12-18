import Container from "@/components/Container";
import Section from "@/components/Section";
import BookCardHorizontal from "@/features/books/components/BookCardHorizontal";
import { horizontalBooks } from "@/features/books/data";
import { savedBooksIdPath } from "@/paths";

export default function BookList() {
  return (
    <Section eyebrow="All Books" title="Explore All Books & Choose Your’s">
      <Container size="md">
        <ul className="space-y-4 lg:space-y-6">
          {horizontalBooks.map((book) => (
            <li key={book.id}>
              <BookCardHorizontal
                image={book.image}
                title={book.title}
                ageRange={book.ageRange}
                description={book.description}
                lessons={book.lessons}
                href={savedBooksIdPath(book.id)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
