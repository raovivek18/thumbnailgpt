import type { Metadata } from "next"
import Link from "next/link"
import { Mail, Github, Instagram, Twitter, Zap, Lock, Palette, Sparkles } from "lucide-react"
import ThumbnailGPTHeader from "@/components/thumbnail-gpt-header"
import Footer from "@/components/footer"
import { MainWithPadding } from "@/components/main-with-padding"

export const metadata: Metadata = {
  title: "About | ThumbnailGPT",
  description: "Learn about ThumbnailGPT - AI-powered thumbnail generation tool for creators.",
  alternates: {
    canonical: "https://thumbnailgpt.com/about",
  },
}

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour

export default function AboutPage() {
  return (
    <>
      <ThumbnailGPTHeader />
      <MainWithPadding>
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-[#FF8D00]/10 border border-[#FF8D00]/20 text-[#FF8D00] text-sm font-medium">
                About Us
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              Empowering Creators with AI
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              ThumbnailGPT is an AI-powered platform that transforms the way creators design thumbnails. Fast,
              intuitive, and privacy-focused.
            </p>
          </div>

          {/* Features Grid */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What We Offer</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative bg-gradient-to-b from-[#FF8D00]/5 to-transparent border border-[#FF8D00]/20 rounded-2xl p-8 hover:border-[#FF8D00]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF8D00]/0 to-[#FF8D00]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#FF8D00]/10 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-[#FF8D00]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Text to Thumbnail</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Transform your ideas into stunning thumbnails using AI. Simply describe what you want, and watch it
                    come to life.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative bg-gradient-to-b from-[#FF8D00]/5 to-transparent border border-[#FF8D00]/20 rounded-2xl p-8 hover:border-[#FF8D00]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF8D00]/0 to-[#FF8D00]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#FF8D00]/10 flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-[#FF8D00]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Image to Thumbnail</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Upload up to 5 images and let AI create professional thumbnails. Perfect for batch processing.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative bg-gradient-to-b from-[#FF8D00]/5 to-transparent border border-[#FF8D00]/20 rounded-2xl p-8 hover:border-[#FF8D00]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF8D00]/0 to-[#FF8D00]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#FF8D00]/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-[#FF8D00]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Recreate Thumbnail</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Upload existing thumbnails or YouTube links to recreate similar designs with your personal touch.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-20">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#FF8D00]/10 via-transparent to-transparent border border-[#FF8D00]/20 rounded-3xl p-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8D00]/5 rounded-full blur-3xl" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Mission</h2>
                <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto text-center leading-relaxed">
                  We believe every creator deserves access to professional-grade design tools. Our mission is to
                  democratize thumbnail creation with AI-powered technology.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div className="flex flex-col items-center gap-3 p-4">
                    <div className="w-14 h-14 rounded-xl bg-[#FF8D00]/10 flex items-center justify-center">
                      <Zap className="w-7 h-7 text-[#FF8D00]" />
                    </div>
                    <span className="text-gray-300 font-medium">Lightning Fast</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4">
                    <div className="w-14 h-14 rounded-xl bg-[#FF8D00]/10 flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-[#FF8D00]" />
                    </div>
                    <span className="text-gray-300 font-medium">High Quality</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4">
                    <div className="w-14 h-14 rounded-xl bg-[#FF8D00]/10 flex items-center justify-center">
                      <Palette className="w-7 h-7 text-[#FF8D00]" />
                    </div>
                    <span className="text-gray-300 font-medium">Easy to Use</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4">
                    <div className="w-14 h-14 rounded-xl bg-[#FF8D00]/10 flex items-center justify-center">
                      <Lock className="w-7 h-7 text-[#FF8D00]" />
                    </div>
                    <span className="text-gray-300 font-medium">Private & Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Developer Section */}
          <section className="mb-12">
            <div className="text-center bg-gradient-to-b from-[#FF8D00]/5 to-transparent border border-[#FF8D00]/20 rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Meet the Developer</h2>
              <p className="text-2xl text-[#FF8D00] font-semibold mb-8">Vivek Rao</p>

              <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
                <Link
                  href="https://github.com/raovivek18"
                  target="_blank"
                  className="group inline-flex items-center gap-3 px-6 py-3 border border-[#FF8D00]/30 rounded-xl hover:border-[#FF8D00] hover:bg-[#FF8D00]/10 transition-all"
                >
                  <Github className="w-5 h-5 text-[#FF8D00] group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">GitHub</span>
                </Link>

                <Link
                  href="https://instagram.com/vivekrao.18"
                  target="_blank"
                  className="group inline-flex items-center gap-3 px-6 py-3 border border-[#FF8D00]/30 rounded-xl hover:border-[#FF8D00] hover:bg-[#FF8D00]/10 transition-all"
                >
                  <Instagram className="w-5 h-5 text-[#FF8D00] group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">Instagram</span>
                </Link>

                <Link
                  href="https://x.com/vivekrao_18"
                  target="_blank"
                  className="group inline-flex items-center gap-3 px-6 py-3 border border-[#FF8D00]/30 rounded-xl hover:border-[#FF8D00] hover:bg-[#FF8D00]/10 transition-all"
                >
                  <Twitter className="w-5 h-5 text-[#FF8D00] group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">X (Twitter)</span>
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-6 py-3 border border-[#FF8D00]/30 rounded-xl hover:border-[#FF8D00] hover:bg-[#FF8D00]/10 transition-all"
                >
                  <Mail className="w-5 h-5 text-[#FF8D00] group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">Contact</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </MainWithPadding>
      <Footer />
    </>
  )
}
