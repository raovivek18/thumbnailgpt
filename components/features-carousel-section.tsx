"use client"

import React, { useRef, useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Play } from "lucide-react"

// ==========================================
// SHARED UTILITY COMPONENTS
// ==========================================

/**
 * Renders the generated image with a sleek reveal animation and glass frame.
 */
interface ThumbnailPreviewProps {
  imageUrl?: string
  className?: string
}

const ThumbnailPreview = ({ imageUrl, className = "" }: ThumbnailPreviewProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (imageUrl) {
      setIsLoaded(false)
      const timeout = setTimeout(() => setIsLoaded(true), 150)
      return () => clearTimeout(timeout)
    }
  }, [imageUrl])

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Glass Frame for Image */}
      <div className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02]">

        {/* Inner Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/80">

          {/* Loading / Empty State */}
          {!imageUrl && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-neutral-400" />
              <span className="mt-3 text-xs font-medium tracking-wider uppercase opacity-60">Processing</span>
            </div>
          )}

          {/* Image */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Generated Result"
              className={`h-full w-full object-cover transition-all duration-700 ease-out ${isLoaded ? "scale-100 opacity-100 blur-0" : "scale-110 opacity-0 blur-lg"
                }`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/800x450/1a1a1a/666666?text=Generation+Failed"
              }}
            />
          )}

          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
        </div>
      </div>

      {/* Reflection/Glow below the card */}
      <div className="mt-2 h-1 w-[80%] rounded-full bg-orange-500/20 blur-xl" />
    </div>
  )
}

/**
 * Standardized Result Card Component for Universal alignment
 */
interface UniversalResultProps {
  outputRef?: React.RefObject<HTMLDivElement | null>
  imageUrl: string
}

const UniversalResult = ({ outputRef, imageUrl }: UniversalResultProps) => {
  return (
    // Added mt-auto to strictly force this section to the bottom
    <div className="relative z-20 flex flex-col gap-2 shrink-0 mt-auto">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-orange-500">
        <span>Result</span>
      </div>
      <div ref={outputRef} className="w-full">
        <ThumbnailPreview imageUrl={imageUrl} />
      </div>
    </div>
  )
}

/**
 * Draws the connecting line between elements with a directional arrow.
 */
interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  fromRef: React.RefObject<HTMLDivElement | null>
  toRef: React.RefObject<HTMLDivElement | null>
  curvature?: number
}

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0.4,
}: AnimatedBeamProps) => {
  const [pathData, setPathData] = useState({ d: "", length: 0, viewBox: "" })
  const [opacity, setOpacity] = useState(0) // State for smooth fade-in
  const id = React.useId()

  // Refs for animation loop
  const pathRef = useRef<SVGPathElement>(null)
  const particleRef = useRef<SVGGElement>(null)
  const rafRef = useRef<number | null>(null)

  // Calculate SVG Path
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const fromRect = fromRef.current.getBoundingClientRect()
      const toRect = toRef.current.getBoundingClientRect()

      // Calculate points relative to container
      // Start: Bottom Center of 'from' element
      const startX = fromRect.left - containerRect.left + fromRect.width / 2
      const startY = fromRect.bottom - containerRect.top

      // End: Top Center of 'to' element
      const endX = toRect.left - containerRect.left + toRect.width / 2
      const endY = toRect.top - containerRect.top

      // Control points for bezier curve
      const controlY = startY + (endY - startY) * curvature

      const d = `M ${startX},${startY} C ${startX},${controlY} ${endX},${controlY} ${endX},${endY}`

      setPathData({
        d,
        viewBox: `0 0 ${containerRect.width} ${containerRect.height}`,
        length: Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) * 1.5 // Approx length
      })
    }

    // Delay initial calculation slightly to ensure layout is settled
    const timer = setTimeout(updatePath, 100)

    const resizeObserver = new ResizeObserver(updatePath)
    if (containerRef.current) resizeObserver.observe(containerRef.current)
    window.addEventListener("resize", updatePath)

    return () => {
      clearTimeout(timer)
      resizeObserver.disconnect()
      window.removeEventListener("resize", updatePath)
    }
  }, [containerRef, fromRef, toRef, curvature])

  // Fade-in effect for the beam
  useEffect(() => {
    if (pathData.d) {
      const timer = setTimeout(() => setOpacity(1), 100)
      return () => clearTimeout(timer)
    }
  }, [pathData.d])

  // Animation Loop
  useEffect(() => {
    if (!pathData.d) return

    let startTime: number | undefined
    const duration = 2000 // ms

    const animate = (time: number) => {
      if (!startTime) startTime = time
      const elapsed = time - startTime
      const progress = (elapsed % duration) / duration

      // Move arrow
      if (pathRef.current && particleRef.current) {
        const path = pathRef.current
        try {
          const totalLength = path.getTotalLength()
          const currentLen = progress * totalLength
          const point = path.getPointAtLength(currentLen)

          // Calculate rotation angle
          const prevLen = Math.max(0, currentLen - 2)
          const prevPoint = path.getPointAtLength(prevLen)
          const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * (180 / Math.PI)

          particleRef.current.setAttribute("transform", `translate(${point.x}, ${point.y}) rotate(${angle})`)

          // Fade in/out at ends
          const opacityVal = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1
          particleRef.current.setAttribute("opacity", String(opacityVal))
        } catch (e) {
          // Safe exit for box resize/unmount
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [pathData.d])

  if (!pathData.d) return null

  return (
    <svg
      viewBox={pathData.viewBox}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full transition-opacity duration-1000 ease-out"
      style={{ overflow: "visible", opacity }}
    >
      <path d={pathData.d} fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
      <path
        ref={pathRef}
        d={pathData.d}
        fill="none"
        stroke={`url(#gradient-${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        className="opacity-60"
      />
      <g ref={particleRef} className="drop-shadow-[0_0_10px_#FF8D00]">
        <path d="M-4,-4 L2,0 L-4,4" fill="none" stroke="#FF8D00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="1.5" fill="#FF8D00" />
      </g>
      <defs>
        <linearGradient id={`gradient-${id}`} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF8D00" stopOpacity="0" />
          <stop offset="50%" stopColor="#FF8D00" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ==========================================
// CARD 1 SPECIFIC: TEXT TO IMAGE
// ==========================================

const TextToThumbnailCard = () => {
  const [prompt, setPrompt] = useState(
    "Virat Kohli with bold red 'Reality' text & dramatic shadow lighting."
  )
  const imageUrl = "/text2thumbnail/thumbnailgpt-text2thumbnail.webp"

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative bg-neutral-900/80 shadow-2xl outline outline-[6px] outline-white/5 h-[365px] w-[340px] sm:h-[440px] sm:w-[410px] rounded-3xl overflow-hidden mx-2.5 xl:mx-0 backdrop-blur-md flex flex-col"
    >
      <div className="relative p-5 sm:p-6 z-10 flex flex-col h-full w-full gap-2 justify-start">

        {/* Input: Text Area */}
        <div className="relative z-20 flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-orange-500">
            <span>Prompt</span>
          </div>
          <div ref={inputRef} className="group relative rounded-xl bg-black/50 p-1 ring-1 ring-white/10 transition-all focus-within:ring-orange-500/50 hover:ring-white/20">
            <div
              className="h-12 sm:h-16 w-full flex items-center justify-start bg-transparent px-3 text-sm font-medium leading-normal text-white text-left overflow-hidden"
            >
              {prompt}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[4px]" />

        {/* Universal Result Card */}
        <UniversalResult outputRef={outputRef} imageUrl={imageUrl} />

        <AnimatedBeam containerRef={containerRef} fromRef={inputRef} toRef={outputRef} curvature={0.2} />
      </div>
    </div>
  )
}

// ==========================================
// CARD 2 SPECIFIC: IMAGE TO IMAGE
// ==========================================

interface ImageRevealProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

const ImageReveal = ({ containerRef }: ImageRevealProps) => {
  const imageSize = "w-14 h-14 sm:w-16 sm:h-16"
  const cards = [
    { src: "/image2thumbnail/mrbeast.webp", rotate: -10, x: -60, y: 4, z: 50, origin: "origin-bottom-right" },
    { src: "/image2thumbnail/ronaldo.webp", rotate: -5, x: -30, y: 2, z: 40, origin: "origin-bottom" },
    { src: "/image2thumbnail/virat-kohli.webp", rotate: 2, x: 0, y: 0, z: 30, origin: "origin-bottom" },
    { src: "/image2thumbnail/lebron-james.webp", rotate: 5, x: 30, y: 2, z: 20, origin: "origin-bottom" },
    { src: "/image2thumbnail/messi.webp", rotate: 10, x: 60, y: 4, z: 10, origin: "origin-bottom-left" },
  ]

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full h-14 sm:h-16">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`absolute ${imageSize} ${card.origin} transition-all duration-500 ease-out hover:z-50`}
          style={{ zIndex: card.z, transform: `rotate(${card.rotate}deg) translate(${card.x}px, ${card.y}px)` }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-lg bg-neutral-900/90 backdrop-blur-md border border-white/30 ring-2 ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:-translate-y-2 hover:scale-110 hover:border-white/50 transition-all duration-500 ease-out">
            <img src={card.src} alt="element" className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      ))}
    </div>
  )
}

const ImageToThumbnailCard = () => {
  const imageUrl = "/image2thumbnail/thumbnailgpt-image2thumbnail.webp"
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative bg-neutral-900/80 shadow-2xl outline outline-[6px] outline-white/5 h-[365px] w-[340px] sm:h-[440px] sm:w-[410px] rounded-3xl overflow-hidden mx-2.5 xl:mx-0 backdrop-blur-md flex flex-col"
    >
      <div className="relative p-5 sm:p-6 z-10 flex flex-col h-full w-full gap-2 justify-start">
        {/* Input: Image Stack */}
        <div className="relative z-20 flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-orange-500">
            <span>Upload Images</span>
          </div>
          <div className="relative w-full">
            <div className="flex items-center justify-center w-full">
              <ImageReveal containerRef={inputRef} />
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[4px]" />

        {/* Universal Result Card */}
        <UniversalResult outputRef={outputRef} imageUrl={imageUrl} />

        <AnimatedBeam containerRef={containerRef} fromRef={inputRef} toRef={outputRef} curvature={0.2} />
      </div>
    </div>
  )
}

// ==========================================
// CARD 3 SPECIFIC: YOUTUBE TO THUMBNAIL
// ==========================================

const YouTubeCardPreview = () => {
  return (
    <div className="w-full bg-neutral-950 border border-white/10 rounded-lg sm:rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:border-white/20 hover:shadow-lg">
      <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
        <img
          src="/recreate-thumbnail/thumbnailgpt-thumbnail.webp"
          alt="YouTube video"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-sm text-white text-[8px] sm:text-[10px] font-medium px-1 py-0.5 rounded">12:34</div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  )
}

const RecreateThumbnailCard = () => {
  const imageUrl = "/recreate-thumbnail/thumbnailgpt-recreatethumbnail.webp"
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative bg-neutral-900/80 shadow-2xl outline outline-[6px] outline-white/5 h-[365px] w-[340px] sm:h-[440px] sm:w-[410px] rounded-3xl overflow-hidden mx-2.5 xl:mx-0 backdrop-blur-md flex flex-col"
    >
      <div className="relative p-5 sm:p-6 z-10 flex flex-col h-full w-full gap-2 justify-start">
        {/* Input: YouTube Card */}
        <div className="relative z-20 flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-orange-500">
            <span>Original</span>
          </div>
          <div ref={inputRef} className="w-[40%] sm:w-[45%] mx-auto">
            <YouTubeCardPreview />
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[4px]" />

        {/* Universal Result Card */}
        <UniversalResult outputRef={outputRef} imageUrl={imageUrl} />

        <AnimatedBeam containerRef={containerRef} fromRef={inputRef} toRef={outputRef} curvature={0.2} />
      </div>
    </div>
  )
}

// ==========================================
// MAIN APP & CAROUSEL LAYOUT
// ==========================================

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const components = [
    <TextToThumbnailCard key="text" />,
    <ImageToThumbnailCard key="image" />,
    <RecreateThumbnailCard key="recreate" />
  ]
  const totalSlides = components.length

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1279px)')
    setIsMobile(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!isMobile || isPaused) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isMobile, isPaused, totalSlides])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full bg-orange-flow relative flex items-center justify-center overflow-hidden py-8 md:py-12">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="w-full max-w-[1400px] relative z-10 px-4 flex flex-col items-center">

        {/* Section Heading with White/Orange Combination */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-12 sm:mb-20 tracking-tight max-w-4xl leading-[1.1]">
          Generate Thumbnails From <span className="text-orange-500">Text</span>, <span className="text-orange-500">Images</span>, or <span className="text-orange-500">Thumbnails</span>
        </h2>

        {/* Desktop View: Grid Row */}
        <div className="hidden xl:flex flex-row justify-center items-end gap-6">
          {components}
        </div>

        {/* Mobile/Tablet View: Carousel */}
        <div
          className="xl:hidden flex flex-col items-center gap-8 w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >

          <div className="relative w-full flex justify-center perspective-1000">
            <div key={currentSlide} style={{ animation: 'fadeIn 0.5s ease-out' }}>
              {components[currentSlide]}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-6 z-20">
            <button
              onClick={prevSlide}
              aria-label="Scroll left"
              className="touch-action-manipulation h-8 w-8 flex items-center justify-center rounded-full transition-all duration-200 bg-white/10 hover:bg-orange-500 active:bg-orange-600 text-white backdrop-blur-md border border-white/5"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="flex justify-center items-center h-8 px-1 border rounded-full bg-white/10 border-white/5 backdrop-blur-md">
              <div className="flex gap-2 px-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className="touch-action-manipulation py-2 group focus:outline-none"
                  >
                    <div
                      className={`transition-all duration-300 rounded-full h-1.5 ${currentSlide === index
                        ? 'w-8 bg-orange-500'
                        : 'w-2 bg-white/20 group-hover:bg-white/40'
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              aria-label="Scroll right"
              className="touch-action-manipulation h-8 w-8 flex items-center justify-center rounded-full transition-all duration-200 bg-white/10 hover:bg-orange-500 active:bg-orange-600 text-white backdrop-blur-md border border-white/5"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}