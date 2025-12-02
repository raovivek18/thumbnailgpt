import Link from "next/link"
import { AnimatedButton } from "@/components/ui/animated-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 - Page Not Found | ThumbnailGPT",
  description: "The page you're looking for doesn't exist.",
}

export default function NotFound() {
  return (
    <main className="dark bg-black overflow-x-hidden min-w-0 w-full max-w-full min-h-screen flex items-center justify-center px-4 relative">
      <div className="text-center max-w-2xl mx-auto">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF8D00]/10 rounded-full blur-[120px]" />

        <div className="relative">
          {/* 404 Number */}
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-linear-to-b from-[#FF8D00] to-[#FF8D00]/40 leading-none mb-4">
            404
          </h1>

          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Page Not Found</h2>

          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <AnimatedButton>Back to Home</AnimatedButton>
            </Link>

            <Link href="/contact">
              <button className="px-6 py-3 border border-white/20 rounded-lg text-white hover:border-[#FF8D00]/50 hover:bg-[#FF8D00]/10 transition-all">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
