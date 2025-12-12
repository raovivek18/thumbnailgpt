import type { Metadata } from "next"
import ThumbnailGPTHeader from "@/components/thumbnail-gpt-header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms & Conditions | ThumbnailGPT",
  description: "Read the terms and conditions for using ThumbnailGPT's services.",
}

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour

export default function TermsPage() {
  return (
    <>
      <ThumbnailGPTHeader />
      <main className="min-h-screen bg-black text-white pt-24">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 mt-8">
            Terms & <span className="text-[#FF8D00]">Conditions</span>
          </h1>
          <p className="text-gray-400 mb-6">Last Updated: January 2025</p>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Welcome to ThumbnailGPT. By using our website and tools, you agree to the following Terms & Conditions.
              Please read them carefully.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-2">1. Overview</h2>
              <p className="mb-2">ThumbnailGPT provides AI tools for generating thumbnails:</p>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>
                  <span className="font-semibold text-white">Text to Thumbnail</span> - enter text and optionally upload
                  1 reference image.
                </li>
                <li>
                  <span className="font-semibold text-white">Image to Thumbnail</span> - upload up to 5 images and add
                  text input.
                </li>
                <li>
                  <span className="font-semibold text-white">Recreate Thumbnail</span> - upload an existing thumbnail or
                  provide a YouTube video link, add prompt text, and optionally upload a persona image.
                </li>
              </ol>
              <p className="mt-2 font-semibold text-white">
                All user-uploaded images are deleted after processing. Only generated output images are stored.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-2">2. Login & Basic Information We Collect</h2>
              <p className="mb-2">We use Google Login only. When you sign in, we receive:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Your Name</li>
                <li>Your Email</li>
                <li>Your Profile Picture</li>
              </ul>
              <p className="mt-2">This is required to create your account, manage credits, and show your profile.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-2">3. Uploaded Images</h2>
              <p className="mb-2">For all three features:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  Any image uploaded by you (reference image, persona image, YouTube thumbnail, or input images) is
                  automatically deleted after AI processing.
                </li>
                <li>We do not permanently store your uploaded images.</li>
              </ul>
              <p className="mt-2">Only the final generated images are saved in our storage.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-2">4. What We Store</h2>
              <p className="mb-2">After generation, we store:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Prompt text</li>
                <li>Feature used</li>
                <li>Time of generation</li>
                <li>Generated image URL</li>
                <li>UUID</li>
                <li>Credit usage data</li>
              </ul>
              <p className="mt-2">
                Generated images are stored on: <span className="text-[#FF8D00]">storage.thumbnailgpt.com</span>
              </p>
              <p className="mt-1">This data is necessary for your history, analytics, and credit tracking.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-2">5. Credit Purchases</h2>
              <p className="mb-2">You can buy credits through our payment provider: Dodo Payment Gateway (powered).</p>
              <h3 className="text-xl font-semibold text-[#FF8D00] mb-1">Important Refund Rule</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>If you buy credits and use even 1 credit, no refund will be given.</li>
                <li>Unused credits may be reviewed for refund (optional and based on our evaluation).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-2">6. Prohibited Content</h2>
              <p className="mb-2">Uploading or trying to generate:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Adult content</li>
                <li>NSFW content</li>
                <li>Sexual content</li>
              </ul>
              <p className="mt-2 font-semibold text-white">is strictly prohibited.</p>
              <p className="mt-1">
                If we detect such content, the user account may be banned permanently, and no refund will be provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-2">7. Service Disclaimer</h2>
              <p className="mb-2">AI results may vary. ThumbnailGPT does not guarantee:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Perfect accuracy</li>
                <li>Exact style matching</li>
                <li>Copyright safety of generated images</li>
              </ul>
              <p className="mt-2">
                Users are responsible for ensuring the images comply with usage laws and platform rules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-2">8. Changes to Terms</h2>
              <p>
                We may update or modify these Terms anytime. Continued use of ThumbnailGPT means you accept the updated
                Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-2">9. Contact</h2>
              <p>
                For support, refunds, or issues: <span className="text-[#FF8D00]">support@thumbnailgpt.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
