"use client"

import React, { useRef, useEffect, useState, forwardRef } from "react"
import { ArrowLeft, ArrowRight, Play } from "lucide-react"

// ==========================================
// SHARED UTILITY COMPONENTS
// ==========================================

/**
 * Image Comparison Slider for Upscaling
 */
interface ComparisonSliderProps {
  beforeUrl: string
  afterUrl: string
  beforeLabel?: string
  afterLabel?: string
}

const ComparisonSlider = ({ beforeUrl, afterUrl, beforeLabel = "Original", afterLabel = "Upscaled 4K" }: ComparisonSliderProps) => {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()

    let clientX: number | undefined

    if ('touches' in e) {
      clientX = e.touches[0].clientX
    } else {
      clientX = e.clientX
    }

    if (!clientX) return

    let position = ((clientX - rect.left) / rect.width) * 100
    position = Math.max(0, Math.min(100, position))
    setSliderPos(position)
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/80 cursor-col-resize select-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Upscaled) - Background layer */}
      <img
        src={afterUrl}
        alt="After"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Badge: Upscaled 4K - Placed behind the sliding div so it gets covered */}
      <div className="absolute top-3 right-3 bg-orange-500 backdrop-blur-md border border-white/20 px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] z-0">
        {afterLabel}
      </div>

      {/* Before Image (Low Res) - Clipped Layer (Higher Z-index than Upscaled badge) */}
      <div
        className="absolute inset-0 h-full z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={beforeUrl}
          alt="Before"
          className="absolute inset-0 h-full w-full object-cover grayscale-[0.5]"
        />

        {/* Badge: Original */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest text-orange-500 shadow-xl">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle - UI Matching Orange/Black Colors */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-orange-500 shadow-[0_0_15px_rgba(255,141,0,0.6)] z-20"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neutral-900 shadow-2xl flex items-center justify-center border-2 border-orange-500">
          <div className="w-0.5 h-2.5 bg-orange-500 rounded-full mx-0.5 opacity-80" />
          <div className="w-0.5 h-2.5 bg-orange-500 rounded-full mx-0.5 opacity-80" />
        </div>
      </div>
    </div>
  )
}

/**
 * Renders an image with a sleek reveal animation and glass frame.
 */
interface ThumbnailPreviewProps {
  imageUrl?: string
  className?: string
  label?: string
  noHover?: boolean
}

const ThumbnailPreview = forwardRef<HTMLDivElement, ThumbnailPreviewProps>(({ imageUrl, className = "", label = "Processing", noHover = false }, ref) => {
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
      <div ref={ref} className={`group relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-sm transition-transform duration-500 ${!noHover && 'hover:scale-[1.02]'}`}>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/80">
          {!imageUrl && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-orange-500/60">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-800 border-t-orange-500" />
              <span className="mt-3 text-xs font-medium tracking-wider uppercase">{label}</span>
            </div>
          )}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className={`h-full w-full object-cover transition-all duration-700 ease-out ${isLoaded ? "scale-100 opacity-100 blur-0" : "scale-110 opacity-0 blur-lg"
                }`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/800x450/1a1a1a/666666?text=Image+Load+Failed"
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
        </div>
      </div>
      <div className="mt-2 h-1 w-[80%] rounded-full bg-orange-500/20 blur-xl" />
    </div>
  )
})

ThumbnailPreview.displayName = "ThumbnailPreview"

interface UniversalResultProps {
  outputRef?: React.Ref<HTMLDivElement>
  imageUrl: string
  noHover?: boolean
}

const UniversalResult = ({ outputRef, imageUrl, noHover = false }: UniversalResultProps) => {
  return (
    <div className="relative z-20 flex flex-col gap-2 shrink-0 mt-auto">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-orange-500">
        <span>Result</span>
      </div>
      <div className="w-full">
        <ThumbnailPreview ref={outputRef} imageUrl={imageUrl} noHover={noHover} />
      </div>
    </div>
  )
}

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
  const [opacity, setOpacity] = useState(0)
  const id = React.useId()

  const pathRef = useRef<SVGPathElement>(null)
  const particleRef = useRef<SVGGElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const fromRect = fromRef.current.getBoundingClientRect()
      const toRect = toRef.current.getBoundingClientRect()

      const startX = fromRect.left - containerRect.left + fromRect.width / 2
      const startY = fromRect.bottom - containerRect.top
      const endX = toRect.left - containerRect.left + toRect.width / 2
      const endY = toRect.top - containerRect.top
      const controlY = startY + (endY - startY) * curvature
      const d = `M ${startX},${startY} C ${startX},${controlY} ${endX},${controlY} ${endX},${endY}`

      setPathData({
        d,
        viewBox: `0 0 ${containerRect.width} ${containerRect.height}`,
        length: Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) * 1.5
      })
    }

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

  useEffect(() => {
    if (pathData.d) {
      const timer = setTimeout(() => setOpacity(1), 100)
      return () => clearTimeout(timer)
    }
  }, [pathData.d])

  useEffect(() => {
    if (!pathData.d) return

    let startTime: number | undefined
    const duration = 2000

    const animate = (time: number) => {
      if (!startTime) startTime = time
      const elapsed = time - startTime
      const progress = (elapsed % duration) / duration

      if (pathRef.current && particleRef.current) {
        const path = pathRef.current
        try {
          const totalLength = path.getTotalLength()
          const currentLen = progress * totalLength
          const point = path.getPointAtLength(currentLen)
          const prevLen = Math.max(0, currentLen - 2)
          const prevPoint = path.getPointAtLength(prevLen)
          const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * (180 / Math.PI)

          particleRef.current.setAttribute("transform", `translate(${point.x}, ${point.y}) rotate(${angle})`)
          const opacityVal = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1
          particleRef.current.setAttribute("opacity", String(opacityVal))
        } catch (e) { }
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
// CARD 1: SKETCH TO THUMBNAIL
// ==========================================

const SketchToThumbnailCard = () => {
  const sketchUrl = "/sketch2thumbnail/thumbnailgpt-sketch-thumbnail.webp"
  const outputUrl = "/sketch2thumbnail/thumbnailgpt-generated-thumbnail.webp"

  return (
    <div className="relative bg-neutral-900/80 shadow-2xl outline outline-[6px] outline-white/5 h-[365px] w-[340px] sm:h-[440px] sm:w-[410px] rounded-3xl overflow-hidden mx-2.5 xl:mx-0 backdrop-blur-md flex flex-col items-center justify-center">
      <div className="relative p-5 sm:p-6 z-10 flex flex-col h-full w-full gap-2">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">
          <span>sketch to thumbnail</span>
        </div>

        {/* Centered Result Card with Slider */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-orange-500">
              <span>Result Preview</span>
            </div>
            <div className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-sm">
              <ComparisonSlider
                beforeUrl={sketchUrl}
                afterUrl={outputUrl}
                beforeLabel="Sketch"
                afterLabel="Generated"
              />
            </div>
            <div className="mt-2 mx-auto h-1 w-[80%] rounded-full bg-orange-500/20 blur-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// CARD 2: TITLE TO THUMBNAIL
// ==========================================

const TitleToThumbnailCard = () => {
  const title = "“How I Scaled My SaaS to $10K/Month”"
  const outputUrl = "/title2thumbnail/thumbnailgpt-title2thumbnail.webp"

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative bg-neutral-900/80 shadow-2xl outline outline-[6px] outline-white/5 h-[365px] w-[340px] sm:h-[440px] sm:w-[410px] rounded-3xl overflow-hidden mx-2.5 xl:mx-0 backdrop-blur-md flex flex-col"
    >
      <div className="relative p-5 sm:p-6 z-10 flex flex-col h-full w-full gap-2 justify-start">
        <div className="relative z-20 flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-orange-500">
            <span>Title</span>
          </div>

          <div ref={inputRef} className="group relative mx-auto w-fit rounded-lg bg-black/50 ring-1 ring-white/10 transition-all hover:ring-white/20 px-3 py-2 flex items-center justify-center mt-4">
            <div className="text-[10px] sm:text-xs font-medium leading-tight text-white text-center italic">
              {title}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[4px]" />

        <div className="w-full mt-auto translate-y-2.5">
          <UniversalResult outputRef={outputRef} imageUrl={outputUrl} />
        </div>

        <AnimatedBeam containerRef={containerRef} fromRef={inputRef} toRef={outputRef} curvature={0.2} />
      </div>
    </div>
  )
}

// ==========================================
// CARD 3: UPSCALE THUMBNAIL
// ==========================================

const UpscaleThumbnailCard = () => {
  const beforeUrl = "/upscale-thumbnail/thumbnailgpt-blur-thumbnail.webp"
  const afterUrl = "/upscale-thumbnail/thumbnailgpt-upscaled-thumbnail.webp"

  return (
    <div className="relative bg-neutral-900/80 shadow-2xl outline outline-[6px] outline-white/5 h-[365px] w-[340px] sm:h-[440px] sm:w-[410px] rounded-3xl overflow-hidden mx-2.5 xl:mx-0 backdrop-blur-md flex flex-col items-center justify-center">
      <div className="relative p-5 sm:p-6 z-10 flex flex-col h-full w-full gap-2">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">
          <span>upscale</span>
        </div>

        {/* Centered Single Result Card with Slider */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-orange-500">
              <span>Result Preview</span>
            </div>
            {/* Custom frame for comparison slider - no scale-on-hover */}
            <div className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-sm">
              <ComparisonSlider beforeUrl={beforeUrl} afterUrl={afterUrl} />
            </div>
            <div className="mt-2 mx-auto h-1 w-[80%] rounded-full bg-orange-500/20 blur-xl" />
          </div>
        </div>
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
    <SketchToThumbnailCard key="sketch" />,
    <TitleToThumbnailCard key="title" />,
    <UpscaleThumbnailCard key="upscale" />
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

      <div className="w-full max-w-[1400px] relative z-10 p-4">

        {/* Updated Heading Section with Orange Highlights and crisp white text */}
        <div className="flex justify-center w-full px-4">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-12 sm:mb-20 tracking-tight max-w-4xl leading-[1.1]">
            <span className="text-orange-500">Analyze</span> Thumbnails and Automatically <span className="text-orange-500">Fix</span> Design Issues
          </h2>
        </div>

        {/* Desktop View */}
        <div className="hidden xl:flex flex-row justify-center items-end gap-6">
          {components}
        </div>

        {/* Mobile/Tablet View */}
        <div
          className="xl:hidden flex flex-col items-center gap-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Active Card Container */}
          <div className="relative w-full flex justify-center perspective-1000">
            <div key={currentSlide} style={{ animation: 'fadeIn 0.5s ease-out' }}>
              {components[currentSlide]}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-6 z-20">
            <button
              onClick={prevSlide}
              className="touch-action-manipulation h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/15 text-white backdrop-blur-md border border-white/5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex justify-center items-center h-8 px-1 border rounded-full bg-white/10 border-white/5 backdrop-blur-md">
              <div className="flex gap-2 px-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="touch-action-manipulation py-2 group focus:outline-none"
                  >
                    <div
                      className={`transition-all duration-300 rounded-full h-1.5 ${currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/20 group-hover:bg-white/40'
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="touch-action-manipulation h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/15 text-white backdrop-blur-md border border-white/5 transition-all"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}