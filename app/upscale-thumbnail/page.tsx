import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
    title: "Thumbnail Upscaler | 4K AI Enhancement Tool",
    description: "Upscale your thumbnail to high resolution without losing quality. Perfect for sharp, professional YouTube visuals.",
    alternates: {
        canonical: "https://thumbnailgpt.com/upscale-thumbnail",
    },
}

export default function Page() {
    return <LandingPage />
}
