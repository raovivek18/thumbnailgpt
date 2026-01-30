import type { Metadata } from "next"
import { ThumbnailGPTHeader } from "@/components/thumbnail-gpt-header"
import HeroSection from "@/components/hero-section"
import { ClientsSection } from "@/components/clients-section"
import { TextToThumbnailFeature } from "@/components/text-to-thumbnail-feature"
import { ImageToThumbnailFeature } from "@/components/image-to-thumbnail-feature"
import { RecreateThumbnailFeature } from "@/components/recreate-thumbnail-feature"
import { Pricing } from "@/components/pricing"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { PageContent } from "@/components/page-content"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thumbnailgpt.com/",
  },
}

export default function Home() {
  return (
    <main className="dark bg-black overflow-x-hidden min-w-0 w-full max-w-full">
      <ThumbnailGPTHeader />
      <HeroSection />
      <PageContent className="max-w-full overflow-x-hidden">
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
      </PageContent>
    </main>
  )
}
