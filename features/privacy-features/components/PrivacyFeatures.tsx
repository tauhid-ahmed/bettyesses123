import Container from "@/components/Container";
import FeatureCard from "@/components/FeatureCard";
import Section from "@/components/Section";
import { Data } from "../types";
import { privacyFeaturesData } from "../data";

export default function PrivacyFeatures({
  data = privacyFeaturesData,
}: {
  data?: Data[];
}) {
  return (
    <Section eyebrow="Privacy Features" title="We keep your information safe">
      <Container>
        <ul className="flex flex-col md:flex-row gap-4">
          {data.map((item) => (
            <FeatureCard
              key={item.id}
              icon={item.image}
              title={item.title}
              description={item.title}
            />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
