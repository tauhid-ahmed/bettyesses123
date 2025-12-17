import Image from "next/image";
import Container from "./Container";
import Heading from "./Heading";
import Section from "./Section";

type Props = {
  title: string;
  description: string;
  image: string;
};

export default function PageIntro({ title, description, image }: Props) {
  return (
    <Section padding="sm">
      <Container>
        <div className="rounded-lg relative md:h-77.5 overflow-hidden flex">
          <Background />

          <div className="flex justify-between items-center p-4 md:p-8 flex-1">
            <div className="space-y-2">
              <Heading as="h2" className="primary-gradient-text">
                {title}
              </Heading>
              <p className="text-lg text-gray-800">{description}</p>
            </div>
            <Image src={image} alt={title} height={240} width={340} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Background() {
  return (
    <div className="primary-gradient primary-gradient absolute inset-0 opacity-20 -z-10" />
  );
}
