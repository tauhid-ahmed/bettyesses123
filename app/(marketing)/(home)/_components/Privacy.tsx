import Container from "@/components/Container";
import FeatureCard from "@/components/FeatureCard";
import Section from "@/components/Section";

const data = [
  {
    id: "1",
    title: "100% Photo Privacy Guaranteed",
    image: "camera",
    description:
      "Your photos are safe. We use them only to create your story, then delete them.",
  },
  {
    id: "2",
    title: "We’re committed to your happiness",
    image: "gift",
    description:
      "Complete satisfaction, or we’ll make it right for you as you want it to be.",
  },
  {
    id: "3",
    title: "Top-Notch Craftsmanship",
    image: "hand",
    description:
      "Choose hardcover or paperback—whatever fits in your personal style.",
  },
];

export default function Privacy() {
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
