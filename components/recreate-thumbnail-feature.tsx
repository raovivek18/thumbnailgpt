"use client"

import React, { useRef, useEffect, useState } from "react"
import { Play } from "lucide-react"

// --- Helper Components ---

const YouTubeCardPreview = () => {
  return (
    // Removed border/bg that was wrapping text, now just wraps the image
    <div className="w-full bg-neutral-950 border border-white/10 rounded-lg sm:rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:border-white/20 hover:shadow-lg">
      {/* Thumbnail Container - Pure 16:9 Aspect Ratio */}
      <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
        <img
          src="/images/thumbnailgpt-youtube-preview.webp"
          alt="YouTube video thumbnail"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          onError={(e) => {
             const target = e.target as HTMLImageElement;
             target.src = "https://placehold.co/640x360/1a1a1a/666666?text=Video+Thumbnail"
          }}
        />
        
        {/* Duration Badge */}
        <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-sm text-white text-[8px] sm:text-[10px] font-medium px-1 py-0.5 rounded">
          12:34
        </div>
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
      
      {/* Removed Title & Views Section */}
    </div>
  )
}

/**
 * Renders the generated image with a sleek reveal animation and glass frame.
 */
const ThumbnailPreview = ({ imageUrl, className = "" }: { imageUrl: string, className?: string }) => {
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
      <div className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:scale-[1.01]">
        
        {/* Inner Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/80">
          
          {/* Loading / Empty State */}
          {!imageUrl && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-700 border-t-neutral-400" />
              <span className="mt-2 text-[10px] font-medium tracking-wider uppercase opacity-60">Processing</span>
            </div>
          )}

          {/* Image */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Generated Result"
              className={`h-full w-full object-cover transition-all duration-700 ease-out ${
                isLoaded ? "scale-100 opacity-100 blur-0" : "scale-110 opacity-0 blur-lg"
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
      <div className="mt-1 h-1 w-[80%] rounded-full bg-orange-500/20 blur-xl" />
    </div>
  )
}

/**
 * Draws the connecting line between elements with a directional arrow.
 */
const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0.4,
  reverse = false, // Flow direction
}: {
    containerRef: React.RefObject<HTMLElement | null>,
    fromRef: React.RefObject<HTMLElement | null>,
    toRef: React.RefObject<HTMLElement | null>,
    curvature?: number,
    reverse?: boolean
}) => {
  const [pathData, setPathData] = useState({ d: "", length: 0, viewBox: "" })
  const id = React.useId()
  
  // Refs for animation loop
  const pathRef = useRef<SVGPathElement | null>(null)
  const particleRef = useRef<SVGGElement | null>(null)
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

    updatePath()
    const resizeObserver = new ResizeObserver(updatePath)
    if (containerRef.current) resizeObserver.observe(containerRef.current)
    window.addEventListener("resize", updatePath)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updatePath)
    }
  }, [containerRef, fromRef, toRef, curvature])

  // Animation Loop
  useEffect(() => {
    if (!pathData.d) return

    let startTime: number | null = null
    const duration = 2000 // ms

    const animate = (time: number) => {
      if (startTime === null) startTime = time
      const elapsed = time - startTime
      const progress = (elapsed % duration) / duration
      
      // Move arrow
      if (pathRef.current && particleRef.current) {
        const path = pathRef.current
        try {
          const totalLength = path.getTotalLength()
          const currentLen = progress * totalLength
          const point = path.getPointAtLength(currentLen)
          
          // Calculate rotation angle by looking slightly behind
          const prevLen = Math.max(0, currentLen - 2) 
          const prevPoint = path.getPointAtLength(prevLen)
          
          // Calculate angle in degrees
          const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * (180 / Math.PI)
          
          // Apply position and rotation using transform
          particleRef.current.setAttribute("transform", `translate(${point.x}, ${point.y}) rotate(${angle})`)
          
          // Fade in/out at ends
          const opacity = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1
          particleRef.current.setAttribute("opacity", String(opacity))
        } catch (e) {
            // box resize safety
        }
      }
      
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [pathData.d])

  if (!pathData.d) return null

  return (
    <svg
      viewBox={pathData.viewBox}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      style={{ overflow: "visible" }}
    >
      {/* Background Track */}
      <path d={pathData.d} fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
      
      {/* Animated Gradient Path */}
      <path
        ref={pathRef}
        d={pathData.d}
        fill="none"
        stroke={`url(#gradient-${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        className="opacity-60"
      />
      
      {/* Glowing Arrow Group */}
      <g ref={particleRef} className="drop-shadow-[0_0_10px_#FF8D00]">
        {/* Chevron pointing right (0 degrees) */}
        <path d="M-4,-4 L2,0 L-4,4" fill="none" stroke="#FF8D00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Small dot in center */}
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

// --- Main Feature Component ---

export default function RecreateThumbnailFeature() {
  const imageUrl = "/images/thumbnailgpt-thumbnail3.webp"

  // Refs for Beam Animation
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative w-full flex items-center justify-center py-20 bg-transparent">
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex justify-center">
        
        {/* New Style Wrapper */}
        <div className="snap-center inline-block xl:pe-0 xl:ps-0">
          <div 
            ref={containerRef}
            className="relative bg-neutral-900/90 shadow-2xl outline outline-[6px] outline-black/10 aspect-square w-[340px] sm:w-[410px] rounded-3xl overflow-hidden mx-2.5 xl:mx-0 backdrop-blur-md flex flex-col"
          >
              {/* Adjusted padding: Reduced top (pt-2) and Increased bottom (pb-6) to shift content "upper" */}
              <div className="relative pt-2 px-3 pb-6 sm:pt-3 sm:px-5 sm:pb-8 z-10 flex flex-col h-full w-full gap-1 justify-between">
                  
                  {/* 1. Input Section (Top) */}
                  <div className="relative z-20 flex flex-col gap-1 shrink-0">
                      <div className="flex items-center justify-between text-[10px] sm:text-xs font-medium uppercase tracking-wider text-neutral-500">
                          <span>Original</span>
                      </div>
                      
                      {/* Reduced width to 40% (mobile) / 45% (desktop) to ensure result fits */}
                      <div ref={inputRef} className="w-[40%] sm:w-[45%] mx-auto">
                          <YouTubeCardPreview />
                      </div>
                  </div>

                  {/* 2. Middle Connector (Beam Space) */}
                  <div className="relative grow flex items-center justify-center min-h-[4px]">
                      {/* Spacer for beam visualization */}
                  </div>

                  {/* 3. Output Section (Bottom) */}
                  <div className="relative z-20 flex flex-col gap-1 shrink-0">
                          <div className="flex items-center justify-between text-[10px] sm:text-xs font-medium uppercase tracking-wider text-neutral-500">
                          <span>Result</span>
                      </div>
                      
                      {/* Image container remains full width */}
                      <div ref={outputRef} className="w-full">
                          <ThumbnailPreview imageUrl={imageUrl} />
                      </div>
                  </div>

                  {/* Beam Layer */}
                  <AnimatedBeam 
                      containerRef={containerRef}
                      fromRef={inputRef}
                      toRef={outputRef}
                      curvature={0.2} 
                  />
              </div>
          </div>
        </div>

      </div>
    </section>
  )
}
