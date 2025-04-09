
import * as React from "react";
import { ToggleGroupPrimitive } from "@radix-ui/react-toggle-group";
import { cn } from "../../utils";

export interface ToggleGroupProps extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> {
  className?: string;
  children?: React.ReactNode;
  type: string; // Added type property
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(({ children, className, type, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Root ref={ref} {...props} className={cn("toggle-group", className)}>
      {children}
    </ToggleGroupPrimitive.Root>
  );
});

ToggleGroup.displayName = "ToggleGroup";

export default ToggleGroup;
