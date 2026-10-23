import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "default" | "narrow" | "wide" | "full";
  children: React.ReactNode;
}

export function Container({
  as: Component = "div",
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    narrow: "max-w-3xl",
    default: "max-w-5xl",
    wide: "max-w-6xl",
    full: "max-w-7xl",
  };

  return (
    <Component
      className={cn(
        "w-full mx-auto px-4 sm:px-6 md:px-8",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  containerSize?: "default" | "narrow" | "wide" | "full";
  children: React.ReactNode;
}

export function Section({
  id,
  className,
  containerSize = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-16 sm:py-24 md:py-28 relative", className)}
      {...props}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
