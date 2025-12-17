import Container from "@/components/Container";
import Section from "@/components/Section";
import { faqData } from "../data";
import {
  AccordionGroup,
  AccordionItem,
} from "@/components/accordion/components/Accordion";
import Image from "next/image";
import bookImage from "@/images/book.webp";

export default function FAQ() {
  return (
    <Section eyebrow="FAQ" title="Frequently Asked Questions">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          {/* Image Container */}
          <div className="w-full lg:flex-1 flex justify-center lg:justify-start">
            <Image
              src={bookImage}
              alt="book"
              className="w-72 mx-auto lg:w-100"
            />
          </div>

          {/* Accordion Container */}
          <div className="w-full lg:flex-1">
            <AccordionGroup allowMultiple={false}>
              {faqData.map((item) => (
                <AccordionItem key={item.question} title={item.question}>
                  <p>{item.answer}</p>
                </AccordionItem>
              ))}
            </AccordionGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}
