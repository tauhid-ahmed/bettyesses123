"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarouselControls,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import TestimonialCard from "@/features/testimonial/components/TestimonialCard";
import Section from "@/components/Section";
import Container from "@/components/Container";

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

import { useState, useEffect } from "react";
import { getReviews } from "@/features/admin/reviews/actions/get-reviews";
import { Review } from "@/features/admin/reviews/types";

export default function Testimonial() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviews({ limit: 6 }); 
        if (res.success && res.data) {
          setReviews(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <Section title="Smiles Shared by Our Customers" eyebrow="Testimonials">
        <Container>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        </Container>
      </Section>
    );
  }

  if (reviews.length === 0) {
    return null; 
  }

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
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                <TestimonialCard
                  age={review.book?.childName || "Tale Seeker"}
                  description={review.comment}
                  image={review.reviewer?.image}
                  name={`${review.reviewer?.firstName} ${review.reviewer?.lastName}`}
                  rating={review.rating}
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
