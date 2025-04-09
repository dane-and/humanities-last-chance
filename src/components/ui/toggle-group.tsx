
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

export interface ToggleGroupProps {
  className?: string;
  children?: React.ReactNode;
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  rovingFocus?: boolean;
  loop?: boolean;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ children, className, type = "single", ...props }, ref) => {
    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        type={type as any}
        {...props}
        className={cn("toggle-group", className)}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

export default ToggleGroup;
