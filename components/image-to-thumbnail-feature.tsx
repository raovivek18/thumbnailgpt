"use client"

import React, { useRef, useEffect, useState } from "react"

// --- Inlined Component: ImageReveal ---
const ImageReveal = ({
  leftImage,
  leftMiddleImage,
  middleImage,
  rightMiddleImage,
  rightImage,
  containerRef // Receiving ref to attach beam directly to this container
}) => {
  // Scaled up size (w-14/16 instead of w-12/14)
  const imageSize = "w-14 h-14 sm:w-16 sm:h-16" 
  
  const cards = [
    { 
      src: leftImage, 
      rotate: -10, 
      x: -60, // Increased spread slightly for larger cards
      y: 4, 
      z: 50, 
      origin: "origin-bottom-right" 
    },
    { 
      src: leftMiddleImage, 
      rotate: -5, 
      x: -30, 
      y: 2, 
      z: 40, 
      origin: "origin-bottom" 
    },
    { 
      src: middleImage, 
      rotate: 2, 
      x: 0, 
      y: 0, 
      z: 30, 
      origin: "origin-bottom" 
    },
    { 
      src: rightMiddleImage, 
      rotate: 5, 
      x: 30, 
      y: 2, 
      z: 20, 
      origin: "origin-bottom" 
    },
    { 
      src: rightImage, 
      rotate: 10, 
      x: 60, 
      y: 4, 
      z: 10, 
      origin: "origin-bottom-left" 
    },
  ]

  return (
    // Attached ref here for precise beam connection
    // Matched height (h-14/16) to cards so bounding box bottom is flush with images
    <div ref={containerRef} className="relative flex items-center justify-center w-full h-14 sm:h-16 mt-2 mb-1">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`absolute ${imageSize} ${card.origin} transition-all duration-500 ease-out hover:z-50`}
          style={{
            zIndex: card.z,
            transform: `rotate(${card.rotate}deg) translate(${card.x}px, ${card.y}px)`,
          }}
        >
          {/* Added glassmorphic stroke: border-white/20, ring-1 ring-white/5, and inset shadow highlight */}
          <div className="relative w-full h-full overflow-hidden rounded-lg bg-neutral-900/90 backdrop-blur-sm border border-white/20 ring-1 ring-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-110 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,141,0,0.4)]">
            <img
              src={card.src || "/placeholder.svg"}
              alt="Thumbnail element"
              className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// --- Helper Components ---

/**
 * Renders the generated image with a sleek reveal animation and glass frame.
 */
const ThumbnailPreview = ({ imageUrl, className = "" }) => {
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
              className={`h-full w-full object-cover transition-all duration-700 ease-out ${
                isLoaded ? "scale-100 opacity-100 blur-0" : "scale-110 opacity-0 blur-lg"
              }`}
              onError={(e) => {
                const target = e.target
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
}) => {
  const [pathData, setPathData] = useState({ d: "", length: 0, viewBox: "" })
  const id = React.useId()
  
  // Refs for animation loop
  const pathRef = useRef(null)
  const particleRef = useRef(null)
  const rafRef = useRef(null)

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

    let startTime = null
    const duration = 2000 // ms

    const animate = (time) => {
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

export default function ImageToThumbnailFeature() {
  const imageUrl = "/images/thumbnailgpt-famous-athletes.webp"

  // Refs for Beam Animation
  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const outputRef = useRef(null)

  return (
    <section className="relative w-full flex items-center justify-center py-20 bg-transparent">
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex justify-center">
        
        {/* New Style Wrapper */}
        <div className="snap-center inline-block xl:pe-0 xl:ps-0">
          <div 
            ref={containerRef}
            className="relative bg-neutral-900/90 shadow-2xl outline outline-[6px] outline-black/10 aspect-square w-[340px] sm:w-[410px] rounded-3xl overflow-hidden mx-2.5 xl:mx-0 backdrop-blur-md flex flex-col"
          >
              {/* Reduced padding to fit content */}
              <div className="relative p-4 z-10 flex flex-col h-full w-full gap-1.5 justify-between">
                  
                  {/* 1. Input Section (Top) */}
                  <div className="relative z-20 flex flex-col gap-1 shrink-0">
                      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-neutral-500">
                          <span>Upload Image</span>
                      </div>
                      
                      {/* Container for ImageReveal */}
                      <div className="relative w-full">
                          <div className="flex items-center justify-center w-full">
                              {/* Passing inputRef directly to ImageReveal */}
                              <ImageReveal
                                  containerRef={inputRef}
                                  leftImage="/images/athletes/ronaldo.webp"
                                  leftMiddleImage="/images/athletes/messi.webp"
                                  middleImage="/images/athletes/virat-kohli.webp"
                                  rightMiddleImage="/images/athletes/lebron-james.webp"
                                  rightImage="/images/athletes/usain-bolt.webp"
                              />
                          </div>
                      </div>
                  </div>

                  {/* 2. Middle Connector (Beam Space) */}
                  <div className="relative grow flex items-center justify-center min-h-[4px]">
                      {/* Spacer for beam visualization */}
                  </div>

                  {/* 3. Output Section (Bottom) */}
                  <div className="relative z-20 flex flex-col gap-1 shrink-0">
                          <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-neutral-500">
                          <span>Result</span>
                      </div>
                      
                      {/* Image container with ref for beam end */}
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
