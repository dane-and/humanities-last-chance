
import * as React from "react";
import { AccordionPrimitive } from "@radix-ui/react-accordion";
import { cn } from "../../utils";

export interface AccordionProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> {
  children?: React.ReactNode;
  className?: string;
  type: string; // Added type property
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(({ children, className, type, ...props }, ref) => {
  return (
    <AccordionPrimitive.Root ref={ref} {...props} className={cn("accordion", className)}>
      {children}
    </AccordionPrimitive.Root>
  );
});

Accordion.displayName = "Accordion";

export default Accordion;
