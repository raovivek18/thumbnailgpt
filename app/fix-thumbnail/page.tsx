import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
    title: "Fix My Thumbnail AI Tool | Boost YouTube CTR",
    description: "Upload your thumbnail and let AI fix layout, colors, text, and composition for better performance.",
    alternates: {
        canonical: "https://thumbnailgpt.com/fix-thumbnail",
    },
}

export default function Page() {
    return <LandingPage />
}
