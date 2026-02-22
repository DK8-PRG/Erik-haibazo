import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

export function Section({ children, title, description, className }: SectionProps) {
  return (
    <section className={`py-12 sm:py-16 ${className ?? ""}`}>
      <Container>
        {(title || description) && (
          <div className="mb-6 sm:mb-8">
            {title && <h2 className="text-3xl leading-tight text-[#111111] sm:text-4xl">{title}</h2>}
            {description && <p className="mt-3 max-w-2xl text-sm text-neutral-700 sm:text-base">{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
