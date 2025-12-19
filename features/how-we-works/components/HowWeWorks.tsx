import Container from "@/components/Container";
import FeatureCard from "@/components/FeatureCard";
import Section from "@/components/Section";
import { howWeWorksData } from "../data";
import { type Data } from "../types";

export default function HowWeWorks({
  data = howWeWorksData,
}: {
  data?: Data[];
}) {
  return (
    <Section
      eyebrow="How It Works"
      title="Personalize your storybook in just three magical steps"
    >
      <Container>
        <div className="flex flex-col md:flex-row gap-4">
          {data.map((item) => (
            <FeatureCard
              key={item.id}
              icon={item.image}
              title={item.title}
              description={item.title}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
