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
