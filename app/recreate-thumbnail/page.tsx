import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
    title: "Recreate Any YouTube Thumbnail with AI | ThumbnailGPT",
    description: "Upload a thumbnail and recreate it with AI improvements. Perfect for inspiration, testing, and redesigning viral formats.",
    alternates: {
        canonical: "https://thumbnailgpt.com/recreate-thumbnail",
    },
}

export default function Page() {
    return <LandingPage />
}
