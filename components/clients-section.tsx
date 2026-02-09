"use client"

import { cn } from "@/lib/utils"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { logos } from "@/lib/logos"

export function ClientsSection() {
  return (
    <div className="w-full max-w-full overflow-x-hidden py-12 md:py-16 lg:py-20">

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
