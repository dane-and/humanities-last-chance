
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../utils";

export interface AccordionProps {
  children?: React.ReactNode;
  className?: string;
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, className, type = "single", ...props }, ref) => {
    return (
      <AccordionPrimitive.Root
        ref={ref}
        type={type as any}
        {...props}
        className={cn("accordion", className)}
      >
        {children}
      </AccordionPrimitive.Root>
    );
  }
);

Accordion.displayName = "Accordion";

export default Accordion;
