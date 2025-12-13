"use client"

import React, { useRef } from "react"
import { Play, Eye } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

const AspectRatioCard = ({ imageUrl, className = "" }: { imageUrl: string; className?: string }) => {
  return (
    <div className={`w-full flex flex-col justify-center items-center ${className}`}>
      <div className="w-full max-w-2xl mx-auto relative p-4 sm:p-8">
        <div className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl">
          <div className="w-full p-1">
            <div className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-black aspect-video">
              <img
                loading="lazy"
                width={800}
                height={450}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                src={imageUrl || "/placeholder.svg"}
                alt="Enhanced thumbnail"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  duration = 3,
  pathColor = "rgba(255,255,255,0.1)",
  pathWidth = 2,
  pathOpacity = 1,
  gradientStartColor = "#FF8D00",
  gradientStopColor = "#FFA500",
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
  const [pathD, setPathD] = React.useState("")
  const [pathLength, setPathLength] = React.useState(0)
  const [viewBox, setViewBox] = React.useState<string | null>(null)
  const id = React.useId().replace(/:/g, "-")

  const particleRef = React.useRef<SVGCircleElement>(null)
  const pathRef = React.useRef<SVGPathElement>(null)
  const rafRef = React.useRef<number | null>(null)

  React.useEffect(() => {
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
      const verticalCompression = 0.5 // Reduce vertical height by 50%
      const compressedDy = dy * verticalCompression
      const compressedEndY = startY + compressedDy
      let d = ""

      if (Math.abs(dx) > Math.abs(compressedDy)) {
        const controlX = startX + dx * curvature
        d = `M ${startX},${startY} C ${controlX},${startY} ${controlX},${compressedEndY} ${endX},${compressedEndY}`
      } else {
        const controlY = startY + compressedDy * curvature
        d = `M ${startX},${startY} C ${startX},${controlY} ${endX},${controlY} ${endX},${compressedEndY}`
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

  React.useEffect(() => {
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

export function RecreateThumbnailFeature() {
  const containerRef = useRef<HTMLDivElement>(null)
  const youtubeCardRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-black text-neutral-100 w-full font-sans selection:bg-[#FF8D00]/30 py-20 md:py-32">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-stretch">
            {/* Description - First on mobile, left on desktop */}
            <div className="order-1 md:order-1 flex flex-col justify-center gap-8 py-10 px-4 md:px-6 lg:px-10 h-full">
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-white">
                  <span className="text-[#FF8D00]">Recreate</span> Thumbnail
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg">
                  Upload any YouTube thumbnail and get AI-generated recreated versions with improved design, enhanced
                  clarity, and boosted CTR potential for your content.
                </p>
              </div>

              <div className="h-px w-20 bg-gradient-to-r from-[#FF8D00] to-transparent" />

              <a href="https://app.thumbnailgpt.com/" target="_blank" rel="noopener noreferrer">
                <AnimatedButton size="md" className="w-fit">
                  Try It Now
                </AnimatedButton>
              </a>
            </div>

            {/* Interactive Card - Second on mobile, right on desktop */}
            <div className="order-2 md:order-2 flex items-center justify-center w-full px-4 md:px-6 h-full">
              <div
                ref={containerRef}
                className="w-full h-auto lg:aspect-[120/60] rounded-xl border border-[#FF8D00]/20 bg-black/40 backdrop-blur-md shadow-2xl relative flex flex-col"
              >
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-[#FF8D00]/20 rounded-t-xl">
                  <div className="h-3 w-3 rounded-full bg-neutral-700" />
                  <div className="h-3 w-3 rounded-full bg-neutral-700" />
                  <div className="h-3 w-3 rounded-full bg-neutral-700" />
                </div>

                <div className="p-3 md:p-4 flex flex-col items-center gap-0 relative w-full">
                  {/* YouTube Card Section */}
                  <div ref={youtubeCardRef} className="relative w-full z-20 flex flex-col items-center">
                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1 block ml-1 w-full">
                      Original
                    </label>
                    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-200 cursor-pointer group transform scale-[0.55] origin-top mx-auto">
                      {/* Thumbnail Container */}
                      <div className="relative w-full aspect-video overflow-hidden bg-black">
                        <img
                          loading="lazy"
                          width={640}
                          height={360}
                          src="/images/thumbnailgpt-youtube-preview.webp"
                          alt="YouTube video thumbnail"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Video Duration Badge */}
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                          12:34
                        </div>
                        
                        {/* Play button overlay - appears on hover */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
                            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Video Info Section */}
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2 group-hover:text-[#FF8D00] transition-colors">
                          Would You Risk Dying For $500,000?
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                          <span>MrBeast</span>
                          <span>•</span>
                          <span>102M views</span>
                          <span>•</span>
                          <span>2 months ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Result Section */}
                  <div ref={resultRef} className="w-full relative z-20 -mt-28 flex flex-col items-center">
                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1 block ml-1 w-full">
                      Result
                    </label>
                    <AspectRatioCard imageUrl="/images/thumbnailgpt-thumbnail3.webp" />
                  </div>

                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={youtubeCardRef}
                    toRef={resultRef}
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
