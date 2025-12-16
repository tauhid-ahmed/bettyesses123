import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type Props = {
  image: string;
  title: string;
  ageRange: string;
  description: string;
  lessons: string;
};

export default function BookCardVertical({
  title,
  image,
  ageRange,
  description,
  lessons,
}: Props) {
  return (
    <Card className="max-w-sm rounded-xl overflow-hidden border-none p-0 gap-0 shadow-xs hover:shadow-lg hover:shadow-primary-300 transition-shadow bg-primary-100">
      <div className="aspect-4/2 sm:aspect-4/3 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover size-full"
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
        <div className="mt-4">
          <Button className="primary-gradient" size="lg">
            Personalize This Book
          </Button>
        </div>
      </div>
    </Card>
  );
}
