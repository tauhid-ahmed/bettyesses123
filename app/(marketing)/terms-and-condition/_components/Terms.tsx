import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { PublicLegalPage } from "@/features/legal/types";

interface TermsProps {
  data: PublicLegalPage[];
}

export default function Terms({ data }: TermsProps) {
  return (
    <Section className="bg-linear-to-b from-transparent via-primary-100 to-transparent">
      <Container className="mb-20">
        <ul className="space-y-4 lg:space-y-6">
          {data.length > 0 ? (
            data.map((section) => (
              <li key={section.id}>
                <Heading as="h2" size="h4">
                  {section.title}
                </Heading>
                <ul className="list-disc pl-5 py-4 text-gray-700">
                  {section.features.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No content available.</p>
          )}
        </ul>
      </Container>
    </Section>
  );
}
