import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
    title: "Image to Thumbnail AI Generator | ThumbnailGPT",
    description: "Turn any image into a high-converting YouTube thumbnail instantly. AI-powered layout, text, and composition optimization for creators.",
    alternates: {
        canonical: "https://thumbnailgpt.com/image-to-thumbnail",
    },
}

export default function Page() {
    return <LandingPage />
}
