"use client"

import React, { useRef, useEffect, useState } from "react"
import {
  X, TrendingUp, Eye, Sparkles, Heart, Contrast,
  Target, ChevronRight, ChevronDown
} from 'lucide-react'

// ==========================================
// THUMBNAIL REPORT UTILITIES & SUB-COMPONENTS
// ==========================================

const THEME_ORANGE = '#FF8D00'

const normalizeScore = (score: number) => {
  return score <= 10 ? Math.round(score * 10) : score
}

const getGradientId = (score: number) => {
  if (score < 60) return "gradient-red"
  if (score < 85) return "gradient-yellow"
  return "gradient-green"
}

const getBarColor = (score: number) => {
  if (score >= 85) return 'bg-emerald-400'
  if (score >= 60) return 'bg-amber-400'
  return 'bg-red-500'
}

interface ScoreRingProps {
  score: number;
}

const ScoreRing = ({ score }: ScoreRingProps) => {
  const normalizedScore = normalizeScore(score)
  const [mounted, setMounted] = useState(false)
  const circumference = 75.39 // 2 * PI * r (r=12)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center z-30">
      <div className="relative w-9 h-9 rounded-full bg-black/90 border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <svg className="w-full h-full -rotate-90" viewBox="0 1 32 32">
          <defs>
            <linearGradient id="gradient-red" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f87171" />
            </linearGradient>
            <linearGradient id="gradient-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="12" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" fill="transparent" />
          <circle
            cx="16"
            cy="16"
            r="12"
            stroke={`url(#${getGradientId(normalizedScore)})`}
            strokeWidth="2.5"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={mounted ? circumference - (normalizedScore / 100) * circumference : circumference}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-[10px] font-bold text-white tracking-widest">{normalizedScore}</span>
      </div>
    </div>
  )
}

interface ScoreBarsProps {
  score: number;
}

const ScoreBars = ({ score }: ScoreBarsProps) => {
  const normalizedScore = normalizeScore(score)
  return (
    <div className="flex gap-[1px]">
      {Array.from({ length: 10 }).map((_, i) => {
        const barValue = (i + 1) * 10
        const isActive = normalizedScore >= barValue
        const isPartial = !isActive && normalizedScore > (barValue - 10)
        let barColor = "bg-white/10"
        if (isActive || isPartial) barColor = getBarColor(normalizedScore)
        return (
          <div
            key={i}
            className={`w-[2px] h-2 rounded-[0.5px] ${barColor} ${isActive ? 'opacity-100' : isPartial ? 'opacity-50' : 'opacity-100'}`}
          />
        )
      })}
    </div>
  )
}

const factorIcons = {
  virality: TrendingUp,
  clarity: Eye,
  curiosity: Sparkles,
  emotion: Heart,
  contrast: Contrast,
  focus: Target,
}

const factorLabels: Record<string, string> = {
  virality: 'Viral',
  clarity: 'Clear',
  curiosity: 'Hook',
  emotion: 'Mood',
  contrast: 'Pop',
  focus: 'Focus',
}

// ==========================================
// CORE REPORT COMPONENT
// ==========================================

interface Factor {
  score: number;
  reason: string;
}

interface ThumbnailReportProps {
  thumbnailUrl: string;
  overallScore: number;
  factors: Record<string, Factor>;
  fixPrompt: string;
  onClose: () => void;
  onFixThumbnail?: (url: string, prompt: string) => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const ThumbnailReport = ({
  thumbnailUrl,
  overallScore,
  factors,
  fixPrompt,
  onClose,
  onFixThumbnail,
  buttonRef,
}: ThumbnailReportProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleFixThumbnail = () => {
    if (onFixThumbnail) {
      onFixThumbnail(thumbnailUrl, fixPrompt)
    }
  }

  return (
    <div
      className="relative w-full max-w-[240px] h-[280px] flex flex-col overflow-hidden transition-all duration-300 z-20 shrink-0 group/card"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(255,255,255,0.2); }

        .btn-generate {
          --clr-font-main: hsla(0 0% 20% / 100);
          --btn-bg-1: hsla(25 95% 53% / 1);
          --btn-bg-2: hsla(16 100% 50% / 1);
          --btn-bg-color: hsla(360 100% 100% / 1);
          --radii: 9999px;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 600;
          transition: 0.5s;
          background-size: 280% auto;
          background-image: linear-gradient(
            325deg,
            var(--btn-bg-2) 0%,
            var(--btn-bg-1) 55%,
            var(--btn-bg-2) 90%
          );
          border: none;
          border-radius: var(--radii);
          color: var(--btn-bg-color);
          box-shadow:
            0px 0px 20px rgba(255, 165, 0, 0.4),
            0px 5px 5px -1px rgba(255, 140, 0, 0.2),
            inset 2px 2px 4px rgba(255, 200, 150, 0.3),
            inset -2px -2px 4px rgba(200, 100, 0, 0.2);
          outline: none;
        }
        .btn-generate:hover {
          background-position: right top;
        }
        .btn-generate:is(:focus, :focus-visible, :active) {
          outline: none;
          box-shadow:
            0px 0px 20px rgba(255, 165, 0, 0.4),
            0px 5px 5px -1px rgba(255, 140, 0, 0.2);
        }
        .btn-generate:active {
          transform: scale(0.96);
          transition: 0.1s;
        }
        @media (prefers-reduced-motion: reduce) {
          .btn-generate {
            transition: linear;
          }
        }
      `}</style>

      {/* Header - Secondary Label is Orange */}
      <div className="flex-shrink-0 px-3 pt-3 pb-1 bg-transparent z-20 flex items-center justify-between">
        <span className="text-[8px] uppercase tracking-widest text-[#FF8D00] font-bold">Analysis</span>
      </div>

      {/* Mini Thumbnail Area */}
      <div className="flex-shrink-0 px-3 pt-2 pb-5 z-10">
        <div className="relative w-full aspect-video">
          <div className="absolute inset-0 rounded-md overflow-hidden border border-white/10">
            <img src={thumbnailUrl} className="w-full h-full object-cover transition-opacity" alt="Analysis preview" />
          </div>
          <ScoreRing score={overallScore} />
        </div>
      </div>

      {/* Factors List */}
      <div className="flex-1 overflow-y-auto px-3 pb-12 pt-1 custom-scrollbar">
        <div className="space-y-0.5">
          {Object.entries(factors).map(([key, factor]) => {
            const isExpanded = expandedId === key
            // @ts-ignore
            const Icon = factorIcons[key]
            return (
              <div key={key} className="flex flex-col border-b last:border-0 border-white/5">
                <div
                  className="flex items-center justify-between py-1.5 cursor-pointer hover:bg-white/5 px-1 rounded transition-colors"
                  onClick={() => toggleExpand(key)}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon size={10} className={isExpanded ? 'text-[#FF8D00]' : 'text-[#FF8D00]/70'} />
                    <span className="text-[10px] font-bold text-[#FF8D00] truncate">{factorLabels[key]}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ScoreBars score={factor.score} />
                    <ChevronRight size={10} className={`text-white/20 transition-transform ${isExpanded ? 'rotate-90 text-[#FF8D00]' : ''}`} />
                  </div>
                </div>
                {isExpanded && (
                  <div className="pl-4 pb-1.5 text-[9px] text-white font-medium leading-tight opacity-90">
                    {factor.reason}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Button */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/60 via-black/40 to-transparent z-20">
        <button
          ref={buttonRef}
          onClick={handleFixThumbnail}
          onMouseUp={(e) => e.currentTarget.blur()}
          onMouseLeave={(e) => e.currentTarget.blur()}
          className="btn-generate rounded-full flex items-center justify-center gap-2 px-3 py-1.5 w-full"
          title="Generate thumbnail"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          <span className="text-white">Fix Thumbnail</span>
        </button>
      </div>
    </div>
  )
}

// ==========================================
// RESULT & BEAM COMPONENTS
// ==========================================

interface ThumbnailPreviewOutputProps {
  imageUrl: string;
  outputRef: React.RefObject<HTMLDivElement | null>;
}

const ThumbnailPreviewOutput = ({ imageUrl, outputRef }: ThumbnailPreviewOutputProps) => (
  <div className="w-[280px] flex flex-col items-center shrink-0">
    <div
      ref={outputRef}
      className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02]"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/80">
        <img src={imageUrl} alt="Result" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" />
      </div>
    </div>
    <div className="mt-1 h-1 w-[60%] rounded-full bg-orange-500/20 blur-xl" />
  </div>
)

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
}

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
}: AnimatedBeamProps) => {
  const [pathData, setPathData] = useState({ d: "", viewBox: "" })
  const [opacity, setOpacity] = useState(0)
  const id = React.useId()

  const pathRef = useRef<SVGPathElement>(null)
  const particleRef = useRef<SVGGElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return

      const cRect = containerRef.current.getBoundingClientRect()
      const fRect = fromRef.current.getBoundingClientRect()
      const tRect = toRef.current.getBoundingClientRect()

      // Detection for vertical/stacked layout
      const isVertical = tRect.top > fRect.bottom;
      const r = 16;

      let d = "";
      if (!isVertical) {
        // Desktop: Smoothed L-shape Horizontal logic
        const sx = fRect.right - cRect.left
        const sy = fRect.top - cRect.top + fRect.height / 2
        const ex = tRect.left - cRect.left
        const ey = tRect.top - cRect.top + tRect.height / 2

        const midX = sx + (ex - sx) * 0.5;
        const vDir = ey > sy ? 1 : -1;

        d = `
          M ${sx},${sy} 
          L ${midX - r},${sy} 
          Q ${midX},${sy} ${midX},${sy + r * vDir} 
          L ${midX},${ey - r * vDir} 
          Q ${midX},${ey} ${midX + r},${ey} 
          L ${ex},${ey}
        `.trim();
      } else {
        // Mobile: Simple straight down vertical line logic
        const sx = fRect.left - cRect.left + fRect.width / 2
        const sy = fRect.bottom - cRect.top
        const ex = tRect.left - cRect.left + tRect.width / 2
        const ey = tRect.top - cRect.top

        d = `M ${sx},${sy} L ${ex},${ey}`;
      }

      setPathData({
        d,
        viewBox: `0 0 ${cRect.width} ${cRect.height}`,
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
  }, [containerRef, fromRef, toRef])

  useEffect(() => {
    if (pathData.d) {
      const timer = setTimeout(() => setOpacity(1), 100)
      return () => clearTimeout(timer)
    }
  }, [pathData.d])

  useEffect(() => {
    if (!pathData.d) return

    let startTime: number | undefined
    const duration = 2400

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
      <defs>
        <linearGradient id={`gradient-${id}`} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF8D00" stopOpacity="0" />
          <stop offset="50%" stopColor="#FF8D00" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={pathData.d} fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        ref={pathRef}
        d={pathData.d}
        fill="none"
        stroke={`url(#gradient-${id})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-40"
      />
      <g ref={particleRef}>
        <path
          d="M -3 -3 L 3 0 L -3 3"
          fill="none"
          stroke={THEME_ORANGE}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_#FF8D00]"
        />
      </g>
    </svg>
  )
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const outputCardRef = useRef<HTMLDivElement>(null)

  const mockData = {
    thumbnailUrl: "/analyze-thumbnail/thumbnailgpt-analyzed-thumbnail.webp",
    overallScore: 55,
    factors: {
      virality: { score: 4, reason: "Composition is standard; lacks a strong unique hook." },
      clarity: { score: 6, reason: "Text is readable but could benefit from more contrast." },
      curiosity: { score: 5, reason: "Expected tropes used, but delivery is predictable." },
      emotion: { score: 4, reason: "Facial expressions are neutral; need more intensity." },
      contrast: { score: 5, reason: "Subject blends slightly with the background elements." },
      focus: { score: 6, reason: "The main subject is centered but lighting is flat." },
    }
  }

  return (
    <div className="w-full relative flex items-center justify-center overflow-hidden font-sans p-4 sm:p-6 bg-orange-flow">
      <div className="w-full max-w-[1250px] relative z-10 flex flex-col items-center py-4 md:py-8">

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-12 sm:mb-20 tracking-tight max-w-4xl leading-[1.1]">
          Enhance Thumbnails With <span className="text-[#FF8D00]">Sketch</span>, <span className="text-[#FF8D00]">Title</span>, and <span className="text-[#FF8D00]">Upscaling</span> Tools
        </h2>

        <div
          ref={containerRef}
          className="relative bg-neutral-900/80 shadow-2xl outline outline-[6px] outline-white/5 w-[340px] sm:w-[410px] md:w-full md:max-w-[1250px] min-h-[400px] rounded-[24px] overflow-hidden backdrop-blur-md flex flex-col md:flex-row items-center justify-center p-8 sm:p-10 md:p-8 gap-12 sm:gap-16 md:gap-20 mx-auto"
        >
          <ThumbnailReport
            {...mockData}
            fixPrompt="Enhance facial contrast."
            onClose={() => { }}
            onFixThumbnail={async () => {
              console.log("Fix Thumbnail Action Clicked");
            }}
            buttonRef={buttonRef}
          />

          <div className="flex flex-col items-center z-10 shrink-0">
            <div className="w-[280px]">
              <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-wider text-[#FF8D00] mb-2">
                <span>Optimized Result</span>
              </div>
              <ThumbnailPreviewOutput
                imageUrl="/analyze-thumbnail/thumbnailgpt-fixed-thumbnail.webp"
                outputRef={outputCardRef}
              />
            </div>
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={buttonRef}
            toRef={outputCardRef}
          />
        </div>
      </div>
    </div>
  )
}