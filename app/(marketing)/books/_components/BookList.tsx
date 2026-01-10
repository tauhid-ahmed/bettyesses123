import Container from "@/components/Container";
import Section from "@/components/Section";
import BookCardHorizontal from "@/features/books/components/BookCardHorizontal";
// import { horizontalBooks } from "@/features/books/data";
import { booksIdPath } from "@/paths";
import { BookTemplate } from "@/features/books/types/api";

type BookListProps = {
  books: BookTemplate[];
};

export default function BookList({ books }: BookListProps) {
  return (
    <Section eyebrow="All Books" title="Explore All Books & Choose Your’s">
      <Container size="md">
        <ul className="space-y-4 lg:space-y-6">
          {books.map((book) => (
            <li key={book.id}>
              <BookCardHorizontal
                image={book.coverImage}
                title={book.title}
                ageRange={book.ageRange}
                description={book.description}
                lessons={book.category} // Mapping category to lessons as placeholder
                href={booksIdPath(book.id)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
