import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { BooksCardVerticalProps } from "../types";
import Link from "next/link";
import { CardTilt } from "@/components/CardAnimation";

export default function AdminBookCard({
  title,
  image,
  ageRange,
  description,
  lessons,
  href,
}: BooksCardVerticalProps) {
  return (
    <CardTilt>
      <Card className="rounded-xl overflow-hidden border-none p-0 gap-0 shadow-xs hover:shadow-lg hover:shadow-primary-300 transition-shadow bg-primary-100 group duration-300">
        <div className="aspect-4/2 sm:aspect-4/3 relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover size-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 space-y-2">
          <Heading as="h3" size="h5" weight="semibold">
            {title}
          </Heading>
          <div className="flex flex-wrap gap-2">
            <strong>Ages:</strong>
            <span className="text-gray-500">{ageRange}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <strong className="whitespace-nowrap">Story Lessons:</strong>
            <span className="text-gray-500">{lessons}</span>
          </div>
          <p className="text-gray-500 line-clamp-2">{description}</p>
          <div className="mt-4 flex flex-wrap justify-between items-center gap-4 *:flex-1">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 rounded-lg hover:text-red-600"
              asChild
            >
              <Link href={"#"}>Delete Book</Link>
            </Button>
            <Button className="primary-gradient rounded-lg" asChild>
              <Link href={href}>Edit Book</Link>
            </Button>
          </div>
        </div>
      </Card>
    </CardTilt>
  );
}
