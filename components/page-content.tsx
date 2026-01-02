"use client"

import { useBanner } from "./banner-context"
import { cn } from "@/lib/utils"

type PageContentProps = {
  children: React.ReactNode
  className?: string
}

export function PageContent({ children, className }: PageContentProps) {
  const { isVisible: isBannerVisible } = useBanner()
  
  // When banner is visible: banner (36px) + header (64px) = 100px
  // When banner is hidden: header (64px) = 64px
  const paddingTop = isBannerVisible ? "pt-[100px]" : "pt-16"

  return (
    <div className={cn(paddingTop, "transition-all duration-300", className)}>
      {children}
    </div>
  )
}

