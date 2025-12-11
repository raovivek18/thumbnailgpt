"use client"

import type React from "react"

import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { cn } from "@/lib/utils"

type Logo = {
  src: string
  alt: string
  width?: number
  height?: number
}

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[]
}

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] py-0",
        className,
      )}
    >
      <InfiniteSlider gap={100} reverse speed={5} speedOnHover={2.5}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-6 select-none md:h-8 opacity-50 brightness-0 invert"
            height={logo.height || "auto"}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src || "/placeholder.svg"}
            width={logo.width || "auto"}
          />
        ))}
      </InfiniteSlider>
    </div>
  )
}
