import type { Metadata } from "next"
import ThumbnailGPTHeader from "@/components/thumbnail-gpt-header"
import Footer from "@/components/footer"
import ContactForm from "./contact-form"
import { MainWithPadding } from "@/components/main-with-padding"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thumbnailgpt.com/contact",
  },
}

export default function ContactPage() {
  return (
    <>
      <ThumbnailGPTHeader />
      <MainWithPadding>
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-[#FF8D00]/10 border border-[#FF8D00]/20 text-[#FF8D00] text-sm font-medium">
                Contact Us
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Have questions or need support? We're here to help. Send us a message and we'll respond as soon as
              possible.
            </p>
          </div>

          <ContactForm />
        </div>
      </MainWithPadding>
      <Footer />
    </>
  )
}
