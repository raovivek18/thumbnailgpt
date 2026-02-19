import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
    title: "Text to Thumbnail Generator | Create Thumbnails from Text",
    description: "Generate viral YouTube thumbnails from simple text prompts. No design skills required. AI-powered for maximum CTR.",
    alternates: {
        canonical: "https://thumbnailgpt.com/text-to-thumbnail",
    },
}

export default function Page() {
    return <LandingPage />
}
