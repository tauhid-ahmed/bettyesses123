import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { verticalBooks } from "@/features/books/data";
import Link from "next/link";
import { booksIdPath } from "@/paths";
import AdminBookCard from "@/features/books/components/AdminBookCard";
import { Plus } from "lucide-react";

export default function BooksList() {
  return (
    <Section title="" titleAlign="left" padding="sm">
      <div className="@container">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-dark-800 font-medium text-[32px] mb-4">
            Customize & Upload New Books
          </h2>
          <div className="max-w-sm mx-auto mt-8">
            <Button className="w-full" size="lg" asChild>
              <Link href="/dashboard/books/create-book">
                <Plus /> Add New Books
              </Link>
            </Button>
          </div>
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
