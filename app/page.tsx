"use client"

import { ThumbnailGPTHeader } from "@/components/thumbnail-gpt-header"
import { LaserFlowSection } from "@/components/laser-flow-section"
import { ClientsSection } from "@/components/clients-section"
import { TextToThumbnailFeature } from "@/components/text-to-thumbnail-feature"
import { ImageToThumbnailFeature } from "@/components/image-to-thumbnail-feature"
import { RecreateThumbnailFeature } from "@/components/recreate-thumbnail-feature"
import { Pricing } from "@/components/pricing"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="dark bg-black overflow-x-hidden min-w-0 w-full max-w-full">
      <ThumbnailGPTHeader />
      <div className="pt-[88px] max-w-full overflow-x-hidden">
        <LaserFlowSection />
        <ClientsSection />

        <div id="features" className="scroll-mt-24">
          <TextToThumbnailFeature />
          <ImageToThumbnailFeature />
          <RecreateThumbnailFeature />
        </div>

        <div id="pricing" className="scroll-mt-24">
          <Pricing />
        </div>

        <FaqSection />
        <CtaSection />
        <Footer />
      </div>
    </main>
  )
}
