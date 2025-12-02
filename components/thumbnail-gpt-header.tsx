"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AnimatedButton } from "@/components/ui/animated-button"
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

export function ThumbnailGPTHeader() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

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

  return (
    <header className="fixed top-9 left-0 right-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20 transition-all duration-300">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 gap-4">
        {/* Logo + Name - Left */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0">
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
              className="px-4 py-2 text-sm text-gray-200 hover:text-[#FF8D00] transition-colors rounded-lg hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Buttons - Right */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
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
              className="px-4 py-3 text-left text-gray-200 hover:text-[#FF8D00] hover:bg-white/5 rounded-lg transition-colors"
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
  if (!open || typeof window === "undefined") return null

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "bg-black/95 backdrop-blur-xl",
        "fixed top-[100px] right-0 bottom-0 left-0 z-40 flex flex-col overflow-y-auto overflow-x-hidden border-t border-[#FF8D00]/20 md:hidden max-h-[calc(100vh-100px)]",
      )}
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
