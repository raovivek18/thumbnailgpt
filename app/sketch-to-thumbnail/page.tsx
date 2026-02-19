import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
    title: "Sketch to Thumbnail AI | Turn Drawings into Thumbnails",
    description: "Convert rough sketches into polished YouTube thumbnails using AI generation and design enhancement.",
    alternates: {
        canonical: "https://thumbnailgpt.com/sketch-to-thumbnail",
    },
}

export default function Page() {
    return <LandingPage />
}
