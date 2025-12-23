import { CardSlide } from "@/components/CardAnimation";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import HeadingReveal from "@/components/HeadingReveal";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import introImage from "@/images/homeIntro.webp";
import { booksPath } from "@/paths";
import Image from "next/image";
import Link from "next/link";

export default function Intro() {
  return (
    <Section padding="lg">
      <Container>
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 sm:min-w-96 space-y-4 order-2 md:order-1 md:-mt-8 lg:-mt-16">
            <HeadingReveal>
              <Heading
                as="h1"
                size="h1"
                className="
    primary-gradient-text
    w-full
    tracking-tighter
    text-3xl
    sm:text-4xl
    md:text-5xl
    xl:text-[64px]
    md:leading-[1.2]
    lg:leading-[1.3]
    font-semibold">
                Make your child feel special with a book made just
                <br className="hidden md:block" />
                for them
              </Heading>
            </HeadingReveal>

            <CardSlide>
              {" "}
              <Button className="primary-gradient" size="lg" asChild>
                <Link href={booksPath()}>Create Free Preview</Link>
              </Button>
            </CardSlide>
          </div>
          <div className="max-w-[600px] shrink-4 order-1 md:order-2 animate-float">
            <CardSlide direction="right">
              <Image src={introImage} alt="Intro Image" />
            </CardSlide>
          </div>
        </div>
      </Container>
    </Section>
  );
}

{
  /* <Heading
                as="h1"
                size="h1"
                className="xl:text-[64px] primary-gradient-text w-full tracking-tighter"
              >
                Make your child feel special with a book made just <br />for them
              </Heading> */
}
