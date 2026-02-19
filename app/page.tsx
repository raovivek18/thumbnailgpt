import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thumbnailgpt.com/",
  },
}

export default function Home() {
  return <LandingPage />
}
