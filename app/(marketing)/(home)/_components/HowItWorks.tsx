import Container from "@/components/Container";
import FeatureCard from "@/components/FeatureCard";
import Section from "@/components/Section";

const data = [
  {
    id: "1",
    title: "Upload Your Child’s Photo",
    image: "upload",
    description: "Simply upload a clear photo of your child's smiling face",
  },
  {
    id: "2",
    title: "Personalize Information",
    image: "idea",
    description: "Choose their name, select gender and customize the adventure",
  },
  {
    id: "3",
    title: "Book Printing & Delivery",
    image: "printer",
    description: "Get your magical storybook delivered digitally or in print",
  },
];

export default function HowItWorks() {
  return (
    <Section
      eyebrow="How It Works"
      title="Personalize your storybook in just three magical steps"
    >
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
