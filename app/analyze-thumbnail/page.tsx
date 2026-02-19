import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
    title: "AI Thumbnail Analyzer | Improve Click-Through Rate",
    description: "Analyze your YouTube thumbnail using AI. Get instant feedback, CTR predictions, and improvement suggestions.",
    alternates: {
        canonical: "https://thumbnailgpt.com/analyze-thumbnail",
    },
}

export default function Page() {
    return <LandingPage />
}
