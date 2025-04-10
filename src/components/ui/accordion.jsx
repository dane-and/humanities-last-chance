
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import PropTypes from "prop-types"
import { cn } from "@/lib/utils"

const Accordion = React.forwardRef(function Accordion(props, ref) {
  return <AccordionPrimitive.Root ref={ref} {...props} />
})

Accordion.displayName = AccordionPrimitive.Root.displayName

const AccordionItem = React.forwardRef(function AccordionItem({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    />
  )
})

AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
})

AccordionContent.displayName = AccordionPrimitive.Content.displayName

// PropTypes
Accordion.propTypes = {
  type: PropTypes.oneOf(["single", "multiple"]),
  collapsible: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onValueChange: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
}

AccordionItem.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
}

AccordionTrigger.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

AccordionContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
