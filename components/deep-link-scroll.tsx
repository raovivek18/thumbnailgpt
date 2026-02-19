"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function DeepLinkScroll() {
    const pathname = usePathname()

    useEffect(() => {
        // Small delay to ensure DOM is ready and hydration is complete
        const timeoutId = setTimeout(() => {
            let targetId = ""

            switch (pathname) {
                case "/image-to-thumbnail":
                case "/text-to-thumbnail":
                case "/recreate-thumbnail":
                    targetId = "feature-generation"
                    break
                case "/analyze-thumbnail":
                case "/fix-thumbnail":
                    targetId = "feature-analysis"
                    break
                case "/title-to-thumbnail":
                case "/upscale-thumbnail":
                case "/sketch-to-thumbnail":
                    targetId = "feature-enhancement"
                    break
                default:
                    return
            }

            const element = document.getElementById(targetId)
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        }, 100) // 100ms delay is usually sufficient

        return () => clearTimeout(timeoutId)
    }, [pathname])

    return null
}
