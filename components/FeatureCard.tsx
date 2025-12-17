import Image from "next/image";
import GradientBorder from "./GradientBorder";
import cameraIcon from "@/images/icons/camera.webp";
import giftIcon from "@/images/icons/gift.webp";
import uploadIcon from "@/images/icons/upload.webp";
import ideaIcon from "@/images/icons/idea.webp";
import printerIcon from "@/images/icons/printer.webp";
import handIcon from "@/images/icons/hand.webp";
import Heading from "./Heading";

type Props = {
  icon: string;
  title: string;
  description: string;
};

const icons = {
  camera: cameraIcon,
  gift: giftIcon,
  upload: uploadIcon,
  idea: ideaIcon,
  printer: printerIcon,
  hand: handIcon,
};

export default function FeatureCard({ icon, title, description }: Props) {
  return (
    <GradientBorder
      borderRadius={8}
      className="w-full text-center"
      padding="sm"
    >
      <div className="space-y-3 bg-primary-100 py-2">
        <Image
          src={icons[icon as keyof typeof icons]}
          alt="book"
          width={112}
          height={112}
          className="w-fit mx-auto size-16 md:size-20 lg:size-28 mb-6"
        />
        <Heading
          as="h3"
          size="h4"
          weight="semibold"
          align="center"
          className="text-gray-600 tracking-tight"
        >
          {title}
        </Heading>
        <p className="text-gray-500 text-sm md:text-lg px-2 leading-snug">
          {description}
        </p>
      </div>
    </GradientBorder>
  );
}
