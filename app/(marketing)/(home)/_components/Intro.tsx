import Container from "@/components/Container";
import Heading from "@/components/Heading";
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
            <Heading
              as="h1"
              size="h1"
              className="xl:text-[64px] primary-gradient-text"
            >
              Give a thoughtful Gift to a child you love
            </Heading>
            <p>
              Discover products designed with love to make life easier for moms
              and kids. We prioritize uncompromising quality, offering only the
              best for you and your little ones.
            </p>
            <Button className="primary-gradient" size="lg" asChild>
              <Link href={booksPath()}>Create Free Preview</Link>
            </Button>
          </div>
          <div className="max-w-[600px] shrink-4 order-1 md:order-2 animate-float">
            <Image src={introImage} alt="Intro Image" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
