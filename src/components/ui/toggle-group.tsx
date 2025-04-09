
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const ToggleGroup = React.forwardRef(function ToggleGroup(props, ref) {
  const { 
    children, 
    className, 
    type = "single", 
    ...otherProps 
  } = props;
  
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      type={type}
      className={cn("toggle-group", className)}
      {...otherProps}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
});

ToggleGroup.displayName = "ToggleGroup";

ToggleGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(["single", "multiple"]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onValueChange: PropTypes.func,
  disabled: PropTypes.bool,
  rovingFocus: PropTypes.bool,
  loop: PropTypes.bool
};

export default ToggleGroup;
