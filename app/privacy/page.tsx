import type { Metadata } from "next"
import ThumbnailGPTHeader from "@/components/thumbnail-gpt-header"
import Footer from "@/components/footer"
import { MainWithPadding } from "@/components/main-with-padding"

export const metadata: Metadata = {
  title: "Privacy Policy | ThumbnailGPT",
  description: "Learn how ThumbnailGPT collects, uses, and protects your personal information.",
  alternates: {
    canonical: "https://thumbnailgpt.com/privacy",
  },
}

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour

export default function PrivacyPage() {
  return (
    <>
      <ThumbnailGPTHeader />
      <MainWithPadding>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 mt-8">
            Privacy <span className="text-[#FF8D00]">Policy</span>
          </h1>
          <p className="text-gray-400 mb-6">Last Updated: 01 February 2026</p>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              ThumbnailGPT ("we", "our", "us") respects your privacy and is committed to protecting your data. This Privacy Policy explains what information we collect, how we use it, and how we keep it safe.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-[#FF8D00] mb-2">1.1 Account Information</h3>
              <p className="mb-3">We use Google Login for authentication. When you sign in, we collect:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                <li>Name</li>
                <li>Email address</li>
                <li>Profile picture</li>
              </ul>
              <p className="mb-4">This information is required to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
                <li>Create and manage your account</li>
                <li>Associate subscriptions and credits</li>
                <li>Provide customer support</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#FF8D00] mb-2">1.2 Payment Information</h3>
              <p className="mb-2">All payments are handled securely by Dodo Payments.</p>
              <p className="mb-2">We do not store your card or payment details.</p>
              <p className="mb-2">We may store:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
                <li>Subscription ID</li>
                <li>Plan name</li>
                <li>Billing status</li>
                <li>Invoice URL</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#FF8D00] mb-2">1.3 Uploaded Content</h3>
              <p className="mb-2">When using our AI tools, you may upload images or text.</p>
              <p className="mb-2 font-semibold text-white">Important:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
                <li>Uploaded images are processed temporarily and deleted automatically after generation.</li>
                <li>We do not permanently store your uploaded images.</li>
                <li>Only final generated thumbnails are stored for your access and history.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#FF8D00] mb-2">1.4 Generated Content & Usage Data</h3>
              <p className="mb-2">We store:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-2">
                <li>Generated thumbnail URLs</li>
                <li>Prompt text</li>
                <li>Feature used</li>
                <li>Credit usage</li>
                <li>Timestamp of generation</li>
              </ul>
              <p className="mb-2">This data is required for:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Credit tracking</li>
                <li>User history</li>
                <li>Platform analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. How We Use Your Data</h2>
              <p className="mb-2">We use your data to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide AI thumbnail generation services</li>
                <li>Manage subscriptions and credits</li>
                <li>Improve platform performance</li>
                <li>Prevent fraud and abuse</li>
                <li>Provide support</li>
              </ul>
              <p className="mt-3 font-semibold text-white">We do not sell or share your personal data with third parties for marketing.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Credit System</h2>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>ThumbnailGPT operates on a subscription-based credit system.</li>
                <li>Credits are added monthly based on your active plan.</li>
                <li>Credits roll over while your subscription remains active.</li>
                <li>Credits do not expire unless your subscription ends.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Data Security</h2>
              <p className="mb-2">We use:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Secure authentication</li>
                <li>Encrypted connections</li>
                <li>Restricted database access</li>
              </ul>
              <p className="mt-3">While we take strong precautions, no system is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Account Termination</h2>
              <p className="mb-2">If your account is terminated:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Active subscriptions are canceled</li>
                <li>Remaining credits are forfeited</li>
                <li>Stored generated content may be deleted</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Policy Updates</h2>
              <p>
                We may update this Privacy Policy from time to time.
              </p>
              <p className="mt-2">
                Continued use of ThumbnailGPT means acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Contact</h2>
              <p>
                📧 <span className="text-[#FF8D00]">support@thumbnailgpt.com</span>
              </p>
            </section>
          </div>
        </div>
      </MainWithPadding>
      <Footer />
    </>
  )
}
