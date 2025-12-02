"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function useSmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    // Handle hash on initial page load or navigation
    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1))
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }, [pathname])

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return { scrollToElement }
}
