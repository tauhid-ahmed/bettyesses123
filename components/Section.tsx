import { cn } from "@/lib/utils";
import Heading from "./Heading";
import Container from "./Container";
import HeadingReveal from "./HeadingReveal";
import { DiagonalWipeReveal } from "./Animations";
import { DescriptionChars } from "./TextAnimation";

type SectionProps = {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  titleAlign?: "center" | "left";
};

export default function Section({
  children,
  eyebrow,
  title,
  description,
  padding = "lg",
  className,
  titleAlign = "center",
}: SectionProps) {
  return (
    <section
      className={cn(
        {
          "py-6 md:py-10 lg:py-20 space-y-6 lg:space-y-10": padding === "lg",
          "py-6 lg:py-10": padding === "md",
          "py-6": padding === "sm",
          "py-0": padding === "none",
        },
        className
      )}
    >
      <Container className="space-y-4 text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && <Title align={titleAlign}>{title}</Title>}
        {description && <Description>{description}</Description>}
      </Container>
      <>{children}</>
    </section>
  );
}

function Eyebrow({ children }: React.PropsWithChildren) {
  return (
    <Heading as="h2" className="text-primary-500" size="h6" align="center">
      <DiagonalWipeReveal className="inline-block">
        {children}
      </DiagonalWipeReveal>
    </Heading>
  );
}

function Title({
  children,
  align,
}: { align: "center" | "left" } & React.PropsWithChildren) {
  return (
    <HeadingReveal>
      <Heading
        as="h2"
        size="h1"
        align={align}
        className="text-gray-800 tracking-tight"
      >
        {children}
      </Heading>
    </HeadingReveal>
  );
}

function Description({ children }: React.PropsWithChildren) {
  return <DescriptionChars text={children as string} />;
}
