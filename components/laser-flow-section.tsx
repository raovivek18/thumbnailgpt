"use client"

import LaserFlow from "./laser-flow"
import { AnimatedButton } from "@/components/ui/animated-button"

export function LaserFlowSection() {
  return (
    <div className="w-full max-w-full overflow-x-hidden px-4 sm:px-6 lg:max-w-6xl lg:mx-auto bg-black">
      <div
        className="relative h-[600px] sm:h-[700px] md:h-[800px] overflow-hidden bg-black"
        style={{ backgroundColor: "#000000" }}
      >
        <LaserFlow horizontalBeamOffset={0.2} verticalBeamOffset={0.0} color="#FF8D00" />

        <div className="absolute inset-0 z-[7] flex pt-16 sm:pt-24 md:pt-32 lg:pt-40 px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="max-w-2xl text-left space-y-4 sm:space-y-6 md:space-y-8 my-[-20px] sm:my-[-40px] md:my-[-60px] lg:my-[-93px]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight my-0 py-0">
              Generate <span className="text-[#FF8D00]">Stunning</span> Thumbnails in Seconds
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed my-3">
              AI-powered thumbnail creator that transforms your ideas into viral visuals instantly.
            </p>
            <a href="https://app.thumbnailgpt.com/" target="_blank" rel="noopener noreferrer">
              <AnimatedButton size="md">Get Started</AnimatedButton>
            </a>
          </div>
        </div>

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[92%] sm:w-[88%] md:w-[86%] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] border sm:border-2 z-[6] overflow-hidden backdrop-blur-md p-4 sm:p-6 md:p-8"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            borderColor: "rgba(255, 141, 0, 0.6)",
            aspectRatio: "16 / 9",
          }}
        >
          <div className="w-full h-full rounded-[12px] sm:rounded-[14px] md:rounded-[16px] overflow-hidden relative">
            <img
              src="/images/design-mode/image.webp"
              alt="ThumbnailGPT Interface"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none z-[8]"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.2) 70%, transparent 100%)",
          }}
        />
      </div>
    </div>
  )
}
