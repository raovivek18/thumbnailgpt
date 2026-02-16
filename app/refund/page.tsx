import type { Metadata } from "next"
import ThumbnailGPTHeader from "@/components/thumbnail-gpt-header"
import Footer from "@/components/footer"
import { MainWithPadding } from "@/components/main-with-padding"

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
      <MainWithPadding>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 mt-8">
            Refund <span className="text-[#FF8D00]">Policy</span>
          </h1>
          <p className="text-gray-400 mb-8">Last Updated: 01 February 2026</p>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              Thank you for choosing ThumbnailGPT.
            </p>
            <p>
              This Refund Policy explains how refunds are handled for subscription payments made on our platform.
            </p>
            <p>
              ThumbnailGPT operates on a subscription-based credit system. All payments are processed securely via Dodo Payments. We do not store your card or payment details.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Subscription Payments</h2>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>All plans on ThumbnailGPT are paid subscriptions.</li>
                <li>Credits are added automatically based on your active plan.</li>
                <li>Subscriptions renew automatically unless canceled before the next billing date.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. Free Trial Refunds</h2>
              <p className="mb-2">Free trials are provided for evaluation only.</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Because no payment is collected during the trial period, no refund applies to trial use.</li>
                <li>To avoid charges, you must cancel before the trial period ends.</li>
                <li>Once a trial converts to a paid subscription and a payment is successfully processed, the general refund eligibility criteria apply.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Refund Eligibility</h2>
              <p className="mb-2">Refunds are not guaranteed and are reviewed on a case-by-case basis.</p>
              <p className="mb-2">A refund may be considered only if all of the following conditions are met:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>The subscription was purchased within the last 7 days, and</li>
                <li>No credits have been used, and</li>
                <li>No generation, processing, or export action has been performed, and</li>
                <li>The account has not violated our Terms of Service.</li>
              </ul>
              <p className="mt-3 font-semibold text-white">If any credit is used, the service is considered delivered and the subscription becomes non-refundable.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Non-Refundable Situations</h2>
              <p className="mb-2">Refunds will not be issued in the following cases:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Any credits that have been consumed, even partially</li>
                <li>Time remaining in a billing period after cancellation</li>
                <li>Trial periods that convert to paid plans</li>
                <li>User dissatisfaction with outputs or results</li>
                <li>Failure to cancel before the renewal date</li>
                <li>Expectation of a specific design style or guaranteed accuracy</li>
                <li>Account suspension due to policy or terms violations</li>
                <li>Misuse, abuse, or prohibited content generation</li>
                <li>Change of mind after using the service</li>
              </ul>
              <p className="mt-3 italic">AI outputs are probabilistic and results may vary based on input prompts.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Subscription Cancellation Process</h2>
              <p className="mb-2">To cancel your subscription and avoid future billing:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Visit the <strong>Manage Subscription</strong> page in your account</li>
                <li>Follow the cancellation steps provided</li>
                <li>Cancellation must be completed before the next billing date</li>
              </ul>
              <p className="mt-3">Canceling a subscription does not automatically issue a refund.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Refund Processing Timeline</h2>
              <p className="mb-2">If a refund is approved:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>It will be processed within 5-7 business days</li>
                <li>The refunded amount will be returned to the original payment method via Dodo Payments</li>
                <li>Processing time may vary depending on your bank or card issuer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. How to Request a Refund</h2>
              <p className="mb-2">To request a refund, contact us at:</p>
              <p className="mb-2">
                Email: <span className="text-[#FF8D00]">support@thumbnailgpt.com</span>
              </p>
              <p className="mb-2">
                Subject: <span className="font-semibold text-white">Refund Request - ThumbnailGPT</span>
              </p>
              <p className="mb-2">Please include:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Your registered account email</li>
                <li>Subscription plan name</li>
                <li>Date of purchase</li>
                <li>Reason for the refund request</li>
              </ul>
              <p className="mt-3 italic">Incomplete requests may delay processing.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Contact & Support</h2>
              <p className="mb-2">For billing, subscription, or refund-related questions, reach out to us anytime:</p>
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
