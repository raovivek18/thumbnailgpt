import { ThumbnailGPTHeader } from "@/components/thumbnail-gpt-header"
import HeroSection from "@/components/hero-section"
import ThumbnailPreview from "@/components/thumbnail-preview"
import { ClientsSection } from "@/components/clients-section"
import FeaturesCarouselSection from "@/components/features-carousel-section" // Carousel
import FeaturesCarouselSection2 from "@/components/features-carousel-section-2" // Analysis
import FeaturesCarouselSection3 from "@/components/features-carousel-section-3" // Enhancement
import { Pricing } from "@/components/pricing"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { PageContent } from "@/components/page-content"
import { DeepLinkScroll } from "@/components/deep-link-scroll"

export function LandingPage() {
    return (
        <main className="dark bg-black overflow-x-hidden min-w-0 w-full max-w-full">
            <DeepLinkScroll />
            <ThumbnailGPTHeader />
            <HeroSection />
            <ThumbnailPreview />
            <PageContent className="max-w-full overflow-x-hidden">
                <ClientsSection />

                <div id="features" className="scroll-mt-24">
                    <div id="feature-generation" className="scroll-mt-24">
                        <FeaturesCarouselSection />
                    </div>
                    <div id="feature-analysis" className="scroll-mt-24">
                        <FeaturesCarouselSection2 />
                    </div>
                    <div id="feature-enhancement" className="scroll-mt-24">
                        <FeaturesCarouselSection3 />
                    </div>
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
