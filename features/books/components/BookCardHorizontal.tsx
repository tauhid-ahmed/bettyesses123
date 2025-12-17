import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

import cameraIcon from "@/images/icons/camera.webp";
import giftIcon from "@/images/icons/gift.webp";

type Props = {
  image: string;
  title: string;
  ageRange: string;
  description: string;
  lessons: string;
};

export default function BookCardHorizontal({
  title,
  image,
  ageRange,
  description,
  lessons,
}: Props) {
  return (
    <Card className="rounded-xl overflow-hidden border-none p-0 gap-0 shadow-xs hover:shadow-lg hover:shadow-primary-300 transition-shadow flex flex-col sm:flex-row bg-primary-100 m-2 mx-auto md:h-90.25 group">
      <div className="flex-1 sm:w-1/2 relative shrink-0 md:max-w-[487px] overflow-hidden bg-red-500">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="object-cover size-full group-hover:scale-105 transition-transform duration-300 aspect-video sm:aspect-square"
        />
      </div>
      <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 justify-center">
        <Heading as="h3" size="h3" weight="semibold">
          {title}
        </Heading>
        <p className="text-gray-500 line-clamp-2 text-lg md:text-xl font-medium">
          {description}
        </p>
        <div className="flex flex-wrap flex-col sm:flex-row sm:gap-1 md:gap-2 text-gray-500 sm:text-lg leading-tight">
          <span className="font-semibold">Story Lesson:</span> {lessons}
        </div>
        <div className="space-y-2">
          <div className="flex gap-2 text-gray-600 font-medium items-center text-md sm:text-lg">
            <Image src={cameraIcon} alt="camera" width={24} height={24} /> Best
            For Age {ageRange}
          </div>
          <div className="flex gap-2 text-gray-600 font-medium items-center text-md sm:text-lg">
            <Image src={giftIcon} alt="camera" width={24} height={24} /> Works
            with just 1 photo
          </div>
        </div>

        <div className="mt-4">
          <Button className="primary-gradient w-full" size="lg">
            Personalize This Book
          </Button>
        </div>
      </div>
    </Card>
  );
}
