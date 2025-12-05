"use client"

import React, { useRef, useEffect, useState } from "react"
import ImageReveal from "@/components/ui/image-tiles"
import { AnimatedButton } from "@/components/ui/animated-button"

const AspectRatioCard = ({ imageUrl, className = "" }: { imageUrl: string; className?: string }) => {
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    if (imageUrl) {
      setShowImage(false)
      const timeout = setTimeout(() => setShowImage(true), 100)
      return () => clearTimeout(timeout)
    }
    setShowImage(false)
  }, [imageUrl])

  return (
    <>
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } 
          .animate-fadeIn { animation: fadeIn 1s ease-in-out forwards; }
        `}
      </style>

      <div className={`w-full flex flex-col justify-center items-center ${className}`}>
        <div className="w-full max-w-2xl mx-auto relative p-4 sm:p-8">
          <div className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl">
            <div className="w-full p-1">
              <div className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-black aspect-video">
                {!imageUrl && <div className="text-neutral-500 p-10 text-center">Image Placeholder</div>}

                {imageUrl && (
                  <img
                    loading="lazy"
                    width={800}
                    height={450}
                    className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
                      showImage ? "opacity-100 animate-fadeIn" : "opacity-0"
                    }`}
                    src={imageUrl || "/placeholder.svg"}
                    alt="Generated thumbnail"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null
                      target.src = "https://placehold.co/800x450/262626/ffffff?text=Error+Loading+Image"
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  duration = 3,
  pathColor = "rgba(255,141,0,0.1)",
  pathWidth = 2,
  pathOpacity = 1,
  gradientStartColor = "#FF8D00",
  gradientStopColor = "#FF8D00",
  curvature = 0.5,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
  fromRef: React.RefObject<HTMLDivElement | null>
  toRef: React.RefObject<HTMLDivElement | null>
  duration?: number
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  curvature?: number
}) => {
  const [pathD, setPathD] = useState("")
  const [pathLength, setPathLength] = useState(0)
  const [viewBox, setViewBox] = useState<string | null>(null)
  const id = React.useId().replace(/:/g, "-")

  const particleRef = useRef<SVGCircleElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    function calc() {
      if (!containerRef.current || !fromRef.current || !toRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const fromRect = fromRef.current.getBoundingClientRect()
      const toRect = toRef.current.getBoundingClientRect()

      const startX = fromRect.left - containerRect.left + fromRect.width / 2
      const startY = fromRect.top - containerRect.top + fromRect.height / 2
      const endX = toRect.left - containerRect.left + toRect.width / 2
      const endY = toRect.top - containerRect.top + toRect.height / 2

      const dx = endX - startX
      const dy = endY - startY
      let d = ""

      if (Math.abs(dx) > Math.abs(dy)) {
        const controlX = startX + dx * curvature
        d = `M ${startX},${startY} C ${controlX},${startY} ${controlX},${endY} ${endX},${endY}`
      } else {
        const controlY = startY + dy * curvature
        d = `M ${startX},${startY} C ${startX},${controlY} ${endX},${controlY} ${endX},${endY}`
      }

      setPathD(d)
      setViewBox(`0 0 ${containerRef.current.clientWidth} ${containerRef.current.clientHeight}`)

      try {
        const svgNS = "http://www.w3.org/2000/svg"
        const tempPath = document.createElementNS(svgNS, "path")
        tempPath.setAttribute("d", d)
        const len = tempPath.getTotalLength()
        setPathLength(len)
      } catch (e) {
        setPathLength(Math.sqrt(dx * dx + dy * dy))
      }
    }

    calc()
    const ro = new ResizeObserver(calc)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener("resize", calc)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", calc)
    }
  }, [containerRef, fromRef, toRef, curvature])

  useEffect(() => {
    if (!pathD || !pathLength) return

    let start: number | null = null
    const durationMs = duration * 1000

    function step(ts: number) {
      if (!start) start = ts
      const elapsed = ts - start
      const t = (elapsed % durationMs) / durationMs

      if (pathRef.current && particleRef.current) {
        try {
          const point = pathRef.current.getPointAtLength(t * pathLength)
          particleRef.current.setAttribute("cx", String(point.x))
          particleRef.current.setAttribute("cy", String(point.y))

          const opacity = t < 0.1 ? t * 10 : t > 0.9 ? (1 - t) * 10 : 1
          particleRef.current.setAttribute("opacity", String(Math.max(0, Math.min(1, opacity))))
        } catch (e) {
          // ignore
        }
      }
      rafRef.current = requestAnimationFrame(step)
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [pathD, pathLength, duration])

  if (!pathD || !viewBox) return null

  const pathId = `beamPath-${id}`
  const gradId = `beamGrad-${id}`
  const dashAnim = `dash-${id}`

  return (
    <svg
      viewBox={viewBox}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ overflow: "visible" }}
    >
      <path d={pathD} fill="none" stroke={pathColor} strokeWidth={pathWidth} opacity={pathOpacity} />

      <path
        id={pathId}
        ref={pathRef}
        d={pathD}
        fill="none"
        strokeWidth={pathWidth * 1.5}
        strokeLinecap="round"
        stroke={`url(#${gradId})`}
        style={{
          strokeDasharray: `${pathLength} ${pathLength}`,
          strokeDashoffset: pathLength,
          filter: "url(#beamGlow)",
        }}
      />

      <defs>
        <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="20%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>

        <filter id="beamGlow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle ref={particleRef} r="3" fill={gradientStartColor} className="drop-shadow-[0_0_8px_rgba(255,141,0,0.8)]" />

      <style>{`
        @keyframes ${dashAnim} {
          0% { stroke-dashoffset: ${pathLength}; }
          100% { stroke-dashoffset: ${-pathLength}; } 
        }
        #${pathId} {
          animation: ${dashAnim} ${duration}s linear infinite;
        }
      `}</style>
    </svg>
  )
}

export function ImageToThumbnailFeature() {
  const [imageUrl] = useState("/images/thumbnailgpt-famous-athletes.png")

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-black text-neutral-100 w-full font-sans selection:bg-[#FF8D00]/30 py-20 md:py-32">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-stretch">
            {/* Text Content - First on mobile, right on desktop */}
            <div className="order-1 md:order-2 flex flex-col justify-center gap-8 py-10 px-4 md:px-6 lg:px-10 h-full">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-white">
                  Image to <span className="text-[#FF8D00]">Thumbnail</span>
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg">
                  Upload any image and transform it into a professional, eye-catching thumbnail. Enhance colors, add
                  effects, and optimize for maximum click-through rates with AI-powered editing.
                </p>
              </div>

              <div className="h-px w-20 bg-gradient-to-r from-[#FF8D00] to-transparent" />

              <a href="https://app.thumbnailgpt.com/" target="_blank" rel="noopener noreferrer">
                <AnimatedButton size="md" className="w-fit">
                  Try It Now
                </AnimatedButton>
              </a>
            </div>

            {/* Interactive Card - Second on mobile, left on desktop */}
            <div className="order-2 md:order-1 flex items-center justify-center w-full px-4 md:px-6 h-full">
              <div
                ref={containerRef}
                className="w-full h-auto lg:aspect-[120/75] rounded-xl border border-[#FF8D00]/20 bg-black/40 backdrop-blur-md shadow-2xl relative flex flex-col"
              >
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-[#FF8D00]/20 rounded-t-xl">
                  <div className="h-3 w-3 rounded-full bg-neutral-700" />
                  <div className="h-3 w-3 rounded-full bg-neutral-700" />
                  <div className="h-3 w-3 rounded-full bg-neutral-700" />
                </div>

                <div className="p-4 md:p-6 flex flex-col items-center gap-6 relative w-full">
                  <div ref={inputRef} className="relative w-full z-20">
                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 block ml-1">
                      Upload Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <ImageReveal
                        leftImage="/images/athletes/ronaldo.png"
                        leftMiddleImage="/images/athletes/messi.png"
                        middleImage="/images/athletes/virat-kohli.png"
                        rightMiddleImage="/images/athletes/lebron-james.png"
                        rightImage="/images/athletes/usain-bolt.png"
                      />
                    </div>
                  </div>

                  <div ref={imageRef} className="w-full relative z-20">
                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 block ml-1">
                      Result
                    </label>
                    <AspectRatioCard imageUrl={imageUrl} />
                  </div>

                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={inputRef}
                    toRef={imageRef}
                    duration={3}
                    pathColor="rgba(255,141,0,0.1)"
                    pathWidth={2}
                    gradientStartColor="#FF8D00"
                    gradientStopColor="#FFA500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

