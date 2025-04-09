
import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  children: React.ReactNode
}

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ children, ...props }, ref) => (
  <AspectRatioPrimitive.Root ref={ref} {...props}>
    {children}
  </AspectRatioPrimitive.Root>
))

AspectRatio.displayName = AspectRatioPrimitive.Root.displayName

export { AspectRatio }
