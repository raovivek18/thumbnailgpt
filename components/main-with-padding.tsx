"use client"

import { useState, useEffect } from "react"
import { useBanner } from "./banner-context"
import { cn } from "@/lib/utils"

type MainWithPaddingProps = {
  children: React.ReactNode
  className?: string
}

export function MainWithPadding({ children, className }: MainWithPaddingProps) {
  const { isVisible: isBannerVisible } = useBanner()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // When banner is visible: banner (36px) + header (64px) = 100px
  // When banner is hidden: header (64px) = 64px
  // Default to pt-16 (banner hidden) to match server render
  const paddingTop = mounted && isBannerVisible ? "pt-[100px]" : "pt-16"

  return (
    <main 
      className={cn("min-h-screen bg-black text-white", paddingTop, "transition-all duration-300", className)}
      suppressHydrationWarning
    >
      {children}
    </main>
  )
}

