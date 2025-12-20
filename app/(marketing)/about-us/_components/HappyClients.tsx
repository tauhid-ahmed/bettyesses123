import Container from "@/components/Container";
import Section from "@/components/Section";
import Image from "next/image";
import { cn } from "@/lib/utils";

const images = [
  {
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    alt: "Reading with child",
    colSpan: "lg:col-span-3",
  },
  {
    src: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&q=80",
    alt: "Kids reading outdoors",
    colSpan: "lg:col-span-6",
  },
  {
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
    alt: "Mother and child reading",
    colSpan: "lg:col-span-3",
  },
  {
    src: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=800&q=80",
    alt: "Family reading together",
    colSpan: "lg:col-span-4 lg:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80",
    alt: "Mother reading to baby",
    colSpan: "lg:col-span-4",
  },
  {
    src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80",
    alt: "Happy child with book",
    colSpan: "lg:col-span-4",
  },
];

export default function HappyClients() {
  return (
    <Section
      eyebrow="Happy Clients"
      title="Our Happy Clients With Their Child Reading Our Books"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 grid-flow-dense">
          {/* Row 1 */}
          <div className="lg:col-span-3 lg:h-[250px] relative overflow-hidden rounded-2xl group cursor-pointer">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="lg:col-span-6 lg:h-[250px] relative overflow-hidden rounded-2xl group cursor-pointer">
            <Image
              src={images[1].src}
              alt={images[1].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="lg:col-span-3 lg:h-[250px] relative overflow-hidden rounded-2xl group cursor-pointer">
            <Image
              src={images[2].src}
              alt={images[2].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          {/* Row 2 - Tall image on left */}
          <div className="lg:col-span-4 lg:h-[250px] relative overflow-hidden rounded-2xl group cursor-pointer">
            <Image
              src={images[3].src}
              alt={images[3].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="lg:col-span-4 lg:h-[250px] relative overflow-hidden rounded-2xl group cursor-pointer">
            <Image
              src={images[4].src}
              alt={images[4].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="lg:col-span-4 lg:h-[250px] relative overflow-hidden rounded-2xl group cursor-pointer">
            <Image
              src={images[5].src}
              alt={images[5].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
