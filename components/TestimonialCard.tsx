import Image from "next/image";
import GradientBorder from "./GradientBorder";
import cameraIcon from "@/images/icons/camera.webp";
import giftIcon from "@/images/icons/camera.webp";
import uploadIcon from "@/images/icons/upload.webp";
import ideaIcon from "@/images/icons/idea.webp";
import printerIcon from "@/images/icons/printer.webp";
import handIcon from "@/images/icons/hand.webp";
import Heading from "./Heading";
import Rating from "./Rating";

type Props = {
  icon: string;
  title: string;
  description: string;
  age: string | number;
};

const icons = {
  camera: cameraIcon,
  gift: giftIcon,
  upload: uploadIcon,
  idea: ideaIcon,
  printer: printerIcon,
  hand: handIcon,
};

export default function TestimonialCard({
  icon,
  title,
  description,
  age,
}: Props) {
  return (
    <GradientBorder
      borderRadius={24}
      className="w-full text-center mx-auto my-10"
      padding="sm"
    >
      <div className="space-y-3 bg-primary-100 py-2">
        <Image
          src={icons[icon as keyof typeof icons]}
          alt="book"
          width={112}
          height={112}
          className="w-fit mx-auto size-14 md:size-20 lg:size-25 rounded-full"
        />
        <Heading
          as="h3"
          size="h4"
          weight="semibold"
          align="center"
          className="text-gray-600"
        >
          {title}
        </Heading>
        <Heading
          as="h4"
          size="h6"
          weight="semibold"
          align="center"
          className="text-gray-500"
        >
          Age: {age}
        </Heading>
        <p className="text-secondary-500 text-sm md:text-lg px-2 leading-snug">
          {description}
        </p>
        <Rating className="mx-auto w-fit" value={3.5} readonly />
      </div>
    </GradientBorder>
  );
}
