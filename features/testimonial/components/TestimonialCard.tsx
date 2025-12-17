import GradientBorder from "@/components/GradientBorder";
import Heading from "@/components/Heading";
import Rating from "@/components/Rating";
import Image from "next/image";

type Props = {
  name: string;
  description: string;
  image?: string; // made optional
  age: string;
  rating: number;
};

export default function TestimonialCard({
  age,
  description,
  image,
  name,
  rating,
}: Props) {
  return (
    <GradientBorder
      borderRadius={8}
      className="w-full text-center h-full"
      padding="sm"
    >
      <div className="space-y-2 bg-primary-100 py-2">
        <TestimonialImage image={image} name={name} />

        <Heading
          as="h3"
          size="h4"
          weight="semibold"
          align="center"
          className="text-gray-600 tracking-tight"
        >
          {name}
        </Heading>
        <p className="text-gray-500 text-sm md:text-lg px-2 font-medium">
          Age: {age}
        </p>
        <p className="text-gray-500 text-sm md:text-lg px-2 leading-snug">
          {description}
        </p>
        <Rating value={rating} readonly className="mx-auto w-fit" />
      </div>
    </GradientBorder>
  );
}

function TestimonialImage({ image, name }: { image?: string; name: string }) {
  const firstChar = name?.charAt(0).toUpperCase() || "?";

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={112}
        height={112}
        className="mx-auto size-16 md:size-20  mb-6 rounded-full object-cover border border-primary-500 shrink-0"
      />
    );
  }

  return (
    <div className="size-20 mx-auto mb-6 rounded-full bg-gray-300 items-center justify-center text-3xl font-bold text-gray-700 border border-primary-500 grid place-items-center">
      {firstChar}
    </div>
  );
}
