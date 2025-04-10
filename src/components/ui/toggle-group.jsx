
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import PropTypes from "prop-types"
import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef(function ToggleGroup(
  { className, variant, size, children, ...props },
  ref
) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
})

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef(function ToggleGroupItem(
  { className, children, variant, size, ...props },
  ref
) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

// PropTypes
ToggleGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(["single", "multiple"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onValueChange: PropTypes.func,
  disabled: PropTypes.bool,
  rovingFocus: PropTypes.bool,
  loop: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string
}

ToggleGroupItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string
}

export { ToggleGroup, ToggleGroupItem }
