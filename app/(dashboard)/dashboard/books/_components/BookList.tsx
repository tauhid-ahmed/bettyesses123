import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { verticalBooks } from "@/features/books/data";
import Link from "next/link";
import { booksIdPath } from "@/paths";
import AdminBookCard from "@/features/books/components/AdminBookCard";
import { Plus } from "lucide-react";
import Heading from "@/components/Heading";

export default function BooksList() {
  return (
    <Section padding="none">
      <div className="@container">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <Heading as="h2" size="h3">
            Customize & Upload New Books
          </Heading>
          <Button asChild>
            <Link href="/dashboard/books/create-book">
              <Plus /> Add New Books
            </Link>
          </Button>
        </div>
        <ul
          className="
              grid
              grid-cols-1
              @[400px]:grid-cols-2
              @[700px]:grid-cols-2
              @[1000px]:grid-cols-3
              @[1240px]:grid-cols-4
              gap-4
              sm:gap-6
            "
        >
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
      </div>
    </Section>
  );
}
