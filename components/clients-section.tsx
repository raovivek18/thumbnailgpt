"use client"

import { cn } from "@/lib/utils"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { logos } from "@/lib/logos"

export function ClientsSection() {
  return (
    <div className="w-full max-w-full overflow-x-hidden py-12 md:py-16 lg:py-20">
      <div
        aria-hidden="true"
        className={cn(
          "-z-10 -top-1/2 -translate-x-1/2 pointer-events-none absolute left-1/2 h-[120vmin] w-[120vmin] rounded-b-full",
          "bg-[radial-gradient(ellipse_at_center,rgb(255_141_0/.1),transparent_50%)]",
          "blur-[30px]",
        )}
      />

      <section className="relative mx-auto max-w-3xl px-4">
        <div className="mb-6 flex items-center justify-center w-full">
          <a href="https://www.producthunt.com/products/thumbnailgpt-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-thumbnailgpt&#0045;2" target="_blank" rel="noopener noreferrer">
            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1046501&theme=dark&t=1765437298280" alt="ThumbnailGPT - AI&#0032;YouTube&#0032;Thumbnail&#0032;Generator&#0032;for&#0032;Viral&#0032;Videos | Product Hunt" style={{ width: "200px", height: "43px" }} width="200" height="43" />
          </a>
        </div>
        <h2 className="mb-5 text-center font-medium text-white text-xl tracking-tight md:text-3xl">
          <span className="text-gray-400">Trusted by creators.</span>
          <br />
          <span className="font-semibold">Used Across Platform.</span>
        </h2>
        <div className="mx-auto mb-12 h-px max-w-sm bg-[#FF8D00]/20 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

        <LogoCloud logos={logos} />

        <div className="mt-12 h-px bg-[#FF8D00]/20 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </section>
    </div>
  )
}
