import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import introImage from "@/images/homeIntro.webp";
import Image from "next/image";

export default function Intro() {
  return (
    <Section padding="lg">
      <Container>
        <div className="flex">
          <div className="flex-1 space-y-4">
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
            <Button className="primary-gradient" size="lg">
              Create Free Preview
            </Button>
          </div>
          <div className="max-w-[600px]">
            <Image src={introImage} alt="Intro Image" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
