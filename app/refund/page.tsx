import type { Metadata } from "next"
import ThumbnailGPTHeader from "@/components/thumbnail-gpt-header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Refund Policy | ThumbnailGPT",
  description: "Learn about ThumbnailGPT's refund policy and eligibility criteria.",
  alternates: {
    canonical: "https://thumbnailgpt.com/refund",
  },
}

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour

export default function RefundPage() {
  return (
    <>
      <ThumbnailGPTHeader />
      <main className="min-h-screen bg-black text-white pt-24">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 mt-8">
            Refund <span className="text-[#FF8D00]">Policy</span>
          </h1>
          <p className="text-gray-400 mb-8">Last Updated: January 2025</p>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              Thank you for using ThumbnailGPT. Our platform works on a credit-based system, and all purchases are made
              through our secure payment provider, Dodo Payment Gateway (powered). Please read the refund terms
              carefully.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Credit Purchases</h2>
              <p className="mb-2">When you buy credits on ThumbnailGPT:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Payments are processed securely by Dodo Payment Gateway.</li>
                <li>We do not store any of your payment details.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. Refund Eligibility</h2>
              <p className="mb-2">Refunds are only possible if:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>The purchased credits are 100% unused, and</li>
                <li>The refund request is made within 7 days of purchase.</li>
              </ul>
              <p className="mt-3">If these conditions are met, we can review and process the refund.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Non-Refundable Conditions</h2>
              <p className="mb-2 font-semibold text-white">A refund will NOT be provided if:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Any credit has been used (even 1 credit).</li>
                <li>The user tries to generate adult/NSFW content and gets banned.</li>
                <li>The user violates our Terms & Conditions.</li>
                <li>The user is unhappy with AI output (as results vary based on prompts).</li>
                <li>The user expected a specific design style or accuracy.</li>
              </ul>
              <p className="mt-3 italic">Once credits are used, the service is considered delivered.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Processing Time</h2>
              <p>For eligible cases, refund processing may take 5-7 business days after approval.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. How to Request a Refund</h2>
              <p className="mb-2">
                Email us at: <span className="text-[#FF8D00]">support@thumbnailgpt.com</span>
              </p>
              <p className="mb-2">
                Use the subject line: <span className="font-semibold text-white">"Refund Request - ThumbnailGPT"</span>
              </p>
              <p className="mb-2">Include:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Your account email</li>
                <li>Purchase details</li>
                <li>Reason for refund request</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Contact</h2>
              <p>
                If you have billing or refund concerns, reach out anytime:{" "}
                <span className="text-[#FF8D00]">support@thumbnailgpt.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
