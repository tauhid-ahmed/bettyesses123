import { cn } from "@/lib/utils";
import Heading from "./Heading";
import Container from "./Container";

type SectionProps = {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
};

export default function Section({
  children,
  eyebrow,
  title,
  description,
  padding = "lg",
}: SectionProps) {
  return (
    <section
      className={cn({
        "py-6 md:py-10 lg:py-15 space-y-6 lg:space-y-10": padding === "lg",
        "py-6 lg:py-10": padding === "md",
        "py-6": padding === "sm",
        "py-0": padding === "none",
      })}
    >
      <Container className="space-y-4 text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
      </Container>
      <>{children}</>
    </section>
  );
}

function Eyebrow({ children }: React.PropsWithChildren) {
  return (
    <Heading as="h2" className="text-primary-500" size="h6" align="center">
      {children}
    </Heading>
  );
}

function Title({ children }: React.PropsWithChildren) {
  return (
    <Heading
      as="h2"
      size="h1"
      align="center"
      className="text-gray-800 tracking-tight"
    >
      {children}
    </Heading>
  );
}

function Description({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
