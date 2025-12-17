"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarouselControls,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import TestimonialCard from "@/features/testimonial/components/TestimonialCard";
import { testimonialData } from "@/features/testimonial/data";
import Section from "./Section";
import Container from "./Container";

function CustomControls() {
  const { next, previous } = useCarouselControls();

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button
        onClick={previous}
        size="icon-lg"
        variant="ghost"
        className="rounded-full primary-gradient p-px group"
      >
        <div
          className="size-full rounded-full bg-white grid place-items-center 
                        hover:bg-linear-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white
                        active:bg-linear-to-r active:from-primary-500 active:to-secondary-500 active:text-white"
        >
          <LucideArrowLeft className="size-5 text-primary-500 group-hover:text-white group-active:text-white" />
        </div>
      </Button>

      <Button
        onClick={next}
        size="icon-lg"
        variant="ghost"
        className="rounded-full primary-gradient p-px group"
      >
        <div
          className="size-full rounded-full bg-white grid place-items-center 
                        hover:bg-linear-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white
                        active:bg-linear-to-r active:from-primary-500 active:to-secondary-500 active:text-white"
        >
          <LucideArrowRight className="size-5 text-primary-500 group-hover:text-white group-active:text-white" />
        </div>
      </Button>
    </div>
  );
}

export default function CarouselDemo() {
  return (
    <Section title="Smiles Shared by Our Customers" eyebrow="Testimonials">
      <Container>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonialData.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <TestimonialCard
                  age={testimonial.age}
                  description={testimonial.description}
                  image={testimonial.image}
                  name={testimonial.name}
                  rating={Number(testimonial.rating)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CustomControls />
        </Carousel>
      </Container>
    </Section>
  );
}
