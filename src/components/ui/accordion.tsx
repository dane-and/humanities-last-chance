
import * as React from "react";
import { Accordion } from "@radix-ui/react-accordion"; // Changed from AccordionPrimitive
import { cn } from "../../utils";

export interface AccordionProps extends React.ComponentPropsWithoutRef<typeof Accordion> {
  children?: React.ReactNode;
  className?: string;
  type: string;
}

const AccordionComponent = React.forwardRef<HTMLDivElement, AccordionProps>(({ children, className, type, ...props }, ref) => {
  return (
    <Accordion ref={ref} {...props} className={cn("accordion", className)}>
      {children}
    </Accordion>
  );
});

AccordionComponent.displayName = "Accordion";

export default AccordionComponent;
