import Heading from "@/components/Heading";
import AddToCart from "@/features/cart/components/AddToCart";
import { StaticImageData } from "next/image";

type Props = {
  title: string;
  description: string;
  lessons: string;
  ageRange: string;
  price: number;
  discount: number;
  originalPrice: number;
  id: string;
  image: string;
};

export default function PublicBookInfo({
  title,
  description,
  lessons,
  ageRange,
  price,
  discount,
  originalPrice,
  id,
  image,
}: Props) {
  return (
    <div className="h-full grid items-center">
      <div className="space-y-4">
        <Heading as="h2" size="h2">
          {title}
        </Heading>
        <p className="text-gray-600">{description}</p>
        <p>
          Story Lessons: <span className="text-gray-600">{lessons}</span>
        </p>
        <p>
          Best Age: <span className="text-gray-600">{ageRange}</span>
        </p>
        <div>
          <p className="text-xl md:text-xl lg:text-3xl font-semibold">
            Price: ${price}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <span className="text-gray-600">${originalPrice}</span>
            <span className="px-6 bg-primary-200 rounded text-gray-600 text-sm leading-none flex items-center py-2">
              {discount}%
            </span>
          </div>
        </div>
        <AddToCart id={id} product={{ id, title, price, imageUrl: image }} />
      </div>
    </div>
  );
}
