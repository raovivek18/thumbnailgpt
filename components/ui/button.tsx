"use client"

import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// <CHANGE> Updated buttonVariants to include custom primary with #ff9d23 orange theme
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#ff9d23]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  {
    variants: {
      variant: {
        // Primary: Orange gradient with hover/active states
        primary:
          "bg-gradient-to-r from-[#ff9d23] to-[#FF8D00] text-black font-semibold shadow-lg shadow-[#ff9d23]/25 hover:from-[#ffae4a] hover:to-[#ff9d23] hover:shadow-[#ff9d23]/40 active:from-[#e88d1f] active:to-[#e07d00] active:scale-[0.98]",
        // Secondary: Dark with orange border
        secondary:
          "bg-neutral-900 text-white border border-[#ff9d23]/30 hover:bg-neutral-800 hover:border-[#ff9d23]/50 active:bg-neutral-950 active:scale-[0.98]",
        // Outline: Transparent with orange border
        outline:
          "border-2 border-[#ff9d23]/50 bg-transparent text-[#ff9d23] hover:bg-[#ff9d23]/10 hover:border-[#ff9d23] active:bg-[#ff9d23]/20 active:scale-[0.98]",
        // Ghost: No background, subtle hover
        ghost:
          "bg-transparent text-neutral-300 hover:bg-white/5 hover:text-[#ff9d23] active:bg-white/10 active:scale-[0.98]",
        // Keep existing variants for backward compatibility
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        link: "text-[#ff9d23] underline-offset-4 hover:underline",
      },
      size: {
        // <CHANGE> Added sm, md, lg sizes as requested
        sm: "h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        md: "h-10 px-5 py-2 text-sm has-[>svg]:px-4",
        lg: "h-12 rounded-lg px-8 text-base font-semibold has-[>svg]:px-6",
        // Keep existing sizes for backward compatibility
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

// <CHANGE> Extended ButtonProps interface to explicitly include common props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  children?: React.ReactNode
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  disabled,
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }

/*
 * =============================================
 * USAGE EXAMPLES
 * =============================================
 *
 * Import:
 * import { Button } from '@/components/ui/button'
 *
 * Primary Button (default):
 * <Button variant="primary">Generate QR</Button>
 * <Button>Get Started</Button>  // defaults to primary
 *
 * Secondary Button:
 * <Button variant="secondary">Learn More</Button>
 *
 * Outline Button:
 * <Button variant="outline" size="sm">Cancel</Button>
 *
 * Ghost Button:
 * <Button variant="ghost">Skip</Button>
 *
 * Different Sizes:
 * <Button size="sm">Small</Button>
 * <Button size="md">Medium</Button>
 * <Button size="lg">Large</Button>
 *
 * Disabled State:
 * <Button disabled>Loading...</Button>
 *
 * With onClick:
 * <Button onClick={() => console.log('clicked')}>Click Me</Button>
 *
 * With Custom Classes:
 * <Button className="w-full">Full Width</Button>
 *
 * As Link (using asChild):
 * <Button asChild>
 *   <a href="/dashboard">Go to Dashboard</a>
 * </Button>
 *
 * =============================================
 */
