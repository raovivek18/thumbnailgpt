"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import type React from "react"

export function Footer() {
  const pathname = usePathname()
  const router = useRouter()

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isAnchor = href.startsWith("#")
    const isCurrentPage = pathname === "/"

    if (isAnchor) {
      const targetId = href.slice(1) // Remove "#"

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
        router.push(`/${href}`)
      }
    }
  }

  return (
    <footer className="py-12 md:py-16 px-4 sm:px-6 bg-black border-t border-[#FF8D00]/10 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 lg:gap-20">
          {/* Brand Section */}
          <div className="mb-8 md:mb-0 max-w-md">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img
                src="/thumbnailgpt-logo.svg"
                alt="ThumbnailGPT Logo"
                className="w-10 h-10"
                width={40}
                height={40}
                loading="lazy"
              />
              <h2 className="text-2xl font-bold text-white">
                Thumbnail<span className="text-[#FF8D00]">GPT</span>
              </h2>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              AI-powered YouTube thumbnail generator. Create stunning, high-converting thumbnails instantly with our
              advanced AI technology.
            </p>

            <div className="mb-6">
              <a
                href="https://twitter.com/intent/tweet?text=I've%20been%20using%20ThumbnailGPT%20to%20create%20amazing%20YouTube%20thumbnails!%20Check%20it%20out"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF8D00]/10 hover:bg-[#FF8D00]/20 border border-[#FF8D00]/20 rounded-lg text-[#FF8D00] text-sm font-medium transition-all"
              >
                Share on
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <p className="text-sm text-gray-500">© {new Date().getFullYear()} ThumbnailGPT. All rights reserved.</p>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/#features"
                    onClick={(e) => handleAnchorClick(e, "#features")}
                    className="text-gray-400 hover:text-[#FF8D00] transition-colors text-sm flex items-center gap-1 group"
                  >
                    Features
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#pricing"
                    onClick={(e) => handleAnchorClick(e, "#pricing")}
                    className="text-gray-400 hover:text-[#FF8D00] transition-colors text-sm flex items-center gap-1 group"
                  >
                    Pricing
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    onClick={(e) => handleAnchorClick(e, "#faq")}
                    className="text-gray-400 hover:text-[#FF8D00] transition-colors text-sm flex items-center gap-1 group"
                  >
                    FAQ
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Social</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://youtube.com/@thumbnailgpt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#FF8D00] transition-colors text-sm flex items-center gap-1 group"
                  >
                    YouTube
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/thumbnailgpt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#FF8D00] transition-colors text-sm flex items-center gap-1 group"
                  >
                    X
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/thumbnailgpt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#FF8D00] transition-colors text-sm flex items-center gap-1 group"
                  >
                    Instagram
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-[#FF8D00] transition-colors text-sm flex items-center gap-1 group"
                  >
                    Privacy Policy
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-[#FF8D00] transition-colors text-sm flex items-center gap-1 group"
                  >
                    Terms of Service
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund"
                    className="text-gray-400 hover:text-[#FF8D00] transition-colors text-sm flex items-center gap-1 group"
                  >
                    Refund Policy
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-[#FF8D00] transition-colors text-sm flex items-center gap-1 group"
                  >
                    Contact
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Large Brand Watermark */}
        <div className="w-full flex mt-12 md:mt-16 items-center justify-center overflow-hidden max-w-full">
          <h1 className="text-center text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-950 select-none leading-none">
            Thumbnail
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FF8D00]/50 to-[#FF8D00]/20">
              GPT
            </span>
          </h1>
        </div>
      </div>
    </footer>
  )
}

export default Footer
