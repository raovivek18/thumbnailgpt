import type { Metadata } from "next"
import ThumbnailGPTHeader from "@/components/thumbnail-gpt-header"
import Footer from "@/components/footer"
import { MainWithPadding } from "@/components/main-with-padding"

export const metadata: Metadata = {
  title: "Terms & Conditions | ThumbnailGPT",
  description: "Read the terms and conditions for using ThumbnailGPT's services.",
  alternates: {
    canonical: "https://thumbnailgpt.com/terms",
  },
}

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour

export default function TermsPage() {
  return (
    <>
      <ThumbnailGPTHeader />
      <MainWithPadding>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 mt-8">
            Terms & <span className="text-[#FF8D00]">Conditions</span>
          </h1>
          <p className="text-gray-400 mb-6">Last Updated: 01 February 2026</p>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              By using ThumbnailGPT, you agree to the following Terms of Service.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Service Overview</h2>
              <p className="mb-2">ThumbnailGPT is a paid AI-powered thumbnail generation platform.</p>
              <p className="mb-2">Supported features include:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Text to Thumbnail</li>
                <li>Image to Thumbnail</li>
                <li>Recreate Thumbnail</li>
              </ul>
              <p className="mt-2 font-semibold text-white">Access to all tools requires an active paid subscription or free trial.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. Paid-Only Access</h2>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>ThumbnailGPT offers a 1-day free trial for new users.</li>
                <li>You must have an active subscription or trial to use any generation feature.</li>
                <li>If your subscription or trial expires, access is blocked.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Subscriptions & Billing</h2>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Subscriptions are billed monthly.</li>
                <li>Billing is handled by Dodo Payments.</li>
                <li>Plans automatically renew unless canceled before the billing date.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#FF8D00] mt-4 mb-2">Free Trial Offer</h3>
              <p className="mb-2">We may offer a one-day free trial for first-time users of a paid plan. By starting the free trial, you acknowledge and agree:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
                <li>A valid payment method is required at trial signup.</li>
                <li>A ₹0 verification authorization may be performed on your payment method.</li>
                <li>The trial automatically converts to a paid subscription after 24 hours unless cancelled before the trial ends.</li>
                <li>Once the trial converts, your payment method will be charged the applicable subscription fee.</li>
                <li>Trial credits and promotional access are granted only once per user.</li>
                <li>Trial time and entitlements may be modified or withdrawn at any time.</li>
                <li>If you cancel during the trial, your access ends immediately and no charges will be applied.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#FF8D00] mb-2">Automatic Renewal and Payment Authorization</h3>
              <p className="mb-2">By entering a paid subscription (including after a free trial):</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>You authorize automatic renewal and recurring charges to your selected payment method (monthly or as otherwise specified).</li>
                <li>You are responsible for payments until cancellation is completed through the Billing Portal or before the next renewal date.</li>
                <li>If a payment attempt fails, your subscription may become past due. You will retain credit access while your credit balance is positive.</li>
                <li>Any free trial that automatically converts to a paid subscription must be cancelled before the trial period ends to avoid charges.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Credits & Usage</h2>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Each generation consumes credits.</li>
                <li>Monthly credits are added automatically on renewal.</li>
                <li>Credits roll over while subscription remains active.</li>
                <li>Credits have no cash value and cannot be transferred.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Cancellation</h2>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>You may cancel your subscription at any time.</li>
                <li>Cancellation takes effect at the end of the current billing period.</li>
                <li>No partial refunds are provided for unused time or credits.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Prohibited Usage</h2>
              <p className="mb-2">You may not use ThumbnailGPT to create:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>NSFW or adult content</li>
                <li>Sexual or explicit material</li>
                <li>Illegal or copyrighted content</li>
              </ul>
              <p className="mt-2 mb-2">Violation may result in:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Immediate account suspension</li>
                <li>Permanent ban without refund</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. AI Disclaimer</h2>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>AI results may vary.</li>
                <li>We do not guarantee accuracy, originality, or copyright safety.</li>
                <li>You are responsible for how generated images are used.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Service Availability</h2>
              <p>
                We strive for uptime but do not guarantee uninterrupted service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. Continued use means acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">10. User Consent & Communications</h2>
              <p className="mb-2">
                By creating an account or using our services, you provide your explicit consent to receive communications from ThumbnailGPT. This includes, but is not limited to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Service updates and feature announcements</li>
                <li>Marketing and promotional newsletters</li>
                <li>Account-related notifications (e.g., billing, credit balance)</li>
              </ul>
              <p className="mt-2">
                You may opt-out of marketing communications at any time by using the "Unsubscribe" link provided in our emails. However, essential service-related emails required for account management and security cannot be disabled while you maintain an active account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">11. Contact</h2>
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
