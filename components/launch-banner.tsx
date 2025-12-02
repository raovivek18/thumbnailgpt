"use client"

import { useEffect, useState } from "react"

// EXACT SAME UI AS PROVIDED HTML (Orange launch version)
export default function LaunchBanner({
  targetDate = "2025-12-25T23:59:59",
  promoText = "LAUNCH SPECIAL: 25% OFF ALL PLANS",
  promoCode = "LAUNCH25",
  ctaHref = "https://app.thumbnailgpt.com",
}) {
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", mins: "00", secs: "00" })

  useEffect(() => {
    const target = new Date(targetDate)

    function update() {
      const now = new Date()
      const diff = Math.max(0, target.getTime() - now.getTime())

      const secs = Math.floor((diff / 1000) % 60)
      const mins = Math.floor((diff / 1000 / 60) % 60)
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        mins: String(mins).padStart(2, "0"),
        secs: String(secs).padStart(2, "0"),
      })
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <button className="cursor-pointer px-2 sm:px-4 fixed z-50 font-medium top-0 gap-2 flex items-center justify-center w-full backdrop-blur-xl shadow-inner-white-sm/10 bg-[#FF8D00] text-white py-1.5 sm:py-0.5">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] xs:text-xs sm:text-sm md:text-base w-full max-w-7xl -mt-0.25">
        <span className="opacity-100 font-medium text-center leading-tight sm:leading-normal">
          <span className="hidden sm:inline">{promoText} - Use code </span>
          <span className="sm:hidden">25% OFF - Code </span>
          <span
            onClick={() => navigator.clipboard.writeText(promoCode)}
            className="underline cursor-pointer active:scale-95 font-bold"
          >
            {promoCode}
          </span>
        </span>

        <div className="hidden sm:flex items-center gap-0.5 sm:gap-1 text-white/90">
          <TimeBox label="DAY" value={timeLeft.days} />
          <Colon />
          <TimeBox label="HOU" value={timeLeft.hours} />
          <Colon />
          <TimeBox label="MIN" value={timeLeft.mins} />
          <Colon />
          <TimeBox label="SEC" value={timeLeft.secs} />
        </div>
      </div>
    </button>
  )
}

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="shadow-[inset_0_0_4px_rgba(251,44,90,.5)] bg-black/85 border-[0.5px] border-[#FF8D00]/70 rounded-md sm:rounded-lg px-1 sm:px-1.5 py-[2px] sm:py-[3.5px] flex flex-col items-center min-w-[28px] sm:min-w-[32px]">
      <span className="font-medium text-[#FF8D00] text-[10px] xs:text-xs sm:text-sm leading-none">{value}</span>
      <span className="text-[6px] xs:text-[7px] sm:text-[8px] font-normal leading-tight opacity-90 uppercase mt-0.5">
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return <span className="text-[10px] sm:text-xs opacity-90">:</span>
}
