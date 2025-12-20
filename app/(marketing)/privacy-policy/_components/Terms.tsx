import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { termsData } from "@/data/termsAndCondition";

export default function Terms() {
  return (
    <Section className="bg-linear-to-b from-transparent via-primary-100 to-transparent">
      <Container className="mb-20">
        <ul className="space-y-4 lg:space-y-6">
          {termsData.sections.map((section) => (
            <li key={section.title}>
              <Heading as="h2" size="h4">
                {section.title}
              </Heading>
              <ul className="list-disc pl-5 py-4 text-gray-700">
                {section.content.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
