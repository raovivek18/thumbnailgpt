"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function GlasmorphicHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Reviews", href: "#reviews" },
    { name: "Pricing", href: "#pricing" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 backdrop-blur-xl bg-black/60 border-b border-[#FF8D00]/20"
          : "py-4 backdrop-blur-md bg-black/40"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className={`font-bold transition-all duration-300 ${isScrolled ? "text-2xl" : "text-3xl"}`}>
            <span className="text-white">Thumbnail</span>
            <span className="text-[#FF8D00]">GPT</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-[#FF8D00] transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:text-[#FF8D00] hover:bg-[#FF8D00]/10 transition-colors">
              Login
            </Button>
            <Button className="bg-[#FF8D00] hover:bg-[#FF8D00]/90 text-black font-semibold shadow-lg shadow-[#FF8D00]/20 transition-all hover:shadow-[#FF8D00]/40">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-[#FF8D00] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-[#FF8D00]/20 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-[#FF8D00] transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  variant="ghost"
                  className="text-white hover:text-[#FF8D00] hover:bg-[#FF8D00]/10 transition-colors w-full"
                >
                  Login
                </Button>
                <Button className="bg-[#FF8D00] hover:bg-[#FF8D00]/90 text-black font-semibold shadow-lg shadow-[#FF8D00]/20 transition-all hover:shadow-[#FF8D00]/40 w-full">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
