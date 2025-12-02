"use client"

import { ArrowRight } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

export function CtaSection() {
  return (
    <section className="relative py-20 md:py-32 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Start Creating <span className="text-[#FF8D00]">Better Thumbnails</span>
        </h2>

        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
          Join thousands of creators using AI to generate click-worthy thumbnails in seconds.
        </p>

        <div className="pt-4">
          <a href="https://app.thumbnailgpt.com/" target="_blank" rel="noopener noreferrer">
            <AnimatedButton size="lg" className="group inline-flex items-center gap-2">
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </AnimatedButton>
          </a>
        </div>
      </div>
    </section>
  )
}
