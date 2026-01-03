"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AnimatedButton } from "@/components/ui/animated-button"
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { useBanner } from "@/components/banner-context"

export function ThumbnailGPTHeader() {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { isVisible: isBannerVisible } = useBanner()

  // Ensure client-side only rendering for dynamic classes
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const links = [
    {
      label: "Features",
      href: "/#features",
    },
    {
      label: "Pricing",
      href: "/#pricing",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ]

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isAnchor = href.startsWith("/#")
    const isCurrentPage = pathname === "/"

    if (isAnchor) {
      const targetId = href.slice(2) // Remove "/#"

      if (isCurrentPage) {
        // Same page - smooth scroll without navigation
        e.preventDefault()
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      } else {
        // Different page - navigate then scroll
        e.preventDefault()
        router.push(href)
        // Scroll will be handled by useSmoothScroll hook in the target page
      }

      setOpen(false)
    } else {
      // Regular page navigation
      setOpen(false)
    }
  }

  // Use default state that matches server render (banner disabled = false)
  const headerTop = mounted && isBannerVisible ? "top-9" : "top-0"

  return (
    <header 
      className={cn(
        "fixed left-0 right-0 z-50 w-full bg-gradient-to-b from-black/70 via-black/60 to-black/50 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 shadow-lg shadow-black/30 transition-all duration-300",
        headerTop
      )}
      suppressHydrationWarning
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 gap-4 relative">
        {/* Logo + Name - Left */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0">
          <img
            src="/thumbnailgpt-logo.svg"
            alt="ThumbnailGPT Logo"
            className="h-8 w-8"
            width={32}
            height={32}
            fetchPriority="high"
          />
          <span className="text-xl font-bold text-white">
            Thumbnail<span className="text-[#FF8D00]">GPT</span>
          </span>
        </Link>

        {/* Menus - Center */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="px-4 py-2 text-sm text-gray-200 hover:text-[#FF8D00] transition-colors rounded-lg hover:bg-white/10 hover:backdrop-blur-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Buttons - Right */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a href="https://app.thumbnailgpt.com/" target="_blank" rel="noopener noreferrer">
            <AnimatedButton variant="ghost" size="sm">
              Login
            </AnimatedButton>
          </a>
          <a href="https://app.thumbnailgpt.com/" target="_blank" rel="noopener noreferrer">
            <AnimatedButton variant="primary" size="sm">
              Get Started
            </AnimatedButton>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#FF8D00] hover:bg-white/5 rounded-lg transition-colors"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu open={open} className="flex flex-col justify-between gap-2">
        <div className="grid gap-y-2">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="px-4 py-3 text-left text-gray-200 hover:text-[#FF8D00] hover:bg-white/10 hover:backdrop-blur-sm rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <a href="https://app.thumbnailgpt.com/" target="_blank" rel="noopener noreferrer">
            <AnimatedButton variant="outline" size="md" className="w-full">
              Login
            </AnimatedButton>
          </a>
          <a href="https://app.thumbnailgpt.com/" target="_blank" rel="noopener noreferrer">
            <AnimatedButton variant="primary" size="md" className="w-full">
              Get Started
            </AnimatedButton>
          </a>
        </div>
      </MobileMenu>
    </header>
  )
}

type MobileMenuProps = React.ComponentProps<"div"> & {
  open: boolean
}

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  const { isVisible: isBannerVisible } = useBanner()
  
  if (!open || typeof window === "undefined") return null

  // Calculate top position based on header position
  // Header nav has h-16 (64px)
  // When banner visible: header at top-9 (36px) + nav height (64px) = 100px
  // When banner hidden: header at top-0 (0px) + nav height (64px) = 64px
  // Position menu exactly at header bottom with no gap
  const headerTop = isBannerVisible ? 36 : 0 // top-9 = 36px, top-0 = 0px
  const headerHeight = 64 // h-16 = 64px
  const menuTop = headerTop + headerHeight

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "bg-gradient-to-b from-black/90 via-black/85 to-black/90 backdrop-blur-xl backdrop-saturate-150",
        "fixed right-0 bottom-0 left-0 z-40 flex flex-col overflow-y-auto overflow-x-hidden border-t border-white/10 shadow-lg shadow-black/30 md:hidden transition-all duration-300",
      )}
      style={{
        top: `${menuTop}px`,
        maxHeight: `calc(100vh - ${menuTop}px)`,
      }}
    >
      <div
        data-slot={open ? "open" : "closed"}
        className={cn(
          "data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out",
          "size-full p-4 pb-safe",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default ThumbnailGPTHeader
