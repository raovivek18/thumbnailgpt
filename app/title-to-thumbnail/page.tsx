import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
    title: "Title to Thumbnail Generator | Turn Video Titles into Designs",
    description: "Convert your YouTube video title into a high-performing thumbnail in seconds using AI.",
    alternates: {
        canonical: "https://thumbnailgpt.com/title-to-thumbnail",
    },
}

export default function Page() {
    return <LandingPage />
}
