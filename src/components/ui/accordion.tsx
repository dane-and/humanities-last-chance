
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const Accordion = React.forwardRef(function Accordion(props, ref) {
  const { children, className, type = "single", ...otherProps } = props;
  
  return (
    <AccordionPrimitive.Root
      ref={ref}
      type={type}
      className={cn("accordion", className)}
      {...otherProps}
    >
      {children}
    </AccordionPrimitive.Root>
  );
});

Accordion.displayName = "Accordion";

Accordion.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(["single", "multiple"]),
  collapsible: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onValueChange: PropTypes.func
};

const AccordionItem = React.forwardRef(function AccordionItem(props, ref) {
  const { className, value, ...otherProps } = props;
  
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      value={value}
      {...otherProps}
    />
  );
});

AccordionItem.displayName = "AccordionItem";

AccordionItem.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  children: PropTypes.node
};

const AccordionTrigger = React.forwardRef(function AccordionTrigger(props, ref) {
  const { className, children, ...otherProps } = props;
  
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium text-sm transition-all hover:underline",
          className
        )}
        {...otherProps}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

AccordionTrigger.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const AccordionContent = React.forwardRef(function AccordionContent(props, ref) {
  const { className, children, ...otherProps } = props;
  
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      {...otherProps}
    >
      <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = "AccordionContent";

AccordionContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export { AccordionItem, AccordionTrigger, AccordionContent };
export default Accordion;
