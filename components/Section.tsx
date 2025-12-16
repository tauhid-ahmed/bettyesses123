import { cn } from "@/lib/utils";

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
      <div className="space-y-2 text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
      </div>
      <>{children}</>
    </section>
  );
}

function Eyebrow({ children }: React.PropsWithChildren) {
  return <h2>{children}</h2>;
}

function Title({ children }: React.PropsWithChildren) {
  return <h2>{children}</h2>;
}

function Description({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
