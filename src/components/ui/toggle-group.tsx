
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const ToggleGroup = React.forwardRef(function ToggleGroup(props, ref) {
  const { 
    children, 
    className, 
    type, 
    value,
    defaultValue,
    onValueChange,
    disabled,
    rovingFocus,
    loop,
    ...otherProps 
  } = props;
  
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      type={type || "single"}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      rovingFocus={rovingFocus}
      loop={loop}
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

// Create a ToggleGroupItem component for completeness
const ToggleGroupItem = React.forwardRef(function ToggleGroupItem(props, ref) {
  const { className, children, value, ...otherProps } = props;
  
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      value={value}
      className={cn(
        "toggle-group-item",
        className
      )}
      {...otherProps}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

ToggleGroupItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export { ToggleGroup, ToggleGroupItem };
export default ToggleGroup;
